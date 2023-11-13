import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
// import { auth } from '../../Components/firebaseapp';
const auth = getAuth();
export const validateEmail = (value,setValidateEmailValue,setvalidateColorEmail,setvalidateBorderEmail) => {
    if (value.length == 0)
    {
      setValidateEmailValue('Vui Lòng Nhập Email');
      setvalidateColorEmail('red');
      setvalidateBorderEmail('red');
      return false;
    }
    else if (!value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/))
    {
      setValidateEmailValue('Email có dạng ****@gmail.com');
      setvalidateColorEmail('red');
      setvalidateBorderEmail('red');
      return false;
    }
    else {
      setValidateEmailValue('');
      setvalidateColorEmail('transparent');
      setvalidateBorderEmail('white');
      return true;
    }
  };

 export const validatePass = (value,setValidatePassValue,setvalidateColorPass,setvalidateBorderPass) => {
      if (value.length == 0)
      {
        setValidatePassValue('Vui Lòng Nhập Mật Khẩu');
        setvalidateColorPass('red');
        setvalidateBorderPass('red');
        return false;
      }
      else if (value.length < 6)
      {
        setValidatePassValue('Mật Khẩu Phải Lớn Hơn 6 Kí Tự');
        setvalidateColorPass('red');
        setvalidateBorderPass('red');
         return false;
       }
      else
      {
        setvalidateBorderPass('white');
        setValidatePassValue('');
        setvalidateColorPass('transparent');
        return true;
      }
    };


export function loginFirebaseAuth(email,pass,navigation) {
  console.log(email);
  console.log(pass);
   signInWithEmailAndPassword(auth,email,pass)
   .then((user) => {
      // sign in
      navigation.navigate('tabBar');
      // alert('sign in');
    })
    .catch((e) => {
      console.log(e.code);
      if(e == 'auth/too-many-requests')
      alert("Đăng nhập sai quá nhiều lần vui lòng thử lại sau ít phút");
    else if("auth/invalid-login-credentials")
    alert("sai thông tin tài khoản hoặc mật khẩu")
  else
  alert('Vui Lòng kiểm tra lại kết nối internet')
   });

}
