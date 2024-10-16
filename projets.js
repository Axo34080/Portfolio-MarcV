const projects = document.querySelectorAll('.project');
let currentProject = 0;

function showProject(index) {
    // Afficher le projet courant et le rendre actif
    projects[currentProject].classList.remove('active');
    projects[currentProject].style.display = 'none'; // Cacher le projet courant

    currentProject = index; // Mettre à jour l'index du projet courant
    projects[currentProject].style.display = 'block'; // Afficher le nouveau projet

    // Utiliser requestAnimationFrame pour ajouter la classe active
    requestAnimationFrame(() => {
        projects[currentProject].classList.add('active');
    });
}

function showNextProject() {
    const nextProject = (currentProject + 1) % projects.length; // Calculer le prochain projet
    showProject(nextProject);
}

function showPrevProject() {
    const prevProject = (currentProject - 1 + projects.length) % projects.length; // Calculer le projet précédent
    showProject(prevProject);
}

// Flèches de navigation
document.querySelector('.next').addEventListener('click', showNextProject);
document.querySelector('.prev').addEventListener('click', showPrevProject);

// Lancer le défilement automatique toutes les 10 secondes
setInterval(showNextProject, 10000);
