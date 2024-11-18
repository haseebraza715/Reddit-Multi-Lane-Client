### **Reddit Multi-Lane Client**

A browser-based Reddit client that allows users to view posts from multiple subreddits in customizable, responsive lanes. The app uses the Reddit JSON API for fetching and displaying posts dynamically.

---

### **Features**
- **Dynamic Subreddit Lanes**: Add or remove subreddit lanes by entering subreddit names.
- **Post Details**: View subreddit posts, including titles and vote counts.
- **Dark and Light Mode**: Switch between dark and light modes for better usability.
- **Local Storage Support**: Custom lanes are saved and restored on page reload.
- **Error Handling**: Displays messages for invalid or unavailable subreddits.
- **Responsive Design**: Works seamlessly on different screen sizes.

---

### **Technologies Used**
- **HTML/CSS**: For layout and styling.
- **JavaScript**: For functionality and API integration.
- **Reddit API**: For fetching subreddit data.

---

### **Getting Started**
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/haseebraza715/reddit-multi-lane-client.git
   cd reddit-multi-lane-client
   ```

2. **Open the App**:
   - Simply open the `index.html` file in your browser.

3. **Usage**:
   - Enter a subreddit name (e.g., `javascript`) in the modal to add a lane.
   - Click **Refresh** to reload posts or **Delete** to remove a lane.
   - Use the **Dark Mode Toggle** to switch between light and dark modes.

---

### **Customization**
- **API Endpoint**:
  - Fetch data from `https://www.reddit.com/r/{subreddit}.json`.
- **Styling**:
  - Modify `styles.css` to update themes, layouts, or animations.

---

### **License**
This project is open-source and available under the MIT License. 

Feel free to contribute and enhance the app! 🎉
