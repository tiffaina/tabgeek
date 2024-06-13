document.addEventListener('DOMContentLoaded', function () {
  console.log('Popup DOM content loaded');  // Debug log

  // Notify background script that the popup is opened
  chrome.runtime.sendMessage({ popupOpen: true });

  const searchInput = document.getElementById('search');
  const findButton = document.getElementById('findButton');
  const resultsList = document.getElementById('results');

  console.log('Search input:', searchInput);  // Debug log
  console.log('Find button:', findButton);  // Debug log

  // chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  //   if (message.tabsData) {
  //       const tabsData = message.tabsData;
  //       console.log('Tabs data received:', tabsData);
  //       // Now you can use tabsData for your popup functionality
  //   }
// });

  const searchTabs = () => {
    const query = searchInput.value.toLowerCase();
    console.log(`Search query: ${query}`);  // Debug log

    // Send message to background script with search query
    chrome.runtime.sendMessage({ searchQuery: query });
  };

  searchInput.addEventListener('keypress', function (e) {
    console.log('Key pressed:', e.key);  // Debug log
    if (e.key === 'Enter') {
      searchTabs();
    }
  });

  findButton.addEventListener('click', function () {
    console.log('Find button clicked');  // Debug log
    searchTabs();
  });

  // Listen for messages from background script
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.filteredTabs) {
      console.log('Received filtered tabs:', message.filteredTabs);
      displayFilteredTabs(message.filteredTabs);
    }
  });

  // Function to display filtered tabs
  function displayFilteredTabs(filteredTabs) {
    // Clear previous results
    resultsList.innerHTML = '';

    // Iterate over each filtered tab
    filteredTabs.forEach(tab => {
        // Create a list item for the tab
        const listItem = document.createElement('li');

        // Create a link for the tab title and URL
        const link = document.createElement('a');
        link.textContent = `${tab.title} - ${tab.url}`;
        link.href = tab.url;
        link.target = '_blank'; // Open link in a new tab

        // Append the link to the list item
        listItem.appendChild(link);

        // Append the list item to the results list
        resultsList.appendChild(listItem);

        // Open tab on click
        listItem.addEventListener('click', () => {
            // Check if the tab is already open
            chrome.tabs.query({ url: tab.url }, function(existingTabs) {
                if (existingTabs.length > 0) {
                    // If tab is already open, activate it
                    chrome.tabs.update(existingTabs[0].id, { active: true });
                    chrome.windows.update(existingTabs[0].windowId, { focused: true });
                } else {
                    // If tab is not open, open a new one
                    chrome.tabs.create({ url: tab.url });
                }
            });
        });
    });
}

});
