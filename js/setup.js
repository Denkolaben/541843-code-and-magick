'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var wizardsNumbers = 4;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

function getRandomIndex(array) {
  var randomI = Math.floor(Math.random() * (array.length - 1));
  return array[randomI];
}

function getRandomWizard(wizardName, wizardSurname, coatColor, eyeColor) {
  var wizard = {};

  var randomName = getRandomIndex(wizardName);
  var randomSurname = getRandomIndex(wizardSurname);
  var randomCoatColor = getRandomIndex(coatColor);
  var randomEyeColor = getRandomIndex(eyeColor);

  wizard.name = randomName;
  wizard.surname = randomSurname;
  wizard.coatColor = randomCoatColor;
  wizard.eyeColor = randomEyeColor;

  return wizard;
}

var wizardsArray = [];
for (var i = 0; i < wizardsNumbers; i++) {
  wizardsArray[i] = getRandomWizard(WIZARD_NAMES, WIZARD_SURNAMES, COAT_COLORS, EYES_COLORS);
}

function renderWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
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
