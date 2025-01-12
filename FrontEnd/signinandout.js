const popup = document.getElementById("popup");
const contentWrapper = document.querySelector(".content-wrapper");
const authForm = document.getElementById("authForm");

function hidePopup() {
    popup.classList.add("hidden");
    contentWrapper.classList.remove("blur-background");
}

if (authForm) {
    authForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const passwordField = document.getElementById("password");
      const confirmPasswordField = document.getElementById("confirmPassword");
      const password = passwordField.value;
  
      if (popupTitle.textContent === "Sign In") {
        //Implement Sign-in 




        console.log("Signing in with", { email, password });
      } else {
        //Implement Sign-up 



        
        const confirmPassword = confirmPasswordField.value;
        if (password !== confirmPassword) {
          alert("Passwords do not match! Please re-enter.");
          passwordField.value = "";
          confirmPasswordField.value = ""; 
          passwordField.focus(); 
          return; 
        }
        console.log("Registering with", { email, password, confirmPassword });
        

      }
      hidePopup();
    });
  }    