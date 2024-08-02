document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const user = localStorage.getItem(email);

  if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.password === password) {
        storeLoginState(email);  // Store the login state
       //   localStorage.setItem("user", JSON.stringify(parsedUser));
          window.location.href = "../index.html";
      } else {
          alert("Incorrect password");
      }
  } else {
      alert("User not found");
  }
});
// function getUser(email) {
//     return JSON.parse(localStorage.getItem(email));
//   }
  
  function storeLoginState(email) {
    localStorage.setItem("loggedInUser", email);
  }
