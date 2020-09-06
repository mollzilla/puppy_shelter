// console.log(sessionStorage);

// console.log(localStorage);

let adopterData={};

document.querySelector("#finalize-adoption").addEventListener("click", function() {
  console.log("hizo click");
  console.log(document.querySelector("#adopter-name").value)
  adopterData.name=document.querySelector("#adopter-name").value,
  adopterData.address=document.querySelector("#adopter-address").value,
  adopterData.dni=document.querySelector("#adopter-dni").value,
  adopterData.available=document.querySelector("#adopter-available").value,
  adopterData.message=document.querySelector("#adopter-message").value

  console.log(adopterData);
  adopterData=JSON.stringify(adopterData);
  console.log(adopterData);

  sessionStorage.setItem("adopteData", adopterData);
});



