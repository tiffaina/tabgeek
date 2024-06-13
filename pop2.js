document.addEventListener('DOMContentLoaded', function () {
    console.log('Popup DOM content loaded');  // Debug log
  
    const searchInput = document.getElementById('search');
    const findButton = document.getElementById('findButton');
    const resultsList = document.getElementById('results');
  
    console.log('Search input:', searchInput);  // Debug log
    console.log('Find button:', findButton);  // Debug log
  
    // Notify background script that the popup is opened
    chrome.runtime.sendMessage({ popupOpen: true });
  
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
  });
