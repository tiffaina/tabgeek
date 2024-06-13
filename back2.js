chrome.runtime.onInstalled.addListener(() => {
    console.log('Tab Search extension installed.');
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.popupOpen) {
        console.log('Popup opened');

        // chrome.tabs.query({}, function(tabs) {
        //     console.log('All tabs retrieved:', tabs);
        //     // Send all tabs data directly to popup
        //     chrome.runtime.sendMessage({ allTabs: tabs });
        // }); // <- Closing parenthesis was missing here
    } else if (message.searchQuery) {
        console.log('Search query received:', message.searchQuery);
        // Run search logic when search query is received
        searchTabs(message.searchQuery);
    }
});


// Search tabs function
function searchTabs(query) {
    chrome.tabs.query({}, function(tabs) {
        if (chrome.runtime.lastError) {
            console.error('Error querying tabs:', chrome.runtime.lastError);
            return;
        }
        // } else {
        //     chrome.runtime.sendMessage({ allTabs: tabs });
        // }
        const filteredTabs = tabs.filter(tab => 
            tab.title.toLowerCase().includes(query.toLowerCase()).trim() || 
            tab.url.toLowerCase().includes(query.toLowerCase())
        );
        console.log('Filtered tabs:', filteredTabs);
        // Send message back to popup with filtered tabs
        chrome.runtime.sendMessage({ filteredTabs: filteredTabs });
    });
}

// Log when tabs are stored in local storage
chrome.storage.local.onChanged.addListener(function(changes, namespace) {
    console.log('All tabs stored in local storage:', changes);
});
