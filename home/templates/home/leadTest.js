let image = new Image();
image.src = "{{ code.get_absolute_image }}";

//Растягиваем холст на весь экран при изминении размера
window.addEventListener("resize", function InitApp() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
let urlSwipe = '{{ code.siteUrlUp }}'
urlSwipe = urlSwipe.replace(/&amp;/g, '&')
console.log(urlSwipe)

// Открытие при нажатии на кнопку
var swipeOpenBtn = document.getElementById("swipeOpen-qjf12r");
if (swipeOpenBtn) {
    swipeOpenBtn.onclick = createCanvas;
}

window.onload = function () {
    if (window.innerWidth <= 760) {
        setTimeout(createCanvas, {{ code.openTime }}* 1000);
};};


// Функция отправки статистики
function staticSend(value) {
    let url = ''
    if (value == 'open') {
        url = "{{baseUrl}}{% url 'home-swipeKeyGet' key=code.key params='open' %}";
    } else if (value == 'close') {
        url = "{{baseUrl}}{% url 'home-swipeKeyGet' key=code.key params='close' %}";
    } else if (value == 'swipeUP') {
        url = "{{baseUrl}}{% url 'home-swipeKeyGet' key=code.key params='swipeUP' %}";
    };

    var x = new XMLHttpRequest();
    x.open("GET", url, true);
    // x.onload = function () {
    //     alert(x.responseText);
    // }
    x.send(null);
}

// Создание канвас
function createCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    div.appendChild(canvas);
    div.appendChild(closeCanvasBtn);
    div.appendChild(arrowUp);
    div.appendChild(arrowUpText);
    if ('{{ code.keyWords }}'.length > 3) {
        div.appendChild(textOffer);
    }
    staticSend('open');
}


function closeCanvas() {
    div.innerHTML = '';
    staticSend('close');
}

// Создание элемента canvas 
var div = document.getElementById('swipeWrapper-1ieq2r');
// div.style="position: fixed; z-index: 500; overflow: hidden; top: 0px; left: 0;" Старый
div.style = "z-index: 999999999999999999999999999999999999; width: 100%; height: 100%; position: fixed; top: 0; left: 0; display: flex; align-items: center; align-content: center; justify-content: center";

// Создание крестика, что бы закрыть
var closeCanvasBtn = document.createElement("a");
closeCanvasBtn.style = 'position: fixed; right: 28px; top: 18px; width: 8%; text-align: center; text-decoration: none;';
closeCanvasBtn.innerHTML = '<svg id="svg" version="1.1" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><g id="svgg"><path id="path0" d="M395.309 188.000 C 395.309 188.990,395.387 189.395,395.482 188.900 C 395.578 188.405,395.578 187.595,395.482 187.100 C 395.387 186.605,395.309 187.010,395.309 188.000 M212.893 199.600 C 212.893 200.370,212.975 200.685,213.076 200.300 C 213.176 199.915,213.176 199.285,213.076 198.900 C 212.975 198.515,212.893 198.830,212.893 199.600 M220.400 235.325 C 220.400 235.394,220.985 235.979,221.700 236.625 L 223.000 237.800 221.825 236.500 C 220.730 235.288,220.400 235.016,220.400 235.325 " stroke="none" fill="#000000" fill-rule="evenodd"></path><path id="path1" d="M181.200 3.445 C 63.867 15.977,-14.208 119.293,6.066 235.200 C 22.137 327.086,104.553 395.595,199.024 395.600 C 299.224 395.604,383.028 320.714,394.182 221.200 C 394.540 218.010,395.005 213.858,395.216 211.973 C 396.277 202.503,395.256 181.346,393.133 168.800 C 380.940 96.746,335.358 40.620,268.400 15.212 C 242.022 5.202,207.882 0.595,181.200 3.445 M131.392 112.174 C 132.306 112.710,135.021 115.357,137.427 118.057 C 139.832 120.757,142.970 124.240,144.400 125.796 C 145.830 127.353,150.510 132.578,154.800 137.409 C 159.090 142.239,163.686 147.363,165.013 148.796 C 166.341 150.228,168.681 152.831,170.213 154.581 C 171.746 156.331,174.260 159.127,175.800 160.795 C 177.340 162.462,181.390 166.971,184.799 170.814 C 195.071 182.389,196.242 183.527,198.180 183.818 C 202.355 184.444,200.004 186.529,238.800 147.787 C 263.598 123.024,274.645 112.251,275.687 111.818 C 282.351 109.049,289.306 115.749,286.583 122.313 C 286.150 123.356,275.288 134.493,250.217 159.600 C 224.066 185.788,214.298 195.816,213.834 196.949 C 212.489 200.235,213.328 202.718,217.236 207.025 C 218.646 208.578,223.400 213.880,227.800 218.806 C 232.200 223.732,238.500 230.744,241.800 234.388 C 247.715 240.920,253.712 247.611,258.800 253.357 C 260.230 254.972,264.974 260.265,269.343 265.119 C 278.753 275.575,278.375 275.071,278.669 277.557 C 279.148 281.594,277.380 284.823,273.800 286.454 C 269.417 288.450,266.942 287.098,259.400 278.589 C 255.611 274.314,233.014 249.140,224.400 239.597 C 222.090 237.038,217.320 231.726,213.800 227.792 C 201.136 213.638,202.053 214.450,198.680 214.418 C 195.503 214.388,195.410 214.474,159.515 250.341 C 124.080 285.750,122.507 287.204,119.654 287.198 C 113.525 287.185,109.268 280.719,111.887 275.400 C 112.212 274.740,128.553 258.090,148.199 238.400 C 167.846 218.710,184.208 202.024,184.560 201.320 C 186.433 197.573,185.787 196.521,172.572 181.800 C 166.251 174.760,156.742 164.173,151.440 158.273 C 146.138 152.373,140.720 146.329,139.400 144.843 C 138.080 143.357,133.176 137.852,128.502 132.609 C 118.651 121.561,118.030 120.366,119.958 116.200 C 122.024 111.737,127.410 109.841,131.392 112.174 " stroke="none" fill="#ffffff" fill-rule="evenodd"></path></g></svg>';
closeCanvasBtn.href = 'javascript:closeCanvas();';

// Создание надписи
var textOffer = document.createElement("h3");
textOffer.style = 'color: white;text-align: center;font-size: 21px;width: 100%;border-top-style: inset;background-color: rgb(0 0 0 / 80%);position: absolute;top: 45%;padding: 12px 0px;margin: auto;font-family: Montserrat, sans-serif;border-bottom-style: inset;border-width: 3px;';
textOffer.innerHTML = '{{ code.keyWords }}';

// Создание эллемента свайп вверх и анимации
var arrowUp = document.createElement("div");
arrowUp.style = 'display: block;position: fixed;width: 35px;height: 15px;transition: 0.2s;text-align: center;text-decoration: none;bottom: 58px;';
arrowUp.innerHTML = '<svg id="svg" version="1.1" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><g id="svgg"><path id="path0" d="M78.056 328.892 C 78.149 329.045,78.787 329.639,79.474 330.212 C 80.160 330.785,80.645 331.129,80.552 330.976 C 80.459 330.823,79.821 330.229,79.134 329.656 C 78.448 329.083,77.963 328.739,78.056 328.892 M315.650 333.868 C 314.994 334.448,314.518 334.985,314.592 335.062 C 314.665 335.139,315.255 334.664,315.902 334.008 C 317.357 332.531,317.238 332.465,315.650 333.868 " stroke="none" fill="#000000" fill-rule="evenodd"></path><path id="path1" d="M84.223 233.068 C 84.223 233.110,84.574 233.461,85.003 233.848 L 85.783 234.553 85.078 233.773 C 84.421 233.046,84.223 232.883,84.223 233.068 " stroke="none" fill="#5a5a5a" fill-rule="evenodd"></path><path id="path2" d="M200.540 163.097 C 200.837 163.154,201.323 163.154,201.620 163.097 C 201.917 163.040,201.674 162.993,201.080 162.993 C 200.486 162.993,200.243 163.040,200.540 163.097 " stroke="none" fill="#969696" fill-rule="evenodd"></path><path id="path3" d="M95.561 240.117 C 95.792 240.178,96.170 240.178,96.401 240.117 C 96.632 240.057,96.443 240.008,95.981 240.008 C 95.519 240.008,95.330 240.057,95.561 240.117 " stroke="none" fill="#d0d0d0" fill-rule="evenodd"></path><path id="path4" d="M198.680 129.840 C 195.183 130.431,191.759 132.731,180.339 142.156 C 177.181 144.763,174.373 146.982,174.101 147.086 C 173.828 147.190,173.389 147.518,173.125 147.814 C 172.861 148.110,172.246 148.607,171.757 148.917 C 170.663 149.612,167.338 152.218,165.588 153.751 C 164.873 154.377,163.958 155.091,163.554 155.338 C 163.150 155.585,162.007 156.517,161.014 157.408 C 160.021 158.299,158.852 159.209,158.416 159.431 C 157.980 159.652,157.560 159.999,157.482 160.203 C 157.404 160.406,156.682 161.051,155.878 161.636 C 155.074 162.221,153.488 163.552,152.355 164.594 C 150.477 166.320,148.286 168.148,142.891 172.488 C 141.836 173.337,140.486 174.457,139.892 174.977 C 139.298 175.497,138.205 176.372,137.462 176.923 C 136.719 177.474,133.763 179.868,130.892 182.244 C 126.667 185.739,123.163 188.537,118.176 192.396 C 118.044 192.498,117.420 192.935,116.789 193.368 C 116.158 193.801,114.318 195.264,112.700 196.619 C 111.083 197.974,109.440 199.286,109.049 199.534 C 108.658 199.783,107.636 200.595,106.779 201.340 C 105.921 202.085,102.250 205.107,98.620 208.054 C 82.063 221.502,82.909 220.738,82.184 222.914 C 80.362 228.386,84.231 235.084,91.267 238.637 C 96.440 241.249,99.451 240.405,106.840 234.270 C 107.996 233.311,109.778 231.965,110.800 231.280 C 111.821 230.595,114.115 228.829,115.897 227.355 C 120.274 223.734,123.976 220.823,129.694 216.505 C 132.334 214.513,136.437 211.229,138.812 209.209 C 145.603 203.434,153.760 196.721,158.728 192.819 C 163.482 189.085,164.666 188.140,176.485 178.637 C 193.993 164.560,197.869 162.279,202.836 163.131 C 206.157 163.700,206.372 163.850,220.386 175.271 C 225.275 179.255,232.621 185.204,236.713 188.491 C 240.804 191.778,247.822 197.440,252.310 201.074 C 256.797 204.708,262.088 208.917,264.067 210.428 C 268.414 213.747,273.734 218.030,276.185 220.185 C 282.925 226.111,298.377 238.009,300.883 239.202 C 305.925 241.603,312.231 238.852,317.632 231.895 C 318.678 230.547,319.455 227.509,319.339 225.219 C 319.189 222.250,318.121 220.908,312.025 216.030 C 309.271 213.827,306.295 211.425,305.411 210.691 C 304.527 209.958,302.537 208.332,300.988 207.079 C 299.439 205.825,297.076 203.866,295.736 202.726 C 294.396 201.586,292.968 200.481,292.562 200.271 C 292.156 200.061,291.594 199.598,291.314 199.241 C 291.033 198.884,290.403 198.321,289.913 197.990 C 289.423 197.659,288.212 196.723,287.223 195.911 C 286.233 195.099,283.587 192.995,281.344 191.236 C 279.100 189.477,274.091 185.438,270.212 182.261 C 266.333 179.084,262.376 175.891,261.419 175.165 C 260.461 174.439,256.510 171.254,252.639 168.086 C 248.768 164.919,244.061 161.121,242.178 159.647 C 240.296 158.173,238.608 156.823,238.427 156.648 C 238.247 156.472,237.681 156.005,237.170 155.609 C 236.659 155.213,235.265 154.074,234.073 153.078 C 232.881 152.082,231.529 151.005,231.070 150.684 C 230.610 150.364,229.802 149.702,229.274 149.213 C 228.746 148.725,227.811 147.966,227.196 147.528 C 226.580 147.089,225.176 145.966,224.076 145.032 C 221.263 142.643,211.677 134.989,209.250 133.193 C 205.327 130.291,202.088 129.263,198.680 129.840 " stroke="none" fill="#ffffff" fill-rule="evenodd"></path></g></svg>';

// Создание эллемента "Подробнее"
var arrowUpText = document.createElement("div");
arrowUpText.style = 'position: fixed; bottom: 5px; color: white; padding: 15px 25px; font-family: Montserrat, sans-serif;';
arrowUpText.innerHTML = '{{ code.title }}';



const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.id = "swipeCanvas-23e9i2ed";
canvas.style = "background-image: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 45%, rgba(255,255,255,0) 55%), url({{ code.get_absolute_image }}); background-position: center; background-size: cover;";

//Чувствительность — количество пикселей, после которого жест будет считаться свайпом
const sensitivity = 40;

//Получение поля, в котором будут выводиться сообщения
const msgBox = document.getElementById("msg-box");

var touchStart = null; //Точка начала касания
var touchPosition = null; //Текущая позиция

//Перехватываем события
canvas.addEventListener("touchstart", function (e) { TouchStart(e); }); //Начало касания
canvas.addEventListener("touchmove", function (e) { TouchMove(e); }); //Движение пальцем по экрану
//Пользователь отпустил экран
canvas.addEventListener("touchend", function (e) { TouchEnd(e, "green"); });
//Отмена касания
canvas.addEventListener("touchcancel", function (e) { TouchEnd(e, "red"); });

function TouchStart(e) {
    //Получаем текущую позицию касания
    touchStart = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    touchPosition = { x: touchStart.x, y: touchStart.y };

}

function TouchMove(e) {
    //Получаем новую позицию
    touchPosition = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
}

function TouchEnd(e, color) {

    CheckAction(); //Определяем, какой жест совершил пользователь

    //Очищаем позиции
    touchStart = null;
    touchPosition = null;
}

function CheckAction() {
    var d = //Получаем расстояния от начальной до конечной точек по обеим осям
    {
        x: touchStart.x - touchPosition.x,
        y: touchStart.y - touchPosition.y
    };

    var msg = ""; //Сообщение

    if (Math.abs(d.x) > Math.abs(d.y)) //Проверяем, движение по какой оси было длиннее
    {
        if (Math.abs(d.x) > sensitivity) //Проверяем, было ли движение достаточно длинным
        {
            if (d.x > 0) //Если значение больше нуля, значит пользователь двигал пальцем справа налево
            {
                //{% if code.siteUrlLeft %}
                document.location.href = "{{ code.siteUrlLeft }}";
                //{% endif %}

            }
            else //Иначе он двигал им слева направо
            {
                //{% if code.siteUrlRight %}
                document.location.href = "{{ code.siteUrlRight }}";
                //{% endif %}
            }
        }
    }
    else //Аналогичные проверки для вертикальной оси
    {
        if (Math.abs(d.y) > sensitivity) {
            if (d.y > 0) //Свайп вверх
            {
                staticSend('swipeUP');
                goUrlBank();
                // document.location.href = urlSwipe;
            }
            else //Свайп вниз
            {
                //{% if code.siteUrlDown != '' %}
                document.location.href = '{{ code.siteUrlDown }}'
                //{% else %}
                closeCanvas();
                //{% endif %}
            }
        }
    }

    // console.log(msg); //Выводим сообщение

}

function goUrlBank(){
    let div_body = document.createElement("div");
    div_body.style = "width: 100%;height: 100%;background: rgb(225, 225, 225);color: rgb(48, 48, 48);z-index: 100;display: block;position: absolute;text-align: center;font-size: 27px;"
    div.appendChild(div_body);

    let div_title = document.createElement("div");
    div_title.style = "padding-bottom: 18px;";
    div_title.innerHTML = "<img src='http://127.0.0.1:8000/static/home/image/logo.png' style='width: 45%; padding: 12px;'><br>Получи промокод в любом из мессенджеров👇";
    div_body.appendChild(div_title);
    
    
    let div_wa1 = document.createElement("div");
    div_wa1.style = "background: #fc0; box-shadow: 0 0 10px rgba(0,0,0,0.5); padding: 10px; background-color: green; text-align: left; color:white; font-size:16px; padding:15px"
    div_wa1.innerHTML = "Для получения промокода из WhatshApp нужно будет перейти в мессенджер и отправить заготовленный текст сообщения!"
    let div_wa1_url = document.createElement("div");
    div_wa1_url.style = 'text-align: right; font-size: 18px; padding-top: 16px;';
    div_wa1_url.innerHTML = "<a href='wa.me' style='color: white;'>Перейти</a> <span>›</span>";
    div_wa1.appendChild(div_wa1_url);
    
    let div_wa2 = document.createElement("div");
    div_wa2.style = "background: #fc0; box-shadow: 0 0 10px rgba(0,0,0,0.5); padding: 10px; background-color: #0088cc; text-align: left; color:white; font-size:16px; padding:15px"
    div_wa2.innerHTML = "Для получения промокода из Telegram ...."
    let div_wa2_url = document.createElement("div");
    div_wa2_url.style = 'text-align: right; font-size: 18px; padding-top: 16px;';
    div_wa2_url.innerHTML = "<a href='wa.me' style='color: white;'>Перейти</a> <span>›</span>";
    div_wa2.appendChild(div_wa2_url);
    
    let div_wa3 = document.createElement("div");
    div_wa3.style = "background: #fc0; box-shadow: 0 0 10px rgba(0,0,0,0.5); padding: 10px; background-color: #cd486b; text-align: left; color:white; font-size:16px; padding:15px"
    div_wa3.innerHTML = "Для получения промокода из Instagram... "
    let div_wa3_url = document.createElement("div");
    div_wa3_url.style = 'text-align: right; font-size: 18px; padding-top: 16px;';
    div_wa3_url.innerHTML = "<a href='wa.me' style='color: white;'>Перейти</a> <span>›</span>";
    div_wa3.appendChild(div_wa3_url);
    
    let div_wa4 = document.createElement("div");
    div_wa4.style = "background: #fc0; box-shadow: 0 0 10px rgba(0,0,0,0.5); padding: 10px; background-color: #0077ff; text-align: left; color:white; font-size:16px; padding:15px"
    div_wa4.innerHTML = "Для получения промокода из VK..."
    let div_wa4_url = document.createElement("div");
    div_wa4_url.style = 'text-align: right; font-size: 18px; padding-top: 16px;';
    div_wa4_url.innerHTML = "<a href='wa.me' style='color: white;'>Перейти</a> <span>›</span>";
    div_wa4.appendChild(div_wa4_url);
    
    let div_wa5 = document.createElement("div");
    div_wa5.style = "background: #fc0; box-shadow: 0 0 10px rgba(0,0,0,0.5); padding: 10px; background-color: green; text-align: left; color:white; font-size:16px; padding:15px"
    div_wa5.innerHTML = "Для получения промокода из WhatshApp нужно будет перейти в мессенджер и отправить заготовленный текст сообщения!"
    let div_wa5_url = document.createElement("div");
    div_wa5_url.style = 'text-align: right; font-size: 18px; padding-top: 16px;';
    div_wa5_url.innerHTML = "<a href='wa.me' style='color: white;'>Перейти</a> <span>›</span>";
    div_wa5.appendChild(div_wa5_url);

    // {% for item in code.url_links.all %}
    div_body.appendChild(div_wa5);
    div_body.appendChild(div_wa4);
    div_body.appendChild(div_wa3);
    div_body.appendChild(div_wa2);
    div_body.appendChild(div_wa1);

    // {% endfor %}

    

}