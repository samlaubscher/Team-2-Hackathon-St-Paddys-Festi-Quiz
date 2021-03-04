document.getElementById("enter-name-btn").addEventListener("click", hideNamePanel);

function hideNamePanel() {
    document.getElementById("main-landing-container").classList.toggle("hidden");
    document.getElementById("enter-name-container").classList.toggle("hidden");
}
