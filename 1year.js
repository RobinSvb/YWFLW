// 1. Configuración del Contador de Tiempo (11 de Octubre de 2025, 20:00 hrs)
const startDate = new Date('2025-10-11T23:07:00');

function updateCounter() {
    const now = new Date();
    const diff = now - startDate;

    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days;
        document.getElementById('hours').innerText = hours;
        document.getElementById('minutes').innerText = minutes;
        document.getElementById('seconds').innerText = seconds;
    }
}

setInterval(updateCounter, 1000);
updateCounter();


// 2. Configuración de la escena 3D, cámara y renderizador responsivo
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.015);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 20);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// 3. Luces
const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambientLight);

// 4. Anillo de partículas ROSAS giratorias
const particlesCount = 2500;
const geometry = new THREE.BufferGeometry();
const positions = [];

for (let i = 0; i < particlesCount; i++) {
    const radius = 6 + Math.random() * 12;
    const angle = i * 0.08;
    const x = Math.cos(angle) * radius;
    const y = (Math.random() - 0.5) * 4;
    const z = Math.sin(angle) * radius;

    positions.push(x, y, z);
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

function createParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.3, 'rgba(255, 105, 180, 0.9)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    
    return new THREE.CanvasTexture(canvas);
}

const particleMaterial = new THREE.PointsMaterial({
    size: 0.8,
    map: createParticleTexture(),
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});

const particleSystem = new THREE.Points(geometry, particleMaterial);
scene.add(particleSystem);

// 5. Automatización y posicionamiento de marcos 3D
const frameElements = document.querySelectorAll('.photo-frame');
const photoData = [];

frameElements.forEach((el, index) => {
    const angleStep = (Math.PI * 2) / frameElements.length;
    photoData.push({
        baseAngle: index * angleStep,
        radius: 10 + (index % 2) * 2,
        y: (index % 2 === 0 ? 1.5 : -1.5),
        element: el
    });
});

// 6. Lógica de la Ventana Popup (Modal)
const modal = document.getElementById('popup-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDetail = document.getElementById('modal-detail');
const closeBtn = document.querySelector('.close-btn');

frameElements.forEach((el) => {
    el.addEventListener('click', () => {
        const imgSource = el.querySelector('img').src;
        const text = el.getAttribute('data-text');
        const detail = el.getAttribute('data-detail');

        modalImg.src = imgSource;
        modalTitle.innerText = text;
        modalDetail.innerText = detail;

        modal.style.display = 'flex';
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// 7. Interactividad con Mouse y Pantallas Táctiles
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - window.innerWidth / 2) * 0.002;
    mouseY = (event.clientY - window.innerHeight / 2) * 0.002;
});

document.addEventListener('touchmove', (event) => {
    if (event.touches.length === 1) {
        mouseX = (event.touches[0].clientX - window.innerWidth / 2) * 0.003;
        mouseY = (event.touches[0].clientY - window.innerHeight / 2) * 0.003;
    }
}, { passive: true });

// 8. Bucle de Animación
function animate() {
    requestAnimationFrame(animate);

    particleSystem.rotation.y -= 0.002;

    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    camera.position.x = Math.sin(targetX) * 20;
    camera.position.y = 5 + targetY * 10;
    camera.position.z = Math.cos(targetX) * 20;
    camera.lookAt(scene.position);

    photoData.forEach((photo) => {
        const currentAngle = photo.baseAngle + (Date.now() * 0.0003);
        const x = Math.cos(currentAngle) * photo.radius;
        const z = Math.sin(currentAngle) * photo.radius;
        const y = photo.y;

        const vector = new THREE.Vector3(x, y, z);
        vector.project(camera);

        if (vector.z < 1) {
            const screenX = (vector.x * .5 + .5) * window.innerWidth;
            const screenY = (vector.y * -.5 + .5) * window.innerHeight;

            photo.element.style.display = 'block';
            photo.element.style.transform = `translate(-50%, -50%) translate(${screenX}px, ${screenY}px)`;
        } else {
            photo.element.style.display = 'none';
        }
    });

    renderer.render(scene, camera);
}

animate();

// 9. Adaptación automática al rotar el celular o cambiar tamaño de ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});