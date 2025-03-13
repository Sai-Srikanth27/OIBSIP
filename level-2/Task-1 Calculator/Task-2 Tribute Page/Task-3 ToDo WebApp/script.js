const taskInput = document.getElementById("task-entry");
const taskList = document.getElementById("task-list");

// Creates a new task and adds it to the list
function createTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) {
        alert("Please enter a task!");
        return;
    }

    const taskItem = document.createElement("li");
    taskItem.innerHTML = `${taskText}<span class="delete">\u00d7</span>`;
    taskList.appendChild(taskItem);
    taskInput.value = "";
    persistTasks();
}

// Handles Enter key press to create a task
taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        createTask();
    }
});

// Manages clicks on the task list (toggle complete or delete)
taskList.addEventListener("click", (event) => {
    const clickedElement = event.target;
    if (clickedElement.tagName === "LI") {
        clickedElement.classList.toggle("completed");
        persistTasks();
    } else if (clickedElement.classList.contains("delete")) {
        clickedElement.parentElement.remove();
        persistTasks();
    }
});

// Saves the current task list to localStorage
function persistTasks() {
    localStorage.setItem("tasks", taskList.innerHTML);
}

// Loads and displays tasks from localStorage
function displayTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        taskList.innerHTML = savedTasks;
    }
}

// Initialize the task list on page load
displayTasks();
