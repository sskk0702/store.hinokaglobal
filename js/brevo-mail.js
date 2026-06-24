// ============================================================
//  brevo-mail.js — Brevo API 直接呼び出し版
//  Firebase Trigger Email Extension 不要
//  GitHub Pages のままで動作
// ============================================================

// ★ Brevo の設定
// Brevo Dashboard → SMTP & API → API Keys → Create a new API key
// 権限：「Transactional emails」のみ選択（送信専用）
const BREVO_CONFIG = {
  apiKey:    '',  // ← 後で設定（空白でもエラーにならない）
  fromEmail: 'noreply@hinokaglobal.com',
  fromName:  'HINOKA',
  replyTo:   'sun_hua@hinokaglobal.com'
};

// APIキー未設定チェック（エラーを出さずにスキップ）
function isConfigured() {
  return BREVO_CONFIG.apiKey && BREVO_CONFIG.apiKey.length > 0;
}

// ── Brevo API でメール送信 ──────────────────────────────────
async function sendBrevoMail({ to, toName, subject, html }) {
  // APIキー未設定の場合はスキップ（エラーにしない）
  if (!isConfigured()) {
    console.log('Brevo APIキー未設定のためメール送信スキップ');
    return { success: false, error: 'API key not configured' };
  }
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
  bankName, bankBranch, bankNumber, bankHolder,
  orderNumber
}) {
  const orderLine = orderNumber
    ? `<p style="font-size:14px;color:#333;line-height:2;">注文番号：<strong>${orderNumber}</strong></p>`
    : '';
  const memoNote = orderNumber
    ? `<p style="font-size:12px;color:#333;margin-top:12px;background:#fffde7;padding:12px;border:1px solid #ffd54f;">📝 お振込みの際、依頼人名欄（備考欄）に必ず <strong>「${orderNumber} + お名前」</strong> をご入力ください。<br>例：${orderNumber} ヤマダタロウ</p>`
    : '';
  const html = `
    ${header}
    <p style="font-size:14px;color:#333;line-height:2;">
      ${customerName} 様
    </p>
    ${orderLine}
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
    ${memoNote}
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

// ── 発送完了通知メール ──────────────────────────────────────
export async function sendShippingNotificationEmail({
  email, customerName, orderNumber, carrier, trackingNumber
}) {
  const CARRIER_URLS = {
    yamato:    'https://jizen.kuronekoyamato.co.jp/jizen/servlet/crjz.b.CRJZb001?id=',
    sagawa:    'https://k2k.sagawa-exp.co.jp/p/sagawa/web/otoiawase.jsp?SearchNo=',
    japanpost: 'https://trackings.post.japanpost.jp/services/srv/search/direct?reqCodeNo1=',
    seino:     'https://track.seino.co.jp/kamotsu/denpyoNumber.do?DENPYO_NO='
  };
  const CARRIER_NAMES = { yamato: 'ヤマト運輸', sagawa: '佐川急便', japanpost: '日本郵便', seino: '西濃運輸' };
  const carrierName = CARRIER_NAMES[carrier] || carrier || '配送会社';
  const trackUrl = trackingNumber ? ((CARRIER_URLS[carrier] || CARRIER_URLS.sagawa) + trackingNumber) : '';
  const trackLine = trackingNumber
    ? `<p>追跡番号：<strong><a href="${trackUrl}" style="color:#2b6cb0;">${trackingNumber}</a></strong></p>`
    : '';
  const html = `
    ${header}
    <p style="font-size:14px;color:#333;line-height:2;">
      ${customerName} 様
    </p>
    <p style="font-size:14px;color:#333;line-height:2;">
      ご注文の商品を発送いたしました。
    </p>
    <div style="background:#f8f8f6;padding:24px;margin:20px 0;
                font-size:13px;line-height:2.4;border-left:3px solid #2b6cb0;">
      <p>注文番号：<strong>${orderNumber || '—'}</strong></p>
      <p>配送会社：<strong>${carrierName}</strong></p>
      ${trackLine}
    </div>
    <p style="font-size:12px;color:#666;line-height:2;">
      お届けまで通常1〜3営業日かかります。<br>
      ご不明な点がございましたら、お気軽にお問い合わせください。
    </p>
    ${footer}
  `;

  return await sendBrevoMail({
    to:      email,
    toName:  customerName,
    subject: '【HINOKA】商品を発送しました（注文番号：' + (orderNumber || '') + '）',
    html
  });
}

// ── 注文ステータス更新通知メール ──────────────────────────────
export async function sendStatusUpdateEmail({
  email, customerName, orderNumber, newStatus, message
}) {
  const html = `
    ${header}
    <p style="font-size:14px;color:#333;line-height:2;">
      ${customerName} 様
    </p>
    <p style="font-size:14px;color:#333;line-height:2;">
      ご注文のステータスが更新されました。
    </p>
    <div style="background:#f8f8f6;padding:24px;margin:20px 0;
                font-size:13px;line-height:2.4;border-left:3px solid #000;">
      <p>注文番号：<strong>${orderNumber || '—'}</strong></p>
      <p>ステータス：<strong>${newStatus}</strong></p>
      ${message ? '<p style="border-top:1px solid #ddd;padding-top:12px;margin-top:4px;">' + message + '</p>' : ''}
    </div>
    ${footer}
  `;

  return await sendBrevoMail({
    to:      email,
    toName:  customerName,
    subject: '【HINOKA】ご注文ステータスの更新（' + (orderNumber || '') + '）',
    html
  });
}
