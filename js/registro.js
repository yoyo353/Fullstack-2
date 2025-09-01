// ============================================================================
// GAMERZONE - REGISTRO.JS
// JavaScript para la página de registro con validaciones completas
// ============================================================================

// Selector como en clases
export const $ = (sel) => document.querySelector(sel);

// ============================================================================
// DATOS DE REGIONES Y COMUNAS CHILE
// ============================================================================

const regionesComunas = {
    "Región Metropolitana": [
        "Santiago", "Las Condes", "Providencia", "Ñuñoa", "La Reina",
        "Vitacura", "San Miguel", "Maipú", "Puente Alto", "La Florida"
    ],
    "Región de Valparaíso": [
        "Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "Concón",
        "Casablanca", "San Antonio", "Cartagena", "El Quisco", "Algarrobo"
    ],
    "Región del Biobío": [
        "Concepción", "Talcahuano", "Chillán", "Los Ángeles", "Coronel",
        "San Pedro de la Paz", "Tomé", "Penco", "Lota", "Nacimiento"
    ],
    "Región de La Araucanía": [
        "Temuco", "Padre Las Casas", "Villarrica", "Pucón", "Angol",
        "Victoria", "Lautaro", "Nueva Imperial", "Carahue", "Pitrufquén"
    ]
};

// ============================================================================
// FUNCIONES DE VALIDACIÓN RUN CHILENO
// ============================================================================

function validarRUN(run) {
    if (!run || run.trim() === '') {
        return { valido: false, mensaje: 'El RUN es requerido' };
    }
    
    // Remover espacios y convertir a mayúsculas
    run = run.trim().toUpperCase();
    
    // Verificar longitud
    if (run.length < 7 || run.length > 9) {
        return { valido: false, mensaje: 'RUN debe tener entre 7 y 9 caracteres' };
    }
    
    // Verificar formato (solo números y K al final)
    const formato = /^[0-9]+[0-9K]$/;
    if (!formato.test(run)) {
        return { valido: false, mensaje: 'RUN debe contener solo números y opcionalmente K al final' };
    }
    
    // Algoritmo de validación RUN chileno
    const cuerpo = run.slice(0, -1);
    const dv = run.slice(-1);
    
    let suma = 0;
    let multiplicador = 2;
    
    // Calcular suma desde derecha a izquierda
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    
    const resto = suma % 11;
    const dvCalculado = resto === 0 ? '0' : resto === 1 ? 'K' : (11 - resto).toString();
    
    if (dv !== dvCalculado) {
        return { valido: false, mensaje: 'RUN inválido según algoritmo de validación' };
    }
    
    return { valido: true, mensaje: 'RUN válido' };
}

// ============================================================================
// OTRAS FUNCIONES DE VALIDACIÓN
// ============================================================================

function validarEmail(email) {
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    
    if (!email || email.trim() === '') {
        return { valido: false, mensaje: 'El email es requerido' };
    }
    
    if (email.length > 100) {
        return { valido: false, mensaje: 'El email no puede exceder 100 caracteres' };
    }
    
    const tieneFormatoEmail = email.includes('@') && email.includes('.');
    if (!tieneFormatoEmail) {
        return { valido: false, mensaje: 'Formato de email inválido' };
    }
    
    const dominioValido = dominiosPermitidos.some(dominio => email.includes(dominio));
    if (!dominioValido) {
        return { 
            valido: false, 
            mensaje: 'Solo se permiten emails de @duoc.cl, @profesor.duoc.cl o @gmail.com' 
        };
    }
    
    return { valido: true, mensaje: 'Email válido' };
}

function validarPassword(password) {
    if (!password || password.trim() === '') {
        return { valido: false, mensaje: 'La contraseña es requerida' };
    }
    
    if (password.length < 4) {
        return { valido: false, mensaje: 'Mínimo 4 caracteres' };
    }
    
    if (password.length > 10) {
        return { valido: false, mensaje: 'Máximo 10 caracteres' };
    }
    
    return { valido: true, mensaje: 'Contraseña válida' };
}

function validarNombre(nombre, campo = 'Nombre') {
    if (!nombre || nombre.trim() === '') {
        return { valido: false, mensaje: `${campo} es requerido` };
    }
    
    const maxLength = campo === 'Nombre' ? 50 : 100;
    if (nombre.length > maxLength) {
        return { valido: false, mensaje: `${campo} no puede exceder ${maxLength} caracteres` };
    }
    
    return { valido: true, mensaje: `${campo} válido` };
}

function validarDireccion(direccion) {
    if (!direccion || direccion.trim() === '') {
        return { valido: false, mensaje: 'La dirección es requerida' };
    }
    
    if (direccion.length > 300) {
        return { valido: false, mensaje: 'La dirección no puede exceder 300 caracteres' };
    }
    
    return { valido: true, mensaje: 'Dirección válida' };
}

// ============================================================================
// FUNCIONES DE INTERFAZ
// ============================================================================

function cargarRegiones() {
    const selectRegion = $('#regionSelect');
    if (!selectRegion) return;
    
    // Limpiar opciones
    selectRegion.innerHTML = '<option value="">Seleccionar región</option>';
    
    // Agregar regiones
    Object.keys(regionesComunas).forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        selectRegion.appendChild(option);
    });
}

function cargarComunas(regionSeleccionada) {
    const selectComuna = $('#comunaSelect');
    if (!selectComuna) return;
    
    // Limpiar opciones
    selectComuna.innerHTML = '<option value="">Seleccionar comuna</option>';
    
    if (!regionSeleccionada || !regionesComunas[regionSeleccionada]) {
        selectComuna.innerHTML = '<option value="">Primero selecciona región</option>';
        return;
    }
    
    // Agregar comunas de la región seleccionada
    regionesComunas[regionSeleccionada].forEach(comuna => {
        const option = document.createElement('option');
        option.value = comuna;
        option.textContent = comuna;
        selectComuna.appendChild(option);
    });
}

function mostrarMensaje(mensaje, tipo = 'info') {
    const contenedor = $('#mensajesRegistro');
    if (!contenedor) return;
    
    let color = 'var(--text-primary)';
    let icono = 'ℹ️';
    
    switch (tipo) {
        case 'exito':
            color = 'var(--color-success)';
            icono = '✅';
            break;
        case 'error':
            color = 'var(--color-danger)';
            icono = '❌';
            break;
        case 'warning':
            color = 'var(--color-warning)';
            icono = '⚠️';
            break;
    }
    
    contenedor.innerHTML = `
        <div style="color: ${color}; padding: 1rem; background: var(--bg-card); 
                    border-radius: var(--radius-sm); border: 1px solid var(--border-primary);
                    text-align: center;">
            ${icono} ${mensaje}
        </div>
    `;
}

function actualizarEstadoValidacion(campo, resultado) {
    const elemento = $(`#estado${campo}`);
    if (!elemento) return;
    
    elemento.className = 'pill';
    if (resultado.valido) {
        elemento.className += ' success';
        elemento.textContent = '✅ Válido';
    } else {
        elemento.className += ' danger';
        elemento.textContent = '❌ Inválido';
    }
}

// ============================================================================
// FUNCIONES DE LOCALSTORAGE
// ============================================================================

function obtenerUsuarios() {
    const usuarios = localStorage.getItem('gamerzone_usuarios');
    return usuarios ? JSON.parse(usuarios) : [];
}

function guardarUsuario(usuario) {
    const usuarios = obtenerUsuarios();
    
    // Verificar si el email ya existe
    const emailExiste = usuarios.some(u => u.email.toLowerCase() === usuario.email.toLowerCase());
    if (emailExiste) {
        return { exito: false, mensaje: 'Ya existe un usuario con este email' };
    }
    
    // Verificar si el RUN ya existe
    const runExiste = usuarios.some(u => u.run === usuario.run);
    if (runExiste) {
        return { exito: false, mensaje: 'Ya existe un usuario con este RUN' };
    }
    
    // Generar ID único
    usuario.id = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    usuario.fechaRegistro = new Date().toISOString();
    
    usuarios.push(usuario);
    localStorage.setItem('gamerzone_usuarios', JSON.stringify(usuarios));
    
    return { exito: true, mensaje: 'Usuario registrado correctamente' };
}

// ============================================================================
// PROCESAMIENTO DEL FORMULARIO
// ============================================================================

function procesarRegistro() {
    // Obtener valores del formulario
    const run = $('#runRegistro').value.trim();
    const nombre = $('#nombreRegistro').value.trim();
    const apellidos = $('#apellidosRegistro').value.trim();
    const email = $('#emailRegistro').value.trim();
    const password = $('#passwordRegistro').value.trim();
    const confirmarPassword = $('#confirmarPassword').value.trim();
    const fechaNacimiento = $('#fechaNacimiento').value;
    const region = $('#regionSelect').value;
    const comuna = $('#comunaSelect').value;
    const direccion = $('#direccion').value.trim();
    
    // Validaciones
    const validaciones = [
        { campo: 'RUN', resultado: validarRUN(run) },
        { campo: 'Email', resultado: validarEmail(email) },
        { campo: 'Password', resultado: validarPassword(password) },
        { campo: 'Nombre', resultado: validarNombre(nombre, 'Nombre') },
        { campo: 'Apellidos', resultado: validarNombre(apellidos, 'Apellidos') },
        { campo: 'Direccion', resultado: validarDireccion(direccion) }
    ];
    
    // Verificar confirmación de contraseña
    if (password !== confirmarPassword) {
        mostrarMensaje('Las contraseñas no coinciden', 'error');
        actualizarEstadoValidacion('Confirm', { valido: false });
        return;
    }
    
    // Verificar campos requeridos
    if (!tipoUsuario) {
        mostrarMensaje('Selecciona un tipo de usuario', 'error');
        return;
    }
    
    if (!region || !comuna) {
        mostrarMensaje('Selecciona región y comuna', 'error');
        return;
    }
    
    // Revisar todas las validaciones
    const errores = validaciones.filter(v => !v.resultado.valido);
    
    if (errores.length > 0) {
        const mensajesError = errores.map(e => `${e.campo}: ${e.resultado.mensaje}`).join('\n');
        mostrarMensaje(`Errores de validación:\n${mensajesError}`, 'error');
        return;
    }
    
    // Crear objeto usuario
    const usuario = {
        run,
        nombre,
        apellidos,
        email,
        password,
        fechaNacimiento: fechaNacimiento || null,
        region,
        comuna,
        direccion
    };
    
    // Guardar usuario
    const resultado = guardarUsuario(usuario);
    
    if (resultado.exito) {
        mostrarMensaje('¡Registro exitoso! Redirigiendo al login...', 'exito');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    } else {
        mostrarMensaje(resultado.mensaje, 'error');
    }
}

function limpiarFormulario() {
    if (confirm('¿Estás seguro de que quieres limpiar el formulario?')) {
        $('#formRegistro').reset();
        $('#mensajesRegistro').innerHTML = '';
        
        // Limpiar estados de validación
        ['RUN', 'Email', 'Password', 'Confirm'].forEach(campo => {
            const elemento = $(`#estado${campo}`);
            if (elemento) {
                elemento.className = 'pill';
                elemento.textContent = 'Sin validar';
            }
        });
        
        // Limpiar select de comunas
        $('#comunaSelect').innerHTML = '<option value="">Primero selecciona región</option>';
        
        console.log('🧹 Formulario limpiado');
    }
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

// Formulario de registro
$('#formRegistro')?.addEventListener('submit', (event) => {
    event.preventDefault();
    procesarRegistro();
});

// Limpiar formulario
$('#btnLimpiarForm')?.addEventListener('click', limpiarFormulario);

// Cambio de región
$('#regionSelect')?.addEventListener('change', (event) => {
    const regionSeleccionada = event.target.value;
    cargarComunas(regionSeleccionada);
    console.log('🌍 Región seleccionada:', regionSeleccionada);
});

// Validación en tiempo real
$('#runRegistro')?.addEventListener('input', (event) => {
    const resultado = validarRUN(event.target.value);
    actualizarEstadoValidacion('RUN', resultado);
});

$('#emailRegistro')?.addEventListener('input', (event) => {
    const resultado = validarEmail(event.target.value);
    actualizarEstadoValidacion('Email', resultado);
});

$('#passwordRegistro')?.addEventListener('input', (event) => {
    const resultado = validarPassword(event.target.value);
    actualizarEstadoValidacion('Password', resultado);
});

$('#confirmarPassword')?.addEventListener('input', (event) => {
    const password = $('#passwordRegistro').value;
    const confirmPassword = event.target.value;
    const coincide = password === confirmPassword && password !== '';
    actualizarEstadoValidacion('Confirm', { valido: coincide });
});

// ============================================================================
// INICIALIZACIÓN
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('📝 Página de registro cargada');
    
    // Cargar regiones
    cargarRegiones();
    
    console.log('✅ Sistema de registro inicializado');
});

// ============================================================================
// FUNCIONES GLOBALES
// ============================================================================

window.validarRUN = validarRUN;
window.validarEmail = validarEmail;
window.procesarRegistro = procesarRegistro;