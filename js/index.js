//============ Login Function : ============//
function login() {
  // Step - 01 : get username & pass using via Id :
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Step - 02 : Set Fixed username & Password :
  const requiredUserName = "admin";
  const requiredPassword = "admin123";

  if (username === requiredUserName && password === requiredPassword) {
    window.location.assign("homePage.html");
  } else {
    alert("Wrong Credentials, Please Try Again");
  }
}

//============ Home Page All Function ===========//

//============ Function : Fetch & Load Issues APi ===========//
const loadIssues = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((response) => response.json())
    .then((json) => {
      displayIssuesCount(json.data);
      displayIssues(json.data);
    });
};

//================= Function : Issues Count =================//
const displayIssuesCount = (issues) => {
  const countElement = document.getElementById("issues-count");
  countElement.innerText = `${issues.length} Issues`;
};

//================= Function : Display Issues Cards =================//
//================= Function : Display Issues Cards =================//
const displayIssues = (issues) => {
  const issuesContainer = document.getElementById("issues-container");

  issuesContainer.innerHTML = "";

  if (issues.length === 0) {
    issuesContainer.innerHTML = `<p class="text-center col-span-full text-gray-400">No Issues Found</p>`;
    return;
  }

  issues.forEach((issue) => {
    const card = document.createElement("div");
    card.innerHTML = `
       <!--================ Card Design ==============-->
          <div
            class="border-t-4 border-[#00A96E] rounded-xl p-6 shadow-md hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)] hover:shadow-[#575757] transition w-full h-full cursor-pointer">
            <div class="flex justify-between items-center mb-3">
              <img
                src="./assets/images/Open-Status.png"
                alt="Not Found"
                class="w-9 h-9"/>

              <!--======= Priority ======-->
              <span
                class="bg-[#FEECEC] text-[#EF4444] font-medium text-[13px] px-5 py-1.5 rounded-full"
                >${issue.priority.toUpperCase()}</span>
            </div>

            <!--====== Title ======-->
            <h3 class="font-semibold text-[17px] mb-1 mt-5">
              ${issue.title}
            </h3>

            <!--====== description ======-->
            <p class="text-[14px] text-gray-500 mb-4">
               ${issue.description}
            </p>

          <div
          class="flex gap-2 mb-4 items-center pb-8 border-b-2 border-[#E4E4E7]">
          <span
          class="bg-[#FEECEC] text-[#EF4444] font-medium text-xs px-4 py-1.5 rounded-full">
          <i class="fa-solid fa-bug"></i>
          ${issue.labels[0]?.toUpperCase()}
          </span>

          <span
          class="bg-yellow-100 text-[#D97706] text-xs font-medium px-3 py-1.5 rounded-full">
          <i class="fa-solid fa-life-ring"></i>
          ${issue.labels[1]?.toUpperCase()}
          </span>
          </div>

            <p class="text-sm text-[#64748B] mb-2">${issue.author}</p>
            <p class="text-sm text-[#64748B]">${issue.createdAt}</p>
          </div>
       `;

    // Append Container :
    issuesContainer.appendChild(card);

    // ================= Modal Click Event =================
    card.addEventListener("click", () => {
      const modal = document.getElementById("issue_modal");

      // Populate modal content dynamically
      document.getElementById("modal-title").innerText = issue.title;

      // Status section with responsive layout
      document.getElementById("modal-status").className =
        "flex flex-col sm:flex-row sm:items-center gap-2 lg:gap-3 mb-4";
      document.getElementById("modal-status").innerHTML = `
    <!-- Status badge always first row on small screens -->
    <span class="badge badge-success text-white text-sm lg:text-base">${issue.status || "Opened"}</span>

    <!-- Author + Date go to second row on small screens -->
    <div class="flex flex-wrap gap-2 text-sm lg:text-base">
      <span><i class="fa-solid fa-circle"></i> ${issue.author}</span>
      <span><i class="fa-solid fa-circle"></i> ${issue.createdAt}</span>
    </div>
  `;

      // Tags section with wrapping
      document.getElementById("modal-tags").className =
        "flex flex-wrap gap-2 lg:gap-3 mb-4";
      document.getElementById("modal-tags").innerHTML = `
    <span class="badge badge-outline bg-[#FEECEC] text-[#EF4444] text-sm lg:text-base">${issue.labels[0]?.toUpperCase()}</span>
    <span class="badge badge-outline bg-yellow-100 text-[#D97706] text-sm lg:text-base">${issue.labels[1]?.toUpperCase()}</span>
  `;

      // Description
      document.getElementById("modal-description").className =
        "text-gray-600 text-sm lg:text-base mb-6";
      document.getElementById("modal-description").innerText =
        issue.description;

      // Assignee
      document.getElementById("modal-assignee").className =
        "font-semibold text-sm lg:text-base";
      document.getElementById("modal-assignee").innerText = issue.author;

      // Priority
      document.getElementById("modal-priority").className =
        "badge bg-red-500 text-white border-none p-3 text-sm lg:text-base";
      document.getElementById("modal-priority").innerText = issue.priority;

      modal.showModal();
    });
  });
};

loadIssues();
