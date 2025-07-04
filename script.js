const msalConfig = {
  auth: {
    clientId: "c7a76366-d5fc-4a4b-85e0-36f9d3b5d0b7",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "https://aravind-jc.github.io/ExpenseTrackerApp/"
  }
};


const msalInstance = new msal.PublicClientApplication(msalConfig);

const loginRequest = {
  scopes: ["User.Read", "Files.ReadWrite.All"]
};

document.getElementById("loginButton").addEventListener("click", () => {
  msalInstance.loginRedirect(loginRequest);
});

msalInstance.handleRedirectPromise()
  .then((response) => {
    if (response !== null) {
      const account = response.account;
      const allowedUser = "aravindmudhiraj@gmail.com"; // your email

      if (account.username.toLowerCase() === allowedUser.toLowerCase()) {
        alert("Login successful! Welcome " + account.username);
      } else {
        alert("Access denied: Unauthorized user");
        msalInstance.logoutRedirect();
      }
    }
  })
  .catch((error) => {
    console.error("Redirect handling failed:", error);
    alert("Login failed: " + error.errorMessage);
  });
// Placeholder: Handle form submission (later we'll send to Excel)
document.getElementById("expenseForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Expense saved (not yet sent to Excel)");
});
