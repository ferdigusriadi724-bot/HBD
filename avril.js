let texts = [
  "halo",
  "iya kamu, Avrilliya Aska",
  "katanya pada tanggal 28 april 2006 hari ulang tahun kamu",
  "kalau emang iya, nih kado kamu"
];

let index = 0;
let typingSpeed = 40;
let isTyping = false;

function playClick() {
  document.getElementById("clickSound").play();
}

/* ✨ typing effect */
function typeText(text) {
  let i = 0;
  let el = document.getElementById("text");

  el.innerHTML = "";
  el.style.opacity = 1;
  el.style.transform = "translateY(10px)";

  isTyping = true;

  function typing() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, typingSpeed);
    } else {
      isTyping = false;
    }
  }

  setTimeout(() => {
    el.style.transform = "translateY(0)";
  }, 50);

  typing();
}

/* klik layar */
function nextText() {
  if (isTyping) return; // biar gak skip pas lagi ngetik

  if (index < texts.length) {
    playClick();
    typeText(texts[index]);
    index++;
  } else {
    document.body.onclick = null;
    document.getElementById("giftBtn").style.display = "block";
  }
}

/* tombol */
function showGift(e) {
  e.stopPropagation();
  playClick();

  let btn = document.getElementById("giftBtn");
  btn.innerHTML = "🎁 membuka...";
  btn.style.transform = "scale(0.9)";

  setTimeout(() => {
    btn.style.display = "none";
    document.getElementById("container").style.display = "none";
    document.getElementById("giftBox").style.display = "block";
  }, 500);
}

/* buka kado */
function openGift(e) {
  e.stopPropagation();
  playClick();

  let hint = document.getElementById("hint");

  let countdown = ["membuka kado...", "sebentar ya...", "hampir jadi..."];
  let i = 0;

  let interval = setInterval(() => {
    hint.innerHTML = countdown[i];
    i++;

    if (i >= countdown.length) {
      clearInterval(interval);

      setTimeout(() => {
        explode();
      }, 1000);
    }
  }, 1000);
}

/* hasil */
function explode() {
  document.getElementById("boomSound").play();

  document.getElementById("giftBox").style.display = "none";
  document.getElementById("result").style.display = "block";

  document.getElementById("finalText").innerHTML =
    "isi sendiri, doa sendiri, saya cukup bantu aminkan";

  startConfetti();
  startSlideshow();
}

/* 🎉 confetti */
function startConfetti() {
  let canvas = document.getElementById("confetti");
  let ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let pieces = [];

  for (let i = 0; i < 120; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 2 * 1,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      p.y += p.d;
      if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(draw);
  }

  draw();
}


/* 🖼️ slideshow */
let photos = ["avril.jpg", "avril2.jpg", "avril3.jpg"];
let current = 0;

function startSlideshow() {
  let img = document.getElementById("photo");

  img.src = photos[0];

  setInterval(() => {
    img.style.opacity = 0;

    setTimeout(() => {
      current = (current + 1) % photos.length;
      img.src = photos[current];
      img.style.opacity = 1;
    }, 300);

  }, 2000);
}
