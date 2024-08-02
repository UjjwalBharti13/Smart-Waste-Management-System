document.addEventListener('DOMContentLoaded', () => {
  // Initialize the map
  const map = L.map('map').setView([51.505, -0.09], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  const marker = L.marker([51.505, -0.09]).addTo(map);

  // Function to update map with new location
  function updateMap(lat, lon) {
    marker.setLatLng([lat, lon]);
    map.setView([lat, lon], 13);
    updateLocationName(lat, lon);
  }

  // Function to update location name
  function updateLocationName(lat, lon) {
    const geocodeURL = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
    axios.get(geocodeURL)
      .then(response => {
        const locationName = response.data.display_name;
        document.getElementById('location-name').innerText = locationName;
      })
      .catch(error => {
        console.error('Geocoding Error:', error);
        document.getElementById('location-name').innerText = 'Unable to fetch location';
      });
  }

  // Get user's current location
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      updateMap(lat, lon);
    }, error => {
      console.error('Geolocation Error:', error);
    });
  } else {
    alert('Geolocation is not supported by your browser');
  }

  // Load scheduled pickups from localStorage
  function loadScheduledPickups() {
    const pickups = JSON.parse(localStorage.getItem('pickups')) || [];
    const pickupList = document.getElementById('pickup-list');
    pickupList.innerHTML = '';
    const totalPickups = document.getElementById('total-pickups');

    if (pickups.length === 0) {
      pickupList.innerHTML = '<li>No scheduled pickups available.</li>';
      totalPickups.innerText = 'Total Scheduled Pickups: 0';
      return;
    }

    pickups.forEach(pickup => {
      const li = document.createElement('li');
      li.innerText = `Pickup on ${pickup.date} - ${pickup.wasteType} at ${pickup.location}`;
      pickupList.appendChild(li);
    });

    totalPickups.innerText = `Total Scheduled Pickups: ${pickups.length}`;
  }

  loadScheduledPickups();
});
