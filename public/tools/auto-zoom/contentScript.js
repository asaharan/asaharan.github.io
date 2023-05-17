// window.chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   if (message.command == "zoom") {
//     var maxWidth = message.maxWidth || 800; // default maxWidth is 800px
//     var zoomLevels = [1, 1.1, 1.25, 1.5, 1.75, 2]; // possible zoom levels
//     chrome.tabs.getZoom(function (zoomFactor) {
//       chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         var windowWidth = tabs[0].width * zoomFactor;
//         if (windowWidth > maxWidth) {
//           var newZoomFactor = zoomLevels.reduce(function (prev, curr) {
//             return Math.abs(curr - zoomFactor) < Math.abs(prev - zoomFactor)
//               ? curr
//               : prev;
//           });
//           chrome.tabs.setZoom(undefined, newZoomFactor);
//         }
//       });
//     });
//   }
// });

// window.chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//   if (changeInfo.status == "complete") {
//     chrome.tabs.sendMessage(tabId, { command: "zoom" });
//   }
// });
