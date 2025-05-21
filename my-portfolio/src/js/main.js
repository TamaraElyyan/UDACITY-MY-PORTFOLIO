document.addEventListener("DOMContentLoaded", () => {
    const projectList = document.querySelector(".projects__grid");
    const spotlight = document.createElement("section");
    spotlight.className = "spotlight";
    document.querySelector("#projects").prepend(spotlight);

    // 1. Fetch data
    fetch("./data/projects.json")
        .then(res => res.json())
        .then(data => {
            renderProjects(data);
            updateSpotlight(data[0]); // default spotlight
        })
        .catch(error => console.error("Failed to fetch projects:", error));


    // 2. Render Projects
    function renderProjects(projects) {
        const fragment = document.createDocumentFragment();

        projects.forEach((project, index) => {
            const card = document.createElement("div");
            card.className = "projects__card";
            card.style.backgroundImage = `url('${project.image || "assets/images/placeholder.jpg"}')`;

            const title = document.createElement("h3");
            title.className = "projects__card-title";
            title.textContent = project.title || "Untitled Project";

            const desc = document.createElement("p");
            desc.className = "projects__card-desc";
            desc.textContent = project.description || "No description provided.";

            card.appendChild(title);
            card.appendChild(desc);

            // Event to update spotlight
            card.addEventListener("click", () => updateSpotlight(project));
            fragment.appendChild(card);
        });

        projectList.appendChild(fragment);
    }




    // 3. Character Count for Contact Form
    const messageInput = document.querySelector("textarea[name='message']");
    const charCount = document.createElement("div");
    charCount.className = "char-count";
    messageInput.after(charCount);

    messageInput.addEventListener("input", () => {
        const remaining = 300 - messageInput.value.length;
        charCount.textContent = `${remaining} characters remaining`;

        if (remaining < 0) {
            charCount.classList.add("error");
        } else {
            charCount.classList.remove("error");
        }
    });

    // 5. Form validation
    document.querySelector(".contact__form").addEventListener("submit", (e) => {
        e.preventDefault();
        const name = e.target.name.value.trim();
        const email = e.target.email.value.trim();
        const msg = e.target.message.value.trim();

        clearErrors();

        let isValid = true;

        if (name === "") showError(e.target.name, "Name is required");
        if (email === "" || !email.includes("@")) showError(e.target.email, "Valid email required");
        if (msg.length === 0) showError(e.target.message, "Message is required");
        if (msg.length > 300) showError(e.target.message, "Message exceeds 300 characters");

        if (isValid) alert("Form submitted successfully!");

        function showError(input, message) {
            isValid = false;
            const error = document.createElement("p");
            error.className = "error-message";
            error.textContent = message;
            input.after(error);
        }

        function clearErrors() {
            document.querySelectorAll(".error-message").forEach(e => e.remove());
        }
    });
});
