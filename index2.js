let isModalOpen = false;
let isDarkMode = false;
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
        isDarkMode= false;
        return document.body.classList.remove("dark__mode")
    }

    isDarkMode = true;
    document.body.classList += " dark__mode" 
}


function contact(event){
    event.preventDefault();
    const loading = document.querySelector(".modal__overlay--loading")
    const success = document.querySelector(".modal__overlay--success")
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
        )
    });

    
}


function moveBackground(event){
    const shapes = document.querySelectorAll(".shape")
    const X = event.clientX * scaleFactor;
    const Y = event.clientY * scaleFactor;


    for(let i =0; i < shapes.length; i++){
        const isOdd = i % 2 !== 0;
        const isBool = isOdd ? -1 : 1;
        shapes[i].style.transform = ` translate(${X * isBool}px, ${Y * isBool}px )`;
        
    }
}


