
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

sessionStorage.clear();
sessionStorage.setItem("cart", "[]");

let puppies = [
  
    { id: 0, name: "Mondongo", age: 2, size: "pequeño", pic: "http://place-puppy.com/200x200", description: "Este pequeño animalito va a llenar tu vida de luz y amor y multiplicar por mil el cariño que le des" },
    { id: 1, name: "Waffles", age: 6, size: "mediano", pic: "http://place-puppy.com/201x201", description: "Juguetón y exquisito como su nombre, nunca te vas a aburrir con esta bola de pelos a tu lado" },
    { id: 2, name: "Godines", age: 5, size: "muy grande", pic: "http://place-puppy.com/202x202", description: "Este cachorrón sería una compañía ideal para un amigo humano con un gran jardín" },
    { id: 3, name: "Alanis", age: 1, size: "pequeño", pic: "http://place-puppy.com/203x203", description: "Si te gustan los cachorros que no llegan a subirse a la cama, este es el amigo para vos." },
    { id: 4, name: "Risotto", age: 7, size: "mediano", pic: "http://place-puppy.com/199x200", description: "La clase de animal que va a hacer que cualquier concepto de espacio personal desaparezca." },
    { id: 5, name: "Falcor", age: 4, size: "grande", pic: "http://place-puppy.com/200x198", description: "Un compañero ideal para los amigos humanos amantes de las aventuras y el aire libre" },
    { id: 6, name: "Goliat", age: 3, size: "muy pequeño", pic: "http://place-puppy.com/198x200", description: "NO dejes que su nombre te engañe. Es una de las critaturas más dulces." },
    { id: 7, name: "Bermuda", age: 10, size: "mediano", pic: "http://place-puppy.com/201x200", description: "Como su nombre lo anticipa, es una princesa relajada y le encanta sentarse al sol a descansar." }
];

window.addEventListener('load', cardRender);

/*capturo el listado de puppies */
let cardDeck=document.querySelector(".card-deck");

/* armo lista de botones de agregar a la cucha */
let buyButtons=[];

/* capturo la lista de pupppies facturados */
let billList = document.querySelector('.billed-puppies');

let cart=JSON.parse(sessionStorage.getItem('cart'));

/* funcion que renderiza las tarjetas del listado */
function cardRender() {

  /* reinicializo los botones para que queden adecuados a las tarjetas nuevamente renderizadas */
  buyButtons=[];

  puppies.forEach((puppy, i) => {
    let parentCard=document.createElement("div");
    parentCard.classList.add("col", "mb-4", "puppy-card");
    parentCard.setAttribute("id", puppy.id);

    let card=document.createElement("div");
    card.setAttribute("class", "card");

    let pic=document.createElement("img");
    pic.setAttribute("class", "card-img-top");
    pic.setAttribute("src", puppy.pic);

    let cardBody=document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    let cardTitle=document.createElement("h5");
    cardTitle.setAttribute("class", "card-title");
    cardTitle.textContent=puppy.name;

    let cardText=document.createElement("p");
    cardText.setAttribute("class", "card-text");
    cardText.textContent=puppy.description;

    let ageLi = document.createElement('li');
    let sizeLi = document.createElement('li');
    ageLi.classList.add("list-group-item");
    sizeLi.classList.add("list-group-item");

    ageLi.textContent=`${puppy.name} tiene ${puppy.age} años`;
    sizeLi.textContent=`${puppy.name} es de tamaño ${puppy.size}`;



    let buyButton=document.createElement("input");
    buyButton.classList.add("submit", "btn", "btn-danger", "text-center", "buyButton");
    buyButton.setAttribute("type", "submit");
    buyButton.setAttribute("id", `id-${puppy.id}`);
    buyButton.setAttribute("value", "Agregar a la cucha");

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(ageLi);
    cardBody.appendChild(sizeLi);

    card.appendChild(pic);
    card.appendChild(cardBody);
    card.appendChild(buyButton);

    parentCard.appendChild(card);

    cardDeck.appendChild(parentCard);

    buyButtons.push(buyButton);
  });


  let puppyCart = document.querySelector('.chosen-puppies');

  buyButtons.forEach((buyButton, i) => {

    buyButton.addEventListener('click', function() {

    let puppyItem=puppies.find(puppy => `id-${puppy.id}` == this.id);
    let puppyItemLi = document.createElement('li');

    cart=JSON.parse(sessionStorage.getItem('cart'));

    if (!cart.includes(puppyItem.id))
    {

      puppyItemLi.classList.add("list-group-item", "cart-item")

      puppyItemLi.textContent= puppyItem.name;
      puppyItemLi.id= puppyItem.id;

      puppyItemLi.setAttribute("data-toggle", "tooltip");
      puppyItemLi.setAttribute("data-placement", "bottom");
      puppyItemLi.setAttribute("title", "Remover de la cucha");
      // puppyItemLi.tooltip();

      puppyCart.appendChild(puppyItemLi);

      $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
  
      if(cart.find(item => item==puppyItem.id)==undefined)
        cart.push(puppyItem.id);
  
      sessionStorage.setItem("cart", JSON.stringify(cart));

      noPuppies=document.querySelector("#no-puppies")

      if(noPuppies)
        noPuppies.remove();

      event.preventDefault();

    }

    puppyItemLi.addEventListener("click", function() {
      let puppyIndex=cart.findIndex(x => x==(puppyItemLi.id));
      $(this).tooltip('hide'); 
      
      cart.splice(puppyIndex, 1);
      alert(`${puppyItem.name} fue removido de la cucha con éxito`);
      sessionStorage.setItem("cart", JSON.stringify(cart));
      console.log(sessionStorage);
      puppyCart.removeChild(puppyItemLi);
    });

  });

  });

}

let trendingPuppies=puppies.filter(puppy => puppy.id==1 || puppy.id==5 || puppy.id==6);
let carousel=document.querySelector('.carousel-inner');

trendingPuppies.forEach(puppy => {
  let trendingDiv=document.createElement('div');
  trendingDiv.classList.add("carousel-item");
  if(trendingPuppies.indexOf(puppy)==0)
    trendingDiv.classList.add("active");

  let trendingImg=document.createElement('img');
  trendingImg.classList.add("d-block", "w-100");
  trendingImg.setAttribute("src", puppy.pic)

  let captionDiv=document.createElement('div');
  captionDiv.classList.add("carousel-caption", "d-md-block")

  let caption=document.createElement('h3');
  caption.textContent=puppy.name

  captionDiv.appendChild(caption);
  trendingDiv.appendChild(trendingImg);
  trendingDiv.appendChild(captionDiv);

  carousel.appendChild(trendingDiv);
});


document.querySelector(".ordenar-edad").addEventListener("click", (e) => {
  e.preventDefault();
  puppies.sort(function(a, b) {
    return a.age - b.age;
  });

  while (cardDeck.firstChild) {
    cardDeck.removeChild(cardDeck.firstChild);
  }
  cardRender();

});


document.querySelector(".ordenar-nombre").addEventListener("click", (e) => {
  e.preventDefault();
  puppies=puppies.sort(function(a, b) {
      if ( a.name < b.name ){
        return -1;
      }
      if ( a.name > b.name ){
        return 1;
      }
      return 0;
  });
  cardDeck.innerHTML="";
  cardRender();
});

document.querySelector(".ordenar-size").addEventListener("click", (e) => {
  e.preventDefault();

  let tiny=puppies.filter(puppy => puppy.size=="muy pequeño")
  let small=puppies.filter(puppy => puppy.size=="pequeño")
  let medium=puppies.filter(puppy => puppy.size=="mediano")
  let large=puppies.filter(puppy => puppy.size=="grande")
  let veryLarge=puppies.filter(puppy => puppy.size=="muy grande")

  puppies=[...tiny, ...small, ...medium, ...large, ...veryLarge]
  cardDeck.innerHTML="";
  cardRender();
});


document.querySelector(".finish-process").addEventListener('click', function(e) {

  if (!this.hasAttribute("data-target"))
    this.setAttribute("data-target", "#exampleModal")

  let bill=[];
  console.log(sessionStorage);
  (JSON.parse(sessionStorage.getItem('cart'))).map(item => {
    bill.push(puppies.find(puppy => puppy.id == item));
  });

  if(bill.length==0)
  {
    alert("cucha vacia");
    this.removeAttribute("data-target");
  }
  
  bill.forEach(puppy => {
    let billedPuppy = document.createElement('li');
    billedPuppy.classList.add("list-group-item", "font-weight-bold");
    billedPuppy.textContent= `${puppy.name}! Recuerda que es de tamaño ${puppy.size} y tiene ${puppy.age} años.`
    billList.appendChild(billedPuppy);
  });

  document.querySelector("#fecha").textContent=`Fecha de la adopción: ${new Date().toLocaleDateString("es", "ar")}`;
  document.querySelector("#puppy-amount").innerHTML=`Estás cambiando la vida de ${bill.length} mascotas!`

});

function clearModal() {
  while (billList.firstChild) {
    billList.removeChild(billList.firstChild);
  }
}

document.querySelector("#cancel-icon").addEventListener('click', clearModal);
document.querySelector("#cancel-button").addEventListener('click', clearModal);



