var region=document.querySelector('#region')
var map = L.map("map").setView([24.3635272, -99.9940824], 5)
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
        case "1":{ 
            console.log("entro a la primera opcion")
            map.flyTo([22.1498200,-100.9791600],8)
            break;
        }
        default:
            console.log("no cambio")
    }
})
const requesturl="geojson-master/mexicoHigh.json"
const request=new XMLHttpRequest()
request.open("get",requesturl)
console.log(request.status)
L.geoJson(statesData).addTo(map)
map.on("click", onMapClick)