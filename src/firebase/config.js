import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCI5-XcD_1I738qJX3RmKFEeoSPcd0weFs",
  authDomain: "digital-menu-expo.firebaseapp.com",
  projectId: "digital-menu-expo",
  storageBucket: "digital-menu-expo.appspot.com",
  messagingSenderId: "133575227664",
  appId: "1:133575227664:web:e39829e860dc8d9c1ecd95",
  measurementId: "G-CK3FR3BJKP"
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };