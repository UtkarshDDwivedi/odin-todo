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
                todos: data[key].todos.map(obj => Todo.fromJSON(obj))
            };
        }
    }

    static get spaces() {
        return this.#spaces;
    }

    static addSpace(space, color) {
        this.#spaces[space] = { "color": color, "todos": [] };
    }

    static addTodo(todo) {
        this.#spaces[todo.space].todos.push(todo);
    }

    static removeTodo(todo) {
        if (todo.space in this.#spaces) {
            let todos = this.#spaces[todo.space].todos;
            const index = todos.findIndex(t => t.id === todo.id);
            if (index !== -1) {
                this.#spaces[todo.space].todos.splice(index, 1);
            }
        }
    }

    static toggleStatus(todo) {
        if (todo.status == "completed") {
            todo.status = "not completed";
        } else if (todo.status == "not completed") {
            todo.status = "completed";
        }
    }
}