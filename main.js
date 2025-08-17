// =================================================================================
// CONFIGURACIÓN DE LAS GALERÍAS
// =================================================================================
const galleryConfig = {
    original: {
        folder: 'grid',
        count: 48,
        prefix: 'grid'
    },
    el: {
        folder: 'grid_el',
        count: 15,
        prefix: 'el'
    },
    ella: {
        folder: 'grid_ella',
        count: 18,
        prefix: 'ella'
    },
    detalles: {
        folder: 'grid_detalles',
        count: 22,
        prefix: 'detalles'
    }
};

// =================================================================================
// LÓGICA DE LA APLICACIÓN (No necesitas tocar nada de aquí para abajo)
// =================================================================================

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
        
        // ESTA PARTE ES LA QUE HACE QUE APAREZCAN TODOS A LA VEZ
        contactFixed.classList.add('visible');

        menuFixed.classList.add('visible');
        filterContainer.classList.add('visible');
    };
    window.addEventListener('click', startAnimation);
    let autoStartTimer = setTimeout(startAnimation, 3000);

    const loadNewGrid = (category) => {
        const config = galleryConfig[category];
        if (!config) return;
        const newImagePaths = generateImagePaths(config);
        if (newImagePaths.length === 0) return;

        galleryGrid.style.opacity = '0';
        setTimeout(() => {
            galleryItems.forEach((item, index) => {
                const imageIndexToUse = index % newImagePaths.length;
                const imagePath = newImagePaths[imageIndexToUse];
                
                const imgElement = item.querySelector('img');
                imgElement.src = imagePath;
                imgElement.alt = `Foto de ${category} ${index + 1}`;
                item.style.display = 'block'; 
            });
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