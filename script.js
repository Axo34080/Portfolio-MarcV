document.addEventListener('DOMContentLoaded', () => {
    const projectTitles = document.querySelectorAll('.project h3');

    projectTitles.forEach((title) => {
        title.addEventListener('click', () => {
            alert('Vous avez cliqué sur ' + title.textContent);
        });
    });
});