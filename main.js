// Accessibility: Add a class to the body when the user starts tabbing for better focus styles
const handleFirstTab = (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("user-is-tabbing");
    window.removeEventListener("keydown", handleFirstTab);
    window.addEventListener("mousedown", handleMouseDownOnce);
  }
};

const handleMouseDownOnce = () => {
  document.body.classList.remove("user-is-tabbing");
  window.removeEventListener("mousedown", handleMouseDownOnce);
  window.addEventListener("keydown", handleFirstTab);
};

window.addEventListener("keydown", handleFirstTab);


// Back to Top button functionality
const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

// Function to control the visibility and animation of the back-to-top button
const alterStyles = (isVisible) => {
  backToTopButton.style.visibility = isVisible ? "visible" : "hidden";
  backToTopButton.style.opacity = isVisible ? 1 : 0;
  backToTopButton.style.transform = isVisible ? "scale(1)" : "scale(0)";
};

// Event listener for scroll to show/hide the button
window.addEventListener("scroll", () => {
  if (window.scrollY > 700) { // Show button after scrolling 700px down
    if (!isBackToTopRendered) {
      isBackToTopRendered = true;
      alterStyles(isBackToTopRendered);
    }
  } else {
    if (isBackToTopRendered) {
      isBackToTopRendered = false;
      alterStyles(isBackToTopRendered);
    }
  }
});

// Note: The "Table of Content" page functionality (Image 2)
// would typically involve a separate HTML file (e.g., `toc.html`) or
// dynamic JavaScript to show/hide an overlay.
// If you want `toc.html` as a separate page, simply create that file
// and copy the `table-of-content-page` HTML structure into it.
// Then link to it from your main page, e.g., `<a href="toc.html">Table of Content</a>`.