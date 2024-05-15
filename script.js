/* script.js */
const heartContainer = document.getElementById('heart-container');

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');

  // Randomize the horizontal position
  heart.style.left = Math.random() * 100 + 'vw';

  // Randomize the size
  const size = Math.random() * 20 + 10; // between 10px and 30px
  heart.style.setProperty('--heart-size', `${size}px`);

  // Randomize the falling duration
  const fallDuration = Math.random() * 2 + 3; // between 3s and 5s
  heart.style.animationDuration = `${fallDuration}s, ${fallDuration}s`;

  // Randomize the initial rotation angle
  const initialRotate = Math.random() * 360 - 180; // between -30deg and 30deg
  heart.style.setProperty('--initial-rotate', `${initialRotate}deg`);

  heartContainer.appendChild(heart);

  // Remove heart after animation is done
  setTimeout(() => {
    heart.remove();
  }, fallDuration * 1000);
}

// Create hearts at intervals
setInterval(createHeart, 300);
