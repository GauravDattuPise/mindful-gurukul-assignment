// export const isValid = function (value) {
//     if (typeof value !== "string" || value.trim().length === 0) {
//       return false;
//     } else {
//       return true;
//     }
//   };
  
  export const isValidEmail = function (data) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(data);
  };
  
  export function checkPassword(str) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    return re.test(str);
  }
  
  export function checkname(str) {
    var nameRegex = /^[A-Z a-z]+$/;
    return nameRegex.test(str);
  }
  
