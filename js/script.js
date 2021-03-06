var canvas;
var ctx;
var space;
var cirx = 377, ciry = 162;
var movex = 1, movey = 0;
var p1y = 0;
var p2y = 115;
var points1= 0, points2 = 0;
var down = false;
var start = false;
canvas = document.getElementById('pong');
ctx = canvas.getContext('2d');
function draw() {
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 6;
	ctx.strokeRect(10,15,400,300);
	ctx.fillStyle = 'cyan';
	ctx.fillRect(13, 18 + p1y, 20, 60);
	ctx.fillStyle = 'purple';
	ctx.fillRect(387,18 + p2y, 20, 60);
	if (start == true)
		moveCir();
	ctx.beginPath();
	ctx.arc(cirx, ciry, 10, 0, 2*Math.PI);
	ctx.fillStyle = '#5FFB17';
	ctx.fill();
	window.requestAnimationFrame(draw);
}

function mousemove(e) {
	var canvasRect = canvas.getBoundingClientRect();
	var cmx = e.clientX - canvasRect.left;	// real x without scroll
	var cmy = e.clientY - canvasRect.top;	// real y

	if (cmy < 234){
		if (cmy <= 0)
			p1y = 0;
		else
			p1y = cmy;
	}
	else{
		p1y = 234;
	}
}

function c_mousedown(e) {
	if (start == false) {
		movex = 2;
		start = true;
		cirx += movex;
	}
}

function moveCir() {
	if ((cirx <= 42 || cirx >= 378) && 
		((ciry => 32 && ciry <= 34) || (ciry >= 388 && ciry <= 390))){
		if((movex > 0 && (ciry >= p2y + 13 && ciry <= p2y + 73)) ||
			(movex < 0 && (ciry >= p1y + 8 && ciry <= p1y + 78))) {
			if (movex < 0)
				space = ciry - p1y - 12;	// space between ball and top of bar
			else
				space = ciry - p2y - 12;	
			if (space < 28)
				movey = (30 - space) * -.07;
			else if (space > 32)
				movey += (30 - space) * .07;
			movex *= -1;
		}
	}
	if (cirx <= 21 || cirx >= 400) {	// restart game
		if (cirx <= 42) {
			points2++;
			document.getElementById("p2points").innerHTML = "Computer: " + points2;
		}
		else {
			points1++;
			document.getElementById("p1points").innerHTML = "You: " + points1;
		}
		cirx = 377;
		ciry = 162;
		movex = 0;
		movey = 0;
		p2y = 115;
		start = false;
	}
	if (ciry <= 26) {
		down = true;
	}
	else if (ciry >= 303)
		down = false;
	cirx += movex * 2;
	if (down == true)
		ciry += movey * -1;
	else
		ciry += movey;
	if (movey != 0) {
		if (p2y + 28 < ciry && p2y <= 234)
			p2y += 1;
		else if(p2y + 28 != ciry && p2y + 28 >= 0)
			p2y -= 1;
	}
}

window.requestAnimationFrame(draw);
canvas.addEventListener("mousedown", c_mousedown);
canvas.addEventListener("mousemove", mousemove);