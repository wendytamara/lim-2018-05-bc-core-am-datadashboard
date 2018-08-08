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
let percentGeneral;

let percentageTotal = document.createElement('p')


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
  select = document.getElementById('first-select');
  // container.appendChild(select);

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


      let porcentajes = document.createElement('div');
      
      let percentageLectures = document.createElement('p')
      let percentageExercises = document.createElement('p')
      let percentageQuizzes = document.createElement('p')
      porcentajes.appendChild(percentageTotal)
      porcentajes.appendChild(percentageLectures)
      porcentajes.appendChild(percentageExercises)
      porcentajes.appendChild(percentageQuizzes)

      percentageTotal.textContent =  percentGeneral + '% Completitud cursos: '/*+element.name*/
      percentageLectures.textContent = '% Lecturas completadas: '
      percentageExercises.textContent = '% Ejercicios completados: '
      percentageQuizzes.textContent = '% Quizzes completados: '

      div.setAttribute('class', 'each-student') 

      containerEstudents.appendChild(div);
      h5.textContent = element.name;
      p.textContent = element.role;
      div.appendChild(h5);

      div.appendChild(p);   
      div.appendChild(porcentajes)      


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

  
  var prueba = {
    stats: { 
      user: {name: 'Roxana Cardenas', role: 'studiante'},
      percent: 100,
      exercises: {total: 9, completed: 0, percent: 40},
      reads: {total: 4, completed: 9, percent: 78},
      quizes: {total: 78, completed: 67, percent: 78, scoreSum: 89, scoreAvg: 56 }
    }       
  };



  function responseProgress() {
    
    dataProgress = JSON.parse(this.responseText);
    console.log(dataProgress);
    var contador;
    var totalCoursos;
  
    
    var reads = 0;
    var readsCompleted = 0; 
    

    debugger
    
    for ( let i in dataProgress) {  
      var courses = dataProgress[i];
       totalCoursos = Object.keys(dataProgress[i]).length;
       contador = 0;
      var propertiesCourses = Object.keys(dataProgress[i]);
      
      reads += totalReads;
      readsCompleted += totalCompletedRead;

      var totalReads = 0;
      var totalCompletedRead = 0;

      

      for (j = 0; j < propertiesCourses.length; j++){
        // var porcentaje =  courses.propertiesCourses.percent;
        contador += courses[propertiesCourses[j]].percent; 
        var unidades  = courses[propertiesCourses[j]].units;

        console.log(contador);   
      
        for (let h = 0; h < unidades.length; h++) {
          console.log(unidades);
    
          const partesUnidad = unidades[h].parts;
          var propertiesParts = Object.keys(partesUnidad);
          var readCompleted = partesUnidad[propertiesParts[h]].completed;
          var unidadesType = partesUnidad[propertiesParts[h]].type;

         

          if (unidadesType == 'read') {
            totalReads += 1;  
          }
          
          if(readCompleted == 1) {
            totalCompletedRead += 1;

          }               
        }



      } 

  

      percentGeneral = contador/totalCoursos;
      percentageTotal.textContent = percentGeneral;


      f

 



      // for (let p = 0; p < usersWitchStats.length; p++) {       
        // const element = array[index];
        // console.log(usersWitchStats[p]);
        // usersWitchStats[p] += ({hola: 'hello'});
        // console.log(usersWitchStats);
       
      // }
    }
  } 
}


window.onload = getCohorts;