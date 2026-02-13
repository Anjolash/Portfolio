let isModalOpen = false;
let isDarkMode = false;
let projectsExpanded = false;
const scaleFactor = 1 / 20;

function toggleModal(){
    if (isModalOpen){
        isModalOpen = false;        
        return document.body.classList.remove("modal--open");
    }
    
    isModalOpen = true;
    document.body.classList += " modal--open";
}

function toggleBackground(){
    if (isDarkMode){
        isDarkMode = false;
        return document.body.classList.remove("dark__mode");
    }

    isDarkMode = true;
    document.body.classList += " dark__mode";
}

function contact(event){
    event.preventDefault();
    const loading = document.querySelector(".modal__overlay--loading");
    const success = document.querySelector(".modal__overlay--success");
    loading.classList += " modal__overlay--visible";
    emailjs
    .sendForm(
        "service_1vf4pz6",
        "template_87ojzje",
        event.target,
        "oF4_sJqWlRQKkz_Xe"
    ).then(() => {
        loading.classList.remove("modal__overlay--visible");
        success.classList += " modal__overlay--visible";
    })
    .catch(() => {
        loading.classList.remove("modal__overlay--visible");
        alert(
            "Service is currently unavailable"
        );
    });
}

function moveBackground(event){
    const shapes = document.querySelectorAll(".shape");
    const X = event.clientX * scaleFactor;
    const Y = event.clientY * scaleFactor;

    for(let i = 0; i < shapes.length; i++){
        const isOdd = i % 2 !== 0;
        const isBool = isOdd ? -1 : 1;
        shapes[i].style.transform = `translate(${X * isBool}px, ${Y * isBool}px)`;
    }
}

function toggleProjects(){
    const hiddenProjects = document.querySelectorAll('.project--hidden');
    const showMoreBtn = document.querySelector('.show-more-btn');
    const showMoreText = document.querySelector('.show-more-text');
    
    if (!projectsExpanded) {
        // Show hidden projects with staggered animation
        hiddenProjects.forEach((project, index) => {
            setTimeout(() => {
                project.classList.remove('project--hidden');
                project.classList.add('project--visible');
            }, index * 150); // 150ms delay between each project
        });
        
        // Update button
        showMoreText.textContent = 'Show Less';
        showMoreBtn.classList.add('rotated');
        projectsExpanded = true;
    } else {
        // Hide projects
        hiddenProjects.forEach((project) => {
            project.classList.remove('project--visible');
            project.classList.add('project--hidden');
        });
        
        // Update button
        showMoreText.textContent = 'Show More Projects';
        showMoreBtn.classList.remove('rotated');
        projectsExpanded = false;
        
        // Smooth scroll to projects section
        const projectsSection = document.querySelector('#projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}