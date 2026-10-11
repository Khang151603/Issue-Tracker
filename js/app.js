// 1. Data và DOM
// call api https://jsonplaceholder.typicode.com/todos?_limit=3 -> get default data issues
const dataIssues = [
  {
    id: 1,
    title: "Fix login form",
    author: "Khang",
    severity: "High",
    status: "new",
  },
  {
    id: 2,
    title: "Update homepage layout",
    author: "Ronaldo",
    severity: "Medium",
    status: "new",
  },
  {
    id: 3,
    title: "Check button labels",
    author: "Messi",
    severity: "Low",
    status: "closed",
  },
];

let nextIssueId = 4;

const addForm = document.getElementById("todo-form");
const issueTitleInput = document.getElementById("todo-title");
const issueAuthorSelect = document.getElementById("todo-author");
const issueSeveritySelect = document.getElementById("todo-severity");
const issuesList = document.getElementById("todo-list");

const allButton = document.querySelector(".all-button");
const openButton = document.querySelector(".open-button");
const closedButton = document.querySelector(".closed-button");
const orderSelect = document.querySelector(".order-select");
const searchInput = document.querySelector(".search-input");

let currentFilter = "All";
let currentOrder = "Choose...";
let currentSearch = "";

// 2. Filter
function filterIssues() {
  // if (currentFilter === "Open") {
  //   return dataIssues.filter(function (issue) {
  //     return issue.status === "new";
  //   });
  // } else if (currentFilter === "Close") {
  //   return dataIssues.filter(function (issue) {
  //     return issue.status === "closed";
  //   });
  // } else {
  //   return dataIssues.slice();
  // }

  if (currentFilter === "Open") {
    return dataIssues.filter(function (issue) {
      return issue.status === "new";
    });
  }
  if (currentFilter === "Close") {
    return dataIssues.filter(function (issue) {
      return issue.status === "closed";
    });
  } 

  return dataIssues.slice();
}

// 3. Search
function searchIssues(issues) {
  if (currentSearch.trim() === "") {
    return issues;
  }

  return issues.filter(function (issue) {
    return issue.title.toLowerCase().includes(currentSearch.toLowerCase());
  });
}

// 4. Order
function orderIssues(issues) {
  if (currentOrder === "ASC") {
    issues.sort(function (a, b) {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      }

      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }

      return 0;
    });
  } 
  
  if (currentOrder === "DESC") {
    issues.sort(function (a, b) {
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return -1;
      }

      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return 1;
      }

      return 0;
    });
  }

  return issues;
}

// 5. Add
function addTodo(event) {
  event.preventDefault();

  const newIssue = {
    id: nextIssueId,
    title: issueTitleInput.value,
    author: issueAuthorSelect.value,
    severity: issueSeveritySelect.value,
    status: "new",
  };

  dataIssues.unshift(newIssue);

  nextIssueId = nextIssueId + 1;

  renderData();

  issueTitleInput.value = "";
  issueAuthorSelect.selectedIndex = 0;
  issueSeveritySelect.selectedIndex = 0;
}

// 6. Delete
function deleteTodo(issueId) {
  function getIndexIssue(issue) {
    return issue.id === issueId;
  }

  const indexIssue = dataIssues.findIndex(getIndexIssue);

  if (indexIssue === -1) {
    return;
  }

  dataIssues.splice(indexIssue, 1);

  renderData();
}

// 7. Render
function renderData() {
  issuesList.innerHTML = "";

  let filteredIssues = filterIssues();

  let searchedIssues = searchIssues(filteredIssues);

  let orderedIssues = orderIssues(searchedIssues);

  orderedIssues.forEach(function (issue) {
    issuesList.innerHTML += `
      <article class="issue-card">
        <div class="issue-card-header">
          <span class="issue-id">${issue.id}</span>
          <span class="status-badge">${issue.status}</span>
        </div>

        <div class="issue-card-body">
          <h3 class="issue-title">${issue.title}</h3>

          <p class="issue-meta">
            Author:
            <span class="issue-author">${issue.author}</span>

            · Severity:
            <span class="issue-severity">${issue.severity}</span>
          </p>

          <div class="issue-actions">
            <button
              type="button"
              class="button close-button"
            >
              ${issue.status === "new" ? "Close" : "Open"}
            </button>

            <button
              type="button"
              class="button delete-button"
              onclick="deleteTodo(${issue.id})"
            >
              Delete
            </button>
          </div>
        </div>
      </article>
    `;
  });
}

// 8. Event listener
function setFilter(filterType) {
  currentFilter = filterType;
  renderData();
}

allButton.addEventListener("click", function () {
  setFilter("All");
});

openButton.addEventListener("click", function () {
  setFilter("Open");
});

closedButton.addEventListener("click", function () {
  setFilter("Close");
});

orderSelect.addEventListener("change", function (event) {
  currentOrder = event.target.value;
  renderData();
});

searchInput.addEventListener("input", function (event) {
  currentSearch = event.target.value;
  renderData();
});

addForm.addEventListener("submit", addTodo);

renderData();
