import {useState} from 'react';

export const useLocalStorage=(keyName,defualtValue)=>{
    const [storedValue,setStoredValue]=useState(()=>{
        try {
          const value=window.localStorage.getItem(keyName);
          
          if(value){
             return JSON.parse(value);
          }else{
            window.localStorage.setItem(keyName, JSON.stringify(defualtValue));
            return defualtValue;
          }
        } catch (error) {
            return defualtValue;
        }
    });


    const setValue=(newValue)=>{
        try{
          window.localStorage.setItem(keyName,JSON.stringify(newValue))
        }catch(err){}
    }

    return [storedValue,setValue];
}