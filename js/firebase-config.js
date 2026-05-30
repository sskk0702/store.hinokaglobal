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
  apiKey:            "AIzaSyCCbyBIRyglhmvyfbppp8jxO8Pzytr49TA",
  authDomain:        "hinoka-0304.firebaseapp.com",
  projectId:         "hinoka-0304",
  storageBucket:     "hinoka-0304.firebasestorage.app",
  messagingSenderId: "275098198657",
  appId:             "1:275098198657:web:d9b11ff1086c972ac6e380"
};

const app  = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);
