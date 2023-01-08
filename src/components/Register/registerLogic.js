
//validates the form by making sure that the password and confirmpassword match
//that the email is valid.
//that there is no mysql injection in either email or password fields
export let isValidCredentials = (email, password, confirmPassword ) =>{
   
    let isValid = true;
    if(password != confirmPassword){
        isValid = false;
    }
     //TODO: check against mysql injections using regex
    return isValid;
}