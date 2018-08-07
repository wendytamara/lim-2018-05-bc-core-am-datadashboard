console.log('data.js para todas las funciones que vimos que obtienen y manipulan los datos.')

const btn = document.getElementById('btn');
const container = document.getElementById('container');

btn.addEventListener('click', (event) => {


  event.preventDefault();
  container.innerHTML = ' ';
  getCohorts();

})



function getCohorts() {
  const httpRequest = new XMLHttpRequest();
  httpRequest.open('GET',`https://laboratoria-la-staging.firebaseapp.com/cohorts/`); 
  httpRequest.onload = responseCohorts;
  httpRequest.onerror = handleError;
  httpRequest.send();
}

function handleError() {
  console.log('se ha presentado un error');
}

function responseCohorts() {
  debugger
  const data = JSON.parse(this.responseText);
  console.log(data)
  const select = document.createElement('select');
  container.appendChild(select);

  data.forEach(element => {
    let option = document.createElement('option');
    let value = document.createAttribute('value');
    option.textContent = element.id;   
    value.value = element.id;

    select.appendChild(option);
    option.setAttributeNode(value);



    
  });
}

// window.onload = getCohorts;