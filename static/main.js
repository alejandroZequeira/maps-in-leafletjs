var statesData = {}
var region = document.querySelector('#estado')
var map = L.map("map").setView([21.657428, -100.942384], 5)
var popup = L.popup()
var info = L.control()
var geojson

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 5,
    attribution: '© OpenStreetMap'
}).addTo(map)

map.on("click", onMapClick)

region.addEventListener("change", function () {
    change(this.value) })

function change(value){
    var isExist=false;
    for(d in statesData.features){
        if(statesData.features[d].properties.CODIGO == value){
            //cord=statesData.features[d].geometry.coordinates[0][0][0]
            //console.log("valor de cord", cord)
            isExist=true
        }
    }
        if(isExist) {
            console.log("entro a la primera opcion")
            //map.flyTo(cord, 8)
            map.flyTo([21.657428, -100.942384], 5)
            geoJsonM(value)
            
        }else{
            map.flyTo([21.657428, -100.942384], 5)
            geojson.clearLayers()
            geojson.addLayer(L.geoJson(statesData, {
                onEachFeature: onEachFeature
            }))
        }
    }

function geoJsonCP(id) {
    fetch('/geojson/CP/' + id+".json", {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json"
        },
    }).then(response => response.text())
        .then(res => {
            data = JSON.parse(res)
        });
}

function geoJsonM(id) {
    fetch('/geojson/municipios/' + id+".json", {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json"
        },
    }).then(response => response.text())
        .then(res => {
            states = JSON.parse(res)
            console.log(states)
            geojson.clearLayers()
            geojson.addLayer(L.geoJson(states, {
                onEachFeature: onEachFeature
            }))
        });
}


function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("diste click " + e.latlng)
        .openOn(map);
}

document.addEventListener("DOMContentLoaded", function () {
    fetch('/estados', {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json"
        },
    }).then(response => response.text())
        .then(res => {
            statesData = JSON.parse(res)
            console.log(statesData)
            geojson = L.geoJson(statesData, {
                onEachFeature: onEachFeature
            }).addTo(map)
            for (data in statesData.features) {
                block = '<option value=' + statesData.features[data].properties.CODIGO + '>' + statesData.features[data].properties.ESTADO + '</option>'
                region.innerHTML += block
                // console.log(statesData.features[data].properties.CODIGO)
            }
        });
})

function highlightFeature(e) {
    var layer = e.target
    layer.setStyle({
        weight: 5,
        color: "#666",
        dasArray: '',
        fillOpacity: 0.7
    })

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront()
    }
    info.update(layer.feature.properties)
}

function resetHighlight(e) {
    geojson.resetStyle(e.target)
    info.update()
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds())
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    })
}

info.onAdd = function (map) {
    this._div = L.DomUtil.create("div", "info")
    this.update()
    return this._div
}

info.update = function (props) {
    this._div.innerHTML = '<h4>' + (props ? '<b>' + props.ESTADO + '</b>' : "Mexico")
}

info.addTo(map)