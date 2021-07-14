/*
import {fetchGetRequest} from './ServerRequestFunctions.js'

function getFetchedValue(req){
  let val;
  fetchGetRequest(req)
  .then(obj=>{
    val=obj;
  })
  return val;
}
*/
function calcScore(cardsArray) {
  let score = 0

  if (cardsArray === null || cardsArray === undefined)
    return score;
  cardsArray.forEach(element => {
    switch (element.value) {
      case 'jack':
      case 'queen':
      case 'king':
        score += 10
        break
      case 'ace':
        score += 11
        break
      default:
        score += element.value
        break
    }
  });
  return score;
}

function isOver21(hand)//check if a given hand is over 21
{
  return calcScore(hand) > 21;
}

function updateStatus(status, dealerCards) {
  return status != null ? calcScore(dealerCards) : "???"
}

module.exports = { calcScore, isOver21, updateStatus }
