console.log('data.js para todas las funciones que vimos que obtienen y manipulan los datos.')
// ES EL MODELO  EN MVC // logica del proyecto 


// variables a utilizar
const container = document.getElementById('container');
const containerEstudents = document.getElementById('containerEstudents');
let select;
let optionSelected;

// solicitud para obtener los cohorts del api de laboratori
function getCohorts() {
  container.innerHTML = ' ';
  const httpRequest = new XMLHttpRequest();
  httpRequest.open('GET',`https://laboratoria-la-staging.firebaseapp.com/cohorts/`); 
  httpRequest.onload = responseCohorts;
  httpRequest.onerror = handleError;
  httpRequest.send();
}

//  detecta el error en el envio de la peticion
function handleError() {
  console.log('se ha presentado un error');
}

// obteniendo el json de los cohorts
function responseCohorts() { 
  const data = JSON.parse(this.responseText);
  console.log(data)
  select = document.createElement('select');
  container.appendChild(select);
  select.addEventListener('change', showEstudents)

  // recorriendo los datos del json y creando el select dinamicamente
  data.forEach(element => {
    let option = document.createElement('option');
    let value = document.createAttribute('value');
    option.textContent = element.id;   
    value.value = element.id;
    select.appendChild(option);
    option.setAttributeNode(value);  
  });

  // solicitud para obtener a las estudiantes del cohort
  function showEstudents() {
    optionSelected = select.value;
    console.log(optionSelected);
    const http = new XMLHttpRequest();
    http.open('GET', `https://laboratoria-la-staging.firebaseapp.com/cohorts/`+ optionSelected + `/users`);
    http.onload = responseEstudents;
    http.onerror = handleError;
    http.send();
  }

  //json con las estudiantes del cohort
  function responseEstudents() {
    const data = JSON.parse(this.responseText);
    console.log(data);
    containerEstudents.innerHTML = '';
    data.forEach(element => {     
      let div = document.createElement("div");   
      let h5 = document.createElement("h5");
      let p = document.createElement('p');
      containerEstudents.appendChild(div);
      h5.textContent = element.name;
      p.textContent = element.role;
      div.appendChild(h5);
      div.appendChild(p);     
    })
  }
}

window.onload = getCohorts;