const plan = document.querySelector("#plan"),
  descripcion = document.querySelector("#descripcion"),
  precio = document.querySelector("#precio"),
  img = document.querySelector("#img"),
  search = document.querySelector("#search"),
  tbody = document.querySelector("#table-body"),
  btnGuardar = document.querySelector("#btnGuardar");

const radios = document.querySelectorAll('input[type="radio"]');

const inventario = [
  {
    plan: "MT Centro",
    descripcion: "Consultas médicas sin topes, sin copagos en los Centros Médicos MET.",
    precio: 7500,
    img: "https://api.fidelitytools.net/ObtenerImagen.aspx?id=201154",
  },
  {
    plan: "MT internacion",
    descripcion: "Honorarios Profesionales. Gastos de internación. Medicamentos. Materia descartable e insumos.",
    precio: 2850,
    img: "",
  },
  
];


function Libro(plan, descripcion, precio, img) {
  this.plan = plan;
  this.descripcion = descripcion;
  this.precio = parseFloat(precio);
  this.precio = precio;
  this.img = img;
}


function cargarInventario(arr, obj) {
  return arr.push(obj);
}


function filtarPorNombre(arr, filtro) {
  return arr.filter((el) => {
    return el.plan.includes(filtro);
  });
}



function filtrar(arr, filtro, param) {
  return arr.filter((el) => {
    return el[`${param}`].includes(filtro);
  });
}


function crearHtml(arr) {
  let html = "";
  for (const item of arr) {
    html = `<tr>
                <td>${item.plan}</td>
                <td>${item.descripcion}</td>
                <td>${item.precio}</td>
                <td><img src="${item.img}"/></td>
            </tr>`;
    tbody.innerHTML += html;
  }
}
crearHtml(inventario);

btnGuardar.addEventListener("click", () => {
  const nuevoLibro = new Libro(
    plan.value,
    descripcion.value,
    precio.value,
    img.value
  );

  cargarInventario(inventario, nuevoLibro);
  tbody.innerHTML = "";
  crearHtml(inventario);
});

search.addEventListener("input", () => {
  let nuevoFiltro = filtarPorNombre(inventario, search.value);
  console.log(nuevoFiltro);
  tbody.innerHTML = "";
  crearHtml(nuevoFiltro);
});
for (const radio of radios) {
  radio.addEventListener('change',()=>{
    if(radio.checked){
      search.addEventListener("input", () => {
        let nuevoFiltro = filtrar(inventario, search.value, radio.value);
        console.log(nuevoFiltro);
        tbody.innerHTML = "";
        crearHtml(nuevoFiltro);
      });
    }
  })
}