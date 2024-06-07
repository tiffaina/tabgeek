chrome.runtime.onInstalled.addListener(() => {
    console.log('Tab Search extension installed.');
  });
  
  chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.query({}, function(tabs) {
      chrome.storage.local.set({ allTabs: tabs });
    });
  });
  