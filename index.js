
let submitButton=document.querySelector(".login");

// localStorage.clear();
submitButton.addEventListener('click', (event) => {
  event.preventDefault();

  let email=(document.getElementById('staticEmail')).value;
  let password=(document.querySelector('.password')).value;


  if (localStorage.getItem('email') && localStorage.getItem('email')==email) {
    document.querySelector("#user").textContent=`Bienvenido, ${localStorage.getItem('email')}!`;
  } else {
    document.querySelector("#user").textContent="Usuario desconocido, te gustaría crear una cuenta?";
  }  
  console.log(localStorage.getItem('email'), localStorage.getItem('password'))

});

// localStorage.setItem('email', email);
// localStorage.setItem('password', password)


console.log(localStorage.getItem('email'))
console.log(localStorage);
 