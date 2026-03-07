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

//================= Issues Count =================//
const displayIssuesCount = (issues) => {
  const countElement = document.getElementById("issues-count");
  countElement.innerText = `${issues.length} Issues`;
};

//================= Display Issues Cards =================//
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
            class="border-t-4 border-[#00A96E] rounded-xl p-6 shadow-md hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)] hover:shadow-[#4A00FF] transition w-full h-full">
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
  });
};
loadIssues();
