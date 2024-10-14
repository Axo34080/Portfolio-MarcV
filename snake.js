// 1. Variables globales
const canvas = document.getElementById('snakeGame');
const ctx = canvas.getContext('2d');
const box = 20; // Taille des carrés
let snake, food, score, d, game; // Déclare les variables utilisées

// 2. Fonctions globales

// Fonction pour contrôler la direction du serpent
function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") d = "LEFT";
    else if (event.keyCode == 38 && d != "DOWN") d = "UP";
    else if (event.keyCode == 39 && d != "LEFT") d = "RIGHT";
    else if (event.keyCode == 40 && d != "UP") d = "DOWN";
}

// Fonction de collision
function collision(newHead, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
            return true;
        }
    }
    return false;
}

// Fonction de réinitialisation du jeu
function resetGame() {
    // Réinitialiser le serpent, la nourriture et les variables
    snake = [{ x: 9 * box, y: 10 * box }];
    food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    };
    score = 0;
    d = null; // Pas de direction au départ

    // Redémarre le jeu
    clearInterval(game);
    game = setInterval(draw, 100);
}

// Fonction principale pour dessiner le jeu
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner le serpent
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "#ffcc00" : "#607B96";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Dessiner la nourriture
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Mouvement du serpent
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // Vérifier si le serpent mange la nourriture
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop();
    }

    // Nouvelle tête
    let newHead = { x: snakeX, y: snakeY };

    // Game over : collision avec les bords ou le corps
    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        // Affiche le message Game Over et propose de rejouer
        ctx.fillStyle = "#ffffff";
        ctx.font = "40px Arial";
        ctx.fillText("Game Over", canvas.width / 4, canvas.height / 2);

        setTimeout(() => {
            let restart = confirm("Game Over! Voulez-vous rejouer ?");
            if (restart) {
                resetGame(); // Réinitialise le jeu
            }
        }, 500);

        return; // Sort de la fonction pour arrêter de dessiner
    }

    // Ajouter la nouvelle tête au serpent
    snake.unshift(newHead);

    // Affichage du score
    ctx.fillStyle = "#ffffff";
    ctx.font = "30px Arial";
    ctx.fillText(score, 10, 30);
}

// 3. Lancement du jeu
document.addEventListener('keydown', direction);
resetGame(); // Démarre le jeu avec la fonction de réinitialisation
