document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("popup");
    const openPopup = document.getElementById("openPopup");
    const closePopup = document.getElementById("closePopup");
    const contentWrapper = document.querySelector(".content-wrapper");
    const authForm = document.getElementById("authForm");
  
    const popupTitle = document.getElementById("popupTitle");
    const submitButton = document.getElementById("submitButton");
    const confirmPasswordDiv = document.getElementById("confirmPasswordDiv");
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
    }

    function clearFields(){
      const passwordField = document.getElementById("password");
      const confirmPasswordField = document.getElementById("confirmPassword");

      document.getElementById("email").value = "";
      passwordField.value = "";
      confirmPasswordField.value = "";
    }
  
    function toggleToSignUp() {
      popupTitle.textContent = "Register";
      submitButton.textContent = "Sign Up";
      confirmPasswordDiv.classList.remove("hidden");
      formRow.style.display = "none"; 
      popup.style.height = "425px";
      toggleLinkText.innerHTML = "Already have an account? <b><a id='toggleLink' href='#'>Sign In</a></b>";
      attachToggleEvent(); //Reattach event listener to the link since it has changed
    }
  
    function toggleToSignIn() {
      popupTitle.textContent = "Sign In";
      submitButton.textContent = "Login";
      confirmPasswordDiv.classList.add("hidden");
      formRow.style.display = "block"; 
      popup.style.height = "400px";
      toggleLinkText.innerHTML = "Don't have an account? <b><a id='toggleLink' href='#'>Register</a></b>";
      attachToggleEvent(); //Reattach event listener to the link since it has changed
    }

    //Show popup when sign in is clicked, close popup when user clicks hidepopup X button.
    if (openPopup) openPopup.addEventListener("click", showPopup);
    if (closePopup) closePopup.addEventListener("click", hidePopup);
  
    //Closes popup if user clicks anywhere outside popup
    window.addEventListener("click", (e) => {
      if (!popup.contains(e.target) && e.target !== openPopup) {
        hidePopup();
        clearFields();
      }
    });
  
    function attachToggleEvent() { //Reattaches event listener to the link everytime it changes.
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

    if (authForm) {
      //Real time validation
      const passwordField = document.getElementById("password");
      const confirmPasswordField = document.getElementById("confirmPassword");
    
      //Validate whenever either password field changes
      const validatePasswords = () => {
        const password = passwordField.value;
        const confirmPassword = confirmPasswordField.value;
        
        if (confirmPassword && password !== confirmPassword) {
          confirmPasswordField.setCustomValidity("Passwords must match!");
        } else {
          confirmPasswordField.setCustomValidity("");
        }
      };
    
      passwordField.addEventListener("input", validatePasswords);
      confirmPasswordField.addEventListener("input", validatePasswords);
    
      //Form submission
      authForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = passwordField.value;
        const confirmPassword = confirmPasswordField.value;
    
        if (popupTitle.textContent === "Sign In") {
          //Sign-in logic

          console.log("Signing in with", { email, password });
        } else {
          //Sign-up logic
       
          console.log("Registering with", { email, password, confirmPassword });
        }

        hidePopup();
        clearFields();
        
      });
    }

  });
  