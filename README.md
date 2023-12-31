# CalvinFinds Client
This is the client application for the [CalvinFinds project](https://github.com/calvin-cs262-fall2023-teamA/project).

The app currently contains a login/signup screen, a main screen, a details screen, an add (item) screen, and a user profile screen.
- **Login/Signup page:**  
   - Contains fields for entering a username/password and buttons to "log in" (or "sign up" to create a new account).
   - The "log in" button will navigate to the main page if the existing user credentials are correctly entered.
- **Main page:**
   - Contains a list of lost/found items that have been posted by users.
   - The cards for these items currently include titles and descriptions but lack detail regarding pictures, location, etc.).
   - The main page also includes a search bar to search for specific items.
   - The toggle button allows the user to toggle between lost and found items.
- **Add Items page:**
   - Allows the user to add items (lost/found item cards) to the main page.
   - Users can either select an already existing image in their device or use the camera to upload a new image.
   - Users can select a location using the maps.
   - The items added from this page are displayed on the main page.
- **Details page:**
   - Contains a detailed description of the items including the username and email of the user who posted it.
   - Contains comments from users on the items.
- **User Profile page:**
   - Displays the current user's name and email.
   - Includes number of items posted and number of items claimed.
   - The "log out" button will navigate to the login page.
- **Online Help page:**
   - Contains navigation instructions and descriptions about the page.
   - Currently present on the main page, details page, and profile page.
### Unique Dependencies:
- react-native-svg
- expo-image-picker
- expo-status-bar
- react-native-dropdown-picker
- react-native-maps
- react-native-async-storage/async-storage

The data service is hosted on Azure (see the [CalvinFinds service](https://github.com/calvin-cs262-fall2023-teamA/service)).
