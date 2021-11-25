// Кнопка копировать для кода
$(function () {
  $(".readyСodeCopyBtn").on("click", function () {
    var $temp = $("<textarea>");
    $("body").append($temp);
    $temp.val($('#readyСodeCopy').text()).select();
    document.execCommand("copy");
    $temp.remove();
    $(this).text('Текст скопирован');
    setTimeout(() => { $(this).text('Копировать'); }, 2000);
  });
});


// Выбор картинки на 2 шаге
function step2imgInstClick(el) {
  let st = document.querySelectorAll('.step2imgSelect');
  for (var i = 0; i < st.length; i++) {
    st[i].classList.remove('step2imgSelect');
  }
  let imUrl = document.getElementById('imageUrl');
  el.classList.toggle('step2imgSelect');
  imUrl.setAttribute('value', el.getAttribute('src'));
};

// Следующий шаг
let stepCount = 1;
function StepFunc(value) {
  console.log('stepCount: ' + stepCount + ' value: ' + value);
  stepArr = [
    document.getElementById('progressWidget'),
    document.getElementById('step1_domainInput'),
    document.getElementById('step2_imgGenerator'),
    document.getElementById('step3_offerInput'),
    document.getElementById('step5_messengerSelected'),
    document.getElementById('step6_workTest'),
    document.getElementById('step7_workCode'),
    document.getElementById('step8_Finish'),
  ];
  let elInput = stepArr[stepCount].querySelector('.form-control-lg');
  if (elInput.value != '' & elInput.value != ' ' || value == 'back') {
    if (value == 'next'){
      if (stepCount == 2){
        sendQuestFormWidget(stepCount,document.getElementById('imageUrl').value);
      } else if (stepCount == 4){
        sendQuestFormWidget(stepCount, msgUrlGenerator());
      } else {
        sendQuestFormWidget(stepCount, elInput.value);  // Вызываем функцию для отправки результатов на сервер
      }
    stepCount++;
    } else { 
      stepCount--;
    }

    if (stepCount > 1) {
      document.getElementById('backStepWidget').removeAttribute("disabled");
    } else { document.getElementById('backStepWidget').setAttribute("disabled", "true"); };
    if (stepCount < 8) {
      document.getElementById('nextStepWidget').removeAttribute("disabled");
    } else { document.getElementById('nextStepWidget').setAttribute("disabled", "true"); };
    if (stepCount == 7) {
      document.getElementById('backStepWidget').setAttribute("disabled", "true");
      document.getElementById('nextStepWidget').setAttribute('onclick', 'sendToLKUser();');
      document.getElementById('nextStepWidget').innerHTML = 'Перейти в личный кабинет';
      
    };

    // Удаление класса не валидности поля инпута
    if (stepArr[stepCount - 1].querySelector('.is-invalid')) {
      stepArr[stepCount - 1].querySelector('.is-invalid').classList.remove('is-invalid');
      stepArr[stepCount - 1].querySelector('.invalid-feedback').style.display = 'none';;
    }

    // Переход между шагами
    for (let i = 1; i < stepArr.length; i++) {
      if (!stepArr[i].classList.contains('d-none')) { stepArr[i].classList.add('d-none'); }
    }
    stepArr[stepCount].classList.remove('d-none');

    // Установка прогресс бара
    stepArr[0].setAttribute("aria-valuenow", stepCount * 14);
    stepArr[0].style.width = stepCount * 12 + '%';
    stepArr[0].innerHTML = stepCount + ' / 8'

  } else {
    // Добавление ошибки, если поле не заполнено
    elInput.classList.add('is-invalid')
    let elInputError = stepArr[stepCount].querySelector('.invalid-feedback');
    elInputError.style.display = 'block';
  }
}