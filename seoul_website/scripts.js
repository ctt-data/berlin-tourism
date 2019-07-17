// list of places we want to show
var places = [
    {
        "name": "Bukchon Hanok Village",
        "latlng":[37.582409, 126.983652],
        "desc": "북촌한옥마을",
        "addr": "Gahoe-dong, 계동길 37"
    },
    {
        "name": "Nami Island",
        "latlng": [37.791385, 127.525540],
        "desc": "남이섬",
        "addr": "1 Namisum-gil, Namsan-myeon, Chuncheon, Gangwon-do"
    },
    {
        "name": "N Seoul Tower",
        "latlng": [37.551174, 126.988226],
        "desc": "N서울타워",
        "addr": "105 Namsangongwon-gil, Yongsan 2(i)ga-dong"
    },
    {
        "name": "Soap Club Seoul",
        "latlng": [37.533573, 126.995164],
        "desc": "Hip Night Club in the heart of Seoul",
        "addr": "132-3 Itaewon-dong, Yongsan-gu"
    },
    {
        "name": "Thursday Party",
        "desc": "썰스데이파티",
        "latlng": [37.534989, 126.995591],
        "addr": "6 Itaewon-ro 27-gil, Itaewon 1(il)-dong, Yongsan-gu"
    }
]

var mymap;
function createMap() {
    // Create the map
    // Use thunderforest map for english names
    let mapUrl = 'https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=9d287ec969bd4e9285d076c57c600bc2';
    let seoulCoordiantes = [37.5647, 126.9772];

    // default view at seoul, zoom-level 12
    mymap = L.map('map').setView(seoulCoordiantes, 12);
    L.tileLayer(mapUrl, {
        attribution: 'Map data &copy; <a href="https://www.thunderforest.com/">thunderforest</a>',
        maxZoom: 18,
    }).addTo(mymap);
}

function add_markers() {
    // go through every place in list
    for (i = 0; i < places.length; i++) {
        let place = places[i]

        // set the marker on map, according to latitude, longitude
        let marker = L.marker(place.latlng).addTo(mymap)

        // add pop up to the new marker
        marker.bindPopup(
            `<b>${place.name}</b>
            </br> <i>${place.desc}</i>
            </br>${place.addr}
            `,
            {autoPan:false}
        )
        // create new description tile for left column
        let title = $(`<a class="title">${place.name}</a>`).click(() => {
            // pan map to marker, if title is clicked
            mymap.panTo(place.latlng, {animate: true, duration: 2})
            marker.openPopup()
        })
        // create the description tile
        let desc_tile = $(`<div class="tile is-child box">
            <p> <i>${place.desc}</i></p>
            <p>${place.addr}</p>
        </div>`).prepend(title)

        // add the newly created description tile to the left column
        $("#map_descriptions").append(desc_tile)
    }

}

$(document).ready(function () {
    createMap();
    add_markers();
});