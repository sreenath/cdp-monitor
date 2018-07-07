const shell = require('electron').shell;
const axios = require('axios');

var currentCup;

const updateCup = document.getElementById('updateCup');
const openCDPPageElement = document.getElementById('openCDP');

updateCup.addEventListener('click', function(event) {
  currentCup= document.getElementById('inputCUP').value;
  document.getElementById('cupID').innerHTML = currentCup;
  getData();
})

openCDPPageElement.addEventListener('click', function() {
  currentCup= document.getElementById('inputCUP').value;
  let CDPLink = `https://mkr.tools/cdp/${currentCup}`;
  shell.openExternal(CDPLink);
})

function getData() {
  if (currentCup != undefined) {
    console.log(currentCup);
    axios({
      url: 'https://graphql.makerdao.com/v1',
      method: 'post',
      data: {
        query: `query 
        { 
          getCup(id: 2442) { 
            id
            ratio
            art
            ink
            per 
          } 
        }`
      }
    }).then((result) => {
      outputData = result.data.data
      console.log(outputData.getCup.ink)
    });
  }
}
