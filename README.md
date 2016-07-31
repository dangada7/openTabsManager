# OpenTabsManager
Help the user manage his open tabs on chrome.

### Things to do
1. Tag URLs
  - Show tags in the main view (finish)
  - Better UI for creating new tags - use popover
  - in menu button - show all the tags (edit tags)
2. menu
  - help (how to use)
  - About
  - settings (window location and size)
3. Refactoring - move all style to css (finish)
4. more information about the files
5. Last tabs close.

### Features
1. Display a list with all the open Tabs of the current window.
2. Highlighted tab in the background on selected
3. Close tabs
4. Search tabs titles
5. Close window on unfocused
6. Add tags to tabs

### how to use
- Use "tab" and "shift + tab" to move between tabs.
- Use "ctrl + shift + s" to open the tabs manger extension.
- Use "t" to add new tag.
- On unfocused the extension will be closed.

### External library
- bootstrap 3.3.6
- jquery 2.0.0
- chrome API

### Files architecture  
- popup.* the first window, create a new popup window - mainPage
- mainPage.* - contain the main page
- misc
  - globalProperty.js - contain all the global properties
  - listenerLib.js - contain all the button listener
  - sortLib.js
  - tabLib.js - contain the code that arrange the tabs
