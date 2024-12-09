const map_Token=mapToken;

mapboxgl.accessToken = map_Token;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style :"mapbox://styles/mapbox/streets-v12",
    center: Listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});

const el = document.createElement('div');
el.className = 'custom-marker';
el.innerHTML = '<span class="material-symbols-outlined">home</span>';

const marker = new mapboxgl.Marker(el)
    .setLngLat(Listing.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({offset:25})
    .setHTML(
        `<h4>${Listing.title}</h4><h5>${Listing.location}</h5><P>Exact Location will be provided after booking</p>`)
    )
    .addTo(map);

   
