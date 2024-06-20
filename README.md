## TabGeek Extension Overview

### manifest.json
The configuration file for the Chrome extension, specifying the extension's name, version, permissions, background script, and popup details. It defines the necessary permissions for accessing tabs and local storage, and specifies the background script and popup interface.

### background.js
The background script that queries all open tabs and stores them in Chrome's local storage when the extension icon is clicked. It handles the tab query and storage process. (sync/await?)

### popup.js
The script for the popup interface that retrieves stored tab information from local storage and filters them based on user input. It listens for input in the search field and displays matching tabs, utilizing async/await to ensure smooth and responsive interactions.

### popup.html
The HTML structure for the popup interface, containing a search input field and a list to display filtered tabs. It provides the user interface for searching and viewing open tabs.

### Instructions for Running TabGeek in Chrome

1. **Open Chrome and Go to Extensions:**
   - Open Chrome.
   - Navigate to `chrome://extensions/` in the address bar.

2. **Enable Developer Mode:**
   - In the top right corner, toggle the switch to enable "Developer mode".

3. **Load the Extension:**
   - Click on the "Load unpacked" button.
   - Select the directory where you cloned the `tabgeek` repository.

4. **Verify Installation:**
   - The TabGeek extension should now appear in your list of extensions.
   - You should see the TabGeek icon in the Chrome toolbar.

5. **Use the Extension:**
   - Click on the TabGeek icon in the Chrome toolbar.
   - Use the search input in the popup to search through your open tabs.
  
  ### Known Bugs
Doesn't work for tabs that are Google searches
