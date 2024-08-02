document.addEventListener("DOMContentLoaded", function() {
    const loggedInUser = getLoggedInUser();
  
    if (loggedInUser) {
      document.getElementById("auth-buttons").style.display = "none";
      document.getElementById("profile").style.display = "block";
      document.getElementById("user-email").innerText = loggedInUser;
    } else {
      document.getElementById("auth-buttons").style.display = "block";
      document.getElementById("profile").style.display = "none";
    }
  
    document.getElementById("dashboard-link").addEventListener("click", function(event) {
      if (!getLoggedInUser()) {
        event.preventDefault();
        alert("Please login or register to view your dashboard.");
      } else {
        window.location.href = "../HACKATHON/DASHBOARD/dashboard.html";
      }
    });
  
    const slideshow = document.querySelector('.slideshow');
    const images = slideshow.children;
    let currentIndex = 0;
  
    function showNextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      slideshow.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  
    setInterval(showNextImage, 3000); // Change image every 3 seconds
  });
  
  function getLoggedInUser() {
    return localStorage.getItem("loggedInUser");
  }
  
  function logout() {
    clearLoginState();
    window.location.href = "../HACKATHON/LOGIN/login.html";
  }
  
  function clearLoginState() {
    localStorage.removeItem("loggedInUser");
  }
  