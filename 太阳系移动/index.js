let canvas = document.getElementById('canvas')


// if (!canvas.getContext()) {
//   // return
//   return console.log('有的');
// }
let ctx = canvas.getContext('2d')

requestAnimationFrame(draw)

let sun = new Image()
sun.src = '../image/canvas_sun.png'
let earth = new Image()
earth.src = '../image/canvas_earth.png'
let moon = new Image()
moon.src = '../image/canvas_moon.png'

function draw() {
  ctx.clearRect(0, 0, 300, 300)
  ctx.save()

  drawBg() // 1.绘制背景
  drawEarth() // 2.绘制地球

  ctx.restore()
  requestAnimationFrame(draw)
}

function drawBg() {
  // 1.绘制背景
  ctx.save()
  ctx.drawImage(sun, 0, 0) // 背景图
  ctx.translate(150, 150) // 移动坐标
  ctx.strokeStyle = 'gray'
  ctx.beginPath() // 绘制轨道
  ctx.arc(0, 0, 105, 0, Math.PI * 2)
  ctx.stroke()
  ctx.restore()
}

function drawEarth() {
  // 2.地球
  let time = new Date()
  let second = time.getSeconds()
  let mill = time.getMilliseconds()
  ctx.save() // earth start
  ctx.translate(150, 150)
  ctx.rotate(
    ((Math.PI * 2) / 60) * second +
    ((Math.PI * 2) / 60 / 1000) * mill
  );
  ctx.translate(105, 0)
  ctx.drawImage(earth, -12, -12)

  drawMoon(second, mill)

  drawEarthMask()

  ctx.restore() // earth end
}
function drawMoon(second, mill) {
  // 3.月球
  ctx.save() // moon start
  ctx.rotate(
    ((Math.PI * 2) / 10) * second +
    ((Math.PI * 2) / 10 / 1000) * mill
  )
  ctx.translate(0, 28)
  ctx.drawImage(moon, -3.5, -3.5)
  ctx.restore() // moon end
}

function drawEarthMask() {
  // 4.绘制地球的蒙版
  ctx.save()
  ctx.beginPath()
  ctx.fillStyle = 'rgba(0,0,0,0.4)'
  ctx.fillRect(0, -12, 40, 24)
  ctx.restore()
}
