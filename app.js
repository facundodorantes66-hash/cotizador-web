const form = document.getElementById('cotizadorForm');
const contenedorResultado = document.getElementById('resultadoCotizacion');
const STORAGE_KEY = 'ultimaCotizacionWeb';

function calcularCostoPaginas(paginas, precioPagina) {
    return paginas * precioPagina;
}

function calcularCostoAdicional(horas, precioHora) {
    return horas * precioHora;
}

function calcularSubtotal(costoPaginas, costoAdicional) {
    return costoPaginas + costoAdicional;
}

function calcularIVA(subtotal) {
    return subtotal * 0.16;
}

function calcularTotal(subtotal, iva) {
    return subtotal + iva;
}

function formatearMoneda(cantidad) {
    return cantidad.toLocaleString('es-MX', {
        style: 'currency',
        currency: 'MXN'
    });
}

function mostrarCotizacion(datos) {
    contenedorResultado.classList.remove('resultado-oculto');
    
    contenedorResultado.innerHTML = `
        <div class="resultado-header">
            <h2>Cotización: ${datos.proyecto}</h2>
            <p><strong>Cliente:</strong> ${datos.cliente}</p>
        </div>
        <div class="detalle-fila">
            <span>Costo por páginas (${datos.paginas} × ${formatearMoneda(datos.precioPagina)}):</span>
            <span>${formatearMoneda(datos.costoPaginas)}</span>
        </div>
        <div class="detalle-fila">
            <span>Costo horas adicionales (${datos.horas} hrs × ${formatearMoneda(datos.precioHora)}):</span>
            <span>${formatearMoneda(datos.costoAdicional)}</span>
        </div>
        <div class="detalle-fila">
            <span><strong>Subtotal:</strong></span>
            <span><strong>${formatearMoneda(datos.subtotal)}</strong></span>
        </div>
        <div class="detalle-fila">
            <span>IVA (16%):</span>
            <span>${formatearMoneda(datos.iva)}</span>
        </div>
        <div class="detalle-total">
            <span>Total a pagar:</span>
            <span>${formatearMoneda(datos.total)}</span>
        </div>
    `;
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const cliente = document.getElementById('cliente').value.trim();
    const proyecto = document.getElementById('proyecto').value.trim();
    const paginas = parseInt(document.getElementById('paginas').value);
    const precioPagina = parseFloat(document.getElementById('precioPagina').value);
    const horas = parseInt(document.getElementById('horas').value);
    const precioHora = parseFloat(document.getElementById('precioHora').value);

    const costoPaginas = calcularCostoPaginas(paginas, precioPagina);
    const costoAdicional = calcularCostoAdicional(horas, precioHora);
    const subtotal = calcularSubtotal(costoPaginas, costoAdicional);
    const iva = calcularIVA(subtotal);
    const total = calcularTotal(subtotal, iva);

    const cotizacion = {
        cliente,
        proyecto,
        paginas,
        precioPagina,
        horas,
        precioHora,
        costoPaginas,
        costoAdicional,
        subtotal,
        iva,
        total
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(cotizacion));
    mostrarCotizacion(cotizacion);
});

document.addEventListener('DOMContentLoaded', function() {
    const cotizacionGuardada = localStorage.getItem(STORAGE_KEY);
    
    if (cotizacionGuardada) {
        const datosParseados = JSON.parse(cotizacionGuardada);
        mostrarCotizacion(datosParseados);
    }
});