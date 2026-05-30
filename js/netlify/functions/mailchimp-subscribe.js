// ============================================================
//  Netlify Function — Mailchimp登録APIをサーバーサイドで処理
//
//  設定方法：
//  1. Netlifyにデプロイ（GitHub Pagesの代わり or 併用）
//  2. Netlify Dashboard → Site settings → Environment variables に追加：
//     MAILCHIMP_API_KEY  = "xxxxxxxxxxxx-us21"（APIキー）
//     MAILCHIMP_LIST_ID  = "xxxxxxxx"（オーディエンスID）
//     MAILCHIMP_DC       = "us21"（データセンター。APIキーの最後の部分）
// ============================================================

exports.handler = async (event) => {
  // CORSヘッダー
  const headers = {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { email, firstName, lastName } = body;
  if (!email) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'email is required' }) };
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const LIST_ID = process.env.MAILCHIMP_LIST_ID;
  const DC      = process.env.MAILCHIMP_DC || API_KEY.split('-').pop();

  // Mailchimp APIエンドポイント
  const url = `https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

  // 日本の特定電子メール法対応：
  // ・merge_tags に GDPR同意フラグを記録
  // ・status: "subscribed" は明示的同意取得後のみ使用
  //   （登録フォームにチェックボックスで同意取得済みの前提）
  const payload = {
    email_address: email,
    status: 'subscribed', // 同意取得済みの場合
    merge_fields: {
      FNAME: firstName || '',
      LNAME: lastName  || ''
    },
    language: 'ja',
    tags: ['hinoka-store', 'new-member']
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`,
        'Content-Type':  'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    // 既に登録済みの場合はエラーにしない
    if (!res.ok && data.title !== 'Member Exists') {
      return {
        statusCode: res.status,
        headers,
        body: JSON.stringify({ error: data.detail || 'Mailchimp API error' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, id: data.id })
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};
