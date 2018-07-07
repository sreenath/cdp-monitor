require('isomorphic-fetch');

var currentCup;

const updateCup = document.getElementById('updateCup');

updateCup.addEventListener('click', function(event) {
  currentCup= document.getElementById('cupID').value;
  getData();
})

function getData() {
  if (currentCup != undefined) {
    fetch("http://graphql.makerdao.com/v1", {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/graphql'
     },
      body: JSON.stringify({ query: `{
        getCup(id: 2442) {
          id
          pip
          ratio
        }
      }` }),
    })
    .then(err => document.getElementById('cup-id').innerHTML=err)
    .then(
      res => {
        console.log(res);
        console.dir(res);
        document.getElementById('cup-id').innerHTML=res;
      }
    );
  }
}
