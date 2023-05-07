//generador cards
const iniciarCards = async() => {
  const data =await getProducts()
    const contenedor = document.getElementById("producto-contenedor");
console.log(data)
    data.forEach(producto => { //creo las cards
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML += `<div class="card-image">
                          <img src=${producto.imagen}>
                          <h5 class="card-title">${producto.nombre}</h5>
                          </div>
                            <div class="card-body">
                            <pclass="card-text">${producto.desc}</p>
                            <p class="card-text">$${producto.precio}</p>
                            <button id=${producto.id} class="agregar"> AGREGAR </button>
                        </div>
                       `
      contenedor.appendChild(div);
    });
  };

  document.addEventListener('DOMContentLoaded', iniciarCards());
