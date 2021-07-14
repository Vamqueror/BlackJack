/*
function fetchDraw(){
    return fetch('http://localhost:4000/Draw')
    .then(res=>res.json())
    .then(data=>data)
  }
  
function fetchDrawInit(){
    return fetch('http://localhost:4000/DrawInit')
    .then(res=>res.json())
    .then(data=>data)
  }

function fetchDealerCards(){
    return fetch('http://localhost:4000/DealerCards')
    .then(res=>res.json())
    .then(data=>data)
  }

function fetchReset(){
    return fetch('http://localhost:4000/Reset')
    .then(res=>res.json())
    .then(data=>data)
}

function fetchLength(){
  return fetch('http://localhost:4000/DeckLength')
  .then(res=>res.json())
  .then(data=>data)
}

function fetchDealerTurn(){
  return fetch('http://localhost:4000/DealerPlay')
  .then(res=>res.json())
  .then(data=>data)
}
*/

const port=4000;



function fetchGetRequest(request){
  return fetch(`http://localhost:${port}/${request}`)
  .then(res=>res.json())
  .then(data=>data);
}

/*
 async function getFetchedValue(req){
  const response= await  fetch(`http://localhost:${port}/${req}`);
  const jsonValue=response.json();
  return jsonValue;
}
*/

/*
async function getFetchedValue(req){
  let returnedVal=await fetchGetRequest(req)
  return returnedVal
}
*/
module.exports={fetchGetRequest}