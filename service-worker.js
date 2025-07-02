self.addEventListener("install", function (e) {
  console.log("Service Worker: Installed");
});

self.addEventListener("fetch", function (e) {
  // Optional: Add fetch caching later if needed
});
