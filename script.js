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


//--------------------BOTON---------------------------------
// Seleccionar botones por la clase correcta
const buttons = document.querySelectorAll('.myButton');

// Agregar un event listener a cada botón
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Comprobar si el botón ya tiene la clase 'buttonActive'
        if (button.classList.contains('buttonActive')) {
            button.classList.remove('buttonActive'); // Si la tiene, remuévela
        } else {
            button.classList.add('buttonActive'); // Si no la tiene, agrégala
        }
    });
});

//APAGAR BOTON ANTERIOR
document.querySelectorAll('.myButton').forEach(button => {
    button.addEventListener('click', function() {
        // "Apagar" todos los botones removiendo la clase 'buttonActive'
        document.querySelectorAll('.myButton').forEach(b => {
            b.classList.remove('buttonActive');
        });
        
        // "Encender" el botón clickeado añadiendo la clase 'buttonActive'
        this.classList.add('buttonActive');
    });
});
//.-----------------------------------------------------------
window.onload = init;

function init() {
    const map = new ol.Map({
        view: new ol.View({
            center: [0, 0],
            zoom: 2 // Corregido de 'zoo' a 'zoom'
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        target: 'map' // Corregido de 'tarjet' a 'target'
    });
}
