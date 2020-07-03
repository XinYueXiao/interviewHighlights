/** @type {HTMLCanvasElement} */
var CANVAS_WIDTH = 1024
var CANVAS_HEIGHT = 768
var RADIUS = 8
var MARGIN_LEFT = 60
var MARGIN_TOP = 30
var endTime = new Date(2020, 7, 2, 4, 47, 52)//48小时内
var curShowTimeSeconds = 0
var balls = []
var colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", '#FF6666', '#CCCCFF', '#FF6600', '#CC99CC']
window.onload = function () {
    var canvas = document.getElementById('canvas')
    var context = canvas.getContext('2d')
    //自适应
    CANVAS_WIDTH = document.body.clientWidth
    CANVAS_HEIGHT = document.body.clientHeight
    MARGIN_LEFT = Math.round(CANVAS_WIDTH / 10)
    RADIUS = Math.round(CANVAS_WIDTH * 4 / 5 / 108) - 1
    MARGIN_TOP = Math.round(CANVAS_HEIGHT / 5)

    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT
    curShowTimeSeconds = getCurShowTimeSeconds()
    setInterval(() => {
        render(context)
        update()
    }, 50);

}

//更新时间
function update() {
    var nextShowTimeSeconds = getCurShowTimeSeconds()

    var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60)
    var nextSeconds = nextShowTimeSeconds % 60

    var curHours = parseInt(curShowTimeSeconds / 3600);
    var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60)
    var curSeconds = curShowTimeSeconds % 60

    if (nextSeconds != curSeconds) {
        if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10));
        }
        if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours / 10));
        }

        if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10));
        }
        if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));
        }

        if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10));
        }
        if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds % 10));
        }

        curShowTimeSeconds = nextShowTimeSeconds;
    }

    updateBalls();
    console.log(balls.length);

}
function updateBalls() {

    for (var i = 0; i < balls.length; i++) {

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].y >= CANVAS_HEIGHT - RADIUS) {
            balls[i].y = CANVAS_HEIGHT - RADIUS;
            balls[i].vy = - balls[i].vy * 0.75;
        }
    }
    var cnt = 0
    //删除无用的数组元素(优化一)
    for (let i = 0; i < balls.length; i++) {
        //球在屏幕内
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < CANVAS_WIDTH) {
            balls[cnt++] = balls[i]
        }
    }

    while (balls.length > Math.min(300, cnt)) {//对最大值优化
        balls.pop()
    }
}
function addBalls(x, y, num) {

    for (var i = 0; i < digit[num].length; i++)
        for (var j = 0; j < digit[num][i].length; j++)
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                }

                balls.push(aBall)
            }
}
//时间处理
function getCurShowTimeSeconds() {
    var curTime = new Date()
    var ret = endTime.getTime() - curTime.getTime();
    ret = Math.round(ret / 1000)
    return ret >= 0 ? ret : 0
}
//渲染函数
function render(cxt) {
    cxt.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    const time = getNumber(curShowTimeSeconds)
    var hours = time.hours
    var minutes = time.minutes
    var seconds = time.seconds
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt)//时间处理48小时内
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt)
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt)

    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt)
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt)
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt)

    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt)
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt)
    //根据balls数组渲染小球
    for (var i = 0; i < balls.length; i++) {
        cxt.fillStyle = balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
        cxt.closePath();

        cxt.fill();
    }
}
//时间处理位为数字
function getNumber(time) {
    var hours = parseInt(time / 3600)
    var minutes = parseInt((time - hours * 3600) / 60)
    var seconds = time % 60
    return {
        hours: hours > 10 ? hours / 10 : hours, minutes, seconds
    }
}
//画球
function renderDigit(x, y, number, cxt) {
    cxt.fillStyle = 'pink'
    for (let i = 0; i < digit[number].length; i++) {
        for (let j = 0; j < digit[number][i].length; j++) {
            if (digit[number][i][j] == 1) {
                cxt.beginPath()
                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI)
                cxt.closePath()
                cxt.fill()
            }
        }
    }
}