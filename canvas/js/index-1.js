draw();
draw1();
draw2();
draw3();
draw4();
draw5();


//矩形
function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        //fillRect(x, y, width, height)
        //绘制一个填充的矩形
        ctx.fillRect(25, 25, 100, 100);
        //清除指定矩形区域，让清除部分完全透明
        ctx.clearRect(45, 45, 60, 60);
        //绘制一个矩形的边框
        ctx.strokeRect(50, 50, 50, 50);
    }
}

//三角形
function draw1() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        //新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径
        ctx.beginPath();
        //将笔触移动到指定的坐标x以及y上
        ctx.moveTo(175, 75);
        //绘制一条从当前位置到指定x以及y位置的直线
        ctx.lineTo(225, 25);
        ctx.lineTo(225, 125);
        //通过填充路径的内容区域生成实心的图形
        ctx.fill();
    }
}


//笑脸
function draw2() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.beginPath();
        //画一个以（x,y）为圆心的以radius为半径的圆弧（圆），
        //从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成
        ctx.arc(325, 75, 50, 0, Math.PI * 2, true); // 绘制
        ctx.moveTo(290, 75);
        ctx.arc(325, 75, 35, 0, Math.PI, false);   // 口(顺时针)
        ctx.moveTo(300, 65);
        ctx.arc(295, 65, 5, 0, Math.PI * 2, true);  // 左眼
        ctx.moveTo(360, 65);
        ctx.arc(355, 65, 5, 0, Math.PI * 2, true);  // 右眼
        //通过线条来绘制图形轮廓
        ctx.stroke();
    }
}

//三角形

function draw3() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        // 填充三角形
        ctx.beginPath();
        ctx.moveTo(425, 25);
        ctx.lineTo(505, 25);
        ctx.lineTo(425, 105);
        ctx.fill();

        // 描边三角形
        ctx.beginPath();
        ctx.moveTo(525, 125);
        ctx.lineTo(525, 45);
        ctx.lineTo(445, 125);
        //闭合路径之后图形绘制命令又重新指向到上下文中
        ctx.closePath();
        ctx.stroke();
    }
}


//二次贝塞尔曲线
function draw4() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        // 二次贝塞尔曲线
        ctx.beginPath();
        ctx.moveTo(675, 25);
        //绘制二次贝塞尔曲线，cp1x,cp1y为一个控制点，x,y为结束点。
        ctx.quadraticCurveTo(625, 25, 625, 62.5);
        ctx.quadraticCurveTo(625, 100, 650, 100);
        ctx.quadraticCurveTo(650, 120, 630, 125);
        ctx.quadraticCurveTo(660, 120, 665, 100);
        ctx.quadraticCurveTo(725, 100, 725, 62.5);
        ctx.quadraticCurveTo(725, 25, 675, 25);
        ctx.stroke();
    }
}


//三次贝塞尔曲线
function draw5() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

         //三次贝塞尔曲线
    // ctx.beginPath();
    // ctx.moveTo(75, 40);
    // ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
    // ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
    // ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
    // ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
    // ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
    // ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);

        //三次贝塞尔曲线
        ctx.beginPath();
        ctx.moveTo(800, 40);
        //绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点
        ctx.bezierCurveTo(800, 37, 795, 25, 775, 25);
        ctx.bezierCurveTo(755, 25, 745, 62.5, 725, 62.5);
        // ctx.bezierCurveTo(745, 80, 765, 102, 800, 120);
        // ctx.bezierCurveTo(835, 102, 855, 80, 855, 62.5);
        // ctx.bezierCurveTo(855, 62.5, 855, 25, 825, 25);
        // ctx.bezierCurveTo(810, 25, 800, 37, 800, 40);
        ctx.fill();
    }
}