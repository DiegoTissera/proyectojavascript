document.title = "Tercera entrega Final | Comisión 38035";

const tituloPrincipal = document.getElementsByTagName("span")[0],
  h2 = document.getElementById("h2");
const almacenados = [];
tituloPrincipal.innerText = "MET Medicina Privada";
h2.innerText = "Registro";

const btn = document.getElementById("btnIngresar"),
  checkbox = document.getElementById("checkbox"),
  email = document.getElementById("email"),
  password = document.getElementById("password"),
  p = document.querySelector(".mensaje");
btn.value = "Registrar";


function guardar(valor) {
  let user = { username: email.value, password: password.value };

  if (valor === "sessionStorage") {
    sessionStorage.setItem("user", JSON.stringify(user));
  }
  if (valor === "localStorage") {
    localStorage.setItem("user", JSON.stringify(user));
  }
  return user;
}

function recuperarDatos(datos) {
  if (datos) {
    email.value = datos.username;
    password.value = datos.password;
  }
}

recuperarDatos(JSON.parse(localStorage.getItem("user")));

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (checkbox.checked) {
    guardar("localStorage");
  } else {
    guardar("sessionStorage");
  }
  Swal.fire({
    icon: 'success',
    title: 'Ingreso Exitoso',
    text: 'Navega con confianza!',
    footer: '<a href="./carga-planes.html">Carga de Planes</a>',
  })
});

const inputSearch = document.querySelector("#inputSearch"),
  btnSearch = document.querySelector("#btnSearch"),
  cardContainer = document.querySelector(".card-container");



async function fetchAPI(){
 try {
  const URL='./data/data.json';
  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);
  //DOM
  //crearHTML(data)

//listener
btnSearch.addEventListener('click',()=>{
  const filtro = filtrarPorNombre(data)
crearHTML(filtro);

})
  
 } catch (error) {
  console.log(error);
 }
}
//llamado a la funcion
fetchAPI()

function crearHTML(arr) {
  let html = "";
  cardContainer.innerHTML = "";
  arr.forEach((personaje) => {
    const { plan, descripcion,precio,image } = personaje;
    html =  ` <div class="card">
              <img src="${image}" alt="">
                <div class="card-body">
                    <h3>${plan}</h3>
                    <p>Descripcion: ${descripcion}</p>
                    <p>Precio: ${precio}</p>
                </div>
            </div>`;

    cardContainer.innerHTML += html;
  });
}


//funcion de filtrado

function filtrarPorNombre(array){
  let nombre = inputSearch.value;
  let nombreC = nombre.charAt(0).toUpperCase() + nombre.slice(1);
  if (!nombre) {
    return array;
  } else {
    return array.filter((e) => e.plan.includes(nombreC));
  }
}
