/*
 * @Description: 工作使我快乐，我爱生活，更爱工作！
 * @Version: 1.0
 * @Autor: GY
 * @Date: 2022-04-08 10:51:31
 * @LastEditors: GY
 * @LastEditTime: 2022-04-08 14:25:33
 */
export default function colliedBall(canvasId: string) {
  // 获取canvas画布和context
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement
  const ctx = canvas.getContext('2d')
  // 重置画布，设置画布的宽高与父节点宽高一致
  canvas.height = (canvas.parentNode as HTMLElement)?.clientHeight
  canvas.width = (canvas.parentNode as HTMLElement)?.clientWidth
  // 封装一个小球类
  class Ball {
    public x: number

    public y: number

    public radius: number

    public angle: number

    public speed: number

    public flag: boolean

    constructor(x: number, y: number, radius: number) {
      this.x = x
      this.y = y
      this.radius = radius
      this.angle = Math.random() * 180
      this.speed = 0.4 // 小球运动速度
      this.flag = false
    }

    draw(ctx: any) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
      ctx.closePath()
      ctx.fillStyle = 'rgba(254,94,94,0.5)'
      ctx.fill()
    }
  }

  // 随机生成若干个小球
  const balls: Ball[] = []
  while (balls.length < 20) {
    const radius = Math.random() * 60 + 40 // 10 ~ 50
    const x = Math.random() * (canvas.width - radius - radius) + radius
    const y = Math.random() * (canvas.height - radius - radius) + radius

    let flag = true
    for (let i = 0; i < balls.length; i++) {
      const dx = x - balls[i].x
      const dy = y - balls[i].y
      const dl = Math.sqrt(dx * dx + dy * dy)
      if (dl <= radius + balls[i].radius) {
        flag = false
      }
    }
    if (flag) {
      balls.push(new Ball(x, y, radius))
    }
  }

  function drawFrame(canvas: any, ctx: any) {
    window.requestAnimationFrame(() => {
      drawFrame(canvas, ctx)
    })
    // setInterval(() => drawFrame(canvas, ctx), 800)
    if (canvas.height) {
      // eslint-disable-next-line no-self-assign
      // canvas.height = canvas.height // 清空画布
      // 重置画布，设置画布的宽高与父节点宽高一致
      canvas.height = canvas.parentNode.clientHeight
      canvas.width = canvas.parentNode.clientWidth
      console.log('canvas.height:' + canvas.height)
      // 绘制墙壁
      ctx.strokeRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < balls.length; i++) {
        const ball = balls[i]
  
        // 判断小球间的碰撞
        for (let j = i + 1; j < balls.length; j++) {
          const dx = ball.x - balls[j].x
          const dy = ball.y - balls[j].y
          const dl = Math.sqrt(dx * dx + dy * dy)
          if (dl <= ball.radius + balls[j].radius) {
            ball.flag === false ? ball.angle -= 180 : ''
            balls[j].flag === false ? balls[j].angle -= 180 : ''
            // eslint-disable-next-line no-multi-assign
            ball.flag = balls[j].flag = true
          }
        }
  
        // 判断与墙壁的碰撞反弹
        if (ball.flag === false) {
          if (ball.x + ball.radius > canvas.width) {
            ball.angle = 180 - ball.angle
          }
          if (ball.x - ball.radius < 0) {
            ball.angle = -(180 + ball.angle)
          }
          if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
            ball.angle = -ball.angle
          }
        }
  
        // 计算小球下一帧的坐标
        ball.x += ball.speed * Math.cos(ball.angle * Math.PI / 180)
        ball.y -= ball.speed * Math.sin(ball.angle * Math.PI / 180)
  
        // 绘制
        ball.draw(ctx)
        ball.flag = false
      }
    }
  }
  drawFrame(canvas, ctx)
}