
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


function cerrarVisor() {
    // Restaurar el tamaño original del mapa y ocultar el visor
    map.style.flex = '3';
    visor.classList.add('oculto');
  
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
        target: 'map', // Contenedor del mapa

        
    });

    // Event listener para el botón zoom Mexico
    document.getElementById('zoomMexicoBtn').addEventListener('click', function() {
        map.getView().animate({
            center: [-102.552784, 23.634501], // Coordenadas de México
            zoom: 5.3, // Nivel de zoom 
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
 
  });
  
  // Añadir el control al mapa
  map.addControl(overviewMapControl);
  
  // Cambiar la posición del minimapa

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


 



// -----------------AerodromosyHelipuertoss-----------------------------------
var source = new ol.source.Vector({
    url: 'http://localhost:8080/geoserver/GEOPORTAL/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=GEOPORTAL%3AAerodromosyHelipuertos&outputFormat=application/json',
    format: new ol.format.GeoJSON(),
    attributions: '@geoserver'
});

// Crear la fuente de datos de agrupaciones
var clusterSource = new ol.source.Cluster({
    distance: 60,
    source: source
});

// Crear la capa de agrupaciones
var AerodromosyHelipuertos  = new ol.layer.Vector({
    source: clusterSource,
    style: function(feature) {
        var size = feature.get('features').length;
        var style = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 17,
                stroke: new ol.style.Stroke({
                    color: '#1a2f4e;'
                }),
                fill: new ol.style.Fill({
                    color: '#19af8a'
                })
            }),
            text: new ol.style.Text({
                text: size.toString(),
                fill: new ol.style.Fill({
                    color: '#ffffff;'
                })
            })
        });
        return style;
    },
    title: 'AerodromosyHelipuertos ',
    visible: false
});

//----------------FIN CAPA AERODROMOS Y HELIPUERTOS----------------------------



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
var AeropuertosMilitares = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'http://localhost:8080/geoserver/GEOPORTAL/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=GEOPORTAL%3AAeropuertosMilitares&maxFeatures=50&outputFormat=application/json',
        format: new ol.format.GeoJSON(),
        attributions: '@geoserver'
    }),
    style: new ol.style.Style({
        image: new ol.style.Icon({
            src: './ICONOS/AeropuertoMilitar.png',

            scale: 0.3
        })
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


var bounds = ol.proj.transformExtent([-121.35, 9.5, -83.94, 32.65], 'EPSG:4326', 'EPSG:3857');
// Imagenes RGB de nubosidad
 var imageLayer = new ol.layer.Image({
    source: new ol.source.ImageStatic({
        url: generarUrlImagenBasadaEnHoraUTC(),
        projection: 'EPSG:3857',
        
        imageExtent: bounds
    }),
    opacity:.6, 
    visible:false
});





// Añadir las capas al mapa

map.addLayer(EspacioAereo);
map.addLayer(RegionesAereasMilitares);
map.addLayer(Municipios);
map.addLayer(Estatales);
map.addLayer(AerodromosyHelipuertos);
map.addLayer(zonasUrbanas);
map.addLayer(Volcanes);
map.addLayer(CurvasNivel);
map.addLayer(imageLayer);
map.addLayer(AeropuertosMilitares);
map.addLayer(Aeropuertos);

// Posicion de las capas en z

DEM30.setZIndex(2);
EspacioAereo.setZIndex(1);
RegionesAereasMilitares.setZIndex(3);
Municipios.setZIndex(5);
Estatales.setZIndex(4);
zonasUrbanas.setZIndex(6);
Volcanes.setZIndex(9);
CurvasNivel.setZIndex(7);
Aeropuertos.setZIndex(8);
imageLayer.setZIndex(0);
AerodromosyHelipuertos.setZIndex(9);


// Funcion Swicher  de las capas
document.getElementById('elevationLayer').addEventListener('change', function() {
    elevationLayer.setVisible(this.checked);

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

//Filtro para curvas de nivel
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

//-------SWITCH PARA CAPA DE NUBES---------------------

var isLayerActive = true;

document.getElementById('myImage').addEventListener('click', function () {
    // Cambia el estado de la capa
    isLayerActive = !isLayerActive;
    imageLayer.setVisible(isLayerActive);
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
  
//Actualizar el texto del botón para reflejar el estado actual
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

//Boton para eliminar capa de punto--------------------------------------
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
        window.bufferLayer = null; //Establecer la variable a null para limpieza
    }
});


//----------------simbologia

const vectorSource2 = new ol.source.Vector();
const vectorLayer2 = new ol.layer.Vector({
    source: vectorSource2,
});
map.addLayer(vectorLayer2);

let selectedIcon = null;
let draw = null;

// Evento al hacer clic en un icono
const iconContainer = document.getElementById('icon-container');
iconContainer.addEventListener('click', function (event) {
    if (event.target.tagName === 'IMG') {
        selectedIcon = event.target.src;
        addPointInteraction();
    }
});


// Evento al hacer clic en el botón "Limpiar Capa"
const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', function () {
    vectorSource2.clear();
});

// Evento al hacer clic en el botón "Terminar Edición"
const finishButton = document.getElementById('finishButton');
finishButton.addEventListener('click', function () {
    // Desactiva la interacción de dibujo
    draw.setActive(false);
});

function addPointInteraction() {
    // Desactiva la interacción de dibujo si ya está activa
    if (draw) {
        draw.setActive(false);
    }

    // Activa la interacción de dibujo para colocar puntos en el mapa
    draw = new ol.interaction.Draw({
        source: vectorSource2,
        type: 'Point',
    });

    draw.on('drawstart', function (event) {
        // Muestra el símbolo seleccionado en lugar de un punto
        event.feature.setStyle(new ol.style.Style({
            image: new ol.style.Icon({
                src: selectedIcon,
                scale: 0.3,
            }),
        }));
    });

    map.addInteraction(draw);
}







// Agrega la capa de MDE de AWS
const elevationLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: 'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png',
      crossOrigin: 'anonymous',
      
    }),

    visible: false,
    opacity: 0.4   
  });
  
  // Agrega la capa de MDE al mapa
  map.addLayer(elevationLayer);

  


















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
        toggleButton.textContent = '»';
      } else {
        // Restablece el contenedor "herramientas" a su estilo de visualización original
        herramientas.style.display = displayStyleOriginal;
        toggleButton.textContent = '«';
      }
    });
  });
  



  //--------------------------CAPA NUBES-----------------
//-------------------Filtrar la descarga de imagen por el nombre----

  function generarUrlImagenBasadaEnHoraUTC() {
    // Obtiene la fecha y hora actual en UTC
    const ahora = new Date(); // Fecha actual en hora local
    const ahoraUTC = new Date(ahora.getUTCFullYear(), ahora.getUTCMonth(), ahora.getUTCDate(), ahora.getUTCHours(), ahora.getUTCMinutes(), ahora.getUTCSeconds());

    let año = ahoraUTC.getFullYear();
    let mes = String(ahoraUTC.getMonth() + 1).padStart(2, '0'); // getMonth() es 0-index
    let dia = String(ahoraUTC.getDate()).padStart(2, '0');
    let hora = ahoraUTC.getHours();
    let minutos = ahoraUTC.getMinutes();

 
    if (minutos >= 55) {
        // Si los minutos son mayores o iguales a 55, establece los minutos en 30
        minutos = "30";
    } else if (minutos >= 45) {
        // Si los minutos son mayores o iguales a 45, establece los minutos en 20
        minutos = "20";
    } else if (minutos >= 35) {
        // Si los minutos son mayores o iguales a 35, establece los minutos en 10
        minutos = "10";
    } else if (minutos >= 25) {
        // Si los minutos son mayores o iguales a 25, establece los minutos en 00
        minutos = "00";
    } else if (minutos >= 15) {
        // Si los minutos son mayores o iguales a 15, establece los minutos en 50
        minutos = "50";
        // Resta una hora a la hora actual
        if (hora === 0) {
            // Ajuste para medianoche
            hora = 23;
            // Ajustar día y potencialmente mes/año si es necesario
            // Esto es más complejo si es el primer día del mes/año, pero para simplificar:
            ahoraUTC.setDate(ahoraUTC.getDate() - 1);
            año = ahoraUTC.getFullYear();
            mes = String(ahoraUTC.getMonth() + 1).padStart(2, '0');
            dia = String(ahoraUTC.getDate()).padStart(2, '0');
        } else {
            hora -= 1; // Hora anterior
        }
    } else if (minutos >=5) {
        // Si los minutos son mayores o iguales a 5, establece los minutos en 40
        minutos = "40";
        // Resta una hora a la hora actual
        if (hora === 0) {
            // Ajuste para medianoche
            hora = 23;
            // Ajustar día y potencialmente mes/año si es necesario
            // Esto es más complejo si es el primer día del mes/año, pero para simplificar:
            ahoraUTC.setDate(ahoraUTC.getDate() - 1);
            año = ahoraUTC.getFullYear();
            mes = String(ahoraUTC.getMonth() + 1).padStart(2, '0');
            dia = String(ahoraUTC.getDate()).padStart(2, '0');
        } else {
            hora -= 1; // Hora anterior
        }
    } else if (minutos >= 0) {
        // Si los minutos son mayores o iguales a 15, establece los minutos en 50
        minutos = "30";
        // Resta una hora a la hora actual
        if (hora === 0) {
            // Ajuste para medianoche
            hora = 23;
            // Ajustar día y potencialmente mes/año si es necesario
            // Esto es más complejo si es el primer día del mes/año, pero para simplificar:
            ahoraUTC.setDate(ahoraUTC.getDate() - 1);
            año = ahoraUTC.getFullYear();
            mes = String(ahoraUTC.getMonth() + 1).padStart(2, '0');
            dia = String(ahoraUTC.getDate()).padStart(2, '0');
        } else {
            hora -= 1; // Hora anterior
        }}
    

    hora = String(hora).padStart(2, '0');

    const url = `http://132.247.103.145/goes16/abi/vistas/rgb/mexico/${año}.${mes}.${dia}.${hora}.${minutos}.goes-16.rgb_ch13.png`;
    return url;
}
function mostrarImagen() {
    const urlImagen = generarUrlImagenBasadaEnHoraUTC();
    console.log("Intentando cargar la imagen:", urlImagen); // Para depuración
    const imgElement = document.createElement('img');
    imgElement.src = urlImagen;
    imgElement.onerror = function() {
        console.error('La imagen no pudo cargarse. Intenta con otra hora.');
        // Intenta con una hora anterior o maneja el error como sea apropiado
    };
    document.body.appendChild(imgElement); // O el elemento donde quieras añadir la imagen
}


//Iconos para permanecer de un color al dar clic

const images = document.querySelectorAll('#icon-container img');
let activeImage = null;

images.forEach((img) => {
    img.addEventListener('click', () => {
        if (activeImage) {
            activeImage.classList.remove('active'); // Quita la clase "active" de la imagen previamente activa
        }
        img.classList.add('active'); // Agrega la clase "active" a la imagen actual
        activeImage = img; // Actualiza la imagen activa
    });
});

