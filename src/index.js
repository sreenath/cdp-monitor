const shell = require('electron').shell;
const axios = require('axios');

var currentCup;
var interval;

const updateCup = document.getElementById('updateCup');
const openCDPPageElement = document.getElementById('openCDP');

updateCup.addEventListener('click', function(event) {
  currentCup= document.getElementById('inputCUP').value;
  document.getElementById('cupID').innerHTML = currentCup;
  getData();
  clearInterval(interval);
  interval = setInterval(getData, 30000);
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
          getCup(id: ${currentCup}) { 
            id
            ratio
            art
            ink
            per 
          } 
        }`
      }
    }).then((result) => {
      let outputData = result.data.data.getCup;
      document.getElementById('collateralization-ratio').innerHTML = Number(outputData.ratio).toFixed(4) + '%';
      let liquidationPrice = ((outputData.art * 1.5) / (outputData.ink * outputData.per));
      document.getElementById('liquidation-price').innerHTML = Number(liquidationPrice).toFixed(4);
    });
  }
}
