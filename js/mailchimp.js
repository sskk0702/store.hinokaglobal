// ============================================================
//  mailchimp.js — Mailchimp登録・歓迎メール送信
//
//  ⚠️ 重要：Mailchimp APIキーは直接フロントエンドに書かない
//     → Netlify Functions / Cloudflare Workers を経由する
//     → 以下はNetlify Functions用のフロントエンド呼び出しコード
// ============================================================

// ── Mailchimp登録（Netlify Function経由） ──────────────────
// functions/mailchimp-subscribe.js を別途デプロイが必要
export async function subscribeToMailchimp({ email, firstName, lastName }) {
  try {
    const res = await fetch('/.netlify/functions/mailchimp-subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, firstName, lastName })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Mailchimp登録失敗');
    return { success: true };
  } catch (err) {
    console.warn('Mailchimp登録エラー（スキップ）:', err.message);
    // メール登録失敗はアカウント作成をブロックしない
    return { success: false, error: err.message };
  }
}
