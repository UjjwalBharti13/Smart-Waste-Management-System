document.getElementById("forgotForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const email = document.getElementById("forgot-email").value;
    const newPassword = document.getElementById("new-password").value;
  
    const user = getUser(email);
  
    if (user) {
      user.password = newPassword;
      addUser(user);
      alert("Password updated successfully");
      window.location.href = "../login.html";
    } else {
      alert("User not found");
    }
  });
  function getUser(email) {
    return JSON.parse(localStorage.getItem(email));
  }
  
  function addUser(user) {
    localStorage.setItem(user.email, JSON.stringify(user));
  }