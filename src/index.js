const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const shell = electron.shell
const axios = require('axios')
const ipc = electron.ipcRenderer

const notifyBtn = document.getElementById('notifyBtn')
var targetPrice = document.getElementById('targetPrice')

notifyBtn.addEventListener('click', function(event) {
  const modalPath = path.join('file://', __dirname, 'add_alert.html')
  let win = new BrowserWindow({ frame: false, transparent: true, alwaysOnTop: true, width: 400, height: 200 })
  win.on('close', function() {
    win = null
  })
  win.loadURL(modalPath)
  win.show()
})

var currentCup;
var interval;

const updateCup = document.getElementById('updateCup');
const openCDPPageElement = document.getElementById('openCDP');

updateCup.addEventListener('click', function(event) {
  currentCup= document.getElementById('inputCUP').value;
  getData();
  clearInterval(interval);
  interval = setInterval(getData, 30000);
})

openCDPPageElement.addEventListener('click', function() {
  currentCup= document.getElementById('inputCUP').value;
  let CDPLink = `https://mkr.tools/cdp/${currentCup}`;
  shell.openExternal(CDPLink);
})

var targetPriceVal

const notification = {
  title: 'CDP Price Alert',
  body: 'Liquidation price just beat your target price!',
  icon: path.join(__dirname, '../assets/images/mkr.png')
}

function getData() {
  if (currentCup != undefined) {
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
      document.getElementById('cupID').innerHTML = Number(outputData.id);
      document.getElementById('collateralization-ratio').innerHTML = Number(outputData.ratio).toFixed(4) + '%';
      let liquidationPrice = Number((outputData.art * 1.5) / (outputData.ink * outputData.per)).toFixed(4);
      document.getElementById('liquidation-price').innerHTML = liquidationPrice;
      document.getElementById('price').innerHTML = liquidationPrice;

      if (targetPrice.innerHTML != '' && targetPriceVal < liquidationPrice) {
        const myNotification = new window.Notification(notification.title, notification);
      }
    });
  }
}

ipc.on('targetPriceVal', function(event, arg) {
  targetPriceVal = Number(arg)
  targetPrice.innerHTML = targetPriceVal
})