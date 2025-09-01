export const $ = (sel) => document.querySelector(sel);

const outSaludo = $('#outSaludo');
const outEventos = $('#outEventos');

$('#btnSaludar').addEventListener(
    'click', () => {
        const nombre = $('#nombre').value.trim();
        const edad = Number($('#edad').value);

        if(!nombre)
        {
            outSaludo.textContent = 'Ingrese un nombre. \u26A0\uFE0F';
            return;
        }
        if(Number.isNaN(edad) || edad < 1)
        {
            outSaludo.textContent = 'Ingrese una edad válida. \u26A0\uFE0F';
            return;

        }
        const estado = edad >= 18 ? 'mayor de edad':'menor de edad';
        outSaludo.textContent = `Hola, ${nombre}. Tienes ${edad} años y eres ${estado}`;
    }
);

$('#btnAgregar').addEventListener(
    'click', () => 
    {
        const texto = $('#txtItem').value.trim();
        if(!texto) return;

        const li = document.createElement('li');
        li.textContent = texto;

        const del = document.createElement('button');
        del.textContent = 'Eliminar';
        del.className = 'pill';

        del.dataset.action = 'eliminar';

        del.addEventListener('click',() => {li.remove();});

        li.appendChild(del);
        $('#lista').appendChild(li);

        $('#txtItem').value = '';
        $('#txtItem').focus();

    }
);

$('#panel').addEventListener(
    'click',
    (event) => {
        const btn = event.target.closest('button[data-action]');
        if(!btn) return;
        const action = btn.dataset.action;
        switch(action)
        {
            case 'info': outEventos.textContent += '\u2139\uFE0F Información \n'; break;
            case 'ok': outEventos.textContent += '\u2705 OK \n'; break;
            case 'warn': outEventos.textContent += '\u26A0\uFE0F Warning!!! \n'; break;
            case 'error': outEventos.textContent += '\u274C Error!! \n'; break;

        }
    }
);