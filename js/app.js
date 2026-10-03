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
    status: "new",
  },
];

let nextIssueId = 4;

const addForm = document.getElementById("todo-form");
const issueTitleInput = document.getElementById("todo-title");
const issueAuthorSelect = document.getElementById("todo-author");
const issueSeveritySelect = document.getElementById("todo-severity");
const issuesList = document.getElementById("todo-list");

function renderData() {
  issuesList.innerHTML = "";

  dataIssues.forEach(function (issue) {
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

addForm.addEventListener("submit", addTodo);

renderData();
