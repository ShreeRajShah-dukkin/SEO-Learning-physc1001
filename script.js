// ============================================
// SIDEBAR TOGGLE
// ============================================
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const closeSidebarBtn = document.getElementById("close-sidebar");
let allTopics = [];

function toggleSidebar() {
  sidebar.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
}

menuBtn?.addEventListener("click", toggleSidebar);
closeSidebarBtn?.addEventListener("click", toggleSidebar);
overlay?.addEventListener("click", () => {
  if (!overlay.classList.contains("hidden")) {
    toggleSidebar();
  }
});

function renderSidebar() {
  const sidebarList = document.querySelector("#sidebar ul");
  if (!sidebarList) return;

  sidebarList.innerHTML = "";

  allTopics.forEach(topic => {
    const li = document.createElement("li");
    const button = document.createElement("button");

    button.type = "button";
    button.className = "topic-btn";
    button.innerText = topic.title;
    button.addEventListener("click", () => {
      loadTopic(topic.id);
      if (window.innerWidth <= 768) toggleSidebar();
    });

    li.appendChild(button);
    sidebarList.appendChild(li);
  });
}

// Close sidebar when a topic is clicked
document.querySelectorAll(".topic-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      toggleSidebar();
    }
  });
});

//============================================
// LOAD TOPICS
//============================================
if (typeof topics !== "undefined" && topics !== null) {
  allTopics = Object.entries(topics).map(([id, topicData]) => ({ id, ...topicData }));
  renderSidebar();
  if (allTopics.length > 0) {
    loadTopic(allTopics[0].id);
  }
} else {
  console.error("data.js not loaded: topics is undefined");
}

//=============================================
// LOAD TOPICS
//=============================================

function loadTopic(id) {
  const topic = allTopics.find(t => t.id === id);
  if (!topic) {
    console.error("Topic not found:", id);
    return;
  }

  const titleEl = document.getElementById("title");
  const authorEl = document.getElementById("author");
  const contentEl = document.getElementById("content");

  if (titleEl) titleEl.innerHTML = topic.title;
  if (authorEl) authorEl.innerHTML = "By " + topic.author;
  if (contentEl) contentEl.innerHTML = topic.content;

  topic.images.forEach((imageSrc, index) => {
    const imgElement = document.getElementById(`img${index + 1}`);
    if (imgElement) {
      imgElement.src = imageSrc;
      imgElement.style.display = "block";
    }
  });
}
