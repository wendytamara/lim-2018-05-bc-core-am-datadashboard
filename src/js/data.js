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
  select.addEventListener('change', showEstudents)

  function showEstudents() {
    let optionSelected = select.value;
    console.log(optionSelected);
    let cohortsDefault = 'cdmx-2017-10-bc-core-pm';
    const http = new XMLHttpRequest();
    http.open('GET', `https://laboratoria-la-staging.firebaseapp.com/cohorts/`+ optionSelected + `/users`);
    http.onload = responseEstudents;
    http.onerror = handleError;
    http.send();
  }

  function responseEstudents() {
    const data = JSON.parse(this.responseText);
    console.log(data)

    data.forEach(element => {
      
      let div = document.createElement("div");
      // div.innerHTML = '';
      let h5 = document.createElement("h5");
      let p = document.createElement('p');

      container.appendChild(div);
      h5.textContent = element.name;
      p.textContent = element.role;
      div.appendChild(h5);
      div.appendChild(p);


      
    })
  }

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