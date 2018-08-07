const user = document.getElementById('user');
const password = document.getElementById('password');
const btnlogIn = document.getElementById('btnlogIn');

btnlogIn.addEventListener('click', (event) => {  
  firebase.auth().signInWithEmailAndPassword(user.value, password.value)
  .then(() => {
    if(user.value === 'wendy@gmail.com' && password.value === '123456') {
      
      console.log(user);
      event.preventDefault();
      location.href = '../views/dashboard.html';
    }
  })
  .catch((error) => {
   
    console.log(user.value);
    console.log(password.value);
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    alert(errorMessage);
  });
});

function observer() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    } else {
      console.log('no existe usuario activo');
    }
  });
}
observer();
 

