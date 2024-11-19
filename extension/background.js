let isWarningPageShown = false;
let originalUrl = "";
let skipCheckUrls = {};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    if (tab.url && !tab.url.startsWith("chrome://")) {
      if (isWarningPageShown) {
        // If the warning page is already shown, do not make another request
        return;
      }

      // Check if this tab has been redirected from the warning page
      if (skipCheckUrls[tabId]) {
        delete skipCheckUrls[tabId];
        return;
      }

      fetch("http://localhost:5000/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: tab.url }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Response:", data);
          if (data.result_url === "site is not secure") {
            isWarningPageShown = true; // Set the flag when the warning page is shown
            originalUrl = tab.url; // Store the original URL
            chrome.tabs.update(tabId, { url: "warning.html" });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle errors if needed
        });
    }
  }
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  // Reset the flag when the tab is closed
  isWarningPageShown = false;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "resetWarningFlag") {
    isWarningPageShown = false;
  } else if (message.action === "getOriginalUrl") {
    sendResponse({ originalUrl: originalUrl });
  } else if (message.action === "skipCheckForUrl") {
    const { tabId, url } = message;
    skipCheckUrls[tabId] = url;
  }
});
