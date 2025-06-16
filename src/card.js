import calendar from './assets/desk-calendar.png';

export class Card {
    constructor(title, dueDate, space, color) {
        this.title = title;
        this.dueDate = dueDate;
        this.space = space;
        this.color = color;
        this.id = crypto.randomUUID();

        let content = this.#createContent(this.title, this.id, this.dueDate, this.space, this.color);
        let hr = document.createElement("hr");
        this.card = document.createElement("div");
        this.card.appendChild(content);
        this.card.appendChild(hr);
        this.card.classList.add("card");
    }

    #createLabel(title, id) {
        let labelDiv = document.createElement("div")
        let input = document.createElement("input");
        input.type = "checkbox";
        input.id = id;
        let label = document.createElement("label");
        label.htmlFor = id;
        label.textContent = title;
        labelDiv.appendChild(input);
        labelDiv.appendChild(label);
        labelDiv.classList.add("label");

        return labelDiv;
    }

    #createInfo(dueDate, space, color) {
        let infoDiv = document.createElement("div");

        let date = document.createElement("div");
        let img = document.createElement("img");
        img.src = calendar;
        date.appendChild(img);
        date.append(dueDate);
        date.classList.add("date");

        let spaceDiv = document.createElement("div");
        let colorDiv = document.createElement("div");
        colorDiv.classList.add("color");
        colorDiv.style.backgroundColor = color;
        spaceDiv.appendChild(colorDiv);
        spaceDiv.append(space);
        spaceDiv.classList.add("space");

        infoDiv.appendChild(date);
        infoDiv.appendChild(spaceDiv);
        infoDiv.classList.add("info");

        return infoDiv;
    }

    #createContent(title, id, dueDate, space, color) {
        let contentDiv = document.createElement("div");
        let labelDiv = this.#createLabel(title, id);
        let infoDiv = this.#createInfo(dueDate, space, color);
        contentDiv.appendChild(labelDiv);
        contentDiv.appendChild(infoDiv);
        contentDiv.classList.add("card-content");

        return contentDiv;
    }

    get element() {
        return this.card;
    }
}