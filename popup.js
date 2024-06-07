document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search');
    const resultsList = document.getElementById('results');
  
    searchInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        const query = searchInput.value.toLowerCase();
  
        chrome.storage.local.get(['allTabs'], (result) => {
          const allTabs = result.allTabs || [];
          const filteredTabs = allTabs.filter(tab => 
            tab.title.toLowerCase().includes(query) || 
            tab.url.toLowerCase().includes(query)
          );
  
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
      }
    });
  });
  