export function createElement(name, options = {}) {
    let element = document.createElement(name);

    if (options.className) {
        element.className = options.className;
    }

    if (options.innerText) {
        element.innerText = options.innerText;
    }

    return element;
}