export class Space {
    #space;
    #color;
    #button;

    constructor(space, color) {
        this.#space = space;
        this.#color = color

        this.#button = this.#createButton();
    }

    #createButton() {
        let button = document.createElement("button");
        let colorDiv = document.createElement("div");
        colorDiv.style.backgroundColor = this.#color;
        colorDiv.classList.add("space-color");

        button.appendChild(colorDiv);
        button.append(this.#space);
        button.classList.add("btn");
        button.classList.add("space-btn");

        return button;
    }

    get element() {
        return this.#button;
    }
}