chrome.runtime.onInstalled.addListener(() => {
    console.log('Tab Search extension installed.');
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.popupOpen) {
        console.log('Popup opened');
    } else if (message.searchQuery) {
        console.log('Search query received:', message.searchQuery);
        // Run your search logic here using message.searchQuery
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
        const filteredTabs = tabs.filter(tab => 
            tab.title.toLowerCase().includes(query) || 
            tab.url.toLowerCase().includes(query)
        );
        console.log('Filtered tabs:', filteredTabs);
        // Do whatever you need with filteredTabs
    });
}
