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
    if (sentence_count >= 5) {
      await new Promise(resolve => setTimeout(resolve, 40000)); // 40 second delay after the 5th sentence
    } else {
      await new Promise(resolve => setTimeout(resolve, 4000)); // 4 second delay for the first 4 sentences
    }
    sentence_count++;
  }
}


// Default values for the sentences and text size
const defaultSentences = ["Hi my baby, <3", "To think it's already been 2 years . .", "Time sure flies when your in love", "I made this so you'll never forget the times we've had . .", "Dont forget to play the music", "Scroll down when your ready.", "You're still here?", "I got a secret for you :)", "It's that you're boring", "I love you so much <3", "This much |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|", 
"I hope you liked the song I sang for you", "Im sure it was a flawless performance.", "Did you notice the background is periwrinkle?", "I'm running out of things to say", "Forever yours, Kyriece", "Sike bitch you really thought I'd leave?", "I ain't ever leaving", "But you should really be doing something else than watching text on a screen", "Like kissing me >_<", "Ok but really tho", "Happy two year anniversary my love"];
const defaultTextSize = 48; // in pixels
const defaultInitialDelay = 5000; // 2 seconds initial delay
const defaultDelayBetweenSentences = 1000; // 2 seconds delay between sentences

// Initial typing animation with default values and delay
typeSentences(defaultSentences, defaultTextSize, defaultInitialDelay, defaultDelayBetweenSentences);

let slideIndex = 1; // Start with the second slide as central

function showSlides() {
  const slides = document.getElementsByClassName("slide");
  const numSlides = slides.length;
  const slideTexts = document.getElementsByClassName("slide-text");
  for (let i = 0; i < numSlides; i++) {
    slides[i].classList.remove("central"); // Remove "central" class from all slides
    slideTexts[i].style.display = "none"; // Hide all slide texts
  }
  slides[slideIndex].classList.add("central"); // Add "central" class to the current slide
  slideTexts[slideIndex].style.display = "block"; // Show the corresponding slide text
}

function changeSlide(n) {
  const container = document.querySelector('.slide-container');
  const containerWidth = container.offsetWidth;
  const slideWidth = containerWidth / 4; // Assuming four slides are visible at a time

  slideIndex += n;
  const numSlides = document.querySelectorAll('.slide').length;
  const isMobile = window.innerWidth <= 768;
  console.log(isMobile);
  
  if (slideIndex >= numSlides) {
    slideIndex = 0;
  } else if (slideIndex < 0) {
    slideIndex = numSlides - 1;
  }

  const centralSlideOffset = (containerWidth - slideWidth * 2) / 2;
  const centralOffset = -slideIndex * slideWidth + centralSlideOffset;

  container.style.transform = `translateX(${centralOffset}px)`;
  showSlides(); // Update the central slide
}

// Initial setup
document.addEventListener("DOMContentLoaded", function() {
  showSlides();
});

document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('.gallery-video');

  // Function to play the video
  function playVideo(video) {
    if (!video.paused) return; // If the video is already playing, return
    video.play();
  }

  // Function to pause the video
  function pauseVideo(video) {
    if (video.paused) return; // If the video is already paused, return
    video.pause();
  }

  // Add event listeners to play and pause videos when the central slide class is added and removed
  const container = document.querySelector('.slide-container');
  container.addEventListener('transitionend', () => {
    const centralSlide = document.querySelector('.slide.central .gallery-video');
    console.log('Transition ended');
    console.log('Central slide:', centralSlide);

    videos.forEach(video => {
      if (video === centralSlide) {
        console.log('Playing video:', video);
        playVideo(video); // Play video if it's the central slide
      } else {
        console.log('Pausing video:', video);
        pauseVideo(video); // Pause video if it's not the central slide
      }
    });
  });
});

// Audio

document.addEventListener("DOMContentLoaded", function() {
  const audioPlayer = document.getElementById("audio-player");
  const nowPlaying = document.getElementById("song-title");
  const prevSongButton = document.getElementById("prev-song");
  const nextSongButton = document.getElementById("next-song");
  const playPauseButton = document.getElementById("play-pause");
  const progressBar = document.getElementById("progress-bar");

  const songs = [
      { src: "music/Evergreen.mp3", title: "Evergreen" },
      { src: "music/Over_The_Rainbow.mp3", title: "Over the Rainbow" },
      { src: "music/Elise.mp3", title: "Elise" },
      { src: "music/As_the_world_caves_in.mp3", title: "As the world caves in" },
      { src: "music/Creep.mp3", title: "Creep" }
  ];

  const initialPool = [
      { src: "music/Golden_Hour.mp3", title: "Golden Hour" },
      { src: "music/Fly_Me_To_The_Moon.mp3", title: "Fly me to the Moon", },
      { src: "music/I_Love_You_3000.mp3", title: "I Love you 3000 <3", }
  ];

  let currentSongIndex = 0;
  let shuffledSongs = [];

  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }

  function initializePlaylist() {
    // Remove a random song from the initial pool
    const randomInitialSongIndex = Math.floor(Math.random() * initialPool.length);
    const randomInitialSong = initialPool.splice(randomInitialSongIndex, 1)[0];

    // Concatenate the remaining songs from initial pool and the songs from songs array
    const allSongs = [...initialPool, ...songs];

    // Shuffle all the songs together
    shuffleArray(allSongs);

    // Prepend the random initial song to the shuffled songs
    shuffledSongs = [randomInitialSong, ...allSongs];

    currentSongIndex = 0;
}


  function loadSong(index) {
      audioPlayer.src = shuffledSongs[index].src;
      nowPlaying.textContent = shuffledSongs[index].title;
      audioPlayer.play();
  }

  function nextSong() {
      currentSongIndex = (currentSongIndex + 1) % shuffledSongs.length;
      loadSong(currentSongIndex);
  }

  function prevSong() {
      currentSongIndex = (currentSongIndex - 1 + shuffledSongs.length) % shuffledSongs.length;
      loadSong(currentSongIndex);
  }

  playPauseButton.addEventListener("click", function() {
    if (audioPlayer.paused) {
        audioPlayer.play().catch(function(error) {
            console.error("Failed to start playing audio:", error);
        });
        playPauseButton.innerHTML = '<img src="icons/pause.svg" alt="Pause">';
    } else {
        audioPlayer.pause();
        playPauseButton.innerHTML = '<img src="icons/play.svg" alt="Play">';
    }
});

  nextSongButton.addEventListener("click", nextSong);
  prevSongButton.addEventListener("click", prevSong);

  audioPlayer.addEventListener("timeupdate", function() {
      progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  });

  audioPlayer.addEventListener("ended", nextSong);

  progressBar.addEventListener("input", function() {
      audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
  });

  initializePlaylist();
  loadSong(currentSongIndex);
});


