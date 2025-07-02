// MSAL Configuration
const msalConfig = {
  auth: {
    clientId: "c7a76366-d5fc-4a4b-85e0-36f9d3b5d0b7", // Replace with your own Client ID
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "https://aravindmudhira1.expensetrackerapp.repl.co" // Replace with your Replit live URL
  }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

// Login request scopes
const loginRequest = {
  scopes: ["User.Read", "Files.ReadWrite.All", "offline_access"]
};

// Login button click handler
document.getElementById("loginButton").addEventListener("click", async () => {
  if (msalInstance.getAllAccounts().length > 0) {
    alert("Already logged in!");
    return;
  }

  try {
    const loginResponse = await msalInstance.loginPopup(loginRequest);
    alert("Login successful!");
    console.log("Access token:", loginResponse.accessToken);

    // You can now call Microsoft Graph or OneDrive API here
  } catch (error) {
    if (error.errorCode === "interaction_in_progress") {
      alert("Login failed: Another login attempt is already running. Please wait and try again.");
    } else if (error.errorCode === "user_cancelled") {
      alert("Login cancelled by user.");
    } else {
      alert(`Login failed: ${error.errorCode}\n${error.errorMessage}`);
    }
  }
});
