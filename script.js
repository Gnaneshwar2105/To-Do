// Load tasks from localStorage
window.onload = function () {
  loadTasks();
};

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const taskList = document.getElementById("taskList");

  const li = document.createElement("li");
  li.innerHTML = `
    <span onclick="toggleTask(this)">${taskText}</span>
    <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
  `;
  taskList.appendChild(li);
  input.value = "";

  saveTasks();
}

function deleteTask(button) {
  const li = button.parentElement;
  li.remove();
  saveTasks();
}

function toggleTask(span) {
  span.parentElement.classList.toggle("completed");
  saveTasks();
}

function saveTasks() {
  const taskList = document.getElementById("taskList");
  const tasks = [];

  taskList.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").innerText,
      completed: li.classList.contains("completed")
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");

  tasks.forEach(task => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span onclick="toggleTask(this)">${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;

    taskList.appendChild(li);
  });
}
