function checkMaskPhoneFunc(){
    let inputsTel = document.querySelectorAll('input[type="phone"]');
    for (let elem of inputsTel) {
        elem.setAttribute("pattern", "^\+\d{2}\(\d{3}\)\s\d{3}[-]\d{2}[-]\d{2}$");
        elem.setAttribute("placeholder", "7 (999) 999-99-99");
    };
    Inputmask({
        "mask": "7(999)999-99-99",
        showMaskOnHover: false,
    }).mask(inputsTel);
    
};

checkMaskPhoneFunc()
