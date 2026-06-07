const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
    todoList.innerHTML = '';

    todos.forEach((todo) => {
        const li = document.createElement('li');
        
        // Menyuntikkan class kustom murni kembali
        li.className = `todo-item ${todo.completed ? 'completed' : 'normal'}`;

        li.innerHTML = `
            <span class="todo-text ${todo.completed ? 'done' : ''}" onclick="toggleTodo(${todo.id})">
                ${todo.text}
            </span>
            <button onclick="deleteTodo(${todo.id})" class="todo-delete-btn">
                &times;
            </button>
        `;

        todoList.appendChild(li);
    });

    saveToLocalStorage();
}

function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
    const value = todoInput.value.trim();
    if (value === '') return;

    const newTodo = {
        id: Date.now(),
        text: value,
        completed: false
    };

    todos = [...todos, newTodo];
    renderTodos();
    todoInput.value = '';
    todoInput.focus(); // Tambahan: auto-focus agar nyaman saat input berulang kali
}

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

window.toggleTodo = (id) => {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    renderTodos();
};

window.deleteTodo = (id) => {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
};

// PENTING: Menjalankan render pertama kali saat aplikasi dimuat agar data muncul
renderTodos();