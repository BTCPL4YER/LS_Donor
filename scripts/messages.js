document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".donation-form");
    const message = document.getElementById("message");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Gather form data
        const fname = document.getElementById("fname").value;
        const lname = document.getElementById("lname").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const bloodType = document.getElementById("blood-type").value;

        // Simulate sending data to server (for demonstration)
        setTimeout(function() {
            message.innerHTML = `Thank you, ${fname} ${lname}, for registering to donate blood (${bloodType}). We will contact you at ${email} or ${phone} soon.`;
            form.reset(); // Reset the form after submission
        }, 1000); // Simulate server delay

    });
});
