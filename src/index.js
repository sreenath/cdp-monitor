require('isomorphic-fetch');
const shell = require('electron').shell;

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
    fetch('https://graphql.makerdao.com/v1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/graphql', 'cross-origin': 'anonymous' },
      body: JSON.stringify({ query: 'query { getCup(id: 2442) { id } }' }),
    })
    .then(err => console.error(err))
    .then(
      res => {
        console.log(res);
        console.dir(res);
      }
    );
  }
}
