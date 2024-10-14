const projects = document.querySelectorAll('.project');
let currentProject = 0;

function showNextProject() {
    projects[currentProject].classList.remove('active');
    setTimeout(() => {
        projects[currentProject].style.display = 'none';

        currentProject = (currentProject + 1) % projects.length;

        projects[currentProject].style.display = 'block';
        setTimeout(() => {
            projects[currentProject].classList.add('active');
        }, 50);
    }, 500);
}

function showPrevProject() {
    projects[currentProject].classList.remove('active');
    setTimeout(() => {
        projects[currentProject].style.display = 'none';

        // Calculer le projet précédent
        currentProject = (currentProject - 1 + projects.length) % projects.length;

        projects[currentProject].style.display = 'block';
        setTimeout(() => {
            projects[currentProject].classList.add('active');
        }, 50);
    }, 500);
}

// Flèches de navigation
document.querySelector('.next').addEventListener('click', showNextProject);
document.querySelector('.prev').addEventListener('click', showPrevProject);

// Lancer le défilement automatique toutes les 2 secondes
setInterval(showNextProject, 10000);
