document.getElementById("check").addEventListener("click", async () => {
  let user_input = document.getElementById("sms").value.trim();

  if (user_input === "") {
    alert("Please enter a valid sms/mail/URL.");
    return;
  }

  fetch("http://localhost:5000/user_input", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_input: user_input }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("result-input").innerText =
        "Result Input: " + data.result_input;
    })
    .catch((error) => console.error("Error:", error));
});

chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  let url = tab.url;

  fetch("http://localhost:5000/url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: url }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("fetched-url").innerText =
        "Fetched_URL: " + data.url;
      document.getElementById("result-url").innerText =
        "Result URL: " + data.result_url;
      document.getElementById("non_phishy_count").innerText =
        "non phishy count: " + data.non_phishy_count;
      document.getElementById("phishy_count").innerText =
        "phishy count: " + data.phishy_count;
    })
    .catch((error) => console.error("Error:", error));
});
