document.getElementById("apply").addEventListener("click", function () {
  var maxWidth = document.getElementById("maxWidth").value;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      command: "zoom",
      maxWidth: maxWidth,
    });
  });
});
