/*
 * @Description: 工作使我快乐，我爱生活，更爱工作！
 * @Version: 1.0
 * @Autor: GY
 * @Date: 2022-04-08 09:51:49
 * @LastEditors: GY
 * @LastEditTime: 2022-04-08 10:12:16
 */
export default function sky(canvasId: string) { 
  window.requestAnimFrame = (function () {
    return window.requestAnimationFrame
  }())
  let canvas = document.getElementById(canvasId) as HTMLCanvasElement
  let c = canvas.getContext('2d')
  
  let numStars = 1900
  let radius = '0.' + Math.floor(Math.random() * 9) + 1
  let focalLength = canvas.width * 2
  let warp = 0
  let centerX = 0, centerY = 0
  
  let stars: any[] = [],
    star
  let i
  
  let animate = true
  
  initializeStars()
  
  function executeFrame() {
    if (animate) window.requestAnimFrame(executeFrame)
    moveStars()
    drawStars(c)
  }
  
  function initializeStars() {
    centerX = canvas.width / 2
    centerY = canvas.height / 2
  
    stars = []
    for (i = 0; i < numStars; i++) {
      star = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * canvas.width,
        o: '0.' + Math.floor(Math.random() * 99) + 1
      }
      stars.push(star)
    }
  }
  
  function moveStars() {
    for (i = 0; i < numStars; i++) {
      star = stars[i]
      star.z--
  
      if (star.z <= 0) {
        star.z = canvas.width
      }
    }
  }
  
  function drawStars(c: any) {
    let pixelX, pixelY, pixelRadius
  
    if (canvas.width != window.innerWidth || canvas.width != window.innerWidth) {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initializeStars()
    }
    if (warp == 0) {
      c.fillStyle = 'rgba(0,10,20,1)'
      c.fillRect(0, 0, canvas.width, canvas.height)
    }
    c.fillStyle = 'rgba(255, 255, 255, ' + radius + ')'
    for (i = 0; i < numStars; i++) {
      star = stars[i]
  
      pixelX = (star.x - centerX) * (focalLength / star.z)
      pixelX += centerX
      pixelY = (star.y - centerY) * (focalLength / star.z)
      pixelY += centerY
      pixelRadius = 1 * (focalLength / star.z)
  
      c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius)
      c.fillStyle = 'rgba(255, 255, 255, ' + star.o + ')'
    }
  }
  
  executeFrame()
}