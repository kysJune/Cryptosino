
//validates the form by making sure that the password and confirmpassword match
//that the email is valid.
//that there is no mysql injection in either email or password fields


function isValidEmail(email){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.match(mailformat))
    {
        return true;
    }
    else{
        alert("You have entered an invalid email address!");
        return false;
    }
}
export let isValidCredentials = (formValues ) =>{
   
    let isValid = true;
    if(formValues.password != formValues.confirmPassword){
        isValid = false;
    }
    if(!isValidEmail(formValues.email)){
        isValid =  false;
    }

    return isValid;
}

