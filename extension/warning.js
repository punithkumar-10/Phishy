document.getElementById("continueLink").addEventListener("click", function (event) {
  event.preventDefault();

  // Request the original URL from the background script
  chrome.runtime.sendMessage({ action: "getOriginalUrl" }, function (response) {
    const originalUrl = response.originalUrl;
    if (originalUrl) {
      chrome.tabs.update({ url: originalUrl });

      // Send message to background script to skip further checks for this tab
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentTab = tabs[0];
        chrome.runtime.sendMessage({
          action: "skipCheckForUrl",
          tabId: currentTab.id,
          url: currentTab.url
        });
      });
    }

    // Reset the warning page flag in the background script
    chrome.runtime.sendMessage({ action: "resetWarningFlag" });
  });
});
