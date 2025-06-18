import calendar from './assets/desk-calendar.png';
import deleteImg from './assets/remove.png'
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
        this.#card.setAttribute('data-space', this.#space);
        this.#card.id = this.#id;

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
    set id(id) {
        this.#id = id;
    }
    set color(color) {
        this.#color = color;
    }

    #createLabel() {
        let labelDiv = document.createElement("div")
        let input = document.createElement("input");
        input.type = "checkbox";
        input.id = this.#id;
        let label = document.createElement("label");
        label.htmlFor = this.#id;
        label.textContent = this.#title;
        let inputDiv = document.createElement("div");
        inputDiv.appendChild(input);
        inputDiv.appendChild(label);
        let deleteBtn = document.createElement("img");
        deleteBtn.src = deleteImg;
        deleteBtn.alt = "Remove Todo";
        deleteBtn.classList.add("remove-todo-btn")

        labelDiv.appendChild(inputDiv);
        labelDiv.appendChild(deleteBtn);
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

        let priorityDiv = document.createElement("div");
        priorityDiv.append(`${this.#priority} Priority`)
        if (this.#priority == "High") {
            priorityDiv.style.color = "#D22B2B";
        } else if (this.#priority == "Medium") {
            priorityDiv.style.color = "#CD7F32";
        } else if (this.#priority == "Low") {
            priorityDiv.style.color = "green";
        }

        infoDiv.appendChild(date);
        infoDiv.appendChild(spaceDiv);
        infoDiv.appendChild(priorityDiv);
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
        return { title: this.#title, description: this.#description, dueDate: this.#dueDate, priority: this.#priority, space: this.#space, id: this.#id, status: this.#status, color: this.#color }
    }

    static fromJSON(obj) {
        const todo = new Todo(obj.title, obj.description, obj.dueDate, obj.priority, obj.space);
        todo.id = obj.id;
        todo.status = obj.status;
        todo.color = obj.color;
        return todo;
    }
}