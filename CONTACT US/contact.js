// Handle form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // You can handle the form submission logic here, such as sending the data to a server
    alert(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);

    // Clear the form
    document.getElementById('contactForm').reset();
});


