import { useState } from "react";
export const validateEmail = (value,setValidateEmailValue,setvalidateColorEmail,setvalidateBorderEmail) => {
    if(value.length == 0)
    {
      setValidateEmailValue('Vui Lòng Nhập Email');
      setvalidateColorEmail('red')
      setvalidateBorderEmail('red')
      return false
    }
    else if(!value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/))
    {
      setValidateEmailValue('Email có dạng ****@gmail.com');
      setvalidateColorEmail('red')
      setvalidateBorderEmail('red')
      return false
    }
    else{
      setValidateEmailValue('');
      setvalidateColorEmail('transparent')
      setvalidateBorderEmail('white')
      return true
    }
  }
 
 export const validatePass = (value,setValidatePassValue,setvalidateColorPass,setvalidateBorderPass) => {
      if(value.length == 0)
      {
        setValidatePassValue('Vui Lòng Nhập Mật Khẩu');
        setvalidateColorPass('red')
        setvalidateBorderPass('red')
        return false
      }
      else if(value.length<6)
      {
        setValidatePassValue('Mật Khẩu Phải Lớn Hơn 6 Kí Tự');
        setvalidateColorPass('red')
        setvalidateBorderPass('red')
         return false
       }
      else
      {
        setvalidateBorderPass('white')
        setValidatePassValue('')
        setvalidateColorPass('transparent')
        return true
      }
    }
 
 