const text = document.querySelector('#colortext');
const text2 = document.querySelector('#colortext2');
const circle = document.querySelectorAll('.circle');
const diamond = document.querySelector('.diamond');
const daen = document.querySelector('.daen');
const box = document.querySelectorAll('.box');
const picker = document.querySelector('#colorPicker');


function hantai(make) {
  make = make.replace('#', '');
  const r = parseInt(make.slice(0, 2), 16);
  const g = parseInt(make.slice(2, 4), 16);
  const b = parseInt(make.slice(4, 6), 16);
  const reverser = (255 - r).toString(16).padStart(2, '0');
  const reverseg = (255 - g).toString(16).padStart(2, '0');
  const reverseb = (255 - b).toString(16).padStart(2, '0');
  return `#${reverser}${reverseg}${reverseb}`;
};


picker.addEventListener('input', () => {
  const color = picker.value;
  const reversecolor = hantai(color);
  document.body.style.backgroundColor = color;
  diamond.style.backgroundColor = color;
  circle.forEach(el => {
    el.style.backgroundColor = color;
  });
  daen.style.backgroundColor = reversecolor;
  box.forEach(el => {
    el.style.backgroundColor = reversecolor;
  });
});

const colorBg = () => {
  text.textContent = picker.value;
};

picker.addEventListener("input", colorBg);

const colorBbg = () => {
  const color = picker.value;
  text2.textContent = hantai(color);
};

picker.addEventListener('input', colorBbg);



const boxes = [
  { el: document.getElementById('ball1'), x: 500, y: 500, vx: 0.6, vy: -0.4 },
  { el: document.getElementById('ball2'), x: 500, y: 500, vx: -0.5, vy: 0.5 },
  { el: document.getElementById('ball3'), x: 500, y: 500, vx: 0.4, vy: -0.7 },
  { el: document.getElementById('ball4'), x: 500, y: 500, vx: -0.6, vy: 0.5 },
  { el: document.getElementById('ball5'), x: 500, y: 500, vx: 0.7, vy: -0.6 },
  { el: document.getElementById('ball6'), x: 500, y: 500, vx: -0.5, vy: 0.5 },
  { el: document.getElementById('ball7'), x: 500, y: 500, vx: 0.5, vy: -0.5 },
  { el: document.getElementById('ball8'), x: 500, y: 500, vx: -0.5, vy: 0.5 },
  { el: document.getElementById('ball9'), x: 500, y: 500, vx: 0.5, vy: -0.5 },
  { el: document.getElementById('ball10'), x: 500, y: 500, vx: -0.5, vy: 0.5 },
];


window.addEventListener('load', () => {

  boxes.forEach(box => {
    const maxX = window.innerWidth - box.el.offsetWidth;
    const maxY = window.innerHeight - box.el.offsetHeight;

    let x = Math.floor(Math.random() * maxX);
    let y = Math.floor(Math.random() * maxY);

    box.x = x;
    box.y = y;

    box.el.style.left = `${x}px`;
    box.el.style.top = `${y}px`;
  });
});


const BOX_SIZE = 85;

function updatePosition(box) {
  box.x += box.vx;
  box.y += box.vy;

  if (box.x <= 0 || box.x >= window.innerWidth - BOX_SIZE) {
    box.vx *= -1;
    box.x = Math.max(0, Math.min(box.x, window.innerWidth - BOX_SIZE));
  }

  if (box.y <= 0 || box.y >= window.innerHeight - BOX_SIZE) {
    box.vy *= -1;
    box.y = Math.max(0, Math.min(box.y, window.innerHeight - BOX_SIZE));
  }


  box.el.style.left = `${box.x}px`;
  box.el.style.top = `${box.y}px`;
}

// 衝突検出
function isColliding(a, b) {
  return !(
    a.x + BOX_SIZE < b.x ||
    a.x > b.x + BOX_SIZE ||
    a.y + BOX_SIZE < b.y ||
    a.y > b.y + BOX_SIZE
  );
}

// 速度交換による反射
function reflectBounce(a, b) {
  const tempVx = a.vx;
  const tempVy = a.vy;
  a.vx = b.vx;
  a.vy = b.vy;
  b.vx = tempVx;
  b.vy = tempVy;
}

function animate() {
  boxes.forEach(updatePosition);

  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      if (isColliding(boxes[i], boxes[j])) {
        reflectBounce(boxes[i], boxes[j]);
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();