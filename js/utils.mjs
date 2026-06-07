export async function loadHeaderFooter() {
    const headerElement = document.getElementById("main-header");
    const footerElement = document.getElementById("main-footer");
    
    const headerFilePath = "./templates/header.html";
    const footerFilePath = "./templates/footer.html";

    loadTemplate(headerElement, headerFilePath);
    loadTemplate(footerElement, footerFilePath);
}

export async function loadTemplate(parentElement, templatePath) {
    const res = await fetch(templatePath);
    const headerTemplate = await res.text();
    parentElement.innerHTML = headerTemplate;
}

export function displayPantry(pantryContents, parentElement) {
    const listedPantryContentsString = [];
    pantryContents.forEach(content => {
        content = `<li>Item: ${pantryContents["item"]} Quantity ${pantryContents["quantity"]}</li>`;
        listedPantryContentsString.push(content);
    });

    return listedPantryContentsString; 
}
export function getLocalStorage(key) {
    return JSON.parse(localStorage(key));
}
export function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}



