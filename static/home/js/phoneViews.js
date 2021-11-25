
let imgUrl = document.getElementById('imageUrl');
let step2_input = document.getElementById('keyWordsOfferId');

// Превью сайта в телефоне
let step1_input = document.getElementById('domainInput');
step1_input.onchange = function () {
    let phPrev = document.getElementById('PhonePreview');
    let userSit = document.getElementById('userSites');
    if (step1_input.value != '') {
        // Введен домен сайта
        phPrev.classList.add('d-none');
        userSit.classList.remove('d-none');
        document.getElementById('siteIframe').src = "http://" + step1_input.value;
    }
};

step2_input.onchange = function () {
    elImg = document.createElement("img");
    elImg.src = imgUrl.value;
    el = document.getElementById('step2imgPhone')
    el.classList.remove('d-none');
    el.appendChild(elImg);
};

