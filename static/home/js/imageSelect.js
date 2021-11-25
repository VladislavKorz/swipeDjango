let imagePhone = document.getElementById("step4imagePhone");
let imageTelegram = document.getElementById("step4imageTelegram");
let imageVk = document.getElementById("step4imageVk");
let imageWhatsApp = document.getElementById("step4imageWhatsApp");
let imageFacebook = document.getElementById("step4imageFacebook");
let imageUrl = document.getElementById("step4imageUrl");

let chekUrl = document.createElement("a");
chekUrl.target = "_blank";
chekUrl.id = "chekUrlID";
chekUrl.href = ""
chekUrl.innerHTML = "Проверить ссылку"

function classChek() {
    let elements = document.getElementsByClassName('step4imageActive');
    for (let elem of elements) {
        elem.classList.remove('step4imageActive');
    }
}

$(imagePhone).on("click", function () { // функция, которая должна работать при клике, и работает 
    classChek();
    imagePhone.classList.add('step4imageActive');
    let el = document.getElementById('stepWidget5-title');
    el.innerHTML = 'ВВЕДИТЕ НОМЕР ДЛЯ ЗВОНКА ПРИ СВАЙПЕ.<br><input name="phone" type="phone" class="form-control form-control-lg">';
    checkMaskPhoneFunc();
    el.querySelector('input').onchange = function (){
    el.append(chekUrl)
    }
});

$(imageTelegram).on("click", function () { // функция, которая должна работать при клике, и работает 
    classChek();
    imageTelegram.classList.add('step4imageActive');
    let el = document.getElementById('stepWidget5-title');
    el.innerHTML = 'ВВЕДИТЕ USERNAME ДЛЯ ОТПРАВКИ СООБЩЕНИЯ В TELEGRAM.<br><input type="text" name="telegram" class="form-control form-control-lg" placeholder="USERNAME">';
    el.querySelector('input').onchange = function (){
    el.append(chekUrl)
    }
});

$(imageVk).on("click", function () { // функция, которая должна работать при клике, и работает 
    classChek();
    imageVk.classList.add('step4imageActive');
    let el = document.getElementById('stepWidget5-title');
    el.innerHTML = 'ВСТАВЬТЕ ID СВОЕЙ СТРАНИЦЫ В ВКОНТАКТЕ.<br><input type="text" name="vk" class="form-control form-control-lg" placeholder="ID_VK">';
    el.querySelector('input').onchange = function (){
    el.append(chekUrl)
    }

});

$(imageWhatsApp).on("click", function () { // функция, которая должна работать при клике, и работает 
    classChek();
    imageWhatsApp.classList.add('step4imageActive');
    let el = document.getElementById('stepWidget5-title');
    el.innerHTML = 'ВВЕДИТЕ НОМЕР ДЛЯ ОТПРАВКИ СООБЩЕНИЯ В WHATSAPP.<br><input type="phone" name="whatsapp" class="form-control form-control-lg"><input class="form-control form-control-lg" name="whatsappMsg" type="text" placeholder="СООБЩЕНИЕ ДЛЯ ОТПРАВКИ">';
    checkMaskPhoneFunc();
    el.querySelector('input').onchange = function (){
    el.append(chekUrl)
    }
});

$(imageUrl).on("click", function () { // функция, которая должна работать при клике, и работает 
    classChek();
    imageUrl.classList.add('step4imageActive');
    let el = document.getElementById('stepWidget5-title');
    el.innerHTML = 'ВСТАВЬТЕ ЛЮБУЮ ССЫЛКУ.<br> <input type="text" name="url" class="form-control form-control-lg" placeholder="http://example.com/">'
    el.querySelector('input').onchange = function (){
    el.append(chekUrl)
    }
});

$(imageFacebook).on("click", function () { // функция, которая должна работать при клике, и работает 
    classChek();
    imageFacebook.classList.add('step4imageActive');
    let el = document.getElementById('stepWidget5-title');
    el.innerHTML = 'ВСТАВЬТЕ СВОЙ USERNAME НА FACEBOOK.<br> <input type="text" name="facebook" class="form-control form-control-lg" placeholder="USERNAME">'
    el.querySelector('input').onchange = function (){
    el.append(chekUrl)
    }
});


$(chekUrl).on("click", function createUrl (el) { // функция, которая должна работать при клике, и работает 
    let parent = document.querySelector('#stepWidget5-title').querySelector('input');
    let value = parent.value;
    if (value == ''){
        el.preventDefault();
        alert('Выполните ШАГ 4, не забудьте указать посадочную страницу или номер телефона');
    }else if (parent.name == 'phone') {
        $(chekUrl).attr("href", 'tel:+' + value);
    } else if (parent.name == 'telegram') {
        $(chekUrl).attr("href", 'https://t.me/' + value);
    } else if (parent.name == 'vk') {
        $(chekUrl).attr("href", 'https://vk.me/' + value);
    } else if (parent.name == 'whatsapp') {
        let wamsg = document.querySelector('#stepWidget5-title').querySelector('input[name="whatsappMsg"]').value;
        $(chekUrl).attr("href", 'https://api.whatsapp.com/send?phone=' + value + '&text=' + wamsg);
    } else if (parent.name == 'url') {
        $(chekUrl).attr("href", value);
    } else if (parent.name == 'facebook') {
        $(chekUrl).attr("href", 'https://www.messenger.com/t/' + value);
    };
});


function msgUrlGenerator(){ // функция, которая генерирует ссылку 
    let parent = document.querySelector('#stepWidget5-title').querySelector('input');
    let value = parent.value;
    if (value == ''){
        el.preventDefault();
        alert('Выполните ШАГ 4, не забудьте указать посадочную страницу или номер телефона');
    }else if (parent.name == 'phone') {
        value = 'tel:+' + value;
    } else if (parent.name == 'telegram') {
        value = 'https://t.me/' + value;
    } else if (parent.name == 'vk') {
        value = 'https://vk.me/' + value;
    } else if (parent.name == 'whatsapp') {
        let wamsg = document.querySelector('#stepWidget5-title').querySelector('input[name="whatsappMsg"]').value;
        value = 'https://api.whatsapp.com/send?phone=' + value + '&text=' + wamsg;
    } else if (parent.name == 'url') {
        value = value;
    };
    let msgUrl = document.getElementById('msgUrl');
    msgUrl.value = value;

    return value;
        
}