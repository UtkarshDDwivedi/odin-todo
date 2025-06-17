import calendar from './assets/desk-calendar.png';
import TodoManager from "./todoManager";

export default class Todo {
    #title;
    #description;
    #dueDate;
    #priority;
    #space;
    #color;
    #id;
    #status = "not completed";
    #card;

    constructor(title, description, dueDate, priority, space) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#space = space;
        this.#id = crypto.randomUUID();
        this.#color = TodoManager.spaces[space]["color"];
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
    get space() {
        return this.#space;
    }
    get color() {
        return this.#color;
    }
    get id() {
        return this.#id;
    }
    get status() {
        return this.#status;
    }
    get card() {
        let content = this.#createContent();
        let hr = document.createElement("hr");
        this.#card = document.createElement("div");
        this.#card.appendChild(content);
        this.#card.appendChild(hr);
        this.#card.classList.add("card");

        return this.#card;
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
    set space(space) {
        this.#space = space;
    }
    set status(status) {
        const valid = ["completed", "not completed"];
        if (valid.includes(status)) {
            this.#status = status;
        }
    }

    #createLabel() {
        let labelDiv = document.createElement("div")
        let input = document.createElement("input");
        input.type = "checkbox";
        input.id = this.#id;
        let label = document.createElement("label");
        label.htmlFor = this.#id;
        label.textContent = this.#title;
        labelDiv.appendChild(input);
        labelDiv.appendChild(label);
        labelDiv.classList.add("label");

        return labelDiv;
    }

    #createInfo() {
        let infoDiv = document.createElement("div");

        let date = document.createElement("div");
        let img = document.createElement("img");
        img.src = calendar;
        date.appendChild(img);
        date.append(this.#dueDate);
        date.classList.add("date");

        let spaceDiv = document.createElement("div");
        let colorDiv = document.createElement("div");
        colorDiv.classList.add("color");
        colorDiv.style.backgroundColor = this.#color;
        spaceDiv.appendChild(colorDiv);
        spaceDiv.append(this.#space);
        spaceDiv.classList.add("space");

        infoDiv.appendChild(date);
        infoDiv.appendChild(spaceDiv);
        infoDiv.classList.add("info");

        return infoDiv;
    }

    #createContent() {
        let contentDiv = document.createElement("div");
        let labelDiv = this.#createLabel();
        let infoDiv = this.#createInfo();
        contentDiv.appendChild(labelDiv);
        contentDiv.appendChild(infoDiv);
        contentDiv.classList.add("card-content");

        return contentDiv;
    }

    toJSON() {
        return { title: this.#title, description: this.#description, dueDate: this.#dueDate, priority: this.#priority, space: this.#space, id: this.#id, status: this.#status }
    }

    static fromJSON(obj) {
        const todo = new Todo(obj.title, obj.description, obj.dueDate, obj.priority, obj.space);
        todo.#id = obj.id;
        todo.status = obj.status;
        return todo;
    }
}