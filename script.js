const urlOpenLayers = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png';
const urlAPIMapa = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
let map = L.map('mapa').setView([0, 0], 5);


L.tileLayer(urlAPIMapa, {
    maxZoom: 15,
}).addTo(map);

const iconoMarcador = L.icon({
    iconUrl: 'vaca.png',
    iconSize: [60, 60],
    iconAnchor: [30, 60]
})

let marcador = null
/*const updateMap = () => {
    const urlISSGeoLocation = 'http://api.open-notify.org/iss-now.json'
    fetch(urlISSGeoLocation)
        .then(res => res.json())
        .then(data => {
            if (marcador) {
                myMap.removeLayer(marcador)
            }
            const {
                latitude,
                longitude
            } = data.iss_position
            console.log(latitude, longitude)
            marcador = L.marker([latitude, longitude], {
                icon: iconMarker
            }).addTo(myMap)
        })

    setTimeout(updateMap, 3000)
}*/

var pnChannel = "raspi-tracker";

var pubnub = new PubNub({
    publishKey: 'pub-c-6e70a79c-7af6-4177-bfb5-b7eaf484a510',
    subscribeKey: 'sub-c-b1ea6414-c791-11ea-b3f2-c27cb65b13f4'
});

var cambiarPosMarcador = function (payload) {
    if (payload.message.lat) {
        lat = payload.message.lat;
        lng = payload.message.lng;
        if (marcador) {
            map.removeLayer(marcador)
        }
        console.log(lat, lng)
        marcador = L.marker([lat, lng], {
            icon: iconoMarcador
        }).addTo(map)
    }
}

var calcularDistancia = function(){
    console.log('algo');
}

const obtenerDatosTiempoReal = () => {
    pubnub.subscribe({ channels: [pnChannel] });
    pubnub.addListener({ message: cambiarPosMarcador });
}

obtenerDatosTiempoReal();
//updateMap()