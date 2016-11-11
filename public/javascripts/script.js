function validateForm(){
    var reg_name = /^[A-Z][a-z]+[a-zA-Z]* [A-Z][a-z]+[a-zA-Z]*$/;
    var reg_address = /^[0-9]+ +[A-Z][a-z]+[a-zA-Z0-9]* ([A-Z][a-z]+[A-Za-z0-9]*( {1,2}[A-Z][a-z]+[A-Za-z0-9]*)?)?$/;
    var reg_card_visa_mc = /^d{4}\-?d{4}\-?d{4}\-?d{4}$/;
    if(!reg_name.test(document.myForm.name.value)){
        alert("name did not pass");
        return false;
    }
    console.log(document.myForm.address.value);
    if(!reg_address.test(document.myForm.address.value)){
        alert("address did not pass");
        return false;
    }
    if(!reg_card_visa_mc.test(document.myForm.cno.value)){
        alert("Card number did not pass");
        return false;
    }
    return true;
}
