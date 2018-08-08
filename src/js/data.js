console.log('data.js para todas las funciones que vimos que obtienen y manipulan los datos.')
// ES EL MODELO  EN MVC // logica del proyecto 

// variables a utilizar
const container = document.getElementById('container');
const containerEstudents = document.getElementById('containerEstudents');
const usersWitchStats = [];
let select;
let optionSelected;
let httpRequest;
let dataCohorts;
let dataStudents;
let dataProgress;


// solicitud para obtener los cohorts del api de laboratori
function getCohorts() {
  container.innerHTML = ' ';
  httpRequest = new XMLHttpRequest();
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
  dataCohorts = JSON.parse(this.responseText);
  console.log(dataCohorts);
  select = document.createElement('select');
  container.appendChild(select);

  // recorriendo los datos del json y creando el select dinamicamente
  dataCohorts.forEach(element => {
    let option = document.createElement('option');
    let value = document.createAttribute('value');
    option.textContent = element.id;   
    value.value = element.id;
    select.appendChild(option);
    option.setAttributeNode(value);  
  });
  
  // solicitud para obtener a las estudiantes del cohort
   select.addEventListener('change', showEstudents);

   function showEstudents() {
    optionSelected = select.value;
    console.log(optionSelected);
    const http = new XMLHttpRequest();
    http.open('GET', `https://laboratoria-la-staging.firebaseapp.com/cohorts/${optionSelected}/users`);
    http.onload = responseEstudents;
    http.onerror = handleError;
    http.send();

    const xml = new XMLHttpRequest();
    xml.open('GET', `https://laboratoria-la-staging.firebaseapp.com/cohorts/${optionSelected}/progress`);
    xml.onload = responseProgress;
    xml.onerror = handleError;
    xml.send();
  }

  //json con las estudiantes del cohort
  function responseEstudents() {
    dataStudents = JSON.parse(this.responseText);

    containerEstudents.innerHTML = '';
    dataStudents.forEach(element => {     
      let div = document.createElement("div");   
      let h5 = document.createElement("h5");
      let p = document.createElement('p');
      containerEstudents.appendChild(div);
      h5.textContent = element.name;
      p.textContent = element.role;
      div.appendChild(h5);
      div.appendChild(p); 
      
      usersWitchStats.push(
        {'student':
          { id: element.id,
          name: element.name,
          rol: element.role }
        }   
      );
      
  console.log(usersWitchStats);
    })
  }

  function responseProgress() {
    
    dataProgress = JSON.parse(this.responseText);
    console.log(dataProgress);
    
    // for ( let i in dataProgress) {  
    //   var courses = dataProgress[i];
    //   var totalCoursos = Object.keys(dataProgress[i]).length;
    //   var point = 0;
      // for (j = 0; j < totalCoursos; j++){
      //   // var porcentaje =  courses.totalUnits;

      var arreglo = {};
     
      arreglo = ([ 
        {'stats':
        {percent: '100%'}},
        {'exercises':
        {total: '5', completed: 'asd', percent: '30%'}},
        {'reads':
        {total: '8', completed: '7', percent: '100%'}},
        {'quizes':
        {total: '7', completed: '8', percent:'10%', scoreSum: '876', scoreAvg: '34'}}
         ] 
        );

      // }   
      // for (let p = 0; p < usersWitchStats.length; p++) {       
        // const element = array[index];
        // console.log(usersWitchStats[p]);
        // usersWitchStats[p] += ({hola: 'hello'});
        // console.log(usersWitchStats);
        
      // }
    // }

  
   

 




  }

 

 
    

 

  
}


window.onload = getCohorts;