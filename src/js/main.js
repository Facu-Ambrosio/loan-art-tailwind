const data = async() => {
  let resp = await fetch("https://raw.githubusercontent.com/Facu-Ambrosio/Loan-arts-tienda/main/data/productos.json");
  let data = await resp.json();
  return localStorage.setItem("productos", JSON.stringify(data));
};

/* const agregar_carrito_canvas = (articulo) => {
  
}; */


const creacion_carrito = () => {
  let carritoInicioPagina = localStorage.getItem("carrito");
  if (!carritoInicioPagina){
    carritoInicioPagina = [];
    localStorage.setItem("carrito", JSON.stringify(carritoInicioPagina));
  } /* else {
    aca se crearia el carrito visual con la funcion que crea el html  
    carrito.forEach((el)=>{agregar_carrito_canvas(el)})
  } */
};

const agregar_carrito_storage = (e) => {
  let nombre = e.target.parentNode.parentNode.id.replace(/_/g, " ");

  let carrito = JSON.parse(localStorage.getItem("carrito"));
  let productos = JSON.parse(localStorage.getItem("productos"));
  let existenciaEnCarrito = carrito.find((el) => el.nombre === nombre);
  
  let indexProducto = productos.indexOf(productos.find((el) => el.nombre === nombre));
  
  if (existenciaEnCarrito){
    existenciaEnCarrito.cantidad++;
  } else {
    carrito.push(productos[indexProducto]);
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

let main = document.querySelector("main");
let btnAgregarCarrito = main.querySelectorAll("button");

creacion_carrito();
data();

btnAgregarCarrito.forEach((el) => {
  el.addEventListener("click", agregar_carrito_storage)
})
