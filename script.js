

//-----------------login page js----------------


// Validate the login form
function validateForm() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Clear previous error messages
    errorMessage.textContent = "";

    // Check if email or password is empty
    if (!email || !password) {
        errorMessage.textContent = "Both fields are required.";
        return false;
    }

    // Basic email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessage.textContent = "Please enter a valid email address.";
        return false;
    }

    return true; // Form is valid
}

// Add event listener when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.querySelector(".btn-login");

    if (loginButton) { 
        loginButton.addEventListener("click", (event) => {
            if (!validateForm()) {
                event.preventDefault(); // Prevent form submission if validation fails
            }
        });
    }
});



//------------------------resume page js------------------------------------



// Dynamic fields addition/removal for multiple sections
document.addEventListener("DOMContentLoaded", () => {
    const handleDynamicFields = (containerId, addButtonClass, inputName, maxRows = Infinity) => {
        const container = document.getElementById(containerId);

        container.addEventListener("click", (event) => {
            if (event.target.classList.contains(addButtonClass)) {
                const currentRows = container.querySelectorAll(".input-group").length;
                if (currentRows < maxRows) {
                    const newGroup = document.createElement("div");
                    newGroup.classList.add("input-group", "mb-2");

                    newGroup.innerHTML = `
                        <input type="text" class="form-control" name="${inputName}[]" required>
                        <button type="button" class="btn btn-outline-danger remove-button">-</button>
                    `;
                    container.appendChild(newGroup);
                } else {
                    alert("You can only add up to " + maxRows + " rows in this section.");
                }
            } else if (event.target.classList.contains("remove-button")) {
                event.target.parentElement.remove();
            }
        });
    };

    // Dynamic fields for specific containers
    handleDynamicFields("phone-number-container", "add-phone-button", "phone");
    handleDynamicFields("education-container", "add-education-button", "education");
    handleDynamicFields("experience-container", "add-experience-button", "experience");
    handleDynamicFields("skills-container", "add-skills-button", "skills");
    handleDynamicFields("custom-sections-container", "add-custom-row-button", "customSection", 2);

    // Form submission to generate resume preview
    document.getElementById("resumeForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const phoneInputs = document.querySelectorAll("input[name='phone[]']");
        const phones = Array.from(phoneInputs).map(input => input.value).join(", ");
        const educationInputs = document.querySelectorAll("input[name='education[]']");
        const educations = Array.from(educationInputs).map(input => input.value).join("<br>");
        const experienceInputs = document.querySelectorAll("input[name='experience[]']");
        const experiences = Array.from(experienceInputs).map(input => input.value).join("<br>");
        const skillsInputs = document.querySelectorAll("input[name='skills[]']");
        const skills = Array.from(skillsInputs).map(input => input.value).join(", ");

        const socialLinksInputs = document.querySelectorAll("input[name='socialLinks[]']");
        const socialLinks = Array.from(socialLinksInputs).map((input, index) => {
            const label = ["LinkedIn", "Twitter", "GitHub", "Email"][index];
            return `<strong>${label}:</strong> ${input.value}`;
        }).join("<br>");

        const customRowNames = document.querySelectorAll(".custom-row-name");
        const customRowValues = document.querySelectorAll(".custom-row-value");
        const customRows = Array.from(customRowNames).map((nameInput, index) => {
            const rowName = nameInput.value;
            const rowValue = customRowValues[index].value;
            return `<p><strong>${rowName}:</strong> ${rowValue}</p>`;
        }).join("");

        const personalDetailsInputs = document.querySelectorAll("input[name='personalDetails[]']");
        const personalDetails = Array.from(personalDetailsInputs).map((input, index) => {
            const labels = ["Father's Name", "Mother's Name", "Date of Birth", "Marital Status", "Gender", "Nationality", "Languages Known", "Blood Group"];
            return `<strong>${labels[index]}:</strong> ${input.value}`;
        }).join("<br>");

        document.getElementById("preview").innerHTML = `
            <h2>${name}</h2>
            <p><strong>Phone(s):</strong> ${phones}</p>
            <h4>Education</h4>
            <p>${educations}</p>
            <h4>Work Experience</h4>
            <p>${experiences}</p>
            <h4>Skills</h4>
            <p>${skills}</p>
            <h4>Social Links</h4>
            <p>${socialLinks}</p>
            <h4>Custom Sections</h4>
            ${customRows}
            <h4>Personal Details</h4>
            <p>${personalDetails}</p>
        `;
    });
});
