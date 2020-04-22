
const maxHits = 10;

let hits = 0;
let missed = 0;
let firstHitTime = 0;
var divSelector = '#slot-11';
var missedFieldId = '#slot-11';
var missedList = [];

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
      $(divSelector).removeClass("target");
      $(divSelector).text('');
      missedList.forEach( element => $(element).removeClass("miss"));
    }

  divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits+1);
  
  if (hits == 0) {
    firstHitTime = getTimestamp();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  } else {
    $(event.target).addClass("miss");
    missedFieldId = "#" + $(event.target).attr("id");
    missedList.push(missedFieldId);
    missed +=1;
    };
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
