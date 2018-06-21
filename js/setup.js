'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var wizardsNumbers = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var FIREBALLS_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var wizardCoatInput = setup.querySelector('.setup-wizard-appearance input[name=coat-color]');
var wizardEye = setup.querySelector('.setup-wizard .wizard-eyes');
var wizardEyeInput = setup.querySelector('.setup-wizard-appearance input[name=eyes-color]');
var fireBallWrap = setup.querySelector('.setup-fireball-wrap');
var fireBallInput = fireBallWrap.querySelector('input');

function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
}

function openPopup() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  userNameInput.addEventListener('keydown', onEscStopPropagation); // Если выбран ввод имени остановить всплытие при нажатие esq

}

function closePopup() {
  setup.classList.add('hidden');
}

// Остановка всплытия нажатия esq
function onEscStopPropagation(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
}

wizardCoat.addEventListener('click', function () {
  var wizardCoatColor = getRandomIndex(COAT_COLORS);
  wizardCoat.style.fill = wizardCoatColor;
  wizardCoatInput.value = wizardCoatColor;
});

wizardEye.addEventListener('click', function () {
  var wiardEyeColor = getRandomIndex(EYES_COLORS);
  wizardEye.style.fill = wiardEyeColor;
  wizardEyeInput.value = wiardEyeColor;
});

fireBallWrap.addEventListener('click', function () {
  var fireBallColor = getRandomIndex(FIREBALLS_COLORS);
  fireBallWrap .style.backgroundColor = fireBallColor;
  fireBallInput.value = fireBallColor;
});

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательно поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

var similarListElement = document.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

function getRandomIndex(array) {
  var randomI = Math.floor(Math.random() * (array.length - 1));
  return array[randomI];
}

function getRandomWizard(name, surname, coatColor, eyesColor) {
  var wizard = {};

  wizard.name = getRandomIndex(name) + ' ' + getRandomIndex(surname);
  wizard.coatColor = getRandomIndex(coatColor);
  wizard.eyeColor = getRandomIndex(eyesColor);

  coatColor.splice(coatColor.indexOf(wizard.coatColor), 1);
  eyesColor.splice(eyesColor.indexOf(wizard.eyeColor), 1);

  return wizard;
}

var wizardsArray = [];
var copyNames = WIZARD_NAMES.slice();
var copySurnames = WIZARD_SURNAMES.slice();
var copyCoatColor = COAT_COLORS.slice();
var copyEyeColor = EYES_COLORS.slice();
for (var i = 0; i < wizardsNumbers; i++) {
  wizardsArray[i] = getRandomWizard(copyNames, copySurnames, copyCoatColor, copyEyeColor);
}

function renderWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

  return wizardElement;
}

var fragment = document.createDocumentFragment();
for (var j = 0; j < wizardsNumbers; j++) {
  fragment.appendChild(renderWizard(wizardsArray[j]));
}

similarListElement.appendChild(fragment);

document.querySelector('.setup-similar').classList.remove('hidden');
