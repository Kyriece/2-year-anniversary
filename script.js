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

// Function to update the displayed text with typing animation and delay
function typeSentence(sentence, textSize, delay) {
  return new Promise(resolve => {
    const textElement = document.getElementById('big-text');
    textElement.style.fontSize = textSize + 'px';
    textElement.textContent = ''; // Clear previous text

    setTimeout(() => {
      let index = 0;
      const typing = setInterval(() => {
        textElement.textContent += sentence[index];
        index++;
        if (index === sentence.length) {
          clearInterval(typing);
          resolve();
        }
      }, 100); // typing speed in milliseconds
    }, delay); // delay before typing animation starts
  });
}

/// Function to type multiple sentences sequentially
async function typeSentences(sentences, textSize, initialDelay, delayBetweenSentences) {
  let sentence_count = 0;
  await new Promise(resolve => setTimeout(resolve, initialDelay)); // Initial delay before typing the first sentence
  for (let i = 0; i < sentences.length; i++) {
    await typeSentence(sentences[i], textSize, i === 0 ? 0 : delayBetweenSentences);
    // Check if the sentence count is greater than 4
    if (sentence_count >= 4) {
      await new Promise(resolve => setTimeout(resolve, 40000)); // 40 second delay after the 5th sentence
    } else {
      await new Promise(resolve => setTimeout(resolve, 4000)); // 4 second delay for the first 4 sentences
    }
    sentence_count++;
  }
}


// Default values for the sentences and text size
const defaultSentences = ["Hi my baby, <3", "To think it's already been 2 years . .", "Time sure flies when your in love", "I made this so you'll never forget the times we've had . .", "Scroll down when your ready.", "You're still here?", "I got a secret for you :)", "It's that you're boring", "I love you so much <3", "This much |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|", 
"I hope you liked the song I sang for you", "Im sure it was a flawless performance.", "I got nothing else to say", "Forever yours, Kyriece", "Sike bitch you really thought I'd leave?", "I ain't ever leaving", "But you should really be doing something else than watching text on a screen", "Like kissing me >_<", "Ok but really tho", "Happy two year anniversary my love"];
const defaultTextSize = 48; // in pixels
const defaultInitialDelay = 5000; // 2 seconds initial delay
const defaultDelayBetweenSentences = 1000; // 2 seconds delay between sentences

// Initial typing animation with default values and delay
typeSentences(defaultSentences, defaultTextSize, defaultInitialDelay, defaultDelayBetweenSentences);
