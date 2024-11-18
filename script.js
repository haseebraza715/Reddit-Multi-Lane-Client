// DOM Elements
const laneContainer = document.getElementById("lane-container");
const openModalBtn = document.getElementById("open-modal-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const addModal = document.getElementById("add-modal");
const subredditInput = document.getElementById("subreddit-input");
const addLaneBtn = document.getElementById("add-lane-btn");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const searchInput = document.getElementById("search-input");

// State
let darkMode = false;

// Open and close modal
openModalBtn.addEventListener("click", () => {
  addModal.classList.remove("hidden");
  subredditInput.focus();
});

closeModalBtn.addEventListener("click", () => {
  addModal.classList.add("hidden");
});

// Add subreddit on Enter key
subredditInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addLaneBtn.click();
  }
});

// Add lane on button click
addLaneBtn.addEventListener("click", () => {
  const subreddit = subredditInput.value.trim();
  if (subreddit) {
    addLane(subreddit, 5); // Default to 5 posts
    subredditInput.value = "";
    addModal.classList.add("hidden");
  }
});

// Add a new subreddit lane
async function addLane(subreddit, postLimit = 5) {
  const lane = document.createElement("div");
  lane.className = "lane";
  lane.dataset.subreddit = subreddit.toLowerCase();
  lane.innerHTML = `<h3>Loading posts from /r/${subreddit}...</h3>`;
  laneContainer.appendChild(lane);

  try {
    const posts = await fetchSubredditPosts(subreddit, postLimit);
    if (posts.length === 0) {
      lane.innerHTML = `<h3>No posts found in /r/${subreddit}</h3>`;
      setTimeout(() => lane.remove(), 3000); // Remove lane after 3 seconds
      return;
    }

    lane.innerHTML = `
      <h3>/r/${subreddit}</h3>
      <ul>
        ${posts
          .map(
            (post) =>
              `<li title="${post.selftext.substring(
                0,
                100
              )}..."><a href="https://reddit.com${
                post.permalink
              }" target="_blank">${post.title}</a> (↑ ${post.ups})</li>`
          )
          .join("")}
      </ul>
      <div class="controls">
        <button onclick="refreshLane('${subreddit}', this, ${postLimit})">Refresh</button>
        <button onclick="deleteLane(this)">Delete</button>
      </div>
    `;
  } catch (error) {
    lane.innerHTML = `<h3 class="error">Failed to load /r/${subreddit}. Check if it exists.</h3>`;
    setTimeout(() => lane.remove(), 3000); // Remove lane after 3 seconds
  }
}

// Fetch subreddit posts using Reddit JSON feed
async function fetchSubredditPosts(subreddit, postLimit) {
  const url = `https://www.reddit.com/r/${subreddit}.json?limit=${postLimit}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Subreddit not found");
  }
  const json = await response.json();
  return json.data.children.map((child) => child.data);
}

// Refresh a specific lane
async function refreshLane(subreddit, button, postLimit = 5) {
  const lane = button.closest(".lane");
  lane.innerHTML = `<h3>Refreshing posts from /r/${subreddit}...</h3>`;
  try {
    const posts = await fetchSubredditPosts(subreddit, postLimit);
    if (posts.length === 0) {
      lane.innerHTML = `<h3>No posts found in /r/${subreddit}</h3>`;
      setTimeout(() => lane.remove(), 3000); // Remove lane after 3 seconds
      return;
    }

    lane.innerHTML = `
      <h3>/r/${subreddit}</h3>
      <ul>
        ${posts
          .map(
            (post) =>
              `<li title="${post.selftext.substring(
                0,
                100
              )}..."><a href="https://reddit.com${
                post.permalink
              }" target="_blank">${post.title}</a> (↑ ${post.ups})</li>`
          )
          .join("")}
      </ul>
      <div class="controls">
        <button onclick="refreshLane('${subreddit}', this, ${postLimit})">Refresh</button>
        <button onclick="deleteLane(this)">Delete</button>
      </div>
    `;
  } catch (error) {
    lane.innerHTML = `<h3 class="error">Failed to refresh /r/${subreddit}. Check your connection.</h3>`;
    setTimeout(() => lane.remove(), 3000); // Remove lane after 3 seconds
  }
}

// Delete a lane
function deleteLane(button) {
  const lane = button.closest(".lane");
  lane.remove();
}

// Dark mode toggle
darkModeToggle.addEventListener("click", () => {
  darkMode = !darkMode;
  document.body.classList.toggle("dark-mode", darkMode);
  darkModeToggle.textContent = darkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Search and filter lanes
searchInput.addEventListener("input", () => {
  const filter = searchInput.value.toLowerCase();
  const lanes = document.querySelectorAll(".lane");
  lanes.forEach((lane) => {
    const subreddit = lane.dataset.subreddit;
    lane.style.display = subreddit.includes(filter) ? "block" : "none";
  });
});
