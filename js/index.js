//==================== Login Function ====================//
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const requiredUserName = "admin";
  const requiredPassword = "admin123";

  if (username === requiredUserName && password === requiredPassword) {
    window.location.assign("homePage.html");
  } else {
    alert("Wrong Credentials, Please Try Again");
  }
}
function togglePassword() {
  const passwordInput = document.getElementById("password");
  const icon = document.getElementById("eyeIcon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text"; // password show
    icon.textContent = "🐵"; // monkey icon
  } else {
    passwordInput.type = "password"; // password hide
    icon.textContent = "🙈"; // hide icon 
  }
}

//================ Global Variables & DOM  ==================//
let allIssues = [];

const issuesContainer = document.getElementById("issues-container");
const loadingCard = document.getElementById("loading-card");

//================ Show/Hide Loading ==================//
const showLoading = () => {
  loadingCard.classList.remove("hidden");
  issuesContainer.classList.add("opacity-50");
};

const hideLoading = () => {
  loadingCard.classList.add("hidden");
  issuesContainer.classList.remove("opacity-50");
};

//================ Show Issues With Loading ==================//
const showWithLoading = (data) => {
  showLoading();
  const delay = new Promise((resolve) => setTimeout(resolve, 1000));
  Promise.all([delay]).then(() => {
    displayIssues(data);
    displayIssuesCount(data);
    hideLoading();
  });
};

//================ Load Issues From API ==================//
const loadIssues = () => {
  showLoading();

  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => {
      allIssues = json.data;
      showWithLoading(allIssues);
    })
    .catch((err) => {
      issuesContainer.innerHTML = `<p class="text-center text-red-500 col-span-full">Error loading issues</p>`;
      console.error(err);
      hideLoading();
    });
};

//================ Display Issues Count ==================//
const displayIssuesCount = (issues) => {
  const countElement = document.getElementById("issues-count");
  countElement.innerText = `${issues.length} Issues`;
};

//================ Display Issues Cards ==================//
const displayIssues = (issues) => {
  issuesContainer.innerHTML = "";

  if (issues.length === 0) {
    issuesContainer.innerHTML = `<p class="text-center col-span-full text-gray-400">No Issues Found</p>`;
    return;
  }

  issues.forEach((issue) => {
    const borderColor =
      issue.status === "closed" ? "border-purple-500" : "border-green-500";
    const statusImage =
      issue.status.toLowerCase() === "closed"
        ? "./assets/images/Closed.png"
        : "./assets/images/Open.png";

    const card = document.createElement("div");
    card.innerHTML = `
      <div class="border-t-5 ${borderColor} rounded-xl p-6 shadow-md hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)] hover:shadow-[#575757] transition w-full h-full cursor-pointer">
        <div class="flex justify-between items-center mb-3">
          <img src="${statusImage}" alt="Status Image" class="w-9 h-9" />
          <span class="bg-[#FEECEC] text-[#EF4444] font-medium text-[13px] px-5 py-1.5 rounded-full">
            ${issue.priority.toUpperCase()}
          </span>
        </div>

        <h3 class="font-semibold text-[17px] mb-1 mt-5">${issue.title}</h3>
        <p class="text-gray-500 mb-4">${issue.description}</p>

        <div class="flex gap-2 mb-4 items-center pb-8 border-b-2 border-[#E4E4E7] flex-wrap">
          <span class="bg-[#FEECEC] text-[#EF4444] font-medium text-xs px-4 py-1.5 rounded-full flex items-center gap-1">
            <i class="fa-solid fa-bug"></i> ${issue.labels[0]?.toUpperCase()}
          </span>

          <span class="bg-yellow-100 text-[#D97706] text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1">
            <i class="fa-solid fa-life-ring"></i> ${issue.labels[1]?.toUpperCase()}
          </span>
        </div>

        <p class="text-sm text-[#64748B] mb-2">${issue.author}</p>
        <p class="text-sm text-[#64748B]">${issue.createdAt}</p>
      </div>
    `;
    issuesContainer.appendChild(card);

    //================ Modal On Click =================//
    card.addEventListener("click", () => {
      const modal = document.getElementById("issue_modal");
      showLoading();

      fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issue.id}`)
        .then((res) => res.json())
        .then((data) => {
          const singleIssue = data.data;

          document.getElementById("modal-title").innerText = singleIssue.title;
          const statusText =
            singleIssue.status.toLowerCase() === "closed" ? "Closed" : "Opened";
          const statusColor =
            singleIssue.status.toLowerCase() === "closed"
              ? "bg-purple-500"
              : "bg-green-500";
          const statusImageModal =
            singleIssue.status.toLowerCase() === "closed"
              ? "./assets/images/Closed.png"
              : "./assets/images/Open.png";

          document.getElementById("modal-status").innerHTML = `
            <div class="flex items-center gap-2">
              <img src="${statusImageModal}" alt="Status Image" class="w-6 h-6"/>
              <span class="badge text-white text-sm ${statusColor}">${statusText}</span>
            </div>
            <div class="flex flex-wrap gap-2 text-sm mt-2">
              <span><i class="fa-solid fa-circle"></i> ${singleIssue.author}</span>
              <span><i class="fa-solid fa-circle"></i> ${singleIssue.createdAt}</span>
            </div>
          `;

          document.getElementById("modal-tags").innerHTML = `
            <span class="badge badge-outline bg-[#FEECEC] text-[#EF4444] text-sm">${singleIssue.labels[0]?.toUpperCase()}</span>
            <span class="badge badge-outline bg-yellow-100 text-[#D97706] text-sm">${singleIssue.labels[1]?.toUpperCase()}</span>
          `;

          document.getElementById("modal-description").innerText =
            singleIssue.description;
          document.getElementById("modal-assignee").innerText =
            singleIssue.author;
          document.getElementById("modal-priority").innerText =
            singleIssue.priority;

          modal.showModal();
        })
        .catch((err) => console.error("Modal API Error:", err))
        .finally(() => setTimeout(hideLoading, 1000));
    });
  });
};

//================ Filter Issues With Loading =================//
const filterIssues = (status) => {
  let filtered =
    status === "all"
      ? allIssues
      : allIssues.filter((issue) => issue.status.toLowerCase() === status);
  showWithLoading(filtered);
};

//================ Active Button Style =================//
const setActiveButton = (clickedBtn) => {
  const buttons = document.querySelectorAll("#all-btn, #open-btn, #closed-btn");
  buttons.forEach((btn) => {
    btn.classList.remove("bg-[#4A00FF]", "text-white");
    btn.classList.add("text-gray-600", "hover:bg-gray-100");
  });

  clickedBtn.classList.add("bg-[#4A00FF]", "text-white");
  clickedBtn.classList.remove("text-gray-600");
};

//================ Button Click Events =================//
document.getElementById("all-btn").addEventListener("click", (e) => {
  filterIssues("all");
  setActiveButton(e.target);
});
document.getElementById("open-btn").addEventListener("click", (e) => {
  filterIssues("open");
  setActiveButton(e.target);
});
document.getElementById("closed-btn").addEventListener("click", (e) => {
  filterIssues("closed");
  setActiveButton(e.target);
});

//================ Search Function =================//
const searchInput = document.getElementById("search-input");
const searchButton = document.querySelector('button[type="button"]');

const searchIssues = (searchText) => {
  showLoading();

  const fetchPromise = !searchText
    ? Promise.resolve({ data: allIssues })
    : fetch(
        `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${encodeURIComponent(searchText)}`,
      ).then((res) => res.json());

  const delay = new Promise((resolve) => setTimeout(resolve, 1000));

  Promise.all([fetchPromise, delay])
    .then((results) => {
      const data = results[0].data || allIssues;
      displayIssues(data);
      displayIssuesCount(data);
    })
    .catch((err) => {
      console.error("Search API Error:", err);
      issuesContainer.innerHTML = `<p class="text-center text-red-500 col-span-full">Error fetching search results</p>`;
    })
    .finally(() => hideLoading());
};

if (searchButton && searchInput) {
  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    searchIssues(query);
  });
}

//================ Initial Load =================//
loadIssues();
