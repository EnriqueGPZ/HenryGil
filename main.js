// =================================================================================
// CONFIGURACIÓN DE LAS GALERÍAS
// =================================================================================
const galleryConfig = {
    // La galería 'original' tiene la estructura con videos
    original: [
        { type: 'image', path: 'grid/grid01.webp' },
        { type: 'image', path: 'grid/grid02.webp' },
        { type: 'video', path: 'videos/clip01.mp4' },
        { type: 'image', path: 'grid/grid03.webp' },
        { type: 'image', path: 'grid/grid04.webp' },
        { type: 'image', path: 'grid/grid05.webp' },
        { type: 'image', path: 'grid/grid06.webp' },
        { type: 'image', path: 'grid/grid07.webp' },
        { type: 'video', path: 'videos/clip02.mp4' },
        { type: 'image', path: 'grid/grid08.webp' },
        { type: 'image', path: 'grid/grid09.webp' },
        { type: 'image', path: 'grid/grid10.webp' },
        { type: 'image', path: 'grid/grid11.webp' },
        { type: 'image', path: 'grid/grid12.webp' },
        { type: 'image', path: 'grid/grid13.webp' },
        { type: 'image', path: 'grid/grid14.webp' },
        { type: 'image', path: 'grid/grid15.webp' },
        { type: 'image', path: 'grid/grid16.webp' },
        { type: 'image', path: 'grid/grid17.webp' },
        { type: 'image', path: 'grid/grid18.webp' },
        { type: 'image', path: 'grid/grid19.webp' },
        { type: 'image', path: 'grid/grid20.webp' },
        { type: 'image', path: 'grid/grid21.webp' },
        { type: 'image', path: 'grid/grid22.webp' },
        { type: 'image', path: 'grid/grid23.webp' },
        { type: 'image', path: 'grid/grid24.webp' },
        { type: 'image', path: 'grid/grid25.webp' },
        { type: 'image', path: 'grid/grid26.webp' },
        { type: 'image', path: 'grid/grid27.webp' },
        { type: 'image', path: 'grid/grid28.webp' },
        { type: 'image', path: 'grid/grid29.webp' },
        { type: 'image', path: 'grid/grid30.webp' },
        { type: 'image', path: 'grid/grid31.webp' },
        { type: 'image', path: 'grid/grid32.webp' },
        { type: 'image', path: 'grid/grid33.webp' },
        { type: 'image', path: 'grid/grid34.webp' },
        { type: 'video', path: 'videos/clip03.mp4' },
        { type: 'image', path: 'grid/grid35.webp' },
        { type: 'image', path: 'grid/grid36.webp' },
        { type: 'image', path: 'grid/grid37.webp' },
        { type: 'image', path: 'grid/grid38.webp' },
        { type: 'image', path: 'grid/grid39.webp' },
        { type: 'image', path: 'grid/grid40.webp' },
    ],
    // Las demás galerías vuelven a su configuración original de solo fotos
    el: {
        folder: 'grid_el',
        count: 40,
        prefix: 'el'
    },
    ella: {
        folder: 'grid_ella',
        count: 40,
        prefix: 'ella'
    },
    detalles: {
        folder: 'grid_detalles',
        count: 40,
        prefix: 'detalles'
    }
};

// =================================================================================
// LÓGICA DE LA APLICACIÓN
// =================================================================================

// --- AÑADIDO ---
// Función para aleatorizar el orden de los elementos del grid.
function randomizeGrid() {
    const grid = document.querySelector('.gallery-grid');
    if (!grid) return;
    const items = Array.from(grid.children);
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }
    // Vuelve a añadir los elementos ya barajados al contenedor.
    items.forEach(item => grid.appendChild(item));
}

function generateImagePaths(config) {
    const paths = [];
    for (let i = 1; i <= config.count; i++) {
        const number = String(i).padStart(2, '0');
        paths.push(`${config.folder}/${config.prefix}${number}.webp`);
    }
    return paths;
}

function handleFrameNavigation(target) {
    const menuOverlay = document.getElementById('menu-overlay');
    const contactOverlay = document.getElementById('contact-overlay');
    const faqOverlay = document.getElementById('faq-overlay');
    menuOverlay.classList.remove('open');
    setTimeout(() => {
        if (target === 'contact') contactOverlay.classList.add('open');
        else if (target === 'faq') faqOverlay.classList.add('open');
    }, 300);
}

document.addEventListener('DOMContentLoaded', () => {

    const galleryGrid = document.querySelector('.gallery-grid');
    const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');
    const filterButton = document.getElementById('filter-button');
    const filterMenu = document.getElementById('filter-menu');
    const filterLinks = document.querySelectorAll('#filter-menu a');
    const welcomeScreen = document.getElementById('welcome-screen');
    const photoGallery = document.getElementById('photo-gallery');
    const contactFixed = document.getElementById('contact-fixed');
    const menuFixed = document.getElementById('menu-fixed');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuCloseButton = document.getElementById('menu-close-button');
    const contactOverlay = document.getElementById('contact-overlay');
    const contactCloseButton = document.getElementById('contact-close-button');
    const faqOverlay = document.getElementById('faq-overlay');
    const faqCloseButton = document.getElementById('faq-close-button');
    const filterContainer = document.getElementById('filter-container');

    // Tu lógica original para la animación de inicio es perfecta, la mantenemos.
    let animationTriggered = false;
    const startAnimation = () => {
        if (animationTriggered) return;
        animationTriggered = true;
        clearTimeout(autoStartTimer);
        window.removeEventListener('click', startAnimation);
        photoGallery.classList.add('visible');
        welcomeScreen.classList.add('animating');
        welcomeScreen.classList.add('header-mode');
        document.body.style.overflow = 'auto';
        
        contactFixed.classList.add('visible');
        menuFixed.classList.add('visible');
        filterContainer.classList.add('visible');
    };
    window.addEventListener('click', startAnimation);
    let autoStartTimer = setTimeout(startAnimation, 3000);

    const loadNewGrid = (category) => {
        const config = galleryConfig[category];
        if (!config) return;

        galleryGrid.style.opacity = '0';
        setTimeout(() => {
            galleryItems.forEach((item, index) => {
                const imgElement = item.querySelector('img');
                const videoElement = item.querySelector('video');

                if (Array.isArray(config)) {
                    const mediaConfig = config[index];
                    if (mediaConfig) {
                        if (mediaConfig.type === 'video') {
                            videoElement.src = mediaConfig.path;
                            videoElement.style.display = 'block';
                            imgElement.style.display = 'none';
                        } else {
                            imgElement.src = mediaConfig.path;
                            imgElement.alt = `Foto de ${category} ${index + 1}`;
                            imgElement.style.display = 'block';
                            videoElement.style.display = 'none';
                        }
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                } else {
                    const imagePath = generateImagePaths(config)[index];
                    if (imagePath) {
                        imgElement.src = imagePath;
                        imgElement.alt = `Foto de ${category} ${index + 1}`;
                        imgElement.style.display = 'block';
                        videoElement.style.display = 'none';
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
            
            // --- AÑADIDO ---
            // Justo aquí, después de cargar todo, llamamos a la función para barajar el grid.
            randomizeGrid();

            galleryGrid.style.opacity = '1';
        }, 350);
    };

    loadNewGrid('original');

    filterButton.addEventListener('click', () => {
        filterButton.classList.toggle('active');
        filterMenu.classList.toggle('open');
    });

    filterLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const filterValue = this.getAttribute('data-filter');
            loadNewGrid(filterValue);
            filterButton.classList.remove('active');
            filterMenu.classList.remove('open');
        });
    });

    menuFixed.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); menuOverlay.classList.add('open'); });
    contactFixed.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); contactOverlay.classList.add('open'); });
    menuCloseButton.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); menuOverlay.classList.remove('open'); });
    contactCloseButton.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); contactOverlay.classList.remove('open'); });
    faqCloseButton.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); faqOverlay.classList.remove('open'); });
});
