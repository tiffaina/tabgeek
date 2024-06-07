document.addEventListener('DOMContentLoaded', function () {
    console.log('Popup DOM content loaded');  // Debug log
  
    const searchInput = document.getElementById('search');
    const findButton = document.getElementById('findButton');
    const resultsList = document.getElementById('results');
  
    console.log('Search input:', searchInput);  // Debug log
    console.log('Find button:', findButton);  // Debug log
  
    const searchTabs = () => {
      const query = searchInput.value.toLowerCase();
      console.log(`Search query: ${query}`);  // Debug log
  
      chrome.storage.local.get(['allTabs'], (result) => {
        if (chrome.runtime.lastError) {
          console.error('Error retrieving tabs:', chrome.runtime.lastError);
          return;
        }
  
        const allTabs = result.allTabs || [];
        console.log(`All tabs retrieved:`, allTabs);  // Debug log
  
        const filteredTabs = allTabs.filter(tab => 
          tab.title.toLowerCase().includes(query) || 
          tab.url.toLowerCase().includes(query)
        );
  
        console.log(`Filtered tabs:`, filteredTabs);  // Debug log
  
        resultsList.innerHTML = '';
        filteredTabs.forEach(tab => {
          const listItem = document.createElement('li');
          listItem.textContent = `${tab.title} - ${tab.url}`;
          listItem.addEventListener('click', () => {
            chrome.tabs.update(tab.id, { active: true });
            chrome.windows.update(tab.windowId, { focused: true });
          });
          resultsList.appendChild(listItem);
        });
      });
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
  