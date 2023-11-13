// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeAuth,getReactNativePersistence,} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBtrvvn-FzknQ9KbL3mMHLLE-YyMLNHdcs",
  authDomain: "iot-team-2.firebaseapp.com",
  databaseURL: "https://iot-team-2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iot-team-2",
  storageBucket: "iot-team-2.appspot.com",
  messagingSenderId: "62478113264",
  appId: "1:62478113264:web:faaab07fb5fb4291ac6535"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
 export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const database = getDatabase(app);