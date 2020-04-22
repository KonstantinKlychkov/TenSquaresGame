
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
divSelector = '#slot-11';

function getTimestamp() {
  let d = new Date();
  return d.getTime();
}

function randomDivId() {
  let d = Math.floor(Math.random() * 6) + 1;
  let n = Math.floor(Math.random() * 6) + 1;
  return `#slot-${d}${n}`;
}

function round() {
  if (hits >= maxHits) {
    endGame();
  } else {
    if ($(divSelector).hasClass("target")) {
      $(divSelector).removeClass("target");
      $(divSelector).text('');
    } else if ($(divSelector).hasClass("miss")) {
      $(divSelector).removeClass("miss");
      $(divSelector).text('');
  }
    divSelector = randomDivId();
    $(divSelector).addClass("target");
    $(divSelector).text(hits+1);
    // TODO: помечать target текущим номером

    // FIXME: тут надо определять при первом клике firstHitTime
  };
}

function endGame() {
  // FIXME: спрятать игровое поле сначала

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
