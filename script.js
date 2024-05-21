


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
            zoom: 5.6
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
      url: 'https://tile.opentopomap.org/{z}/{x}/{y}.png'
    }),
    visible: false,
    title: 'opentopomap'
});

const carto = new ol.layer.Tile({

    source: new ol.source.XYZ({
      url: 'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
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


//Volcanes
var Volcanes = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'http://localhost:8080/geoserver/GEOPORTAL/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=GEOPORTAL%3AVolcanes&maxFeatures=50&outputFormat=application/json',
        format: new ol.format.GeoJSON(),
   
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          src: './ICONOS/volcan.png',
          scale: 0.5
        })
      }),
      title: 'Volcanes ',
      visible: false
});







//color Regiones Aereas
var colorMapping = {
    "1": 'rgba(56, 177, 173, 0.8)',
    "2": 'rgba(161, 39, 245, 0.8)',
    "3": 'rgba(39, 157, 245, 0.8)',
    "4": 'rgba(0, 34, 120, 0.8)',

};

// Definir una función de estilo que asigna colores basados en una propiedad del feature
var estiloRegionesAereasMilitares = function(feature) {
    var region = feature.get('OBJECTID'); 
    var color = colorMapping[region] || 'rgba(200, 200, 200, 0.5)'; // color por defecto si no se encuentra el mapeo

    return new ol.style.Style({
        fill: new ol.style.Fill({
            color: color // Relleno basado en el mapeo
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(0, 0, 0, 1)', // Contorno negro
            width: 2
        })
    });
};

// Regiones Aéreas Militares
var RegionesAereasMilitares = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'http://localhost:8080/geoserver/GEOPORTAL/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=GEOPORTAL%3ARegionesAereasMilitares&maxFeatures=50&outputFormat=application/json',
        format: new ol.format.GeoJSON()
    }),
    style: estiloRegionesAereasMilitares, // Aplicar el estilo personalizado
    title: 'RegionesAereasMilitares',
    visible: false
});


// Municipios

var municipiosSource = new ol.source.Vector({
    url: 'http://localhost:8080/geoserver/GEOPORTAL/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=GEOPORTAL%3AMunicipios&maxFeatures=50000&outputFormat=application/json',
    strategy: ol.loadingstrategy.bbox,
    format: new ol.format.GeoJSON({
        featureProjection: "EPSG:4326"
    })
});

// Definir el estilo para la capa de municipios en rojo
var municipiosRedStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255, 183, 0, 1)' // Color rojo con opacidad 0.5
    }),
    stroke: new ol.style.Stroke({
        color: 'rgba(255, 120, 0, 1)', // Color rojo con opacidad 1
        width: 3
    })
});

var Municipios = new ol.layer.Vector({
    source: municipiosSource,
    title: 'Municipios',
    visible: false,
    style: municipiosRedStyle
});






//color estados
var estiloEstatales = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255, 111, 97, 0.3)'
    }),
    stroke: new ol.style.Stroke({
        color:  'rgba(255, 111, 97, 0.9)',
        width: 2
    })
});
//estados
var Estatales = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'http://localhost:8080/geoserver/GEOPORTAL/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=GEOPORTAL%3AEstatales&maxFeatures=500&outputFormat=application/json',
        format: new ol.format.GeoJSON()
    }),
    style: estiloEstatales, // Aplicar el estilo personalizado
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

      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          src: './ICONOS/AeropuertoMilitar.png',
          scale: 0.3
        })
      }),
      title: 'Aeropuertos Militares',
      visible: false
});


// Aeropuertos
var Aeropuertos = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'http://localhost:8080/geoserver/GEOPORTAL/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=GEOPORTAL%3AAeropuertos&maxFeatures=50&outputFormat=application/json',
        format: new ol.format.GeoJSON(),
   
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          src: './ICONOS/Aeropuertos.png',
          scale: 0.15
        })
      }),
      title: 'Aeropuertos ',
      visible: false
});






//Color EspacioAereo
var estiloEspacioAereo = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(95, 217, 142, 0.8)'
    }),
    stroke: new ol.style.Stroke({
        color:  'rgba(81, 83, 82, 0.8)',
        width: 2
    })
});
//EspacioArereo
var EspacioAereo = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'http://localhost:8080/geoserver/GEOPORTAL/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=GEOPORTAL%3AEspacio_Aereo&maxFeatures=50&outputFormat=application/json',
        format: new ol.format.GeoJSON()
    }),
    style: estiloEspacioAereo, // Aplicar el estilo personalizado
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
AeropuertosMilitares.setZIndex(10);


// Funcion Swicher  de las capas


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

//=====================================AGREGAR CAPA MUNICIPIOS=====================

document.getElementById('estadoSelect').addEventListener('change', function() {
    var selectedCveEnt = this.value;
    var municipiosCheckbox = document.getElementById('Municipios');

    municipiosSource.clear(); // Limpiar la capa antes de agregar nuevas características

    if (selectedCveEnt) {
        var url = 'http://localhost:8080/geoserver/GEOPORTAL/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=GEOPORTAL%3AMunicipios&maxFeatures=50000&outputFormat=application/json&CQL_FILTER=CVE_ENT=' + selectedCveEnt;

        var updatedSource = new ol.source.Vector({
            url: url,
            format: new ol.format.GeoJSON({
                featureProjection: "EPSG:4326"
            })
        });

        Municipios.setSource(updatedSource);
        Municipios.setVisible(true);

        // Mostrar y marcar el checkbox
        municipiosCheckbox.style.display = 'block';
        municipiosCheckbox.checked = true;

         // Zoom a la extensión de los municipios seleccionados con un margen adicional
        updatedSource.on('featuresloadend', function() {
            var extent = updatedSource.getExtent();
            var margin = 0.1; // 10% de margen adicional
            var width = extent[2] - extent[0];
            var height = extent[3] - extent[1];
            extent[0] -= width * margin;
            extent[2] += width * margin;
            extent[1] -= height * margin;
            extent[3] += height * margin;
            map.getView().fit(extent, { duration: 1000 });
        });
    } else {
        Municipios.setVisible(false);
        municipiosCheckboxContainer.style.display = 'none';
    }
});

document.getElementById('Municipios').addEventListener('change', function() {
    Municipios.setVisible(this.checked);
});
//-----------------FIN CAPA MUNICIPIOS------------------
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

//----------------simbologia de visor---------------

const vectorSource2 = new ol.source.Vector();
const vectorLayer2 = new ol.layer.Vector({
    source: vectorSource2,
});
map.addLayer(vectorLayer2);
vectorLayer2.setZIndex(1000);

let selectedIcon = null;
let draw = null;
let finishButton = null;

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
        const feature = event.feature;
        // Muestra el símbolo seleccionado en lugar de un punto
        feature.setStyle(new ol.style.Style({
            image: new ol.style.Icon({
                src: selectedIcon,
                scale: 0.3,
            }),
        }));
        feature.set('originalStyle', feature.getStyle());
        feature.set('icon', selectedIcon);  // Guardar la URL del icono en la característica
    });

    map.addInteraction(draw);

    // Crear y mostrar el botón "Terminar Edición"
    if (!finishButton) {
        finishButton = document.createElement('button');
        finishButton.id = 'finishButton';
        finishButton.innerText = 'Terminar Edición';
        finishButton.style.position = 'absolute';
        finishButton.style.top = '30px';
        finishButton.style.left = '50px';
        finishButton.style.zIndex = 10000;
        finishButton.style.backgroundColor = '#19af89';
        finishButton.style.color = 'white';
        finishButton.style.border = 'none';
        finishButton.style.padding = '10px';
        finishButton.style.borderRadius = '10px';
        finishButton.style.cursor = 'pointer';
        document.getElementById('map').appendChild(finishButton);

        // Evento al hacer clic en el botón "Terminar Edición"
        finishButton.addEventListener('click', function () {
            // Desactiva la interacción de dibujo
            draw.setActive(false);
            // Remueve el botón "Terminar Edición"
            finishButton.remove();
            finishButton = null;
        });
    }
}

//DESELECCIONAR  CAPAS------------

// Evento al hacer clic en el botón "Deseleccionar Todos"
const deselectButton = document.getElementById('deselectButton');
deselectButton.addEventListener('click', function () {
    if (selectedFeature) {
        selectedFeature.setStyle(originalStyle);
        selectedFeature = null;
        originalStyle = null;
       overlayCombinado.setPosition(undefined);
    }

});

//fin---










  var selectedStyle = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 10,
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
        }),
        fill: new ol.style.Fill({
            color: '#ffcc33'
        })
    }),
    stroke: new ol.style.Stroke({
        color: '#ffcc33',
        width: 2
    }),
    fill: new ol.style.Fill({
        color: 'rgba(255, 204, 51, 0.5)'
    })
});

var selectedFeature = null;
var originalStyle = null;





// =======================POPUP Para CAPAS ==================================
// Crear un overlay para el popup combinado
var overlayCombinado = new ol.Overlay({
    element: document.getElementById('popup-combinado'),
    autoPan: false,
    positioning: 'top-left',
    offset: [10, -10],
    stopEvent: true,
    className: 'custom-overlay-class'
});

// Añadir el overlay combinado al mapa
map.addOverlay(overlayCombinado);

// Función para mostrar un popup combinado
function mostrarPopupCombinado(features, coordinates) {
    var contenido = '<div>';

    features.forEach(function(feature) {
        var layerTitle = feature.layerTitle;
        var fieldName1 = feature.fieldName1;
        var fieldValue1 = feature.fieldValue1;
        var fieldName2 = feature.fieldName2;
        var fieldValue2 = feature.fieldValue2;
        
        contenido += '<h3>' + layerTitle + '</h3>';
        contenido += '<h4>' + fieldName1 + ':</h4>' + fieldValue1;
        contenido += '<h4>' + fieldName2 + ':</h4>' + fieldValue2;
    });

    contenido += '<a href="#" id="popup-combinado-closer" class="ol-popup-closer">×</a></div>';

    var popupElement = document.getElementById('popup-combinado');
    document.getElementById('popup-combinado-content').innerHTML = contenido;

    // Ajustar la posición del popup combinado
    overlayCombinado.setPosition(coordinates);

    popupElement.style.display = 'block';

    // Agregar evento de clic al botón de cerrar
    document.getElementById('popup-combinado-closer').onclick = function () {
        overlayCombinado.setPosition(undefined);
        popupElement.style.display = 'none';
        return false; // Previene la propagación del evento
    };
}
// Evento de clic en el mapa para mostrar el popup combinado y resaltar el feature seleccionado
function handleMapClick(evt) {
    var features = [];
    var coordinates = null;
    var clickedFeature = null;
    var topmostLayerIndex = -1;

    map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
        var layerIndex = map.getLayers().getArray().indexOf(layer);
        if (layerIndex > topmostLayerIndex) {
            topmostLayerIndex = layerIndex;
            clickedFeature = feature;
            coordinates = feature.getGeometry().getCoordinates();

            var layerTitle, fieldName1, fieldValue1, fieldName2, fieldValue2;

            if (layer === AeropuertosMilitares) {
                layerTitle = 'AEROPUERTOS MILITARES';
                fieldName1 = 'Nombre';
                fieldValue1 = feature.get('NOMBRE');
                fieldName2 = 'Nombre Alternativo';
                fieldValue2 = feature.get('NOMBRE_ALT');
            } else if (layer === Aeropuertos) {
                layerTitle = 'AEROPUERTOS';
                fieldName1 = 'Nombre';
                fieldValue1 = feature.get('NOMBRE');
                fieldName2 = 'Nombre Alternativo';
                fieldValue2 = feature.get('NOMBRE_ALT');
            } else if (layer === Estatales) {
                layerTitle = 'ESTADOS';
                fieldName1 = 'Estado';
                fieldValue1 = feature.get('NOMGEO');
                fieldName2 = 'Número de Entidad';
                fieldValue2 = feature.get('CVEGEO');
            } else if (layer === RegionesAereasMilitares) {
                layerTitle = 'Regiones Aéreas Militares';
                fieldName1 = 'Región';
                fieldValue1 = feature.get('Region');
                fieldName2 = 'Área';
                fieldValue2 = feature.get('Shape_Area');
            } else if (layer === EspacioAereo) {
                layerTitle = 'Espacio Aéreo';
                fieldName1 = 'Nombre';
                fieldValue1 = feature.get('NOM_COMP');
                fieldName2 = 'Region';
                fieldValue2 = feature.get('REGION');
            } else if (layer === AerodromosyHelipuertos) {
                layerTitle = 'Aerodromos y Helipuertos';
                fieldName1 = 'Tipo';
                fieldValue1 = feature.get('TIPO_AERÓ');
                fieldName2 = 'Nombre';
                fieldValue2 = feature.get('NOMBRE');
            } else if (layer === vectorLayer2) {  // Capa de simbología
                layerTitle = 'Simbolología';
                fieldName1 = 'Coordenadas';
                fieldValue1 = coordinates.map(coord => coord.toFixed(4)).join(', ');
                fieldName2 = 'Icono';
                var iconSrc = feature.get('icon');
                fieldValue2 = `<img src="${iconSrc}" style="width: 50px; height: 50px;" />`;
          
            }else if (layer === Municipios) {
                layerTitle = 'Municipios';
                fieldName1 = 'Clave Municipal';
                fieldValue1 = feature.get('CVE_MUN');
                fieldName2 = 'Nombre';
                fieldValue2 = feature.get('NOMGEO');
            }

            features = [{
                layerTitle: layerTitle,
                fieldName1: fieldName1,
                fieldValue1: fieldValue1,
                fieldName2: fieldName2,
                fieldValue2: fieldValue2
            }];
        }
    });

    if (features.length > 0) {
        mostrarPopupCombinado(features, coordinates);

        // Resaltar el feature seleccionado
        if (clickedFeature !== selectedFeature) {
            // Restaurar el estilo original del feature previamente seleccionado
            if (selectedFeature) {
                selectedFeature.setStyle(originalStyle);
            }

            // Guardar el feature seleccionado y su estilo original
            selectedFeature = clickedFeature;
            originalStyle = selectedFeature.getStyle();

            // Aplicar el nuevo estilo de selección
            selectedFeature.setStyle(selectedStyle);
        }
    } else {
        // Ocultar el popup si no hay features seleccionados
        var popupElement = document.getElementById('popup-combinado');
        popupElement.style.display = 'none';

        // Restaurar el estilo original del feature previamente seleccionado
        if (selectedFeature) {
            selectedFeature.setStyle(originalStyle);
            selectedFeature = null;
            originalStyle = null;
        }
    }
}

// Añadir el manejador de eventos al mapa
map.on('singleclick', handleMapClick);

  //=========================FIN POPUPS======================================================

  

//MOSTRAR LISTA DE NOMBRES  de AEROPUERTOS MILITARES AL DAR CLICK EN EL BOTON 
document.getElementById('btn-cargar-nombres').addEventListener('click', function() {
  var url = 'http://localhost:8080/geoserver/GEOPORTAL/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=GEOPORTAL%3AAeropuertosMilitares&maxFeatures=50&outputFormat=application/json';

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      var lista = document.getElementById('lista-nombres');
      lista.innerHTML = ''; // Limpiar la lista anterior
      json.features.forEach(function(feature) {
        var nombre = feature.properties.NOMBRE;
        var coordenadas = feature.geometry.coordinates;
        var li = document.createElement('li');
        li.textContent = nombre;
        li.style.cursor = 'pointer';
        li.onclick = function() {
          alert('Capa: Aeropuertos Militares\nNombre: ' + nombre + '\nCoordenadas: ' + coordenadas.join(', '));
        };
        lista.appendChild(li);
      });
    })
    .catch(function(error) {
      console.error('Error al cargar los nombres:', error);
    });
});




        // Función para buscar direcciones o lugares usando Nominatim
        function searchLocation(query) {
            var url0 = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(query);

            fetch(url0)
                .then(response => response.json())
                .then(data => {
                    console.log('Geocoding data:', data); // Registro de los datos recibidos
                    if (data.length > 0) {
                        var firstResult = data[0];
                        var lon = parseFloat(firstResult.lon);
                        var lat = parseFloat(firstResult.lat);
                        var location = [lon, lat]; // Mantener en EPSG:4326

                        // Mover la vista del mapa a la ubicación encontrada
                        map.getView().setCenter(location);
                        map.getView().setZoom(14);
                    } else {
                        alert('No se encontraron resultados para: ' + query);
                    }
                })
                .catch(error => console.error('Error:', error));
        }

        // Manejar el evento de clic del botón de búsqueda
        document.getElementById('search-button').addEventListener('click', function() {
            var query = document.getElementById('search-box').value;
            if (query) {
                searchLocation(query);
            } else {
                alert('Por favor, ingrese una dirección o lugar para buscar.');
            }
        });



    // Crear la graticule (cuadrícula)
    const graticule = new ol.layer.Graticule({
        // La cuadrícula se dibuja por defecto en EPSG:4326
        strokeStyle: new ol.style.Stroke({
            color: 'rgba(0,0,0,0.8)',
            width: 2,
            lineDash: [0.5, 4]
        }),
        showLabels: true,
        visible: false // Iniciar desactivada
    });

    // Añadir la graticule al mapa
    map.addLayer(graticule);

    // Manejar el evento de clic en la imagen para activar/desactivar la graticule
    document.getElementById('graticule-button').addEventListener('click', function() {
        graticule.setVisible(!graticule.getVisible());
    });







//SIMBOLOGIA======================================================

// Aerodromos y helipuertos
document.getElementById('AerodromosyHelipuertos').addEventListener('change', function() {
    var imageContainer1 = document.getElementById('image-container1');
    if (this.checked) {
        imageContainer1.style.display = 'block';
    } else {
        imageContainer1.style.display = 'none';
    }
});
//ESTADOS
document.getElementById('Estatales').addEventListener('change', function() {
    var imageContainer2 = document.getElementById('image-container2');
    if (this.checked) {
        imageContainer2.style.display = 'block';
    } else {
        imageContainer2.style.display = 'none';
    }
});
//Regiones Aereas Militares
document.getElementById('RegionesAereasMilitares').addEventListener('change', function() {
    var imageContainer3 = document.getElementById('image-container3');
    if (this.checked) {
        imageContainer3.style.display = 'block';
    } else {
        imageContainer3.style.display = 'none';
    }
});

//ESpacioAereo
document.getElementById('EspacioAereo').addEventListener('change', function() {
    var imageContainer4 = document.getElementById('image-container4');
    if (this.checked) {
        imageContainer4.style.display = 'block';
    } else {
        imageContainer4.style.display = 'none';
    }
});

//Municipios
document.getElementById('Municipios').addEventListener('change', function() {
    var imageContainer5 = document.getElementById('image-container5');
    if (this.checked) {
        imageContainer5.style.display = 'block';
    } else {
        imageContainer5.style.display = 'none';
    }
});
// Controlar la visibilidad de la imagen mediante la selección de un estado
document.getElementById('estadoSelect').addEventListener('change', function() {
    var imageContainer5 = document.getElementById('image-container5');
    if (this.value !== "") {  // Verifica si se ha seleccionado alguna opción (que no sea la opción inicial vacía)
        imageContainer5.style.display = 'block';  // Muestra la imagen
    } else {
        imageContainer5.style.display = 'none';  // Oculta la imagen si se selecciona la opción inicial vacía
    }
});

//Volcanes
document.getElementById('Volcanes').addEventListener('change', function() {
    var imageContainer6 = document.getElementById('image-container6');
    if (this.checked) {
        imageContainer6.style.display = 'block';
    } else {
        imageContainer6.style.display = 'none';
    }
});
//CurvasNivel
document.getElementById('CurvasNivel').addEventListener('change', function() {
    var imageContainer7 = document.getElementById('image-container7');
    if (this.checked) {
        imageContainer7.style.display = 'block';
    } else {
        imageContainer7.style.display = 'none';
    }
});
//Aeropuertos
document.getElementById('Aeropuertos').addEventListener('change', function() {
    var imageContainer8 = document.getElementById('image-container8');
    if (this.checked) {
        imageContainer8.style.display = 'block';
    } else {
        imageContainer8.style.display = 'none';
    }
});
//CurvasNivel
document.getElementById('AeropuertosMilitares').addEventListener('change', function() {
    var imageContainer9 = document.getElementById('image-container9');
    if (this.checked) {
        imageContainer9.style.display = 'block';
    } else {
        imageContainer9.style.display = 'none';
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

document.getElementById('download-btn').addEventListener('click', function() {
    html2canvas(document.getElementById('map')).then(canvas => {
        // Crear un elemento <a> para descargar la imagen
        const a = document.createElement('a');
        // El nombre del archivo que se descargará
        a.download = 'mapa-capturado.png';
        // Convertir el canvas a una URL de imagen y asignarlo como href de <a>
        a.href = canvas.toDataURL('image/png');
        // Simular un clic sobre el elemento <a> para iniciar la descarga
        a.click();
    });
});





document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        var preloader = document.getElementById('preloader');
        var greenShape = document.getElementById('green-shape');
        var redShape = document.getElementById('red-shape');

        // Asegurar que la animación de crecimiento haya terminado
        setTimeout(function() {
            greenShape.style.animationPlayState = 'running';
            redShape.style.animationPlayState = 'running';
        }, 3000); // Coincide con la duración de la animación de crecimiento

        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 2000); // Esperar a que las animaciones de los paralelogramos terminen
        });
    });
});

function printMap() {
    html2canvas(document.querySelector("#map")).then(canvas => {
        var printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write('<html><body><img src="' + canvas.toDataURL() + '"/></body></html>');
        printWindow.document.addEventListener('load', function() {
            printWindow.print();
            // Retrasa el cierre para dar tiempo a la impresión
            setTimeout(function() { printWindow.close(); }, 1000);
        });
        printWindow.document.close();
    });
}








