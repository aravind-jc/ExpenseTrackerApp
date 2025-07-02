// Microsoft Login Configuration
const msalConfig = {
  auth: {
    clientId: "c7a76366-d5fc-4a4b-85e0-36f9d3b5d0b7", // Your app's client ID
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "https://aravind-jc.github.io/ExpenseTrackerApp/"
  }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

const loginRequest = {
  scopes: ["User.Read", "Files.ReadWrite.All"]
};

document.getElementById("loginButton").addEventListener("click", async () => {
  if (msalInstance.getAllAccounts().length > 0) {
    alert("Already logged in!");
    return;
  }

  try {
    const loginResponse = await msalInstance.loginPopup(loginRequest);
    alert("Login successful!");
    console.log("Access Token:", loginResponse.accessToken);
  } catch (error) {
    if (error.errorCode === "interaction_in_progress") {
      alert("Login already in progress. Please wait.");
    } else {
      alert(`Login failed: ${error.errorCode}\n${error.errorMessage}`);
    }
  }
});

// Placeholder: Handle form submission (later we'll send to Excel)
document.getElementById("expenseForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Expense saved (not yet sent to Excel)");
});
