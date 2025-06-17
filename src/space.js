import TodoManager from "./todoManager";

export function createSpace(name, color) {
    let button = document.createElement("button");
    let colorDiv = document.createElement("div");
    colorDiv.style.backgroundColor = color;
    colorDiv.classList.add("space-color");

    button.appendChild(colorDiv);
    button.append(space);
    button.classList.add("btn");
    button.classList.add("space-btn");

    return button;
}

export function removeSpace(space) {
    delete TodoManager.spaces[space];
}