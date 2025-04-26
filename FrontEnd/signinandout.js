const popup = document.getElementById("popup");
const openPopup = document.getElementById("openPopup");
const profile = document.getElementById("profile");
const dropdownMenu = document.getElementById("dropdownMenu");
const logout = document.getElementById("logout-btn");

const closePopup = document.getElementById("closePopup");
const contentWrapper = document.querySelector(".content-wrapper");
const authForm = document.getElementById("authForm");

const popupTitle = document.getElementById("popupTitle");
const submitButton = document.getElementById("submitButton");
const confirmPasswordDiv = document.getElementById("confirmPasswordDiv");
const usernameDiv = document.getElementById("usernameDiv");
const toggleLinkText = document.getElementById("toggleLinkText");
const formRow = document.querySelector(".form-row");

attachToggleEvent(); //Initial toggle link setup

function showPopup() {
  popup.classList.remove("hidden");
  contentWrapper.classList.add("blur-background");
}

function hidePopup() {
  popup.classList.add("hidden");
  contentWrapper.classList.remove("blur-background");
  toggleToSignIn()
}

function clearFields(){
  document.getElementById("password").value = "";
  document.getElementById("confirmPassword").value = "";
  document.getElementById("email").value = "";
  document.getElementById("username").value = "";
  document.getElementById('remember').checked = false;
}

function toggleToSignUp() {
  popupTitle.textContent = "Register";
  submitButton.textContent = "Sign Up";
  document.getElementById("email").placeholder = "Email";
  usernameDiv.classList.remove("hidden");
  confirmPasswordDiv.classList.remove("hidden");
  formRow.style.display = "none"; 
  popup.style.height = "450px";
  toggleLinkText.innerHTML = "Already have an account? <b><a id='toggleLink' href='#'>Sign In</a></b>";

  document.getElementById("username").setAttribute("required", "true");
  document.getElementById("confirmPassword").setAttribute("required", "true");
  attachToggleEvent(); //Reattach event listener to the register/sign in link since it has changed
}

function toggleToSignIn() {
  popupTitle.textContent = "Sign In";
  submitButton.textContent = "Login";
  document.getElementById("email").placeholder = "Username or Email";
  usernameDiv.classList.add("hidden");
  confirmPasswordDiv.classList.add("hidden");

  document.getElementById("username").removeAttribute("required");
  document.getElementById("confirmPassword").removeAttribute("required");

  formRow.style.display = "flex";
  formRow.style.justifyContent = "space-between";
  formRow.style.marginBottom = "15px"; 

  popup.style.height = "370px";
  toggleLinkText.innerHTML = "Don't have an account? <b><a id='toggleLink' href='#'>Register</a></b>";
  attachToggleEvent(); //Reattach event listener to the register/sign in link since it has changed
}

//Show popup when sign in is clicked, close popup when user clicks hidepopup X button.
if (openPopup) openPopup.addEventListener("click", showPopup);
if (closePopup) closePopup.addEventListener("click", hidePopup);

//Closes if user clicks anywhere outside of it
window.addEventListener("click", (e) => {
//Close popup when clicked anywhere outside of it
if (!popup.contains(e.target) && e.target !== openPopup) {
  hidePopup();
  clearFields();
}
//Close dropdownmenu when clicked anywhere outside
if (!profile.contains(e.target) && !dropdownMenu.contains(e.target)) {
  dropdownMenu.style.display = "none";  //Hide dropdownmenu
}
});

function attachToggleEvent() { //Reattaches event listener to the register/sign in link everytime it changes.
  const updatedToggleLink = document.getElementById("toggleLink");
  if (updatedToggleLink) {
      updatedToggleLink.addEventListener("click", (e) => {
          e.preventDefault(); 
          e.stopPropagation();
          if (popupTitle.textContent === "Sign In") {
              toggleToSignUp();
          } else {
              toggleToSignIn();
          }
          clearFields();
      });
  }
}

const tokenRequestLink = window.tokenRequest //Used for fetching from userProfile.js

//Function to handle UI based on token status
function tokenStatus() {
  const token = localStorage.getItem('token');
  if (!token) {
    //If there's no token, it means the user is logged out
    openPopup.style.display = "block";
    profile.style.display = "none";  //Hide profile
  }
  else{
    fetch(tokenRequestLink, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}` //Attach the token
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log("User Profile:", data);
      const username = data.username;     
      const usernameShow = document.getElementById('usernameShow');
      if (username && usernameShow) {
        usernameShow.innerText = username //Set the username to show beside profile
      }
    })
    .catch(error => {
      console.error("Unauthorized:", error);
    });
  
    openPopup.style.display = "none";
    profile.style.display = "block"; //Show profile
  }
}

//When the page is loaded, check the token status
document.addEventListener("DOMContentLoaded", () => {
  tokenStatus();
});

//When the profile picture is clicked, check the token status and show options
document.getElementById("profile").addEventListener("click", () => {
  tokenStatus();

  //Toggle dropdownmenu visibility 
  if (dropdownMenu.style.display === "none") {
    dropdownMenu.style.display = "block";  //Show dropdownmenu 
  } else {
    dropdownMenu.style.display = "none";  //Hide dropdownmenu button (optional, if you want it to disappear on second click)
  }
});

//When user logs out, token is removed
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("token"); //Remove token
  alert("Logged out successfully!");
  window.location.reload();  //Reload page to update UI
});

if (authForm) {

  const SIGNUPLINK = window.userAuthSignUp; //Used for fetching from userAuth.js
  const SIGNINLINK = window.userAuthSignIn;

  //Form submission
  authForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;  
      const confirmPassword = document.getElementById("confirmPassword").value; 
      const confirmPasswordField = document.getElementById("confirmPassword");

      //Sign-in 
      if (popupTitle.textContent === "Sign In") {
          document.getElementById("email").setCustomValidity("");
          document.getElementById("confirmPassword").setCustomValidity("");

          //Sign-In logic
          fetch(SIGNINLINK, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ email, password }), //Email input can either be the email or username
          })
          .then(response => {
            if (!response.ok) {  //Check if response status is not OK (i.e., not 2xx)
              throw new Error("Invalid username, email, or password");  
            }
            return response.json();
          })
          //Successful login
          .then(data => {
            localStorage.setItem("token", data.token);

            //Hide popup after signing in or signing up successfully
            hidePopup();
            clearFields();

            alert("Login Successful");

            openPopup.style.display = "none";

            //fetch token and display username and profile picture
            fetch(tokenRequestLink, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}` // Attach the token
              }
            })
            .then(response => response.json())
            .then(data => {
              console.log("User Profile:", data);
              const username = data.username;     
              const usernameShow = document.getElementById('usernameShow');
              if (username && usernameShow) {
                usernameShow.innerText = username //Set the username to show beside profile
              }
            })
            .catch(error => {
              console.error("Unauthorized:", error);
            });

            profile.style.display = "block"; //Show profile

          }) 
          .catch(error => alert(error.message)); 
          
      //Sign-up 
      } else {
          //Check username format 
          const usernamePattern = /^[a-zA-Z0-9_-]{3,16}$/; //3-16 characters long
          if (!usernamePattern.test(username)){
              const usernameField = document.getElementById("username");
              usernameField.setCustomValidity("Username must be 3-16 characters long.");
              usernameField.reportValidity(); 
              return; 
          }

          //Check email format
          const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailPattern.test(email)) {
              const emailField = document.getElementById("email");
              emailField.setCustomValidity("Please enter a valid email address.");
              emailField.reportValidity(); 
              return; 
          }

          //Check password format
          const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
          if (!passwordPattern.test(password)) {
              const passwordField = document.getElementById("password");
              passwordField.setCustomValidity("Password must be at least 8 characters long, include one lowercase letter, one uppercase letter, and one number.");
              passwordField.reportValidity(); 
              return; 
          }

          //Check that password equals confirmpassword 
          if (password !== confirmPassword) {
              confirmPasswordField.setCustomValidity("Passwords must match!");
              confirmPasswordField.reportValidity();
              return; 
          }

          //Sign-up Logic
          fetch(SIGNUPLINK, {
            method: "POST",
            headers:{
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
          })
            .then((response) => {
              if(!response.ok){
                return response.json().then((data) => {
                  if (data.message === "Username already exists") {
                      throw new Error("Username already exists.");
                  } 
                  else if (data.message === "Email already exists") {
                    throw new Error("Email already exists");
                  } 
                  else {
                      throw new Error("Failed to sign up");
                  }
              });
              }
              return response.json();
            })
            .then((data) => {
              //Hide popup after signing in or signing up successfully
              hidePopup();
              clearFields();

              alert("Sign up successful!");
              console.log("Registering with", { username, email, password });
              console.log("User registered:", data);
            })
            .catch((error) => {
              console.error("Error during sign-up:", error);
              alert(error.message);
            });
      }
  });

  //Clears custom validation message when the user starts typing for username, email, and password
  document.getElementById("username").addEventListener("input", () => {
    document.getElementById("username").setCustomValidity(""); 
  });

  document.getElementById("email").addEventListener("input", () => {
    document.getElementById("email").setCustomValidity(""); 
  });

  document.getElementById("password").addEventListener("input", () => {
      document.getElementById("password").setCustomValidity("");
  });

  document.getElementById("confirmPassword").addEventListener("input", () => {
      document.getElementById("confirmPassword").setCustomValidity("");
  });
};