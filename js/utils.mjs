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



