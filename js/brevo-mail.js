// ============================================================
//  brevo-mail.js — Brevo API 直接呼び出し版
//  Firebase Trigger Email Extension 不要
//  GitHub Pages のままで動作
// ============================================================

// ★ Brevo の設定
// Brevo Dashboard → SMTP & API → API Keys → Create a new API key
// 権限：「Transactional emails」のみ選択（送信専用）
const BREVO_CONFIG = {
  apiKey:    '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',        // ← Brevo API Key に差し替え
  fromEmail: 'noreply@hinokaglobal.com',  // ← Brevo で認証済みのメールアドレス
  fromName:  'HINOKA',
  replyTo:   'sun_hua@hinokaglobal.com'
};

// ── Brevo API でメール送信 ──────────────────────────────────
async function sendBrevoMail({ to, toName, subject, html }) {
  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept':       'application/json',
        'api-key':      BREVO_CONFIG.apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: {
          name:  BREVO_CONFIG.fromName,
          email: BREVO_CONFIG.fromEmail
        },
        to: [{ email: to, name: toName || to }],
        replyTo: { email: BREVO_CONFIG.replyTo },
        subject,
        htmlContent: html
      })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Brevo API エラー');
    }

    return { success: true };

  } catch (err) {
    // メール送信失敗はアカウント作成・注文をブロックしない
    console.warn('メール送信エラー（スキップ）:', err.message);
    return { success: false, error: err.message };
  }
}

// ════════════════════════════════════════
//  メールテンプレート
// ════════════════════════════════════════

// 共通ヘッダー・フッター
const header = `
<div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;">
  <div style="background:#000;padding:32px;text-align:center;">
    <h1 style="color:#fff;font-size:28px;letter-spacing:10px;font-weight:300;margin:0;">
      HINOKA
    </h1>
  </div>
  <div style="padding:40px 32px;background:#fff;">
`;

const footer = `
  </div>
  <div style="background:#f8f8f6;padding:20px 32px;text-align:center;">
    <p style="font-size:11px;color:#999;line-height:1.8;margin:0;">
      株式会社HINOKA　sun_hua@hinokaglobal.com<br>
      メールマガジンの配信停止は
      <a href="${location.origin}/shop/account.html" 
         style="color:#999;">マイアカウント</a>
      よりお手続きください。
    </p>
  </div>
</div>
`;

// ════════════════════════════════════════
//  公開API（account.html・checkout.html から呼び出す）
// ════════════════════════════════════════

// ── 歓迎メール（新規登録時） ──────────────────────────────
export async function sendWelcomeEmail({ email, firstName, lastName }) {
  const html = `
    ${header}
    <p style="font-size:14px;color:#333;line-height:2;">
      ${lastName} ${firstName} 様
    </p>
    <p style="font-size:14px;color:#333;line-height:2;">
      この度はHINOKAにご登録いただき、誠にありがとうございます。<br>
      いつも暮らしに、ときめきを。<br>
      ペット用品・ファッション・生活雑貨を丁寧にセレクトしてお届けします。
    </p>
    <div style="text-align:center;margin:32px 0;">
      <a href="${location.origin}/shop/store.html"
         style="display:inline-block;background:#000;color:#fff;
                padding:16px 48px;font-size:11px;letter-spacing:4px;
                text-decoration:none;">
        SHOP NOW
      </a>
    </div>
    <p style="font-size:12px;color:#999;border-top:1px solid #eee;padding-top:20px;">
      このメールに心当たりがない場合はそのまま破棄してください。
    </p>
    ${footer}
  `;

  return await sendBrevoMail({
    to:      email,
    toName:  `${lastName} ${firstName}`,
    subject: '【HINOKA】会員登録が完了しました',
    html
  });
}

// ── 注文確認メール ────────────────────────────────────────
export async function sendOrderConfirmEmail({
  email, customerName, orderItems,
  totalAmount, paymentMethod, shippingAddress
}) {
  const html = `
    ${header}
    <p style="font-size:14px;color:#333;line-height:2;">
      ${customerName} 様
    </p>
    <p style="font-size:14px;color:#333;line-height:2;">
      ご注文ありがとうございます。以下の内容で承りました。
    </p>
    <div style="background:#f8f8f6;padding:20px;margin:20px 0;
                font-size:13px;line-height:2;border-left:3px solid #000;">
      <p style="white-space:pre-line;">${orderItems}</p>
      <hr style="border:none;border-top:1px solid #ddd;"/>
      <p>合計金額：<strong>${totalAmount}</strong></p>
      <p>お支払い方法：${paymentMethod}</p>
      <p>お届け先：${shippingAddress}</p>
    </div>
    <p style="font-size:12px;color:#999;">
      📦 最短でのお届けはご注文日の翌々日となります。
    </p>
    ${footer}
  `;

  return await sendBrevoMail({
    to:      email,
    toName:  customerName,
    subject: '【HINOKA】ご注文を承りました',
    html
  });
}

// ── 銀行振込案内メール ────────────────────────────────────
export async function sendBankTransferEmail({
  email, customerName, totalAmount,
  bankName, bankBranch, bankNumber, bankHolder
}) {
  const html = `
    ${header}
    <p style="font-size:14px;color:#333;line-height:2;">
      ${customerName} 様
    </p>
    <p style="font-size:14px;color:#333;line-height:2;">
      以下の口座へ <strong>3営業日以内</strong> にお振込みください。
    </p>
    <div style="background:#f8f8f6;padding:24px;margin:20px 0;
                font-size:13px;line-height:2.4;border-left:3px solid #000;">
      <p>銀行名：<strong>${bankName}</strong></p>
      <p>支店名：<strong>${bankBranch}</strong></p>
      <p>口座種別：普通</p>
      <p>口座番号：<strong>${bankNumber}</strong></p>
      <p>口座名義：<strong>${bankHolder}</strong></p>
      <p style="border-top:1px solid #ddd;padding-top:12px;margin-top:4px;">
        お振込金額：<strong style="font-size:16px;">${totalAmount}</strong>
      </p>
    </div>
    <p style="font-size:12px;color:#e65100;">
      ⚠️ 期限内にご入金が確認できない場合、ご注文をキャンセルさせていただきます。<br>
      振込手数料はお客様ご負担となります。
    </p>
    ${footer}
  `;

  return await sendBrevoMail({
    to:      email,
    toName:  customerName,
    subject: '【HINOKA】銀行振込のご案内',
    html
  });
}

// ── コンビニ払い案内メール ────────────────────────────────
export async function sendConbiniPaymentEmail({
  email, customerName, paymentNumber, totalAmount
}) {
  const html = `
    ${header}
    <p style="font-size:14px;color:#333;line-height:2;">
      ${customerName} 様
    </p>
    <p style="font-size:14px;color:#333;line-height:2;">
      以下のお支払い番号で <strong>3日以内</strong> にお支払いください。
    </p>
    <div style="background:#f8f8f6;padding:32px;margin:20px 0;
                text-align:center;border:1px solid #ddd;">
      <p style="font-size:11px;color:#999;letter-spacing:2px;margin-bottom:8px;">
        お支払い番号
      </p>
      <p style="font-size:32px;font-weight:700;letter-spacing:6px;
                color:#000;margin:0;">
        ${paymentNumber}
      </p>
    </div>
    <p style="font-size:13px;color:#333;line-height:2;">
      🏪 対応コンビニ：セブン‐イレブン・ファミリーマート・ローソン<br>
      💰 お支払い金額：<strong>${totalAmount}</strong>
    </p>
    <p style="font-size:12px;color:#e65100;">
      ⚠️ 期限を過ぎると番号が無効になり、ご注文がキャンセルとなります。
    </p>
    ${footer}
  `;

  return await sendBrevoMail({
    to:      email,
    toName:  customerName,
    subject: '【HINOKA】コンビニ払いのご案内',
    html
  });
}

// ── PayPay案内メール ──────────────────────────────────────
export async function sendPayPayEmail({ email, customerName, totalAmount }) {
  const html = `
    ${header}
    <p style="font-size:14px;color:#333;line-height:2;">
      ${customerName} 様
    </p>
    <p style="font-size:14px;color:#333;line-height:2;">
      ご注文ありがとうございます。<br>
      担当者より <strong>PayPayお支払いリンク</strong> を
      メールにてご案内いたします。<br>
      しばらくお待ちください。
    </p>
    <div style="background:#f8f8f6;padding:20px;margin:20px 0;
                font-size:13px;line-height:2;border-left:3px solid #e00;">
      <p>お支払い金額：<strong>${totalAmount}</strong></p>
    </div>
    ${footer}
  `;

  return await sendBrevoMail({
    to:      email,
    toName:  customerName,
    subject: '【HINOKA】ご注文を承りました（PayPay）',
    html
  });
}
