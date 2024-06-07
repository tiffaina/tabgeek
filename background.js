chrome.runtime.onInstalled.addListener(() => {
    console.log('Tab Search extension installed.');
  });
  
  chrome.action.onClicked.addListener((tab) => {
    console.log('Extension icon clicked');
    chrome.tabs.query({}, function(tabs) {
      if (chrome.runtime.lastError) {
        console.error('Error querying tabs:', chrome.runtime.lastError);
        return;
      }
      chrome.storage.local.set({ allTabs: tabs }, () => {
        console.log('All tabs stored:', tabs);
      });
    });
  });
  