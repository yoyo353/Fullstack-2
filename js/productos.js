// ============================================================================
// GAMERZONE - PRODUCTOS.JS
// JavaScript para la página de productos
// ============================================================================

// Selector como en clases
export const $ = (sel) => document.querySelector(sel);

// Variables globales para filtros
let productosOriginales = [];
let productosFiltrados = [];

// ============================================================================
// DATOS BASE - MISMOS QUE APP.JS
// ============================================================================

const productos = [
    {
        id: 1,
        codigo: "ZELDA-001",
        nombre: "The Legend of Zelda: Breath of the Wild",
        precio: 59990,
        precioOriginal: 69990,
        descuento: 14,
        categoria: "Nintendo Switch",
        stock: 15,
        stockCritico: 5,
        imagen: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop",
        destacado: true,
        nuevo: false,
        gratis: false
    },
    {
        id: 2,
        codigo: "CYBER-002",
        nombre: "Cyberpunk 2077",
        precio: 39990,
        precioOriginal: 59990,
        descuento: 33,
        categoria: "PC Gaming",
        stock: 8,
        stockCritico: 3,
        imagen: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop",
        destacado: true,
        nuevo: false,
        gratis: false
    },
    {
        id: 3,
        codigo: "COD-003",
        nombre: "Call of Duty: Modern Warfare II",
        precio: 0,
        precioOriginal: 69990,
        descuento: 100,
        categoria: "PlayStation 5",
        stock: 12,
        stockCritico: 4,
        imagen: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=200&fit=crop",
        destacado: false,
        nuevo: false,
        gratis: true
    },
    {
        id: 4,
        codigo: "FIFA-004",
        nombre: "FIFA 24",
        precio: 49990,
        precioOriginal: 0,
        descuento: 0,
        categoria: "PlayStation 5",
        stock: 20,
        stockCritico: 6,
        imagen: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop",
        destacado: true,
        nuevo: true,
        gratis: false
    },
    {
        id: 5,
        codigo: "GOW-005",
        nombre: "God of War Ragnarök",
        precio: 44990,
        precioOriginal: 54990,
        descuento: 18,
        categoria: "PlayStation 5",
        stock: 7,
        stockCritico: 2,
        imagen: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=200&fit=crop",
        destacado: false,
        nuevo: false,
        gratis: false
    },
    {
        id: 6,
        codigo: "SPIDER-006",
        nombre: "Spider-Man: Miles Morales",
        precio: 29990,
        precioOriginal: 49990,
        descuento: 40,
        categoria: "PlayStation 5",
        stock: 14,
        stockCritico: 5,
        imagen: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=200&fit=crop",
        destacado: true,
        nuevo: false,
        gratis: false
    },
    {
        id: 7,
        codigo: "ELDEN-007",
        nombre: "Elden Ring",
        precio: 35990,
        precioOriginal: 59990,
        descuento: 40,
        categoria: "PC Gaming",
        stock: 9,
        stockCritico: 3,
        imagen: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=200&fit=crop",
        destacado: false,
        nuevo: false,
        gratis: false
    },
    {
        id: 8,
        codigo: "HORIZON-008",
        nombre: "Horizon Forbidden West",
        precio: 52990,
        precioOriginal: 0,
        descuento: 0,
        categoria: "PlayStation 5",
        stock: 11,
        stockCritico: 4,
        imagen: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=200&fit=crop",
        destacado: false,
        nuevo: true,
        gratis: false
    },
    {
        id: 9,
        codigo: "GT7-009",
        nombre: "Gran Turismo 7",
        precio: 14990,
        precioOriginal: 47990,
        descuento: 69,
        categoria: "PlayStation 5",
        stock: 16,
        stockCritico: 6,
        imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop",
        destacado: false,
        nuevo: false,
        gratis: false
    },
    {
        id: 10,
        codigo: "RE4-010",
        nombre: "Resident Evil 4 Remake",
        precio: 0,
        precioOriginal: 56990,
        descuento: 100,
        categoria: "PC Gaming",
        stock: 6,
        stockCritico: 2,
        imagen: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=200&fit=crop",
        destacado: false,
        nuevo: false,
        gratis: true
    },
    {
        id: 11,
        codigo: "SF6-011",
        nombre: "Street Fighter 6",
        precio: 28990,
        precioOriginal: 48990,
        descuento: 41,
        categoria: "Xbox Series X",
        stock: 13,
        stockCritico: 5,
        imagen: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=400&h=200&fit=crop",
        destacado: false,
        nuevo: false,
        gratis: false
    },
    {
        id: 12,
        codigo: "DIABLO-012",
        nombre: "Diablo IV",
        precio: 18990,
        precioOriginal: 62990,
        descuento: 70,
        categoria: "PC Gaming",
        stock: 10,
        stockCritico: 3,
        imagen: "https://images.unsplash.com/photo-1591267990532-204d8b7f1e88?w=400&h=200&fit=crop",
        destacado: false,
        nuevo: false,
        gratis: false
    }
];

const categorias = [
    "PlayStation 5",
    "Xbox Series X",
    "Nintendo Switch",
    "PC Gaming",
    "Retro Gaming"
];

// ============================================================================
// FUNCIONES DE LOCALSTORAGE
// ============================================================================

function guardarProductos() {
    localStorage.setItem('gamerzone_productos', JSON.stringify(productos));
}

function cargarProductos() {
    const productosGuardados = localStorage.getItem('gamerzone_productos');
    return productosGuardados ? JSON.parse(productosGuardados) : productos;
}

function obtenerCarrito() {
    const carrito = localStorage.getItem('gamerzone_carrito');
    return carrito ? JSON.parse(carrito) : [];
}

function guardarCarrito(carrito) {
    localStorage.setItem('gamerzone_carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    actualizarInfoCarrito();
}

// ============================================================================
// FUNCIONES DE VISUALIZACIÓN
// ============================================================================

function mostrarTodosLosProductos() {
    const grid = $('#productosGrid');
    const noProductos = $('#noProductos');
    
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (productosFiltrados.length === 0) {
        noProductos.style.display = 'block';
        return;
    }
    
    noProductos.style.display = 'none';
    
    productosFiltrados.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        // Verificar stock crítico
        const stockWarning = producto.stock <= producto.stockCritico ? 
            '<span class="pill" style="background: #ef4444; color: white;">¡Stock Bajo!</span>' : '';
            
        // Mostrar si está sin stock
        const sinStock = producto.stock <= 0 ? 
            '<span class="pill" style="background: #dc2626; color: white;">SIN STOCK</span>' : '';
        
        card.innerHTML = `
            <div class="product-image" onclick="verDetalle(${producto.id})">
                <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
            </div>
            <h3>${producto.nombre}</h3>
            <p><span class="pill">${producto.categoria}</span></p>
            ${stockWarning}
            ${sinStock}
            <p><strong>${producto.precio.toLocaleString('es-CL')}</strong></p>
            <p>Stock disponible: <strong>${producto.stock}</strong></p>
            <button 
                class="btn-cart" 
                data-id="${producto.id}" 
                data-action="agregar-carrito"
                ${producto.stock <= 0 ? 'disabled style="opacity: 0.5;"' : ''}
            >
                ${producto.stock <= 0 ? 'Sin Stock' : 'Agregar al Carrito'}
            </button>
        `;
        
        grid.appendChild(card);
    });
    
    // Actualizar contadores
    $('#productosMostrados').textContent = productosFiltrados.length;
    
    console.log(`📦 Mostrando ${productosFiltrados.length} productos`);
}

function cargarCategorias() {
    const select = $('#filtroCategoria');
    if (!select) return;
    
    // Limpiar opciones existentes (excepto la primera)
    select.innerHTML = '<option value="">Todas las categorías</option>';
    
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        select.appendChild(option);
    });
}

function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    const contador = $('#cartCount');
    
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    
    if (contador) contador.textContent = totalItems;
}

function actualizarInfoCarrito() {
    const carrito = obtenerCarrito();
    const productosEnCarrito = $('#productosEnCarrito');
    const totalCarrito = $('#totalCarrito');
    
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const totalPrecio = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    if (productosEnCarrito) productosEnCarrito.textContent = totalItems;
    if (totalCarrito) totalCarrito.textContent = `$${totalPrecio.toLocaleString('es-CL')}`;
}

// ============================================================================
// FUNCIONES DE FILTRADO Y BÚSQUEDA
// ============================================================================

function aplicarFiltros() {
    const textoBusqueda = $('#buscarTexto').value.toLowerCase().trim();
    const categoriaFiltro = $('#filtroCategoria').value;
    const ordenarPor = $('#ordenarPor').value;
    
    console.log('🔍 Aplicando filtros:', { textoBusqueda, categoriaFiltro, ordenarPor });
    
    // Empezar con todos los productos
    let resultados = [...productosOriginales];
    
    // Filtrar por texto de búsqueda
    if (textoBusqueda) {
        resultados = resultados.filter(producto => 
            producto.nombre.toLowerCase().includes(textoBusqueda) ||
            producto.codigo.toLowerCase().includes(textoBusqueda)
        );
    }
    
    // Filtrar por categoría
    if (categoriaFiltro) {
        resultados = resultados.filter(producto => producto.categoria === categoriaFiltro);
    }
    
    // Ordenar resultados
    switch (ordenarPor) {
        case 'nombre':
            resultados.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case 'precio-menor':
            resultados.sort((a, b) => a.precio - b.precio);
            break;
        case 'precio-mayor':
            resultados.sort((a, b) => b.precio - a.precio);
            break;
        case 'stock':
            resultados.sort((a, b) => b.stock - a.stock);
            break;
    }
    
    // Actualizar productos filtrados y mostrar
    productosFiltrados = resultados;
    mostrarTodosLosProductos();
    
    console.log(`✅ Filtros aplicados. Productos encontrados: ${resultados.length}`);
}

function limpiarFiltros() {
    $('#buscarTexto').value = '';
    $('#filtroCategoria').value = '';
    $('#ordenarPor').value = 'nombre';
    
    productosFiltrados = [...productosOriginales];
    mostrarTodosLosProductos();
    
    console.log('🧹 Filtros limpiados');
}

// ============================================================================
// FUNCIONES DEL CARRITO
// ============================================================================

function agregarAlCarrito(idProducto) {
    const producto = productosOriginales.find(p => p.id === parseInt(idProducto));
    
    if (!producto) {
        console.log('❌ Producto no encontrado');
        return;
    }

    if (producto.stock <= 0) {
        alert('⚠️ Producto sin stock disponible');
        return;
    }

    const carrito = obtenerCarrito();
    const itemExistente = carrito.find(item => item.id === producto.id);

    if (itemExistente) {
        if (itemExistente.cantidad < producto.stock) {
            itemExistente.cantidad += 1;
            console.log(`➕ Aumentada cantidad de ${producto.nombre}`);
        } else {
            alert('⚠️ No hay más stock disponible');
            return;
        }
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        });
        console.log(`✅ ${producto.nombre} agregado al carrito`);
    }

    guardarCarrito(carrito);
    alert(`🛒 ${producto.nombre} agregado al carrito!`);
}

function limpiarCarrito() {
    if (confirm('¿Estás seguro de que quieres limpiar el carrito?')) {
        localStorage.removeItem('gamerzone_carrito');
        actualizarContadorCarrito();
        actualizarInfoCarrito();
        console.log('🗑️ Carrito limpiado');
        alert('✅ Carrito limpiado correctamente');
    }
}

// ============================================================================
// FUNCIÓN GLOBAL PARA VER DETALLE
// ============================================================================

window.verDetalle = function(idProducto) {
    // Simular navegación a detalle (en una implementación real sería otra página)
    const producto = productosOriginales.find(p => p.id === parseInt(idProducto));
    if (producto) {
        alert(`📋 Detalle de producto:\n\n${producto.nombre}\nPrecio: $${producto.precio.toLocaleString('es-CL')}\nStock: ${producto.stock}\nCategoría: ${producto.categoria}`);
    }
};

// ============================================================================
// EVENT LISTENERS
// ============================================================================

// Aplicar filtros
$('#btnAplicarFiltros')?.addEventListener('click', aplicarFiltros);

// Limpiar filtros
$('#btnLimpiarFiltros')?.addEventListener('click', limpiarFiltros);

// Mostrar todos los productos (desde mensaje de "no encontrados")
$('#btnMostrarTodos')?.addEventListener('click', () => {
    limpiarFiltros();
});

// Búsqueda en tiempo real mientras escribe
$('#buscarTexto')?.addEventListener('input', () => {
    // Aplicar filtros después de una pequeña pausa (debounce)
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(aplicarFiltros, 300);
});

// Cambio en filtros de select
$('#filtroCategoria')?.addEventListener('change', aplicarFiltros);
$('#ordenarPor')?.addEventListener('change', aplicarFiltros);

// Ver carrito
$('#btnVerCarrito')?.addEventListener('click', () => {
    window.location.href = 'carrito.html';
});

$('#btnCarrito')?.addEventListener('click', () => {
    window.location.href = 'carrito.html';
});

// Limpiar carrito
$('#btnLimpiarCarrito')?.addEventListener('click', limpiarCarrito);

// Event delegation para botones de agregar al carrito
$('#productosGrid')?.addEventListener('click', (event) => {
    const btn = event.target.closest('button[data-action="agregar-carrito"]');
    if (!btn) return;
    
    const productoId = btn.dataset.id;
    agregarAlCarrito(productoId);
});

// ============================================================================
// INICIALIZACIÓN
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🛍️ Página de productos cargada!');
    
    // Cargar datos
    guardarProductos();
    productosOriginales = cargarProductos();
    productosFiltrados = [...productosOriginales];
    
    // Configurar página
    cargarCategorias();
    mostrarTodosLosProductos();
    actualizarContadorCarrito();
    actualizarInfoCarrito();
    
    // Actualizar contador total
    $('#totalProductos').textContent = productosOriginales.length;
    
    console.log('✅ Página de productos inicializada correctamente');
});

// Hacer funciones disponibles globalmente
window.agregarAlCarrito = agregarAlCarrito;