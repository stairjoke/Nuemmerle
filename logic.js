function randomButton(){
  var buttons = document.querySelectorAll("#b-hook button");
  var active = 0;
  var activeButton = false;
  for(var i = 0; i < buttons.length; i++){
    if(buttons[i].disabled != "disabled"){
      active++;
      activeButton = buttons[i];
    }
  }
  if(active == 1){
    activeButton.click();
  }else{
    var randomNumber = Math.random() * 15.1;
    buttons[parseInt(Math.round(randomNumber))].click();
  }
  
  if(active < 1){
    demoMode(false);
  }
}

var demoID;
function demoMode(enable){
  if(enable == true){
    demoID = window.setInterval(function(){
      randomButton();
    }, 25);
  }else{
    clearInterval(demoID);
  }
}

function initButtons(){
  //#b-hook: Button Template: <button data-left="6">1</button>
  var hook = document.querySelector("#b-hook");

  var start = 1; //don't change
  var end = 15; //don't change

  for(var count = start; count <= end; count++){
    var button = document.createElement("button");
    button.dataset.left = 6;
    button.innerHTML = count;
    button.addEventListener("click", e => buttonClicked(e));
    
    hook.appendChild(button);
  }
  
}
initButtons();

function buttonClicked(event){
  //Button values
  var button = event.target;
  var value = parseInt(button.innerHTML);
  var left = parseInt(button.dataset.left);
  button.dataset.left = --left;
  if(left <= 0) {
    button.disabled = "disabled";
  }
  
  decide(parseInt(button.innerHTML));
  
  return false; //prevent bubble
}

/*
  #p-hook:
  Parking List template:
  
  <li data-last="0" data-f="0" data-count="0">
    <div class="error-score">F-Wert: <span>0</span></div>
    <div class="card-count">K: <span>0</span></div>
    <ul>
    	<li>0</li>
    </ul>
  </li>
*/
function makeParking(){
  console.log("making parking");
  var li = document.createElement("li");
  li.dataset.f = 0;
  li.innerHTML = '<ul></ul>';
  
  return li;
}

function offerToStack(inputCard){
  var stacks = document.querySelectorAll("#f-hook li");
  for(var i = 0; i < stacks.length; i++){
    if(inputCard - 1 == parseInt(stacks[i].innerHTML)){
      stacks[i].innerHTML = inputCard;
      return true;
    }
  }
  return false;
}

function tryToStack(){
  var parking = document.querySelectorAll("#p-hook > li");
  for(var i = 0; i < parking.length; i++){
    var nodeTry = parking[i].querySelector("li:last-child");
    if(offerToStack(parseInt(nodeTry.innerHTML))){
      var pList = nodeTry.parentNode;
      pList.removeChild(nodeTry);
      if(pList.childNodes.length == 0){
        pList.parentNode.parentNode.removeChild(pList.parentNode);
      }
      tryToStack();
      return true;
    }
  }
}

function decide(inputCard){
  document.querySelector("#chain").innerHTML += inputCard + ", ";
  
  if(offerToStack(inputCard)){
    tryToStack();
    return true;
  }
  
  var maxparking = 5;
  var parking = document.querySelectorAll("#p-hook > li");
  var parkingSelected = false;

  if(parking.length == 0) {
    console.log("no parking at all");
    //no parking yet
    parkingSelected = makeParking();
    document.querySelector("#p-hook").appendChild(parkingSelected);
    
  }else{

    //find parking
    
    //try to find parking without error
    //attempt to minimize the difference in between cards
    var minD = 15;
    for(var i = 0; i < parking.length; i++){
      var p = parking[i];
      var pCard = parseInt(p.querySelector("ul > li:last-child").innerHTML);

      if(pCard > inputCard && minD > pCard - inputCard){
        minD = pCard - inputCard;
        parkingSelected = p;
      }

    }
    
    //Try to avoid mistakes by creating new parking – maye not the smartes approach, some mistakes might be good to make intentionally
    //try to make new parking row if possible
    if(!parkingSelected && parking.length < maxparking){
      parkingSelected = makeParking();
      document.querySelector("#p-hook").appendChild(parkingSelected);
    }
    
    //try to find smallest possible error
    if(!parkingSelected) {
      var liMinErr = 15;
      var minErrIndex = -1;
      
      for(var i = 0; i < parking.length; i++){
        var li = parking[i];
        var currentLiErr = Math.abs(parseInt(li.querySelector("ul > li:last-child").innerHTML) - inputCard);
        
        if(currentLiErr < liMinErr){
          liMinErr = currentLiErr;
          minErrIndex = i;
        }
      }
      
      parkingSelected = parking[minErrIndex];
      
      
    }
  }


  var newCard = document.createElement("li");
  newCard.innerHTML = inputCard;
  parkingSelected.querySelector("ul").appendChild(newCard);
}






























