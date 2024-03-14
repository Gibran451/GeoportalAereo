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
//.----------------------------------------------------------- MAPA----------------------------------------------------
window.onload = init;

function init() {
    const map = new ol.Map({
        view: new ol.View({
            projection: 'EPSG:4326',
            center: [-102.552784, 23.634501], // Centro en México
            zoom: 5
        }),
        target: 'map', // Señalas el contenedor del mapa

        // Agregar controles al mapa
        
    });

    // Event listener para el botón
    document.getElementById('zoomMexicoBtn').addEventListener('click', function() {
        map.getView().animate({
            center: [-102.552784, 23.634501], // Coordenadas de México
            zoom: 5, // Nivel de zoom adecuado para abarcar México
            duration: 1000 // Duración de la animación en milisegundos
        });
    });

    map.on('click', function(e) {
        console.log(e);
    })



//MAPAS BASE----------------------------------------------------------
const osm = new ol.layer.Tile({
    source: new ol. source.OSM(),
    visible:  true,
    title: 'OSMStandard'
})

const opentopomap = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: 'http://tile.opentopomap.org/{z}/{x}/{y}.png'
    }),
    visible: true,
    title: 'opentopomap'
});

const carto = new ol.layer.Tile({

    source: new ol.source.XYZ({
      url: 'http://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
    }),
    visible: true,
    title: 'Dark'
});


const arcgis = new ol.layer.Tile({

    source: new ol.source.XYZ({
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',

    }),
    visible: true,
    title: 'ESRI Satelital'
});


//ESCALA_-----------

// Layer Group
const baseLayerGroup = new ol.layer.Group({
    layers: [
     osm,opentopomap, carto,arcgis
    ]
  })
 map.addLayer(baseLayerGroup);
 
// ----------ESCALA
const scaleControl = new ol.control.ScaleLine({
    units: 'metric'
});
map.addControl(scaleControl);

// Cambiar la posición del control ScaleLine
const scaleLineElement = document.querySelector('.ol-scale-line');
scaleLineElement.style.bottom = 'auto';
scaleLineElement.style.top = '95%';
scaleLineElement.style.left = 'auto';
scaleLineElement.style.right = '10px';




//----------------MINI MAPA ----


const overviewMapControl = new ol.control.OverviewMap({
    // Opciones de configuración del OverviewMap
    collapsed: false, // Muestra el minimapa expandido
    layers: [new ol.layer.Tile({
      source: new ol.source.OSM()
    })], // Capa base para el minimapa
    className: 'ol-overviewmap', // Clase CSS para personalizar el estilo
   
  });
  
  // Añadir el control al mapa
  map.addControl(overviewMapControl);
  
  // Cambiar la posición del minimapa
  // Puedes añadir tu propia clase CSS con las propiedades deseadas
  document.querySelector('.ol-overviewmap').style.bottom = '10px';
  document.querySelector('.ol-overviewmap').style.top = 'auto';
  document.querySelector('.ol-overviewmap').style.left = '10px';
  document.querySelector('.ol-overviewmap').style.right = 'auto';


  //PANTALLA COMPLETA--------------------------------------------
  const fullScreenControl = new ol.control.FullScreen({
    // Opciones de configuración del FullScreen
    tipLabel: 'Pantalla completa' // Etiqueta al pasar el mouse
  });
  map.addControl(fullScreenControl);
 




//MAPAS BASE sWICHER-------------------------------------
document.querySelectorAll('.map-base-selector').forEach((img) => {
    img.addEventListener('click', function() {
        // Resaltar la imagen seleccionada
        document.querySelectorAll('.map-base-selector').forEach(i => i.classList.remove('selected'));
        this.classList.add('selected');

        // Cambiar la capa base
        baseLayerGroup.getLayers().forEach((layer) => {
            let layerTitle = layer.get('title');
            layer.setVisible(layerTitle === this.getAttribute('data-value'));
        });
    });
});

}

