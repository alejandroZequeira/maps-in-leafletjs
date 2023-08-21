var statesData={}
var region=document.querySelector('#region')
var map = L.map("map").setView([21.657428, -100.942384], 5)
var popup = L.popup()
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 5,
    attribution: '© OpenStreetMap'
}).addTo(map)

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("diste click "+e.latlng)
        .openOn(map);
}
region.addEventListener("change",function(){
    console.log("entro a la funcion")
    console.log("valor del select",this.value)
    switch (this.value) {
        case "0": {
            map.flyTo([21.657428, -100.942384],5) 
            break;
        }
        case "1":{ 
            console.log("entro a la primera opcion")
            geoJsonCP("24_SanLuisPotosi.json")
            map.flyTo([22.1498200,-100.9791600],8)
            L.geoJson(statesData.features,{style:{color: "#7AE9EE"}}).addTo(map)
            break;
        }
        default:
            map.flyTo([21.657428, -100.942384],5)
    }
})

function geoJsonCP(id){
    fetch('/geojsonCP/'+id,{
        "method":"GET",
        "headers":{
            "Content-Type":"application/json"
        },
    }).then(response => response.text())
    .then(res=>{
        statesData=JSON.parse(res)
    });
}
map.on("click", onMapClick)