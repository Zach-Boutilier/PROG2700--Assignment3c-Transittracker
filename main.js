(function(){
    
    const map = L.map('theMap').setView([44.670000, -63.614358], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    L.marker([44.670000, -63.614358]).addTo(map)
        .bindPopup('You are here.')
        .openPopup();

    fetchbusData(map)

})()

function fetchbusData(map){

    const validRouteIds = ['9A', '9B', '7A', '7B', '6A', '6B', '6C'];

    fetch("https://prog2700.onrender.com/hrmbuses")
        .then(response => response.json())
        .then(jsonData => {
            let busJSON = jsonData.entity;
            console.log(busJSON)
            busJSON.forEach(bus => {
                    if (bus.vehicle.trip.routeId <= 10 || bus.vehicle.trip.routeId == validRouteIds){

                        L.marker([bus.vehicle.position.latitude, bus.vehicle.position.longitude], {
                            icon: L.icon({
                                iconAngle: 45,
                                iconUrl: '/buses/bus.png',
                                iconSize: [30,30]
                            })
                        })
                            .addTo(map)
                            .bindPopup(`Bus: ${bus.vehicle.trip.routeId}`);
                    }
            })
        })     
}

function refreshPage() {
    location.reload();
}

setInterval(refreshPage, 15000); 





