'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var PADDING = 30;
var FONT_GAP = 15;
var BAR_HEIGHT = 150;
var BAR_MARGIN = 50;
var BAR_WIDTH = 40;
var TEXT_Y = 260;
var LIGHTNESS_MIN = 9;
var LIGHTNESS_MAX = 90;

function getMaxElement(arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
}

function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

window.renderStatistics = function (ctx, names, times) {

  var maxTime = getMaxElement(times);

  function getX(i) {
    return (CLOUD_X + PADDING) + (BAR_WIDTH + BAR_MARGIN) * i;
  }

  function getRectY(i) {
    return BAR_HEIGHT - (BAR_HEIGHT * times[i] / maxTime) + PADDING * 3;
  }

  function getNumbersY(i) {
    return BAR_HEIGHT - (BAR_HEIGHT * times[i] / maxTime) + PADDING * 2.7;
  }

  function getLightness(min, max) {
    var lightness = Math.random() * (max - min) + min;
    return 'hsl(240, 100% , ' + lightness + '%)';
  }

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = 'black';
  ctx.fillText('Ура, вы победили!', CLOUD_X + PADDING, CLOUD_Y + PADDING);
  ctx.fillText('Список результатов:', CLOUD_X + PADDING, CLOUD_Y + PADDING + FONT_GAP);

  for (var i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'hsl(0, 100%, 50%)';
    } else {
      ctx.fillStyle = getLightness(LIGHTNESS_MIN, LIGHTNESS_MAX);
    }

    ctx.fillRect(getX(i), getRectY(i), BAR_WIDTH, BAR_HEIGHT * times[i] / maxTime);
    ctx.fillStyle = 'hsl(0, 100%, 0%)';
    ctx.fillText(Math.round(times[i]), getX(i), getNumbersY(i));
    ctx.fillText(names[i], getX(i), TEXT_Y);
  }
};
