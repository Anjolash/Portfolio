/* =========================================
   GLOBAL STATE
========================================= */

let isModalOpen = false;
let projectsExpanded = false;

const scaleFactor = 1 / 20;


/* =========================================
   MODAL
========================================= */

function toggleModal() {
    isModalOpen = !isModalOpen;

    document.body.classList.toggle(
        "modal--open",
        isModalOpen
    );

    // Prevent background scrolling
    document.body.style.overflow =
        isModalOpen ? "hidden" : "";

    // Reset contact overlays when closing
    if (!isModalOpen) {

        const loading = document.querySelector(
            ".modal__overlay--loading"
        );

        const success = document.querySelector(
            ".modal__overlay--success"
        );

        loading?.classList.remove(
            "modal__overlay--visible"
        );

        success?.classList.remove(
            "modal__overlay--visible"
        );
    }
}


/* =========================================
   LIGHT / DARK MODE
========================================= */

function toggleBackground() {

    const isDarkMode =
        document.body.classList.toggle("dark__mode");

    localStorage.setItem(
        "theme",
        isDarkMode ? "dark" : "light"
    );
}


/* =========================================
   LOAD SAVED THEME
========================================= */

function loadTheme() {

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark__mode"
        );

    } else if (savedTheme === "light") {

        document.body.classList.remove(
            "dark__mode"
        );

    } else {

        const prefersDark =
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;

        if (prefersDark) {

            document.body.classList.add(
                "dark__mode"
            );
        }
    }
}


/* =========================================
   CONTACT FORM
========================================= */

function contact(event) {

    event.preventDefault();

    const form = event.target;

    const loading =
        document.querySelector(
            ".modal__overlay--loading"
        );

    const success =
        document.querySelector(
            ".modal__overlay--success"
        );


    // Show loading
    loading?.classList.add(
        "modal__overlay--visible"
    );

    success?.classList.remove(
        "modal__overlay--visible"
    );


    emailjs
        .sendForm(
            "service_1vf4pz6",
            "template_87ojzje",
            form,
            "oF4_sJqWlRQKkz_Xe"
        )

        .then(() => {

            loading?.classList.remove(
                "modal__overlay--visible"
            );

            success?.classList.add(
                "modal__overlay--visible"
            );

            form.reset();

        })

        .catch((error) => {

            console.error(
                "EmailJS error:",
                error
            );

            loading?.classList.remove(
                "modal__overlay--visible"
            );

            showToast(
                "Something went wrong. Please try again.",
                "error"
            );
        });
}


/* =========================================
   TOAST
========================================= */

function showToast(
    message,
    type = "success"
) {

    // Remove existing toast
    const existingToast =
        document.querySelector(".toast");

    existingToast?.remove();


    const toast =
        document.createElement("div");

    toast.className =
        `toast toast--${type}`;


    toast.innerHTML = `
        <span class="toast__icon">
            ${type === "error" ? "!" : "✓"}
        </span>

        <span class="toast__message">
            ${message}
        </span>
    `;


    document.body.appendChild(toast);


    requestAnimationFrame(() => {

        toast.classList.add(
            "toast--visible"
        );

    });


    setTimeout(() => {

        toast.classList.remove(
            "toast--visible"
        );

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 4000);
}


/* =========================================
   BACKGROUND PARALLAX
========================================= */

function moveBackground(event) {

    const shapes =
        document.querySelectorAll(".shape");


    // Respect reduced motion preference
    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {
        return;
    }


    const centerX =
        window.innerWidth / 2;

    const centerY =
        window.innerHeight / 2;


    const X =
        (event.clientX - centerX) *
        scaleFactor;

    const Y =
        (event.clientY - centerY) *
        scaleFactor;


    shapes.forEach(
        (shape, index) => {

            const direction =
                index % 2 === 0
                    ? 1
                    : -1;

            const speed =
                0.6 + index * 0.15;


            shape.style.transform =
                `translate3d(
                    ${X * direction * speed}px,
                    ${Y * direction * speed}px,
                    0
                )`;
        }
    );
}


/* =========================================
   PROJECTS
========================================= */

function toggleProjects() {

    const hiddenProjects =
        document.querySelectorAll(
            ".project--hidden"
        );

    const visibleProjects =
        document.querySelectorAll(
            ".project--visible"
        );

    const showMoreBtn =
        document.querySelector(
            ".show-more-btn"
        );

    const showMoreText =
        document.querySelector(
            ".show-more-text"
        );


    /* -----------------------------------------
       SHOW PROJECTS
    ----------------------------------------- */

    if (!projectsExpanded) {

        hiddenProjects.forEach(
            (project, index) => {

                setTimeout(() => {

                    project.classList.remove(
                        "project--hidden"
                    );

                    project.classList.add(
                        "project--visible"
                    );

                }, index * 120);
            }
        );


        if (showMoreText) {

            showMoreText.textContent =
                "Show Less";
        }


        showMoreBtn?.classList.add(
            "rotated"
        );


        projectsExpanded = true;

        return;
    }


    /* -----------------------------------------
       HIDE PROJECTS
    ----------------------------------------- */

    visibleProjects.forEach(
        (project) => {

            project.classList.remove(
                "project--visible"
            );

            project.classList.add(
                "project--hidden"
            );
        }
    );


    if (showMoreText) {

        showMoreText.textContent =
            "Show More Projects";
    }


    showMoreBtn?.classList.remove(
        "rotated"
    );


    projectsExpanded = false;


    /* -----------------------------------------
       SCROLL BACK
    ----------------------------------------- */

    const projectsSection =
        document.querySelector(
            "#projects"
        );


    if (projectsSection) {

        projectsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}


/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            isModalOpen
        ) {

            toggleModal();
        }
    }
);


/* =========================================
   INITIALIZATION
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadTheme();

        document.documentElement.style
            .scrollBehavior = "smooth";
    }
);