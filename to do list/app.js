const form = document.getElementById('form');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const list = document.getElementById('list');

let tasks = [];
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    renderTasks();
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    if (title && description) {
        tasks.push({ title, description });
        titleInput.value = '';
        descriptionInput.value = '';
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
});

list.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        const taskIndex = event.target.dataset.index;
        tasks.splice(taskIndex, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
});

function renderTasks() {
    list.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${task.title}: ${task.description}</span>
                        <button class="delete" data-index="${index}">Delete</button>`;
        list.appendChild(li);
    });
}
