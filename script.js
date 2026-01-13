const generateBtn =document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

generateBtn.addEventListener("click",generatePalette);
paletteContainer.addEventListener("click",function(e){
    if (e.target.classList.contains("copy-btn")) {
        const hexValue = e.target.previousElementSibling.textContent;

        navigator.clipboard.writeText(hexValue)
        .then(()=>showCopySuccess(e.target))
        .catch((err)=> console.log(err));

    } else if (e.target.classList.contains("color")) {
        const hexValue = e.target.nextElementSibling.querySelector (".hex-value").textContent;
        navigator.clipboard
        .writeText(hexValue)
        .then(()=> showCopySuccess(e.target.nextElementSibling.querySelector(".copy-btn")))
        .catch  ((err)=> console.log(err));

    }

});

function showCopySuccess(element) {
    element.classList.remove("far", "fa-copy");
    element.classList.add("fas", "fa-check");

    element.style.color ="#48bb78";


setTimeout(()=> {
    element.classList.remove("fas","fa-check");
    element.classList.add("far","fa-copy");
    element.style.color ="";

},1500);
}

function generatePalette (){
const colors =[];

for (let i=0; i<5; i++) {
    colors.push (generateRandomColor())

}

updatePaletteDisplay(colors);

}

function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color ="#";
   

    for (let i = 0; i < 6; i++) {
      color += letters[ Math.floor(Math.random() * 16)];
    }

    return color;


}

function updatePaletteDisplay(colors) {
    const colorBoxes = document.querySelectorAll(".color-box");

    colorBoxes.forEach ((box, index)=> {
        const color= colors[index];
        const colorDiv = box.querySelector(".color");
        const hexValue = box.querySelector(".hex-value");

        colorDiv.style.backgroundColor= color;
        hexValue.textContent=color;
    });
    

}

const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
const particleCount = 60;
const particleColors = ["#667eea", "#764ba2", "#83a8df", "#c3cfe2"];


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
    constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;

    this.color =
        particleColors[Math.floor(Math.random() * particleColors.length)];
}

    move() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color + "88";

        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}
initParticles();

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.move();
        particle.draw();
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();
