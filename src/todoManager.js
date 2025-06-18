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

    static getTodo(card) {
        const space = card.getAttribute('data-space');
        if (space in this.#spaces) {
            let todos = this.#spaces[space].todos;
            const index = todos.findIndex(t => t.id === card.id);
            if (index !== -1) {
                return this.#spaces[space].todos[index];
            }
        }
    }

    static toggleStatus(card) {
        let todo = TodoManager.getTodo(card);
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
                    if (activeTask.id == "today-btn" && dueDate.getTime() === currentDate.getTime() && todo.status === "not completed") {
                        return true;
                    } else if (activeTask.id == "pending-btn" && dueDate.getTime() >= currentDate.getTime() && todo.status === "not completed") {
                        return true;
                    } else if (activeTask.id == "overdue-btn" && dueDate.getTime() < currentDate.getTime() && todo.status === "not completed") {
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

    static getSidebar(card) {
        let space = card.getAttribute('data-space');
        let todo;
        if (space in this.#spaces) {
            let todos = this.#spaces[space].todos;
            const index = todos.findIndex(t => t.id === card.id);
            if (index !== -1) {
                todo = this.#spaces[space].todos[index];
            }
        }

        const sidebar = document.createElement("form");

        const labelTitle = document.createElement("label");
        labelTitle.setAttribute("for", "todo-title");
        labelTitle.textContent = "Title:";
        const inputTitle = document.createElement("input");
        inputTitle.type = "text";
        inputTitle.id = "todo-title";
        inputTitle.name = "title";
        inputTitle.value = todo.title;

        const labelDesc = document.createElement("label");
        labelDesc.setAttribute("for", "todo-description");
        labelDesc.textContent = "Description:";
        const inputDesc = document.createElement("input");
        inputDesc.type = "text";
        inputDesc.id = "todo-description";
        inputDesc.name = "description";
        inputDesc.value = todo.description;

        const labelSpace = document.createElement("label");
        labelSpace.setAttribute("for", "space-select");
        labelSpace.textContent = "Space:";
        const selectSpace = document.createElement("select");
        selectSpace.name = "space";
        selectSpace.id = "space-select";
        for (space in this.#spaces) {
            const option = document.createElement("option");
            option.value = space;
            option.textContent = space;
            selectSpace.appendChild(option);
        }
        selectSpace.value = todo.space;

        const labelPriority = document.createElement("label");
        labelPriority.setAttribute("for", "priority");
        labelPriority.textContent = "Priority:";
        const selectPriority = document.createElement("select");
        selectPriority.name = "priority";
        selectPriority.id = "priority";

        ["High", "Medium", "Low"].forEach(level => {
            const option = document.createElement("option");
            option.value = level;
            option.textContent = level;
            selectPriority.appendChild(option);
        });
        selectPriority.value = todo.priority;

        const labelDate = document.createElement("label");
        labelDate.setAttribute("for", "due-date");
        labelDate.textContent = "Due-Date:";
        const inputDate = document.createElement("input");
        inputDate.type = "date";
        inputDate.name = "due-date";
        inputDate.id = "due-date";
        inputDate.value = todo.dueDate;

        const submitBtn = document.createElement("button");
        submitBtn.className = "btn";
        submitBtn.id = "edit-todo-submit";
        submitBtn.type = "submit";
        submitBtn.textContent = "Save";

        const doneBtn = document.createElement("button");
        doneBtn.className = "btn";
        doneBtn.id = "edit-todo-done";
        doneBtn.type = "button";
        doneBtn.textContent = "Done";

        let formBtnDiv = document.createElement("div");
        formBtnDiv.appendChild(submitBtn);
        formBtnDiv.appendChild(doneBtn);
        formBtnDiv.classList.add("form-btn-div")

        sidebar.appendChild(labelTitle);
        sidebar.appendChild(inputTitle);
        sidebar.appendChild(labelDesc);
        sidebar.appendChild(inputDesc);
        sidebar.appendChild(labelSpace);
        sidebar.appendChild(selectSpace);
        sidebar.appendChild(labelPriority);
        sidebar.appendChild(selectPriority);
        sidebar.appendChild(labelDate);
        sidebar.appendChild(inputDate);
        sidebar.appendChild(formBtnDiv);

        sidebar.id = "cardSidebar";

        return sidebar;
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