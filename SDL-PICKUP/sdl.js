document.addEventListener('DOMContentLoaded', function() {
    function updateHistoryList() {
        const historyList = document.getElementById('history-list');
        const pickups = JSON.parse(localStorage.getItem('pickups')) || [];
        historyList.innerHTML = '';

        if (pickups.length === 0) {
            historyList.innerHTML = '<li>No pickup history available.</li>';
            return;
        }

        pickups.forEach(pickup => {
            const li = document.createElement('li');
            li.innerHTML = `
                Pickup on ${pickup.date} - ${pickup.wasteType} at ${pickup.location}
                <button class="delete-btn" data-timestamp="${pickup.timestamp}">Delete</button>
            `;
            historyList.appendChild(li);
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const timestamp = this.getAttribute('data-timestamp');
                deletePickup(timestamp);
            });
        });
    }

    function deletePickup(timestamp) {
        let pickups = JSON.parse(localStorage.getItem('pickups')) || [];
        pickups = pickups.filter(pickup => pickup.timestamp !== timestamp);
        localStorage.setItem('pickups', JSON.stringify(pickups));
        updateHistoryList();
    }

    function deleteMostRecentPickup() {
        let pickups = JSON.parse(localStorage.getItem('pickups')) || [];
        if (pickups.length > 0) {
            const mostRecentTimestamp = pickups[0].timestamp;
            deletePickup(mostRecentTimestamp);
        }
    }

    document.getElementById('delete-latest').addEventListener('click', deleteMostRecentPickup);

    updateHistoryList();
});
