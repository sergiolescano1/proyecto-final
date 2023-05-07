
let carrito = [];


//presionar boton de agregar productos
const productoContenedor = document.getElementById('producto-contenedor'); //
productoContenedor.addEventListener('click', (e) => {  
 // console.log(e.target.classList)
  if (e.target.classList.contains('agregar')) {//si presiono sobre un boton que tenga asiganada la clase "agregar"
  verificacionProducto(e.target.id)               //tengo que verificar si el producto esta o no 
  };

})



const verificacionProducto = async(productoId) => {   //ver si esta o no agregado
//  console.log(productoId)         
  const enLista = carrito.some(producto => producto.id == productoId)  //busco si ya se encontraba precargado en la lista 

  if (!enLista) {          
console.log("No Esta repetido")
const data =await getProducts()
    const producto = data.find(producto => producto.id == productoId) //caso 1: si no se repite agrego todas sus propiedades
   console.log(producto)
   if (producto.cantidad ==0) //al no estar repetido le asigno el valor =1 
   {
    producto.cantidad =1
   }
    carrito.push(producto)       //agrego al carrito el objeto producto                                   
    completarTablaCarrito(producto)   
  } else {  //EL PRODUCTO SE ENCUENTRA COMPRADO POR LO TANTO SOLO INCREMENTO CANTIDAD
    console.log(" Esta repetido")
    const productoRepetido = carrito.find(producto => producto.id == productoId)//caso 2_ si se encontraba repetido  //FIND DEVUELVE BOOLEN
    const cantidad = document.getElementById(`cantidad${productoRepetido.id}`) //incremento cantidad 
    productoRepetido.cantidad++
    cantidad.innerText = `Cantidad: ${productoRepetido.cantidad}`            //modifico la cantidad en la tabla

    const subtotal1 = document.getElementById(`subtotal${productoRepetido.id}`) 
    let subtotalTabla= productoRepetido.precio*productoRepetido.cantidad
    subtotal1.innerText = `$${subtotalTabla}`  //muestro el subtotal en la tabla      
    total()

  }
}

//////////////////////////
completarTablaCarrito = (producto) => {
  const contenedor = document.getElementById('carrito-contenedor')
  const tr = document.createElement('tr')

  let subtotalTabla= producto.precio*producto.cantidad
  tr.innerHTML = `
				<td>${producto.nombre}</td>
				<td>${producto.precio}</td>
        <td id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</td>
        <td id=subtotal${producto.id}>$${subtotalTabla} </td>
        <td  class="d-flex justify-content-center"><button  class="btn btn-danger eliminar" value="${producto.id}">X</button></td>
  `
  contenedor.appendChild(tr)
  total()
  //actualizarTotalesCarrito(carrito)
 
}

//Calculo el valor final de la compra y agrego a la tabla
//Calculo el valor final de la compra y agrego a la tabla

//const verificacionProducto = async(productoId) => {   //ver si esta o no agregado
//const data =await getProducts()

async function total(){
  const cantidadCarrito = carrito.reduce((acc, item) => acc + item.cantidad, 0)
   const precioTotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
  

  const totalmente = document.getElementById('total') //incremento cantidad 
  totalmente.innerText = `$${precioTotal}` 
    
  guardarCarritoStorage(carrito)

  //FETCHHH
  const valor1 =await getValor() //funcion que envia el valor promedio del dolar 
const totalmenteUsd = document.getElementById('totalUsd') //incremento cantidad 
  totalmenteUsd.innerText = `USD ${(precioTotal/valor1).toFixed(2)}`   
}



/////boton eliminar 
const productoEliminar = document.getElementById('tablaCompras'); //
productoEliminar.addEventListener('click', (e) => {  //si presiono sobre un boton que tenga asiganada la clase "agregar"
  if (e.target.classList.contains('eliminar')) { 
    eliminarProductoCarrito(e.target.value)
  };
})

const eliminarProductoCarrito = (productoId) => { //luego de presionar el boton elimino objeto de carrito 
  const productoIndex = carrito.findIndex(producto => producto.id == productoId);
  if (productoIndex !== -1) { 
    carrito[productoIndex].cantidad = 0; // Modificar la cantidad del producto a 0
    console.log("Se ha modificado la cantidad del producto en el carrito.");
  } else {
    console.log("No se ha encontrado el producto en el carrito.");
  }
  console.log(carrito);
  carrito.splice(productoIndex, 1)
  reconstruirTabla(carrito);

};



const reconstruirTabla = (carrito) => {//una vez eliminado el objeto del carrito reconstruyo la tabla
  const contenedor = document.getElementById('carrito-contenedor')

  contenedor.innerHTML = '' //elimino tabla desactualizada
  total()
  carrito.forEach(producto => { //por cada producto lo agrego a la tabla
    const contenedor = document.getElementById('carrito-contenedor')
  const div = document.createElement('tr')

  let subtotalTabla= producto.precio*producto.cantidad
  div.innerHTML = `
				<td>${producto.nombre}</td>
				<td>${producto.precio}</td>
        <td id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</td>
        <td id=subtotal${producto.id}>$${subtotalTabla} </td>
        <td  class="d-flex justify-content-center"><button  class="btn btn-danger eliminar" value="${producto.id}">X</button></td>
  `
  contenedor.appendChild(div)
  total()  //funcion para colocar el precio total en la tabla
  });
}

//FUNCIONES DE GUARDADO 
const guardarCarritoStorage = (carrito) => {
  localStorage.setItem('carrito', JSON.stringify(carrito))//genero JSON
}


const obtenerCarritoStorage = () => {//funcion para mostrar informacion almacenada en storage
  const carritoStorage = JSON.parse(localStorage.getItem('carrito'))
  return carritoStorage
}



if (localStorage.getItem('carrito')) { //muestra informacion almacenada en storage 
  carrito = obtenerCarritoStorage()
  reconstruirTabla(carrito)
}