document.addEventListener('DOMContentLoaded', function() {
    // Set today's date as the minimum for the date input
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('pickup-date').setAttribute('min', today);

    // Initialize the map
    const map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const marker = L.marker([51.505, -0.09]).addTo(map)
        .bindPopup('Waste Collection Truck')
        .openPopup();

    // Function to get and show the current location
    function showCurrentLocation(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        map.setView([lat, lon], 13);
        marker.setLatLng([lat, lon]);

        // Reverse geocoding to get location name
        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`)
            .then(response => response.json())
            .then(data => {
                const locationName = data.display_name;
                marker.bindPopup(`Waste Collection Truck<br>${locationName}`).openPopup();
                document.getElementById('current-location-name').textContent = `Current Location: ${locationName}`;
            })
            .catch(error => {
                console.error('Error getting location name:', error);
                document.getElementById('current-location-name').textContent = 'Unable to load location';
            });
    }

    // Get current location when page loads
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showCurrentLocation, function(error) {
            console.error('Error getting location:', error);
            document.getElementById('current-location-name').textContent = 'Unable to get location';
        });
    } else {
        alert('Geolocation is not supported by your browser');
        document.getElementById('current-location-name').textContent = 'Geolocation not supported';
    }

    // Relocate button functionality
    document.getElementById('locate-me').addEventListener('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showCurrentLocation);
        } else {
            alert('Geolocation is not supported by your browser');
        }
    });

    // Handle scheduling pickups
    document.getElementById('schedule-pickup-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const date = document.getElementById('pickup-date').value;
        const wasteType = document.getElementById('waste-type').value;
        const currentLocation = document.getElementById('current-location-name').textContent;

        // Validate current location
        if (currentLocation.includes('Not available')) {
            alert('Please locate your current position before scheduling a pickup.');
            return;
        }

        const pickups = JSON.parse(localStorage.getItem('pickups')) || [];
        pickups.push({ date, wasteType, location: currentLocation, timestamp: new Date().toISOString() });
        localStorage.setItem('pickups', JSON.stringify(pickups));
        alert('Pickup scheduled successfully!');
        updatePickupList();
        updateTotalScheduled(); // Update the total number of scheduled pickups
    });

    // Update the pickup list
    function updatePickupList() {
        const pickupList = document.getElementById('scheduled-pickup-list');
        const pickups = JSON.parse(localStorage.getItem('pickups')) || [];
        pickupList.innerHTML = '';
        pickups.forEach(pickup => {
            const li = document.createElement('li');
            li.innerHTML = `Pickup on ${pickup.date} - ${pickup.wasteType} at ${pickup.location} <button class="delete-btn" data-timestamp="${pickup.timestamp}">Delete</button>`;
            pickupList.appendChild(li);
        });

        // Add event listeners for delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const timestamp = this.getAttribute('data-timestamp');
                deletePickup(timestamp);
            });
        });
    }

    // Delete pickup function
    function deletePickup(timestamp) {
        const pickups = JSON.parse(localStorage.getItem('pickups')) || [];
        const updatedPickups = pickups.filter(pickup => pickup.timestamp !== timestamp);
        localStorage.setItem('pickups', JSON.stringify(updatedPickups));
        updatePickupList();
        updateTotalScheduled(); // Update the total number of scheduled pickups
    }

    // Update total scheduled pickups
    function updateTotalScheduled() {
        const pickups = JSON.parse(localStorage.getItem('pickups')) || [];
        const totalScheduled = pickups.length;
        document.getElementById('total-scheduled').textContent = `Total Scheduled Pickups: ${totalScheduled}`;
    }

    // Update statistics
    function updateStatistics() {
        const pickups = JSON.parse(localStorage.getItem('pickups')) || [];
        const totalPickups = pickups.length;
        const recyclablePickups = pickups.filter(pickup => pickup.wasteType === 'recyclable').length;
        const recyclingRate = totalPickups > 0 ? (recyclablePickups / totalPickups) * 100 : 0;

        document.getElementById('waste-reduction').textContent = `Waste reduction: ${recyclingRate.toFixed(2)}% this month`;
        document.getElementById('recycling-rate').textContent = `Recycling rate: ${recyclingRate.toFixed(2)}%`;
    }

    // Check for upcoming pickups and send notifications
    function checkUpcomingPickups() {
        const pickups = JSON.parse(localStorage.getItem('pickups')) || [];
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        pickups.forEach(pickup => {
            const pickupDate = new Date(pickup.date);
            if (pickupDate.toDateString() === tomorrow.toDateString()) {
                sendNotification('Upcoming Pickup', {
                    body: `Your waste pickup is scheduled for tomorrow (${pickup.date}) - ${pickup.wasteType}`,
                    icon: '/path/to/icon.png'
                });
            }
        });
    }

    // Send notification function
    function sendNotification(title, options) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, options);
        }
    }

    // Request notification permission on page load
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                // Welcome notification can be sent here
            }
        });
    }

    // Initial updates
    updatePickupList();
    updateStatistics();
    updateTotalScheduled();
    checkUpcomingPickups();

    // Show scheduled pickups on click
    document.getElementById('schedule-header').addEventListener('click', function() {
        const scheduleDetails = document.getElementById('schedule-details');
        scheduleDetails.style.display = scheduleDetails.style.display === 'block' ? 'none' : 'block';
    });
});
