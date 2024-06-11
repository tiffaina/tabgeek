## TabGeek Extension Overview

### manifest.json
The configuration file for the Chrome extension, specifying the extension's name, version, permissions, background script, and popup details. It defines the necessary permissions for accessing tabs and local storage, and specifies the background script and popup interface.

### background.js
The background script that queries all open tabs and stores them in Chrome's local storage when the extension icon is clicked. It handles the tab query and storage process. (sync/await?)

### popup.js
The script for the popup interface that retrieves stored tab information from local storage and filters them based on user input. It listens for input in the search field and displays matching tabs, utilizing async/await to ensure smooth and responsive interactions.

### popup.html
The HTML structure for the popup interface, containing a search input field and a list to display filtered tabs. It provides the user interface for searching and viewing open tabs.
