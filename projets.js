const projects = document.querySelectorAll('.project');

projects.forEach((project) => {
  project.addEventListener('click', () => {
    const projectLink = project.querySelector('a').getAttribute('href');
    window.open(projectLink, '_blank');
  });