const imageStrip = document.getElementById('imageStrip');
const startBtn = document.getElementById('startBtn');
const resultDiv = document.getElementById('result');
const shareContainer = document.getElementById('shareContainer');
const shareBtn = document.getElementById('shareBtn');

const images = imageStrip.querySelectorAll('img');
const imageWidth = images[0].clientWidth;
const totalImages = images.length;

// Color names matching images order
const colorNames = ['Blue', 'Green', 'Orange', 'Pink', 'Purple'];

startBtn.addEventListener('click', () => {
  resultDiv.innerText = '';
  resultDiv.className = '';
  shareContainer.style.display = 'none';  // Hide share button on new run
  imageStrip.style.transition = 'none';

  let position = 0;
  let speed = 20;
  let duration = 3000;

  const loop = setInterval(() => {
    position -= speed;
    if (Math.abs(position) >= imageWidth * totalImages) {
      position = 0;
    }
    imageStrip.style.transform = `translateX(${position}px)`;
  }, 16);

  setTimeout(() => {
    clearInterval(loop);

    const randomIndex = Math.floor(Math.random() * totalImages);
    const finalPosition = -randomIndex * imageWidth;

    imageStrip.style.transition = 'transform 0.8s ease-out';
    imageStrip.style.transform = `translateX(${finalPosition}px)`;

    const selectedColor = colorNames[randomIndex];

    // Map selected color to CSS glow class
    const glowClassMap = {
      Blue: 'glow-blue',
      Green: 'glow-green',
      Orange: 'glow-orange',
      Pink: 'glow-pink',
      Purple: 'glow-purple',
    };

    resultDiv.classList.add(glowClassMap[selectedColor]);
    resultDiv.innerText = `Selected: ${selectedColor}`;

    // Save selected color for sharing
    shareBtn.dataset.color = selectedColor;
    shareContainer.style.display = 'block';  // Show share button
  }, duration);
});

shareBtn.addEventListener('click', () => {
  const color = shareBtn.dataset.color;

  // Compose tweet text with color and mention
  const text = encodeURIComponent(`I pledge to be loyal to the team ${color}! @SuccinctLabs #ProveWithUs 

Pledge Yourself: https://succinctgem.vercel.app`);

  // Twitter share URL
  const tweetUrl = `https://twitter.com/intent/tweet?text=${text}`;

  window.open(tweetUrl, '_blank');
});
