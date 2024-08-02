document.addEventListener('DOMContentLoaded', function() {
    const alertMessageElement = document.getElementById('alert-message');
    const alertHeaderElement = document.getElementById('alert-header');
  
    // Example function to set alert message
    function setAlertMessage(message) {
      if (message) {
        alertMessageElement.textContent = message;
        alertHeaderElement.classList.remove('hidden');
      } else {
        alertMessageElement.textContent = 'No new notifications';
        alertHeaderElement.classList.add('hidden');
      }
    }
  
    // Example usage
    //setAlertMessage('Reminder: Upcoming waste pickup scheduled for tomorrow!');
  });
  