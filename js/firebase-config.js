// ============================================================
//  firebase-config.js — Firebase初期化・共通エクスポート
//  ★ Firebaseコンソールの「プロジェクト設定」から
//    「マイアプリ」→「CDN」のfirebaseConfigをここに貼り付ける
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth }       from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore }  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ★ ここをFirebaseコンソールの値に差し替えてください
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

const app  = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);
