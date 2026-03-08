//==================== Login Function : ====================//
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

//================ Home Page All Function ==================//

// Global Variable
let allIssues = [];

//============ Function : Fetch & Load Issues APi ===========//
const loadIssues = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((response) => response.json())
    .then((json) => {
      allIssues = json.data;

      displayIssuesCount(allIssues);
      displayIssues(allIssues);
    });
};

//================= Function : Issues Count =================//
const displayIssuesCount = (issues) => {
  const countElement = document.getElementById("issues-count");
  countElement.innerText = `${issues.length} Issues`;
};

//============= Function : Display Issues Cards =============//
const displayIssues = (issues) => {
  const issuesContainer = document.getElementById("issues-container");

  issuesContainer.innerHTML = "";

  if (issues.length === 0) {
    issuesContainer.innerHTML = `<p class="text-center col-span-full text-gray-400">No Issues Found</p>`;
    return;
  }

  issues.forEach((issue) => {
    const borderColor =
      issue.status === "closed" ? "border-purple-500" : "border-green-500";

    //=================== Card-level Status Image ===================//
    const statusImage =
      issue.status.toLowerCase() === "closed"
        ? "./assets/images/Closed.png"
        : "./assets/images/Open.png";

    const card = document.createElement("div");

    card.innerHTML = `
       <div
  class="border-t-5 ${borderColor} rounded-xl p-6 lg:p-6 md:p-4 shadow-md hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)] hover:shadow-[#575757] transition w-full h-full cursor-pointer"
>
  <div class="flex justify-between items-center mb-3">
    <img
      src="${statusImage}"
      alt="Status Image"
      class="w-9 h-9 lg:w-9 lg:h-9 md:w-7 md:h-7"
    />

    <span
      class="bg-[#FEECEC] text-[#EF4444] font-medium text-[13px] lg:text-[13px] md:text-[11px] px-5 lg:px-5 md:px-3 py-1.5 rounded-full"
      >${issue.priority.toUpperCase()}</span
    >
  </div>

  <h3 class="font-semibold text-[17px] lg:text-[17px] md:text-[14px] mb-1 mt-5">
    ${issue.title}
  </h3>

  <p class="text-[14px] lg:text-[14px] md:text-[12px] text-gray-500 mb-4">
    ${issue.description}
  </p>

  <div
    class="flex gap-2 mb-4 items-center pb-8 border-b-2 border-[#E4E4E7] flex-wrap"
  >
    <span
      class="bg-[#FEECEC] text-[#EF4444] font-medium text-xs lg:text-xs md:text-[10px] px-4 lg:px-4 md:px-2 py-1.5 rounded-full flex items-center gap-1"
    >
      <i class="fa-solid fa-bug"></i>
      ${issue.labels[0]?.toUpperCase()}
    </span>

    <span
      class="bg-yellow-100 text-[#D97706] text-xs lg:text-xs md:text-[10px] font-medium px-3 lg:px-3 md:px-2 py-1.5 rounded-full flex items-center gap-1"
    >
      <i class="fa-solid fa-life-ring"></i>
      ${issue.labels[1]?.toUpperCase()}
    </span>
  </div>

  <p class="text-sm lg:text-sm md:text-[12px] text-[#64748B] mb-2">
    ${issue.author}
  </p>
  <p class="text-sm lg:text-sm md:text-[12px] text-[#64748B]">
    ${issue.createdAt}
  </p>
</div>
       `;

    issuesContainer.appendChild(card);

    //================= Function : Modal Click =================//
    card.addEventListener("click", () => {
      const modal = document.getElementById("issue_modal");

      fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issue.id}`)
        .then((res) => res.json())
        .then((data) => {
          const singleIssue = data.data;

          document.getElementById("modal-title").innerText = singleIssue.title;

          document.getElementById("modal-status").className =
            "flex flex-col sm:flex-row sm:items-center gap-2 lg:gap-3 mb-4";

          //====== Dynamic Status Badge & Image =======//
          const statusText =
            singleIssue.status.toLowerCase() === "closed" ? "Closed" : "Opened";
          const statusColor =
            singleIssue.status.toLowerCase() === "closed"
              ? "bg-purple-500"
              : "bg-green-500";

          // Set Closed / Opened Status Image :
          const statusImageModal =
            singleIssue.status.toLowerCase() === "closed"
              ? "./assets/images/Closed.png"
              : "./assets/images/Open.png";

          document.getElementById("modal-status").innerHTML = `
            <div class="flex items-center gap-2">
              <img src="${statusImageModal}" alt="Status Image" class="w-6 h-6"/>
              <span class="badge text-white text-sm lg:text-base ${statusColor}">
                ${statusText}
              </span>
            </div>

            <div class="flex flex-wrap gap-2 text-sm lg:text-base mt-2">
              <span><i class="fa-solid fa-circle"></i> ${singleIssue.author}</span>
              <span><i class="fa-solid fa-circle"></i> ${singleIssue.createdAt}</span>
            </div>
          `;

          document.getElementById("modal-tags").className =
            "flex flex-wrap gap-2 lg:gap-3 mb-4";

          document.getElementById("modal-tags").innerHTML = `
            <span class="badge badge-outline bg-[#FEECEC] text-[#EF4444] text-sm lg:text-base">
              ${singleIssue.labels[0]?.toUpperCase()}
            </span>

            <span class="badge badge-outline bg-yellow-100 text-[#D97706] text-sm lg:text-base">
              ${singleIssue.labels[1]?.toUpperCase()}
            </span>
          `;

          document.getElementById("modal-description").className =
            "text-gray-600 text-sm lg:text-base mb-6";

          document.getElementById("modal-description").innerText =
            singleIssue.description;

          document.getElementById("modal-assignee").className =
            "font-semibold text-sm lg:text-base";

          document.getElementById("modal-assignee").innerText =
            singleIssue.author;

          document.getElementById("modal-priority").className =
            "badge bg-red-500 text-white border-none p-3 text-sm lg:text-base";

          document.getElementById("modal-priority").innerText =
            singleIssue.priority;

          modal.showModal();
        });
    });
  });
};

//=============== Function : Toggling - All,open,closed =============//
const filterIssues = (status) => {
  if (status === "all") {
    displayIssues(allIssues);
    displayIssuesCount(allIssues);
    return;
  }

  const filtered = allIssues.filter(
    (issue) => issue.status.toLowerCase() === status,
  );

  displayIssues(filtered);
  displayIssuesCount(filtered);
};

//================= Active Button Style Function =====================//
const setActiveButton = (clickedBtn) => {
  const buttons = document.querySelectorAll("#all-btn, #open-btn, #closed-btn");

  buttons.forEach((btn) => {
    btn.classList.remove(
      "bg-[#4A00FF]",
      "text-white",
      "hover:bg-[#4A00FF]",
      "hover:bg-gray-100",
    );
    btn.classList.add("text-gray-600");

    if (btn !== clickedBtn) {
      btn.classList.add("hover:bg-gray-100");
    }
  });

  clickedBtn.classList.add("bg-[#4A00FF]", "text-white");
  clickedBtn.classList.remove("text-gray-600");

  clickedBtn.classList.remove("hover:bg-gray-100");
};

//=============== Button Events & On click To Action : =============//
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

//==================== Search Button Click ====================//
const searchInput = document.getElementById("search-input");
const searchButton = document.querySelector(
  'button[type="button"]', // যেটি search button
);

if (searchButton && searchInput) {
  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    searchIssues(query);
  });
}

//==================== Search Function & API Call ====================//
const searchIssues = (searchText) => {
  if (!searchText) {
    // যদি খালি থাকে, সব issues দেখাবে
    displayIssues(allIssues);
    displayIssuesCount(allIssues);
    return;
  }

  fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${encodeURIComponent(
      searchText,
    )}`,
  )
    .then((res) => res.json())
    .then((data) => {
      const searchResults = data.data || [];
      displayIssues(searchResults);
      displayIssuesCount(searchResults);
    })
    .catch((err) => {
      console.error("Search API Error:", err);
      const issuesContainer = document.getElementById("issues-container");
      issuesContainer.innerHTML = `<p class="text-center col-span-full text-red-500">Error fetching search results</p>`;
    });
};

// Initial Load
loadIssues();
