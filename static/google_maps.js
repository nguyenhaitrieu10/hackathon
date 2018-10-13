var locations = []

var num_locations = $('li.element').length || 0;
var elements = $('li.element');

for (let i = 0; i < num_locations; ++i){
    locations.push(JSON.parse($(elements[i]).text()));
}

console.log('locations: ');
console.log(locations);

// locations = [
    // {'lat': 10.773849, 'lng': 106.689380},
    // {'lat': 10.762417, 'lng': 106.681198},
    // {'lat': 10.767156, 'lng': 106.694883},
    // {'lat': 10.776307, 'lng': 106.680720},
    // {'lat': 10.759631, 'lng': 106.678945},
// ]

var map;
markers = [];

function initMap() {
    let initLocation = (num_locations>0)?(locations[0]):({'lat': 10.773849, 'lng': 106.689380});
    console.log(initLocation);
    console.log(typeof initLocation);

    map = new google.maps.Map(
      document.getElementById('map'), {center: initLocation, zoom: 11.5});

//    var image = 'static/blue-dot.png';

    for (let i = 0; i < num_locations; ++i){
        var marker = new google.maps.Marker({
            position: locations[i],
            map: map,
//            icon: image,
        });
        markers.push(marker);
    }
}

var socket = io();
socket.on('location', function(msg){
    console.log(msg);
    console.log(typeof msg);

    msg = msg || {'lat': 10.759631, 'lng': 106.678945};
    
    console.log('-----------');
    console.log(msg);
    console.log('-----------');

    var marker = new google.maps.Marker({
        position: msg,
        map: map,
//            icon: image,
    });
    markers.push(marker);

    $('#color-list').append($('<div class="bar"></div>'));
    num_locations += 1;
    $('#color-list>span').text(num_locations + ' vị trí');
});

