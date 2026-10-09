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

let currentFilter = "All";
let currentOrder = "Choose...";

// Filter issue
function filterIssues() {
  if (currentFilter === "Open") {
    return dataIssues.filter(function (issue) {
      return issue.status === "new";
    });
  } else if (currentFilter === "Close") {
    return dataIssues.filter(function (issue) {
      return issue.status === "closed";
    });
  } else {
    return dataIssues.slice();
  }
}

// Order issues
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
  } else if (currentOrder === "DESC") {
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

// Render issue
function renderData() {
  issuesList.innerHTML = "";

  let filteredIssues = filterIssues();

  let orderedIssues = orderIssues(filteredIssues);

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

// Add issue
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

// Delete issue
function deleteTodo(issueId) {
  function checkIssue(issue) {
    return issue.id === issueId;
  }

  const index = dataIssues.findIndex(checkIssue);

  if (index === -1) {
    return;
  }

  dataIssues.splice(index, 1);

  renderData();
}

// Filter button
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

addForm.addEventListener("submit", addTodo);

renderData();
