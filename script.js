

//---------------------------------DESPLEGAR VISOR-------------------------------------
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
            zoom: 4.9
        }),
        target: 'map', // Señalas el contenedor del mapa

        // Agregar controles al mapa
        
    });

    // Event listener para el botón
    document.getElementById('zoomMexicoBtn').addEventListener('click', function() {
        map.getView().animate({
            center: [-102.552784, 23.634501], // Coordenadas de México
            zoom: 5.3, // Nivel de zoom adecuado para abarcar México
            duration: 1000 // Duración de la animación en milisegundos
        });
    });

    map.on('click', function(e) {
        console.log(e);
    })



//MAPAS BASE----------------------------------------------------------
const osm = new ol.layer.Tile({
    source: new ol. source.OSM(),
    visible:true,
    title: 'OSMStandard'
})

const opentopomap = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: 'http://tile.opentopomap.org/{z}/{x}/{y}.png'
    }),
    visible: false,
    title: 'opentopomap'
});

const carto = new ol.layer.Tile({

    source: new ol.source.XYZ({
      url: 'http://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
    }),
    visible: false,
    title: 'Dark'
});


const arcgis = new ol.layer.Tile({

    source: new ol.source.XYZ({
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',

    }),
    visible: false,
    title: 'ESRI Satelital'
});

//  Variable de los Mapas Base
const baseLayerGroup = new ol.layer.Group({
    layers: [
     osm,opentopomap, carto,arcgis
    ]
  })
 map.addLayer(baseLayerGroup);

// ----------ESCALA-GRAFICA---------------------------------
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




//---------------------------MINI MAPA -----------------------------


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


//-----------------------PANTALLA COMPLETA--------------------------------------------
  const fullScreenControl = new ol.control.FullScreen({
    // Opciones de configuración del FullScreen
    tipLabel: 'Pantalla completa' // Etiqueta al pasar el mouse
  });
  map.addControl(fullScreenControl);
 




//-----------------------------MAPAS BASE sWICHER-------------------------------------
document.querySelectorAll('.map-base-selector').forEach((img) => {
    img.addEventListener('click', function() {
        // Resaltar la imagen seleccionada
        document.querySelectorAll('.map-base-selector').forEach(i => i.classList.remove('selected'));
        this.classList.add('selected');

        // Obtener el valor de la capa seleccionada
        const selectedValue = this.getAttribute('data-value');

        // Cambiar la capa base asegurándose de que solo una esté activa a la vez
        baseLayerGroup.getLayers().forEach((layer) => {
            let layerTitle = layer.get('title');
            // Si el título de la capa coincide con el valor seleccionado, muestra la capa
            // De lo contrario, oculta la capa
            layer.setVisible(layerTitle === selectedValue);
        });
    });
});


//-------------------------------------CAPAS-----------------------------------------

var wmsSourceUrl = 'http://localhost:8080/geoserver/GEOPORTAL/wms';

//--AerodromosyHelipuertos
var DEM30 = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: wmsSourceUrl,
        params: { 'LAYERS': 'GEOPORTAL:DEM30', 'TILED': true }
    }),
    title: 'DEM30',
    visible: false
});


 





var AerodromosyHelipuertos = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: wmsSourceUrl,
        params: { 'LAYERS': 'GEOPORTAL:AerodromosyHelipuertos', 'TILED': true }
    }),
    title: 'AerodromosyHelipuertos',
    visible: false
});

// Zonas Urbanas
var zonasUrbanas = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: wmsSourceUrl,
        params: { 'LAYERS': 'GEOPORTAL:ZonasUrbanas', 'TILED': true }
    }),
    title: 'ZonasUrbanas',
    visible: false
});

// Volcanes
var Volcanes = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: wmsSourceUrl,
        params: { 'LAYERS': 'GEOPORTAL:Volcanes', 'TILED': true }
    }),
    title: 'Volcanes'
    ,
    visible: false
});

// Regiones Aéreas Militares
var RegionesAereasMilitares = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: wmsSourceUrl,
        params: { 'LAYERS': 'GEOPORTAL:RegionesAereasMilitares', 'TILED': true }
    }),
    title: 'RegionesAereasMilitares',
    visible: false
});

// Municipios
var Municipios = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: wmsSourceUrl,
        params: { 'LAYERS': 'GEOPORTAL:Municipios', 'TILED': true }
    }),
    title: 'Municipios',
    visible: false
});

// Estatales
var Estatales = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: wmsSourceUrl,
        params: { 'LAYERS': 'GEOPORTAL:Estatales', 'TILED': true }
    }),
    title: 'Estatales',
    visible: false
});

// Curvas de Nivel
var CurvasNivel = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/GEOPORTAL/wms?service=WMS&version=1.1.0&request=GetMap&layers=GEOPORTAL%3ACurvasNivel&bbox=-117.10569942499995%2C14.895713890000025%2C-88.86093502799999%2C32.64463432800005&width=768&height=482&srs=EPSG%3A4326&styles=&format=application/openlayers',
        params: { 'LAYERS': 'GEOPORTAL:CurvasNivel', 'TILED': true }
    }),
    title: 'Curvas de Nivel',
    visible: false
});



// Aeropuertos Militares
var AeropuertosMilitares = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: wmsSourceUrl,
        params: { 'LAYERS': 'GEOPORTAL:AeropuertosMilitares', 'TILED': true }
    }),
    title: 'AeropuertosMilitares',
    visible: false
});

// Aeropuertos
var Aeropuertos = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: wmsSourceUrl,
        params: { 'LAYERS': 'GEOPORTAL:Aeropuertos', 'TILED': true }
    }),
    title: 'Aeropuertos',
    visible: false
});



// Espacio Aéreo
var EspacioAereo = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: wmsSourceUrl,
        params: { 'LAYERS': 'GEOPORTAL:Espacio_Aereo', 'TILED': true }
    }),
    title: 'EspacioAereo',
    visible: false
});







// Añadir las capas al mapa
map.addLayer(DEM30);
map.addLayer(EspacioAereo);
map.addLayer(RegionesAereasMilitares);
map.addLayer(Municipios);
map.addLayer(Estatales);
map.addLayer(AerodromosyHelipuertos);
map.addLayer(zonasUrbanas);
map.addLayer(Volcanes);
map.addLayer(CurvasNivel);

map.addLayer(AeropuertosMilitares);
map.addLayer(Aeropuertos);



document.getElementById('DEM30').addEventListener('change', function() {
    DEM30.setVisible(this.checked);


    
});



document.getElementById('ZonasUrbanas').addEventListener('change', function() {
    zonasUrbanas.setVisible(this.checked);
});



document.getElementById('AerodromosyHelipuertos').addEventListener('change', function() {
    AerodromosyHelipuertos.setVisible(this.checked);
});
document.getElementById('Volcanes').addEventListener('change', function() {
    Volcanes.setVisible(this.checked);
});
document.getElementById('RegionesAereasMilitares').addEventListener('change', function() {
    RegionesAereasMilitares.setVisible(this.checked);
});
document.getElementById('Municipios').addEventListener('change', function() {
    Municipios.setVisible(this.checked);
});
document.getElementById('Estatales').addEventListener('change', function() {
    Estatales.setVisible(this.checked);
});

document.getElementById('CurvasNivel').addEventListener('change', function() {
    CurvasNivel.setVisible(this.checked);
  
});





document.getElementById('aplicarFiltro').addEventListener('click', function() {
    var altura = document.getElementById('alturaInput').value;
    var nuevoFiltro = 'CONTOUR > ' + altura;
    CurvasNivel.getSource().updateParams({'CQL_FILTER': nuevoFiltro});
});








document.getElementById('AeropuertosMilitares').addEventListener('change', function() {
    AeropuertosMilitares.setVisible(this.checked);
});

document.getElementById('Aeropuertos').addEventListener('change', function() {
    Aeropuertos.setVisible(this.checked);
});
document.getElementById('EspacioAereo').addEventListener('change', function() {
    EspacioAereo.setVisible(this.checked);
});


//--------------------------------------------CREAR CAPA CON UN PUNTO--------------------------------------------------------


var vectorSource = new ol.source.Vector({});
var vectorLayer = new ol.layer.Vector({
  source: vectorSource
});
map.addLayer(vectorLayer);



//--------------------BOTON AÑADIR PUNTO ------------------------------------
var addPointMode = false; // Estado inicial del modo para añadir puntos

// Activar o desactivar modo de edición
document.getElementById('addPointBtn').addEventListener('click', function() {
  addPointMode = !addPointMode; // Alternar modo entre true y false
  
  // Opcional: Actualizar el texto del botón para reflejar el estado actual
  this.textContent = addPointMode ? "Cancelar Añadir Punto" : "Añadir Punto";
});


//Cambia el  color del boton hasta hacer click d enuevo 
document.getElementById('addPointBtn').addEventListener('click', function() {
    this.classList.toggle('clicked');

    
  });

  
// Solo permite poner un punto
map.on('singleclick', function(evt) {
    if (addPointMode) {
      vectorSource.clear(); // Limpia la fuente vectorial antes de añadir un nuevo punto
      var point = new ol.geom.Point(evt.coordinate);
      var pointFeature = new ol.Feature(point);
      vectorSource.addFeature(pointFeature);
    }
  });
  
document.getElementById('layerVisibility').addEventListener('change', function() {
  vectorLayer.setVisible(this.checked);
});

//eliminar capa de punto--------------------------------------
document.getElementById('removeLayerBtn').addEventListener('click', function() {
    vectorSource.clear(); // Limpia la fuente vectorial, eliminando todos los puntos
  });


//-------AGREGAR PUNTO POR COORDENADAS--------------------------------
        // Función para convertir GMS a grados decimales
function GMS_to_decimal(degrees, minutes, seconds) {
    var decimal = Math.abs(degrees) + minutes / 60 + seconds / 3600;
    return degrees < 0 ? -decimal : decimal;
}

        // Event listener para el botón de añadir punto por coordenadas GMS
document.getElementById('addPointByGMSBtn').addEventListener('click', function() {
    var latDegrees = parseFloat(document.getElementById('latDegrees').value);
    var latMinutes = parseFloat(document.getElementById('latMinutes').value);
    var latSeconds = parseFloat(document.getElementById('latSeconds').value);

    var lonDegrees = parseFloat(document.getElementById('lonDegrees').value);
    var lonMinutes = parseFloat(document.getElementById('lonMinutes').value);
    var lonSeconds = parseFloat(document.getElementById('lonSeconds').value);

         // Convertir GMS a decimal
    var latDecimal = GMS_to_decimal(latDegrees, latMinutes, latSeconds);
    var lonDecimal = GMS_to_decimal(lonDegrees, lonMinutes, lonSeconds);

         // Verificar validez de las conversiones
    if (!isNaN(latDecimal) && !isNaN(lonDecimal)) {
        // Crear el punto y la característica (feature)
        var pointFeature = new ol.Feature(new ol.geom.Point([lonDecimal, latDecimal]));
        // Añadir el punto a la fuente vectorial existente
        vectorSource.clear();
        vectorSource.addFeature(pointFeature);
    } else {
        alert('Por favor, ingresa valores válidos para latitud y longitud.');
    }
});

//-------HACER ZOOM A CAPA DE PUNTO---------------
document.getElementById('zoomToSpecificLevelBtn').addEventListener('click', function() {
    if (vectorSource.getFeatures().length > 0) {
        // Calcula el extent que contiene todos los features de la fuente vectorial
        var layerExtent = vectorSource.getExtent();
        // Calcula el centro del extent
        var center = ol.extent.getCenter(layerExtent);

        // Establece el centro de la vista al centro del extent y un nivel de zoom específico
        map.getView().animate({
            center: center,
            zoom: 10, // Ajusta este valor según necesites
            duration: 1000 // Duración de la animación en milisegundos
        });
    } else {
        alert('No hay puntos en la capa para hacer zoom.');
    }
});



// crear buffers.--------------------------------------

document.getElementById('createBuffer').addEventListener('click', function() {
    var distanceInMeters = parseFloat(document.getElementById('bufferDistance').value);

    // Obtiene el último punto añadido a la fuente vectorial
    var lastPointFeature = vectorSource.getFeatures()[vectorSource.getFeatures().length - 1];
    var pointCoordinates = lastPointFeature.getGeometry().getCoordinates();

    var circleGeometry = new ol.geom.Circle(pointCoordinates, distanceInMeters / 111319.488); // Aproximación en EPSG:4326
    var bufferFeature = new ol.Feature(circleGeometry);

    // Si existe una capa de buffer, la actualiza; si no, la crea
    if (window.bufferLayer) {
        window.bufferLayer.getSource().clear(); // Limpia la capa existente
        window.bufferLayer.getSource().addFeature(bufferFeature);
    } else {
        window.bufferLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [bufferFeature],
            }),
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'red',
                    width: 2,
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(0, 0, 255, 0.1)',
                }),
            }),
        });
        map.addLayer(window.bufferLayer);
    }
});
//ELIMINAR BUFFER
document.getElementById('limpiarBuffer').addEventListener('click', function() {
    if (window.bufferLayer) {
        map.removeLayer(window.bufferLayer); // Elimina la capa de buffer del mapa
        window.bufferLayer = null; // Opcional: establecer la variable a null para limpieza
    }
});








}
//--------------------------------------- FIN DEL MAPA---------------------

//--------------Barra para hacer mas grande o chico los contenedores-----
document.addEventListener('DOMContentLoaded', function() {
    const dragger = document.getElementById('dragger');
    const herramientas = document.getElementById('herramientas');
    const container = document.getElementById('container');
    let isResizing = false;
  
    dragger.addEventListener('mousedown', function(e) {
      e.preventDefault();
      isResizing = true;
      let startX = e.clientX;
      let startWidth = herramientas.offsetWidth;
  
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
  
      function onMouseMove(e) {
        if (!isResizing) return;
        // Calcula la diferencia de movimiento
        const dx = e.clientX - startX;
        // Calcula el nuevo ancho basado en el movimiento inicial y el desplazamiento
        let newWidth = startWidth + dx;
        
        // Convierte el 17% del contenedor padre a píxeles para el mínimo ancho
        const minWidth = container.offsetWidth * 0.17;
        // Ajusta el nuevo ancho para que no sea menor que el 17% del contenedor padre
        newWidth = Math.max(newWidth, minWidth);
        // Asegúrate también de que 'herramientas' no ocupe más del contenedor menos el mínimo permitido para el otro pane
        newWidth = Math.min(newWidth, container.offsetWidth - minWidth);
  
        herramientas.style.width = `${newWidth}px`;
      }
  
      function onMouseUp() {
        // Detiene el redimensionamiento
        isResizing = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
    });
  });

  



  document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton');
    const herramientas = document.getElementById('herramientas');
    // Almacena el estilo de visualización original de "herramientas"
    let displayStyleOriginal = window.getComputedStyle(herramientas).display;
  
    toggleButton.addEventListener('click', function() {
      if (herramientas.style.display !== 'none') {
        herramientas.style.display = 'none'; // Oculta "herramientas"
        toggleButton.textContent = 'I';
      } else {
        // Restablece el contenedor "herramientas" a su estilo de visualización original
        herramientas.style.display = displayStyleOriginal;
        toggleButton.textContent = 'I';
      }
    });
  });
  