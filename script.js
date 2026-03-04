let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = 0;

// Calcular total al iniciar
carrito.forEach(producto => {
    total += producto.precio;
});

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
    lista.innerHTML = "";

    carrito.forEach((producto, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${producto.nombre} x${producto.cantidad} - $${(producto.precio * producto.cantidad).toLocaleString()}
            <button onclick="eliminarProducto(${index})">❌</button>
        `;
        lista.appendChild(li);
    });

    document.getElementById("total").textContent = total.toLocaleString();
    document.getElementById("contador-nav").textContent = carrito.length;
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

    const contenedorProducto = boton.closest(".producto");
    const cantidadInput = contenedorProducto.querySelector(".control-cantidad input");

    const cantidad = parseInt(cantidadInput.value);

    carrito.push({ nombre, precio, cantidad });

    total += precio * cantidad;

    guardarCarrito();
    actualizarCarrito();

    cantidadInput.value = 1;
}