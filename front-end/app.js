const contractAddress = "0x771c18e8BCa68F53B612469a6D311C557aEF6896";
let pictureContract;
let userAccount = null;
let web3js;

let cachedPictures = []

let gridArr = []
const gridSize = 16
//create base array for pixels
for(let i =0;i<gridSize;i++){
  let temp = []
  for(let i =0;i<gridSize;i++){
    temp.push("#ffffff")
  }
  gridArr.push(temp)
}

$(document).ready(function(){
  createGrid(gridArr)

  $("#button").click(createPicture)

  // Checking if metamask is enabled
  if (typeof window.ethereum !== 'undefined' && typeof web3 !== 'undefined') {

    //set web3 object
    web3js = new Web3(Web3.givenProvider);

    $("#connectWallet").click(async (e)=>{
      if(userAccount == null){
        //prompt user to login to wallet
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        .then((accounts)=>{
          userAccount = accounts[0]
          startApp()
        })
        .catch((err)=>{
          console.log(err)
        })
      }
    })

  } else {
    // Handle the case where the user doesn't have web3.
    alert("Install metamask")
  }

});

function startApp(){
  //show the main container
  $("#initContainer").css("display", "none")
  $("#main").css("display", "block")

  //web3 contract object
  pictureContract = new web3js.eth.Contract(contractAbi,contractAddress);

  window.ethereum.on('accountsChanged', (accounts) => {
    // update account on change
    userAccount = accounts[0]
  })
  


  eventManager()
  getAllPictures()
}

function getPictureCount(addr){
  return pictureContract.methods.getPictureCount(addr).call()
}

async function createPicture(e){
  //sends createPicture transaction with name and pixel string
  let name = $("#pictureName").val()
  let pixels = gridArr.toString()

  $("#txStatus").text(`creating picture '${name}'...`);

  pictureContract.methods.createPicture(pixels, name).send({ from: userAccount})
  .on("receipt", (receipt)=> {
    $("#txStatus").text("picture created.");
  })
  .on("error", (error)=> {
    $("#txStatus").text(error);
  });
  
}

function getAllPictures(){
  //query all PictureCreated events to store
  pictureContract.getPastEvents("PictureCreated", { fromBlock: 0, toBlock: "latest" })
  .then(function(events) {
    let values = []
    for(let obj of events){
      values.push(obj.returnValues)
    }
    cachedPictures = values
    //update list of all pictures
    $("#allPictures").empty()
    for(let i = 0; i < cachedPictures.length;i++){
      appendAllPictures(i)
    }
  });

}

function appendAllPictures(cachedPictureIndex){
  //creates list item from picture
  let li = document.createElement("li");
  li.setAttribute("index", cachedPictureIndex)
  let text = document.createTextNode(cachedPictures[cachedPictureIndex].name)
  li.append(text)
  $("#allPictures").append(li)

  li.addEventListener("click", onPictureClick)
}

function onPictureClick(e){
  //when user clicks a picture from list
  let index = e.target.getAttribute("index")
  let name = cachedPictures[index].name
  let pixels = cachedPictures[index].pixels
  $("#pictureName").val(name)

  gridArr = pixelsToGrid(pixels)
  createGrid(gridArr)
}

function pixelsToGrid(pixels){
  //converts string of pixels to square array
  let p = pixels.split(",")
  let l = Math.sqrt(p.length)
  let arr = []
  for(let i=0;i<l;i++){
    arr.push(p.splice(0,l))
  }
  return arr;
}


function createGrid(array){
  //creates grid of pixels
  $("#canvas").empty()
  for(let i=0;i<array.length;i++){
    let temp = document.createElement("div")
    temp.setAttribute("class", "row")
    for(let x =0;x<array[i].length;x++){
      let item = array[i][x]
      let temp2 = document.createElement("div")
      temp2.setAttribute("class", "pixel")
      temp2.setAttribute("style", `background-color:${item}`)
      temp2.setAttribute("index", i + "-" + x)
      $(temp).append(temp2)

      temp2.addEventListener("click", onPaint)

    }
    $("#canvas").append(temp);
  }
}

function onPaint(event){
  //update pixel colour and array
  let el = event.srcElement
  let colour = document.getElementById("colourPicker").value
  el.setAttribute("style", `background-color:${colour}`)

  let index = el.getAttribute("index").split("-")
  gridArr[index[0]][index[1]] = colour
}

function eventManager(){
  pictureContract.events.PictureCreated()
  .on("data", (event)=>{
    //cache and update list with newly created picture
    cachedPictures.push(event.returnValues)
    appendAllPictures(cachedPictures.length-1)
  })
  .on("error", console.error)
}