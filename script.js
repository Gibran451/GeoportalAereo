function cambiarContenido(num) {
    // Ocultar ambos contenidos
    document.getElementById('contenido-1').style.display = 'none';
    document.getElementById('contenido-2').style.display = 'none';
    
    // Mostrar contenido relevante
    document.getElementById('contenido-' + num).style.display = 'block';
}

function cambiarEstructura() {
    var map = document.getElementById('map');
    var visor = document.getElementById('visor');
    var contenido1 = document.getElementById('contenido-1');
    var contenido2 = document.getElementById('contenido-2');

    // Cambiar tamaño de map y visibilidad de visor
    if (visor.classList.contains('oculto')) {
        map.style.flex = '1';
        visor.classList.remove('oculto');
        contenido1.classList.add('mostrar');
        contenido2.classList.add('mostrar');
    } else {
        map.style.flex = '3';
        visor.classList.add('oculto');
        contenido1.classList.remove('mostrar');
        contenido2.classList.remove('mostrar');
    }
}

// Inicializar con el botón 1 activo
cambiarContenido(1);

function cambiarContenido(num) {
    // Ocultar ambos contenidos
    document.getElementById('contenido-1').style.display = 'none';
    document.getElementById('contenido-2').style.display = 'none';
    
    // Mostrar contenido relevante
    document.getElementById('contenido-' + num).style.display = 'block';
}

function cambiarEstructura() {
    var map = document.getElementById('map');
    var visor = document.getElementById('visor');
    var replicaBotones = document.getElementById('replica-botones');

    if (visor.classList.contains('oculto')) {
        // Cambiar el tamaño del mapa y mostrar el visor
        map.style.flex = '1';
        visor.classList.remove('oculto');
        replicaBotones.innerHTML = ''; // Limpiar la réplica de botones
        replicaBotones.classList.remove('oculto');

        // Clonar botones
        var boton1 = document.querySelector('button[onclick="cambiarContenido(1)"]').cloneNode(true);
        var boton2 = document.querySelector('button[onclick="cambiarContenido(2)"]').cloneNode(true);

        // Agregar botones clonados al div de réplica
        replicaBotones.appendChild(boton1);
        replicaBotones.appendChild(boton2);

    } else {
        cerrarVisor();
    }
}

function cerrarVisor() {
    var map = document.getElementById('map');
    var visor = document.getElementById('visor');
    var replicaBotones = document.getElementById('replica-botones');

    // Restaurar el tamaño original del mapa y ocultar el visor
    map.style.flex = '3';
    visor.classList.add('oculto');
    replicaBotones.classList.add('oculto');
}

// Inicializar con el botón 1 activo
cambiarContenido(1);



