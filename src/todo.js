export class Todo {
    #title;
    #description;
    #dueDate;
    #priority;
    #notes;
    #space = "personal";
    #id;
    #status = "not completed";

    constructor(title, description, dueDate, priority) {
        this.#title = title;
        this.#description = description
        this.#dueDate = dueDate
        this.#priority = priority
        this.#id = crypto.randomUUID();
    }

    get title() {
        return this.#title;
    }
    get description() {
        return this.#description;
    }
    get dueDate() {
        return this.#dueDate;
    }
    get priority() {
        return this.#priority;
    }
    get notes() {
        return this.#notes;
    }
    get space() {
        return this.#space;
    }
    get id() {
        return this.#id;
    }
    get status() {
        return this.#status;
    }

    set title(title) {
        this.#title = title;
    }
    set description(description) {
        this.#description = description;
    }
    set dueDate(dueDate) {
        this.#dueDate = dueDate;
    }
    set priority(priority) {
        this.#priority = priority;
    }
    set notes(notes) {
        this.#notes = notes;
    }
    set space(space) {
        this.#space = space;
    }
    set status(status) {
        const valid = ["completed", "not completed"];
        if (valid.includes(status)) {
            this.#status = status;
        }
    }

    toJSON() {
        return { title: this.#title, description: this.#description, dueDate: this.#dueDate, priority: this.#priority, notes: this.#notes, space: this.#space, id: this.#id, status: this.#status }
    }

    static fromJSON(obj) {
        const todo = new Todo(obj.title, obj.description, obj.dueDate, obj.priority);
        todo.notes = obj.notes;
        todo.space = obj.space;
        todo.status = obj.status;
        return todo;
    }
}

export class TodoManager {
    static #spaces = {};

    static get spaces() {
        return this.#spaces;
    }

    static addSpace(space){
        if (!(space in this.#spaces)) {
            this.#spaces[space] = [];
        }
    }

    static addToSpace(todo) {
        if (todo.space in this.#spaces) {
            this.#spaces[todo.space].push(todo);
        } else {
            this.#spaces[todo.space] = [todo];
        }
    }

    static removeTask(todo) {
        if (todo.space in this.#spaces) {
            let space = this.#spaces[todo.space]
            let index;
            for (let i = 0; i < space.length; i++) {
                if (space[i].id == todo.id) {
                    index = i;
                    break;
                }
            }
            if (index !== undefined) {
                this.#spaces[todo.space].splice(index, 1);
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

    static save() {
        const data = {};
        for (let key in this.#spaces) {
            data[key] = this.#spaces[key].map(todo => todo.toJSON());
        }
        localStorage.setItem("todos", JSON.stringify(data));
    }

    static load() {
        const data = JSON.parse(localStorage.getItem("todos"));
        if (!data) return;

        this.#spaces = {};
        for (let key in data) {
            this.#spaces[key] = data[key].map(obj => Todo.fromJSON(obj));
        }
    }
}