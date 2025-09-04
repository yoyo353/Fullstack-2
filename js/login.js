// ============================================================================
// GAMERZONE - LOGIN.JS
// JavaScript para la página de inicio de sesión
// ============================================================================

// Selector como en clases
export const $ = (sel) => document.querySelector(sel);

// ============================================================================
// FUNCIONES DE VALIDACIÓN (siguiendo requerimientos)
// ============================================================================

// Validar email según dominios permitidos
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

// Validar contraseña según requerimientos
function validarPassword(password) {
    if (!password || password.trim() === '') {
        return { valido: false, mensaje: 'La contraseña es requerida' };
    }
    
    if (password.length < 4) {
        return { valido: false, mensaje: 'La contraseña debe tener mínimo 4 caracteres' };
    }
    
    if (password.length > 10) {
        return { valido: false, mensaje: 'La contraseña debe tener máximo 10 caracteres' };
    }
    
    return { valido: true, mensaje: 'Contraseña válida' };
}

// ============================================================================
// FUNCIONES DE LOCALSTORAGE
// ============================================================================

// Obtener usuarios registrados desde localStorage
function obtenerUsuarios() {
    const usuarios = localStorage.getItem('gamerzone_usuarios');
    return usuarios ? JSON.parse(usuarios) : [];
}

// Guardar usuario en localStorage
function guardarUsuario(usuario) {
    const usuarios = obtenerUsuarios();
    usuarios.push(usuario);
    localStorage.setItem('gamerzone_usuarios', JSON.stringify(usuarios));
}

// Guardar sesión actual
function guardarSesion(usuario) {
    const sesion = {
        email: usuario.email,
        tipo: usuario.tipo,
        fechaLogin: new Date().toISOString(),
        activa: true
    };
    localStorage.setItem('gamerzone_sesion', JSON.stringify(sesion));
    console.log('✅ Sesión guardada:', sesion);
}

// Obtener sesión actual
function obtenerSesion() {
    const sesion = localStorage.getItem('gamerzone_sesion');
    return sesion ? JSON.parse(sesion) : null;
}

// Cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('gamerzone_sesion');
    console.log('🔓 Sesión cerrada');
}

// ============================================================================
// FUNCIONES DE AUTENTICACIÓN
// ============================================================================

// Buscar usuario por email y password
function buscarUsuario(email, password) {
    const usuarios = obtenerUsuarios();
    return usuarios.find(user => 
        user.email.toLowerCase() === email.toLowerCase() && 
        user.password === password
    );
}

// Procesar inicio de sesión
function procesarLogin(email, password) {
    console.log('🔐 Procesando login para:', email);
    
    // Validar campos
    const validacionEmail = validarEmail(email);
    if (!validacionEmail.valido) {
        return { exito: false, mensaje: validacionEmail.mensaje };
    }
    
    const validacionPassword = validarPassword(password);
    if (!validacionPassword.valido) {
        return { exito: false, mensaje: validacionPassword.mensaje };
    }
    
    // Buscar usuario
    const usuario = buscarUsuario(email, password);
    if (!usuario) {
        return { exito: false, mensaje: 'Email o contraseña incorrectos' };
    }
    
    // Login exitoso
    guardarSesion(usuario);
    // Guardar nombre del usuario para mostrar en la UI principal
    localStorage.setItem('usuarioLogueado', usuario.nombre);
    return { 
        exito: true, 
        mensaje: `¡Bienvenido, ${usuario.nombre}!`,
        usuario: usuario
    };
}

// ============================================================================
// FUNCIONES DE INTERFAZ
// ============================================================================

// Mostrar mensaje en la interfaz
function mostrarMensaje(mensaje, tipo = 'info') {
    const contenedor = $('#mensajesLogin');
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
                    border-radius: var(--radius-sm); border: 1px solid var(--border-primary);">
            ${icono} ${mensaje}
        </div>
    `;
}

// Actualizar información del sistema
function actualizarInfoSistema() {
    const usuarios = obtenerUsuarios();
    const sesion = obtenerSesion();
    
    const contadorUsuarios = $('#usuariosRegistrados');
    const ultimaSesion = $('#ultimaSesion');
    
    if (contadorUsuarios) {
        contadorUsuarios.textContent = usuarios.length;
    }
    
    if (ultimaSesion) {
        if (sesion) {
            const fecha = new Date(sesion.fechaLogin).toLocaleString('es-CL');
            ultimaSesion.textContent = `${sesion.email} (${fecha})`;
        } else {
            ultimaSesion.textContent = 'Ninguna';
        }
    }
}

// Redirigir según tipo de usuario
function redirigirUsuario(usuario) {
    console.log('🔀 Redirigiendo usuario tipo:', usuario.tipo);
    
    setTimeout(() => {
        switch (usuario.tipo) {
            case 'Administrador':
                window.location.href = 'admin/index.html';
                break;
            case 'Vendedor':
                window.location.href = 'admin/index.html';
                break;
            case 'Cliente':
            default:
                window.location.href = 'index.html';
                break;
        }
    }, 2000); // Esperar 2 segundos para mostrar mensaje
}

// ============================================================================
// FUNCIONES DE DATOS DE PRUEBA
// ============================================================================

// Cargar usuarios de prueba
function cargarUsuariosPrueba() {
    const usuariosPrueba = [
        {
            id: 1,
            run: '12345678K',
            nombre: 'Admin',
            apellidos: 'Sistema',
            email: 'admin@duoc.cl',
            password: 'admin123',
            tipo: 'Administrador',
            fechaRegistro: new Date().toISOString()
        },
        {
            id: 2,
            run: '87654321J',
            nombre: 'Cliente',
            apellidos: 'Prueba',
            email: 'cliente@duoc.cl',
            password: 'cliente123',
            tipo: 'Cliente',
            fechaRegistro: new Date().toISOString()
        },
        {
            id: 3,
            run: '11111111K',
            nombre: 'Vendedor',
            apellidos: 'Prueba',
            email: 'vendedor@duoc.cl',
            password: 'vendedor123',
            tipo: 'Vendedor',
            fechaRegistro: new Date().toISOString()
        }
    ];
    
    // Limpiar usuarios existentes
    localStorage.setItem('gamerzone_usuarios', JSON.stringify(usuariosPrueba));
    
    console.log('✅ Usuarios de prueba cargados:', usuariosPrueba.length);
    mostrarMensaje('Usuarios de prueba cargados correctamente', 'exito');
    actualizarInfoSistema();
}

// Limpiar datos de localStorage
function limpiarDatos() {
    if (confirm('¿Estás seguro de que quieres limpiar todos los datos?')) {
        localStorage.removeItem('gamerzone_usuarios');
        localStorage.removeItem('gamerzone_sesion');
        
        console.log('🗑️ Datos limpiados');
        mostrarMensaje('Datos limpiados correctamente', 'warning');
        actualizarInfoSistema();
    }
}

// ============================================================================
// EVENT LISTENERS (siguiendo patrón de clases)
// ============================================================================

// Procesar formulario de login
$('#formLogin')?.addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar envío normal del formulario
    
    const email = $('#emailLogin').value.trim();
    const password = $('#passwordLogin').value.trim();
    
    console.log('📝 Datos del formulario:', { email, password: '***' });
    
    if (!email || !password) {
        mostrarMensaje('Por favor completa todos los campos', 'error');
        return;
    }
    
    const resultado = procesarLogin(email, password);
    
    if (resultado.exito) {
        mostrarMensaje(resultado.mensaje, 'exito');
        redirigirUsuario(resultado.usuario);
    } else {
        mostrarMensaje(resultado.mensaje, 'error');
    }
});

// Cargar datos de prueba
$('#btnCargarDatosPrueba')?.addEventListener('click', cargarUsuariosPrueba);

// Limpiar datos
$('#btnLimpiarDatos')?.addEventListener('click', limpiarDatos);

// ============================================================================
// INICIALIZACIÓN
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🔐 Página de login cargada');
    
    // Verificar si ya hay sesión activa
    const sesionActiva = obtenerSesion();
    if (sesionActiva) {
        console.log('ℹ️ Sesión activa detectada:', sesionActiva.email);
        mostrarMensaje(`Ya tienes una sesión activa como ${sesionActiva.email}`, 'info');
    }
    
    // Cargar usuarios de prueba si no existen
    const usuarios = obtenerUsuarios();
    if (usuarios.length === 0) {
        console.log('📋 No hay usuarios, cargando datos de prueba...');
        cargarUsuariosPrueba();
    }
    
    // Actualizar información del sistema
    actualizarInfoSistema();
    
    console.log('✅ Sistema de login inicializado');
});

// ============================================================================
// FUNCIONES GLOBALES
// ============================================================================

// Hacer funciones disponibles globalmente
window.validarEmail = validarEmail;
window.validarPassword = validarPassword;
window.procesarLogin = procesarLogin;