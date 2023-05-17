chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("zoom called");
  const maxWidth = 1200; // customize this as required
  let zoomScale;
  let percentage = (request.width / maxWidth) * 100;

  if (percentage <= 110) {
    zoomScale = 1.1;
  } else if (percentage <= 125) {
    zoomScale = 1.25;
  } else if (percentage <= 150) {
    zoomScale = 1.5;
  } else if (percentage <= 175) {
    zoomScale = 1.75;
  } else {
    zoomScale = 2;
  }
  console.log("zoom call ended");

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.setZoom(tabs[0].id, zoomScale);
  });
});
