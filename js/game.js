
const maxHits = 10;

let hits = 0;
let missed = 0;
let firstHitTime = 0;
var divSelector = '#slot-11';
var missedFieldId = '#slot-11';
var missedList = [];

function getTimestamp() {
  //определим текущее время
  let d = new Date();
  return d.getTime();
}

function randomDivId() {
  // определим случайные координаты целевой ячейки
  let d = Math.floor(Math.random() * 6) + 1;
  let n = Math.floor(Math.random() * 6) + 1;
  return `#slot-${d}${n}`;
}

function round() {

  if (hits >= maxHits) {
    endGame();
  } else {
      // очистим игровое поле от целевой я чейки и промахов прошлого хода
      $(divSelector).removeClass("target");
      $(divSelector).text('');
      missedList.forEach( element => $(element).removeClass("miss")); //очистим все ячейки с промахом
    }

  // назначим новую ячейку целевой
  divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits+1);
  
  if (hits == 0) {
    firstHitTime = getTimestamp(); //запомним время начала игры для вычисления общей продолжительности
  }
}

function startGame() {
  // переформатируем игровое поле, уберем кнопку "старт", добавим новую и игровое поле
  $("#game-board").removeClass("d-none");
  $("#button-reload").removeClass("d-none");
  $("#button-start").addClass("d-none");
}

function endGame() {

  let totalPlayedMillis = getTimestamp() - firstHitTime; // посчитаем длительность игры
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(2);
  $("#total-time-played").text(totalPlayedSeconds); // покажем дилтельность на экране

  let successPercent = Number(hits * 100 / (hits + missed)).toPrecision(2); // посчитаем процент попаданий
  $("#success-percent").text(successPercent); // покажем процент попаданий на экране
  $("#progress-bar").attr("style", "width: " + successPercent + "%"); // закрасим процент попаданий на прогрессбаре

  // переворматируем игровое поле
  $("#win-message").removeClass("d-none");
  $("#game-board").addClass("d-none");
}

function handleClick(event) {
  
  if ($(event.target).hasClass("target")) {
    hits += 1;
    round();
  } else {
      // если промахнулись, то покрасим ячейку в красный и добавим её id в лист, вдруг промхнёмся еще
      $(event.target).addClass("miss");
      missedFieldId = "#" + $(event.target).attr("id");
      missedList.push(missedFieldId);
      missed +=1;
    };
}

function init() {
  round();
  $("#button-start").click(startGame);
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
    startGame();
  });
}

$(document).ready(init);
