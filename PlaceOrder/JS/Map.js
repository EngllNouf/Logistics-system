let map, markerPickup, markerDropoff, directionsService, directionsRenderer, polyline;

function initModal() {
    map = new google.maps.Map(document.getElementById("googleMap"), {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 8,
    });
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
    });

    polyline = new google.maps.Polyline({
        strokeColor: "#0000FF",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        map: map,
    });

    map.addListener('click', function (event) {
        if (!markerPickup) {
            placeMarker(event.latLng, 'pickup');
        } else if (!markerDropoff) {
            placeMarker(event.latLng, 'dropOff');
            drawPolyline();
            calculateAndDisplayRoute();
        }
    });

    // Add event listeners to the input fields for manual entry
    document.getElementById('pickup').addEventListener('change', function () {
        geocodeAddress(this.value, 'pickup');
    });

    document.getElementById('dropOff').addEventListener('change', function () {
        geocodeAddress(this.value, 'dropOff');
    });
}

function placeMarker(location, inputField) {
    if (inputField === 'pickup') {
        if (markerPickup) markerPickup.setMap(null);
        markerPickup = new google.maps.Marker({
            position: location,
            map: map,
            draggable: true
        });
        geocodeLatLng(location, 'pickup');
    } else if (inputField === 'dropOff') {
        if (markerDropoff) markerDropoff.setMap(null);
        markerDropoff = new google.maps.Marker({
            position: location,
            map: map,
            draggable: true
        });
        geocodeLatLng(location, 'dropOff');
    }
}

function drawPolyline() {
    polyline.setPath([markerPickup.getPosition(), markerDropoff.getPosition()]);
}

function geocodeLatLng(location, inputField) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'location': location }, function (results, status) {
        if (status === 'OK') {
            if (results[0]) {
                document.getElementById(inputField).value = results[0].formatted_address;
            } else {
                console.log('No results found');
            }
        } else {
            console.log('Geocoder failed due to: ' + status);
        }
    });
}

function geocodeAddress(address, inputField) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            if (inputField === 'pickup') {
                if (markerPickup) markerPickup.setMap(null);
                markerPickup = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    draggable: true
                });
            } else if (inputField === 'dropOff') {
                if (markerDropoff) markerDropoff.setMap(null);
                markerDropoff = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    draggable: true
                });
                drawPolyline();
                calculateAndDisplayRoute();
            }
        } else {
            console.log('Geocode was not successful for the following reason: ' + status);
        }
    });
}


function calculateDistance() {
    if (!markerPickup || !markerDropoff) {
        console.log("Please select both pickup and drop-off locations.");
        return;
    }
    const request = {
        origin: markerPickup.getPosition(),
        destination: markerDropoff.getPosition(),
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
        if (status === 'OK') {
            const route = response.routes[0];
            const distance = route.legs[0].distance.value / 1000; // Distance in kilometers
            console.log("Distance: " + distance + " km");
            document.getElementById('distanceOutput').innerText = "Distance: " + distance + " km"; // Update the text element in the form
            
            // Check if the distance is greater than 100 kilometers
            if (distance > 400) {
                // Display a warning message to the user
                document.getElementById('dateRestriction').innerText = "Drop-off date must be at least two days ahead when distance is greater than 100 km.";
            } else {
                // If the distance is less than 100 kilometers, remove the message
                document.getElementById('dateRestriction').innerText = "";
            }
        } else {
            console.error('Failed to get route due to ' + status);
        }
    });
}

// Function to handle drop-off date selection 
function handleDropoffDate() {
    const pickupDate = new Date(document.getElementById('pickupDate').value);
    const dropoffDate = new Date(document.getElementById('dropoffDate').value);
    const timeDifference = dropoffDate.getTime() - pickupDate.getTime();
    const dayDifference = timeDifference / (1000 * 3600 * 24);

    if (dayDifference < 2) {
        document.getElementById('dropoffDate').value = ""; // Clear the drop-off date value
        document.getElementById('dateWarning').innerText = "Please select a drop-off date at least two days after the pickup date."; // Show a message under the drop-off date field
    } else {
        document.getElementById('dateWarning').innerText = ""; // Remove the message
    }
}