const form = document.querySelector('form');
const taskList = document.querySelector('#task-list');
const newTaskInput = document.querySelector('#new-task');

form.addEventListener('submit', addTask);
taskList.addEventListener('click', handleTaskClick);

let tasks = [];

function addTask(event) {
  event.preventDefault();
  const newTaskText = newTaskInput.value.trim();

  if (newTaskText !== '') {
    const newTask = { id: Date.now(), text: newTaskText, completed: false };
    tasks.push(newTask);
    renderTasks();
    newTaskInput.value = '';
  }
}

function handleTaskClick(event) {
  if (event.target.tagName === 'BUTTON') {
    const action = event.target.dataset.action;
    const taskId = parseInt(event.target.closest('li').dataset.id, 10);

    switch (action) {
      case 'delete':
        deleteTask(taskId);
        break;
      case 'edit':
        editTask(taskId);
        break;
      case 'complete':
        completeTask(taskId);
        break;
    }
  }
}

function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  renderTasks();
}

function editTask(taskId) {
  const task = tasks.find(task => task.id === taskId);
  const taskInput = document.createElement('input');
  const editBtn = document.createElement('button');
  const taskItem = document.querySelector(`li[data-id="${taskId}"]`);

  taskInput.value = task.text;
  editBtn.textContent = 'Save';
  editBtn.classList.add('edit-save-btn');

  taskItem.innerHTML = '';
  taskItem.appendChild(taskInput);
  taskItem.appendChild(editBtn);

  editBtn.addEventListener('click', () => {
    const newTaskText = taskInput.value.trim();

    if (newTaskText !== '') {
      task.text = newTaskText;
      renderTasks();
    }
  });
}

function completeTask(taskId) {
  const task = tasks.find(task => task.id === taskId);
  task.completed = !task.completed;
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = '';

  for (const task of tasks) {
    const taskItem = document.createElement('li');
    const taskText = document.createElement('span');
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    const completeBtn = document.createElement('button');

    taskItem.dataset.id = task.id;
    taskText.textContent = task.text;
    deleteBtn.textContent = 'Delete';
    editBtn.textContent = 'Edit';
    completeBtn.textContent = task.completed ? 'Incomplete' : 'Complete';

    deleteBtn.dataset.action = 'delete';
    editBtn.dataset.action = 'edit';
    completeBtn.dataset.action = 'complete';

    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteBtn);
    taskItem.appendChild(editBtn);
    taskItem.appendChild(completeBtn);
    taskList.appendChild(taskItem);

    if (task.completed) {
      taskItem.classList.add('complete');
    }
  }
}
