import TodoManager from "./todoManager";

export function createSpace(name, color) {
    TodoManager.addSpace(name, color);

    let spaceOptions = document.querySelector("#space");
    let newOption = document.createElement("option");
    newOption.textContent = name;
    newOption.value = name;
    spaceOptions.appendChild(newOption);

    let button = document.createElement("button");
    let colorDiv = document.createElement("div");
    colorDiv.style.backgroundColor = color;
    colorDiv.classList.add("space-color");

    button.appendChild(colorDiv);
    button.append(name);
    button.classList.add("btn");
    button.classList.add("space-btn");

    return button;
}

export function removeSpace(space) {
    delete TodoManager.spaces[space];
}