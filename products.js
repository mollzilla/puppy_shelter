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

console.log(puppies);

let cardDeck=document.querySelector(".card-deck");
let buyButtons=[];

function cardRender() {
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

    let puppyItemLi = document.createElement('li');
    puppyItemLi.classList.add("list-group-item", "cart-item");

    // console.log(this.id)
    let puppyItem=puppies.find(puppy => `id-${puppy.id}` == this.id);
    // console.log(puppyItem);
    puppyItemLi.textContent= puppyItem.name;
    puppyItemLi.id= puppyItem.id;
    puppyCart.appendChild(puppyItemLi);

    let cart=JSON.parse(sessionStorage.getItem('cart'));

    console.log(cart)

    console.log(puppyItemLi)
    puppyItemLi.addEventListener("click", function() {
      puppyCart.removeChild(puppyItemLi);
      puppyIndex=cart.findIndex(x => x==(puppyItemLi.id));
      cart.splice(puppyIndex, 1);
      alert(`${puppyItem.name} fue removido de la cucha con éxito`);
      console.log(cart);
    });

    if(cart.find(item => item==puppyItem.id)==undefined)
      cart.push(puppyItem.id);

    sessionStorage.setItem("cart", JSON.stringify(cart));

    event.preventDefault();
    });

  });

}

/* todavia no funciona. hay que hacer que ademas de ordenar los objetos, haga un insert before segun el id de cada tarjeta */
document.querySelector(".ordenar-edad").addEventListener("click", (e) => {
  e.preventDefault();
  puppies.sort(function(a, b) {
    return a.age - b.age;
  });
  console.log(cardDeck);
  while (cardDeck.firstChild) {
    cardDeck.removeChild(cardDeck.firstChild);
  }
  cardRender();
  console.log(buyButtons);
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






// console.log(buyButtons)













document.querySelector(".finish-process").addEventListener('click', function() {
  let bill=[];
  (JSON.parse(sessionStorage.getItem('cart'))).map(item => {
    bill.push(puppies.find(puppy => puppy.id == item));
  });
  // console.log(bill);

  
  if(bill.length==0)
  {
    alert("cucha vacia");
    let modal = document.querySelector(".modal");
    // console.log(modal);
    modal.remove();
    return;
    /* hay un bug, si lo borro no lo puedo volver a crear y me da eror */
  }
  
  let billList = document.querySelector('.billed-puppies');
  
  bill.forEach(puppy => {
    console.log(puppy);
    let billedPuppy = document.createElement('li');
    billedPuppy.classList.add("list-group-item", "font-weight-bold");
    billedPuppy.textContent= `${puppy.name}! Recuerda que es de tamaño ${puppy.size} y tiene ${puppy.age} años.`
    billList.appendChild(billedPuppy);
  });

  document.querySelector("#fecha").textContent=`Fecha de la adopción: ${new Date().toLocaleDateString("es", "ar")}`;
  document.querySelector("#puppy-amount").innerHTML=`Estás cambiando la vida de ${bill.length} mascotas!`

});


console.log("mili");