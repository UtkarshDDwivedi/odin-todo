import Todo from "./todo";

export default class TodoManager {
    static #spaces = {};

    static save() {
        const data = {};
        for (let key in this.#spaces) {
            data[key] = {
                color: this.#spaces[key].color,
                todos: this.#spaces[key].todos.map(todo => todo.toJSON())
            }
        }
        localStorage.setItem("todos", JSON.stringify(data));
    }

    static load() {
        const data = JSON.parse(localStorage.getItem("todos"));
        if (!data) return;

        this.#spaces = {};

        for (let key in data) {
            this.#spaces[key] = {
                color: data[key].color,
                todos: []
            };
        }

        for (let key in data) {
            this.#spaces[key].todos = data[key].todos.map(obj => Todo.fromJSON(obj));
        }
    }

    static get spaces() {
        return this.#spaces;
    }

    static addSpace(space, color) {
        if (!(space in this.#spaces)) {
            this.#spaces[space] = { "color": color, "todos": [] };
        }
    }

    static addTodo(todo) {
        this.#spaces[todo.space].todos.push(todo);
    }

    static removeTodo(card) {
        const space = card.getAttribute('data-space');
        if (space in this.#spaces) {
            let todos = this.#spaces[space].todos;
            const index = todos.findIndex(t => t.id === card.id);
            if (index !== -1) {
                this.#spaces[space].todos.splice(index, 1);
            }
        }

        card.remove();
    }

    static toggleStatus(todo) {
        if (todo.status == "completed") {
            todo.status = "not completed";
        } else if (todo.status == "not completed") {
            todo.status = "completed";
        }
    }

    static #filterCards(activeTask) {
        let FilteredTodos = {};
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        for (let key in this.#spaces) {
            FilteredTodos[key] = {
                color: this.#spaces[key].color,
                todos: this.#spaces[key].todos.filter(todo => {
                    let dueDate = new Date(todo.dueDate);
                    dueDate.setHours(0, 0, 0, 0);
                    if (activeTask.id == "today-btn" && dueDate.getTime() === currentDate.getTime()) {
                        return true;
                    } else if (activeTask.id == "pending-btn" && dueDate.getTime() >= currentDate.getTime()) {
                        return true;
                    } else if (activeTask.id == "overdue-btn" && dueDate.getTime() < currentDate.getTime()) {
                        return true;
                    } else if (activeTask.id == "completed-btn" && todo.status === "completed") {
                        return true;
                    }

                    return false;
                })
            };
        }

        return FilteredTodos;
    }

    static displayCards(activeTask, activeSpace) {
        let contentSec = document.querySelector(".content");
        contentSec.innerHTML = '';

        let filteredTodos = this.#filterCards(activeTask);
        for (let key in filteredTodos) {
            filteredTodos[key].todos.forEach(todo => {
                if (activeSpace.id == "all-spaces" || todo.space == activeSpace.id) {
                    contentSec.appendChild(todo.card);
                }
            });
        }
    }
}