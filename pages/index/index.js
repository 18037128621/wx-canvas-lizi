
const sysinfo =  wx.getSystemInfoSync()
const ctx = wx.createCanvasContext('canvas')
var w = 600;
var h = 600;
var points = []


var Point = function (x, y) {
    this.x = x
    this.y = y
    this.r = 1 + Math.random() * 2
    this.sx = Math.random() * 2 - 1
    this.sy = Math.random() * 2 - 1
}

Point.prototype.draw = function (ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fillStyle = '#aaa'
    ctx.fill()
}

Point.prototype.move = function () {
    this.x += this.sx
    this.y += this.sy
    if (this.x > w || this.x < 0) this.sx = -this.sx
    if (this.y > h || this.y < 0) this.sy = -this.sy
}

Point.prototype.drawLine = function (ctx, p) {
    var dx = this.x - p.x
    var dy = this.y - p.y
    var d = Math.sqrt(dx * dx + dy * dy)
    if (d < 100) {
        var alpha = (100 - d) / 100 * 1
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(p.x, p.y)
        ctx.closePath()
        ctx.strokeStyle = 'rgba(170, 170, 170, ' + alpha + ')'
        ctx.strokeWidth = 1
        ctx.stroke()
    }
}




Page({
  data: {

  },

  onLoad: function () {

      this.setData({
          screenWidth: sysinfo.screenWidth,
          screenHeight: sysinfo.screenHeight
      })



      for (var i = 0; i < 40; i++) {
          points.push(new Point(Math.random() * w, Math.random() * h))
      }


      this.gameloop(); //进行
      ctx.draw();

  },

    /**进行*/
    gameloop() {
        setTimeout(this.gameloop, 100);
        this.paint();
    },


    paint () {
        ctx.clearRect(0, 0, w, h) //清空画布
        for (var i = 0; i < points.length; i++) {
            points[i].move()
            points[i].draw(ctx)
            for (var j = i + 1; j < points.length; j++) {
                points[i].drawLine(ctx, points[j])
            }
        }
        ctx.draw();
    }









})
