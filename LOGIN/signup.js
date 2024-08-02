document.getElementById("signupForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("signup-email").value;
  const number = document.getElementById("number").value;
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById("signup-confirm-password").value;

  if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
  }

  const user = {
      name:name,
      email: email,
      number: number,
      password: password
  };

//   localStorage.setItem(email, JSON.stringify(user));
//   localStorage.setItem("user", JSON.stringify(user));
//   window.location.href = "../HOME/main.html";
// });
addUser(user);
alert("Registration is complete. Please log in.");
window.location.href = "../LOGIN/login.html";
});

function addUser(user) {
localStorage.setItem(user.email, JSON.stringify(user));
}

function storeLoginState(email) {
localStorage.setItem("loggedInUser", email);
}
