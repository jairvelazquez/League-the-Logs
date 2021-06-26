const table = document.getElementById();
const direccionPeticion = ""


window.addEventListener("load",function(){
  const puid = getPuid(sumonerName);
  const matches = getMatches(puid);
  const dataMatches = FilterInformation(getDataFromMatches());
  fillTable(dataMatches)
});

function getPuid(sumonerName){
  fetch(direccionPeticion, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((responseFromAPI) => FilterInformation(responseFromAPI))
    .catch((error) => console.error("Error:", error));
}

function getMatches(puid){
  
}

function FilterInformation(data){
    
}

function fillTable(dataMatches){

}