let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = 0;

actualizarCarrito();

function cambiarCantidad(btn, cambio) {
    const input = btn.parentElement.querySelector("input");
    let valor = parseInt(input.value);

    valor += cambio;

    if (valor < 1) valor = 1;

    input.value = valor;
}
function actualizarCarrito() {

    const lista = document.getElementById("lista-carrito");
    const listaLateral = document.getElementById("lista-carrito-lateral");

    if(lista) lista.innerHTML = "";
    if(listaLateral) listaLateral.innerHTML = "";

    total = 0;

    carrito.forEach((producto, index) => {

        total += producto.precio * producto.cantidad;

        const li = document.createElement("li");
        li.innerHTML = `
        ${producto.nombre} x${producto.cantidad} - $${(producto.precio * producto.cantidad).toLocaleString()}
        <button class="btn-eliminar" onclick="eliminarProducto(${index})">❌</button>
        `;

        if(lista) lista.appendChild(li);

        if(listaLateral){
            const liLateral = li.cloneNode(true);
            listaLateral.appendChild(liLateral);
        }

    });

    if(document.getElementById("total"))
        document.getElementById("total").textContent = total.toLocaleString();

    if(document.getElementById("total-lateral"))
        document.getElementById("total-lateral").textContent = total.toLocaleString();

    let cantidadTotal = 0;

    carrito.forEach(producto => {
        cantidadTotal += producto.cantidad;
    });

    const contador = document.getElementById("contador-nav");
    if(contador) contador.textContent = cantidadTotal;
}

function eliminarProducto(index) {
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    guardarCarrito();
    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    total = 0;
    guardarCarrito();
    actualizarCarrito();
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Mostrar botón WhatsApp después de hacer scroll

window.addEventListener("scroll", function() {
    const whatsapp = document.querySelector(".whatsapp-container");

    if (window.scrollY > 300) {
        whatsapp.classList.add("visible");
    } else {
        whatsapp.classList.remove("visible");
    }
});

function enviarPedidoWhatsApp() {

    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    let nombre = document.getElementById("nombreCliente").value.trim();
    let metodo = document.getElementById("metodoPago").value;

    if (!nombre) {
        alert("Por favor ingresa tu nombre");
        return;
    }

    if (!metodo) {
        alert("Selecciona un método de pago");
        return;
    }

    let mensaje = `Hola, soy ${nombre}.\n\n`;
    mensaje += "Quiero realizar el siguiente pedido:\n\n";

    carrito.forEach(producto => {
    mensaje += `- ${producto.nombre} x${producto.cantidad} - $${(producto.precio * producto.cantidad).toLocaleString()}\n`;
    });

    mensaje += `\nTotal: $${total.toLocaleString()}\n`;
    mensaje += `Método de pago elegido: ${metodo}`;

    let telefono = "573023596381";

    let url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
}
function cambiarCantidad(btn, cambio) {
    const input = btn.parentElement.querySelector("input");
    let valor = parseInt(input.value);

    valor += cambio;

    if (valor < 1) valor = 1;

    input.value = valor;
}
function abrirCarrito() {
    document.getElementById("carrito-lateral").classList.add("activo");
}

function cerrarCarrito() {
    document.getElementById("carrito-lateral").classList.remove("activo");
}
function agregarAlCarritoConCantidad(boton, nombre, precio) {

    const contenedor = boton.parentElement;
    const cantidadInput = contenedor.querySelector(".control-cantidad input");

    let cantidad = 1;

    if (cantidadInput) {
        cantidad = parseInt(cantidadInput.value);
    }

    carrito.push({
        nombre: nombre,
        precio: precio,
        cantidad: cantidad
    });

    total += precio * cantidad;

    guardarCarrito();
    actualizarCarrito();

    if (cantidadInput) {
        cantidadInput.value = 1;
    }
}
window.onload = function() {
    actualizarCarrito();
};
const imagenPrincipal = document.getElementById("imagenPrincipal");

const miniaturas = document.querySelectorAll(".miniaturas img");

miniaturas.forEach(img => {
    img.addEventListener("click", function() {
        imagenPrincipal.src = this.src;
    });
});

// ===== COMENTARIOS =====

let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];

function agregarComentario(){

    let nombre = document.getElementById("nombreComentario").value.trim();
    let texto = document.getElementById("textoComentario").value.trim();

    if(nombre === "" || texto === ""){
        alert("Completa todos los campos");
        return;
    }

    comentarios.push({
        nombre: nombre,
        texto: texto
    });

    localStorage.setItem("comentarios", JSON.stringify(comentarios));

    document.getElementById("nombreComentario").value = "";
    document.getElementById("textoComentario").value = "";

    mostrarComentarios();
}

function mostrarComentarios(){

    const lista = document.getElementById("lista-comentarios");

    if(!lista) return;

    lista.innerHTML = "";

    comentarios.forEach((c, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
        <strong>${c.nombre}</strong><br>
        ${c.texto}
        <button class="btn-borrar-comentario" onclick="eliminarComentario(${index})">❌</button>
        `;

        lista.appendChild(li);

    });

}

function eliminarComentario(index){

    comentarios.splice(index,1);

    localStorage.setItem("comentarios", JSON.stringify(comentarios));

    mostrarComentarios();
}

window.addEventListener("DOMContentLoaded", mostrarComentarios);
// ===== VALORACIÓN =====

window.addEventListener("DOMContentLoaded", function(){

const estrellas = document.getElementById("estrellas");
const tooltip = document.getElementById("tooltip-valor");
const promedioElemento = document.getElementById("promedio");

if(!estrellas) return;

function borrarCalificacion(){

localStorage.removeItem("yacalifico");

alert("Tu calificación fue eliminada. Ahora puedes votar nuevamente ⭐");

location.reload();

}

let calificaciones = JSON.parse(localStorage.getItem("calificaciones")) || [];
let yaCalifico = localStorage.getItem("yaCalifico");

function calcularPromedio(){

    if(calificaciones.length === 0){
        promedioElemento.textContent = "0";
        return;
    }

    let suma = 0;

    calificaciones.forEach(v => suma += v);

    let promedio = suma / calificaciones.length;

    promedioElemento.textContent = promedio.toFixed(1);
}

calcularPromedio();

estrellas.addEventListener("mousemove", function(e){

    const rect = estrellas.getBoundingClientRect();
    const x = e.clientX - rect.left;

    let valor = (x / rect.width) * 5;

    valor = Math.round(valor * 10) / 10;

    tooltip.style.display = "block";
    tooltip.style.left = x + "px";
    tooltip.textContent = valor;

});

estrellas.addEventListener("mouseleave", function(){
    tooltip.style.display = "none";
});

estrellas.addEventListener("click", function(e){

    if(yaCalifico){
        alert("Ya calificaste este producto");
        return;
    }

    const rect = estrellas.getBoundingClientRect();
    const x = e.clientX - rect.left;

    let valor = (x / rect.width) * 5;

    valor = Math.round(valor * 10) / 10;

    calificaciones.push(valor);

    localStorage.setItem("calificaciones", JSON.stringify(calificaciones));
    localStorage.setItem("yaCalifico", "true");

    yaCalifico = true;

    calcularPromedio();

});

});
function borrarCalificacion(){

localStorage.removeItem("yaCalifico");
localStorage.removeItem("calificaciones");

alert("Tu calificación fue eliminada. Ahora puedes votar nuevamente ⭐");

location.reload();

}