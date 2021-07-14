
const port=4000;

function fetchGetRequest(request){
  return fetch(`http://localhost:${port}/${request}`)
  .then(res=>res.json())
  .then(data=>data);
}

module.exports={fetchGetRequest}