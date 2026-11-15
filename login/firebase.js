


import { initializeApp } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/13.3.0/firebase-firestore.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/13.3.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBB_qcp_1SeVy6ROt1WZUFhagIFi7jM8uk",
    authDomain: "uschool-qa-platform.firebaseapp.com",
    projectId: "uschool-qa-platform",
    storageBucket: "uschool-qa-platform.firebasestorage.app",
    messagingSenderId: "352030006609",
    appId: "1:352030006609:web:bac01ee3ed97cf41b4c770"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };




/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBB_qcp_1SeVy6ROt1WZUFhagIFi7jM8uk",
  authDomain: "uschool-qa-platform.firebaseapp.com",
  projectId: "uschool-qa-platform",
  storageBucket: "uschool-qa-platform.firebasestorage.app",
  messagingSenderId: "352030006609",
  appId: "1:352030006609:web:bac01ee3ed97cf41b4c770",
  measurementId: "G-4QN014SR9K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
/////////const analytics = getAnalytics(app);

//uschool-qa-platform

// 取得 Firestore 資料庫
const db = getFirestore(app);

// 匯出資料庫，讓其他程式使用
export { db };
*/

/*

import { initializeApp } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "請貼上你自己的 apiKey",
  authDomain: "uschool-qa-platform.firebaseapp.com",
  projectId: "uschool-qa-platform",
  storageBucket: "uschool-qa-platform.firebasestorage.app",
  messagingSenderId: "352030006609",
  appId: "1:352030006609:web:bac01ee3ed97cf41b4c770",
  measurementId: "G-4QN014SR9K"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);

// 取得 Firestore 資料庫
const db = getFirestore(app);

// 匯出資料庫，讓其他程式使用
export { db };

*/