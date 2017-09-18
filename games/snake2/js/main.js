
GameObj = {
	class: [
	],
	obj: [
	],
};
GameObj.items = {
	FRUIT: 2,
	SNAKE: 1,
	EMPTY: 0,
};
GameObj.queue = [
];
GameObj.grid = {
	COLS: 30,
	ROWS: 30,
	frame : 0,
	_canvas_width: 600,
	_canvas_height: 600,
	kx: null,
	ky: null,
	_grid: [
	],
	calculate_kx: function(){
		this.kx = Math.floor(this._canvas_width / this.COLS);
		this.ky = Math.floor(this._canvas_height / this.ROWS);
	},
	reset: function(){
		this._grid = [
		];

		this.init();
	},
	init: function(){

		this.calculate_kx();

		for(var x = 0; x < this.COLS; x++) {
			this._grid.push([
			]);
			for(var y = 0; y < this.ROWS; y++) {
				this._grid[x].push(GameObj.items.EMPTY)
			}
		}
	},
	setValue: function(x, y, val){
		this._grid[x][y] = val;
	},
	getValue: function(x, y){
		return this._grid[x][y];
	},
	clearVlaue: function(x, y){

		this._grid[x][y] = GameObj.items.EMPTY;
	}
};
GameObj.Fruit = (function(){
	setFruitOnMap = function(){
		var empty = [
		];
		for(var x = 0; x < GameObj.grid.COLS; x++) {
			for(var y = 0; y < GameObj.grid.ROWS; y++) {
				if(GameObj.grid.getValue(x, y) == GameObj.items.EMPTY){
					empty.push({x: x, y: y});
				}
			}
		}
		var fruit = empty[Math.floor(Math.random() * empty.length)];
		GameObj.grid.setValue(fruit.x, fruit.y, GameObj.items.FRUIT);

	};
	return {
		setFruitOnMap: setFruitOnMap
	};

})();
GameObj.Snake = (function(){
	var queue = [
	];
	var ix = 0;
	var iy = 0;
	reset = function(){

		GameObj.queue = [
		];
	};
	addElementToHead = function(x, y){
		var e = {};
		e.x = x;
		e.y = y;

		GameObj.queue.unshift(e);

		GameObj.grid.setValue(x, y, GameObj.items.SNAKE);

	};
	addElementToEnd = function(x, y){
		var e = {};
		e.x = x;
		e.y = y;

		GameObj.queue.push(e);

		GameObj.grid.setValue(x, y, GameObj.items.SNAKE);

	};
	removeLast = function(){

	};
	setStartPosition = function(){
		var x = Math.round(GameObj.grid.ROWS / 2);
		var y = GameObj.grid.COLS - 2;
		addElementToHead(x, y);
		GameObj.Fruit.setFruitOnMap();

	};
	setEndPosition = function(){
		var x = parseInt(Math.round(GameObj.grid.ROWS / 2));
		var y = GameObj.grid.COLS - 2;
		addElementToHead(x, y);
		GameObj.Fruit.setFruitOnMap();

	};

	tick = function(){
		var last = null, el;
		
		el = GameObj.queue[0];
		
		var nxd, nyd
		var nx = el.x;
		var ny = el.y;
		var direction = GameObj.Iteraction.getDirection();
		if(direction == GameObj.Iteraction.UP){
			ny = el.y - 1;
		}
		if(direction == GameObj.Iteraction.DOWN){
			ny = el.y + 1;
		}
		if(direction == GameObj.Iteraction.LEFT){
			nx = el.x - 1;
		}
		if(direction == GameObj.Iteraction.RIGHT){
			nx = parseInt(el.x) + 1;
		}
		if(nx > GameObj.grid.COLS-1 || ny > GameObj.grid.ROWS-1
				|| nx < 0 || ny < 0 ||
				GameObj.grid.getValue(nx, ny) == GameObj.items.SNAKE){
			GameObj.Game.reset();
			GameObj.grid.reset();
			GameObj.Snake.reset();
			GameObj.Snake.setEndPosition();
			GameObj.Iteraction.resetDirection();
			return true;
		}
		if(GameObj.grid.getValue(nx, ny) == GameObj.items.FRUIT){

			GameObj.Game.increseScore();
			GameObj.Fruit.setFruitOnMap();
		} else {
			last = GameObj.queue.pop();
			GameObj.grid.clearVlaue(last.x, last.y);
		}
		addElementToHead(nx, ny);
	};
	return {
		tick: tick,
		getQueue: queue,
		addElement: addElementToHead,
		setStartPosition: setStartPosition,
		setEndPosition: setEndPosition,
		reset: reset
	};
})();
GameObj.Game = (function(){
	var score = 0;
	
	reset = function(){
		score = 0;
	};
	increseScore = function(){
		score++;
	};
	checkCondition = function(){
		snake = GameObj.Snake.getQueue[0];
		if(snake.y == 0){
			return true;
		}
		if(snake.x == 0){
			return true;
		}
		return false;
	};
	getScore = function(){
		return score;
	};
	update = function(){
		GameObj.Snake.tick();
	};
	return  {
		increseScore: increseScore,
		getScore: getScore,
		checkCondition: checkCondition,
		update: update,
		reset: reset
	}
})();
GameObj.Draw = (function(){
	var canvas, ctx;
	init = function(){
		canvas = document.getElementById("canvas");
		canvas.width = GameObj.grid._canvas_width;
		canvas.height = GameObj.grid._canvas_height;
		ctx = canvas.getContext('2d');
	}
	draw = function(){

		for(var x = 0; x < GameObj.grid.COLS; x++) {
			for(var y = 0; y < GameObj.grid.ROWS; y++) {
				var itemType = GameObj.grid.getValue(x, y);
				if(itemType == GameObj.items.SNAKE){
					ctx.fillStyle = "#FFA500";
					ctx.fillRect(x * GameObj.grid.kx, y * GameObj.grid.ky, GameObj.grid.kx, GameObj.grid.ky);
				}
				if(itemType == GameObj.items.EMPTY){
					ctx.fillStyle = "#FFF";
					ctx.fillRect(x * GameObj.grid.kx, y * GameObj.grid.ky, GameObj.grid.kx, GameObj.grid.ky);
				}
				if(itemType == GameObj.items.FRUIT){
					ctx.fillStyle = "#8bc34a";
					ctx.fillRect(x * GameObj.grid.kx, y * GameObj.grid.ky, GameObj.grid.kx, GameObj.grid.ky);
				}

			}
		}
		ctx.fillStyle = "#000";
		ctx.font="14px Arial";
		ctx.fillText("SCORE: " + GameObj.Game.getScore(), 10, 20);

	}
	return {
		init: init,
		draw: draw
	};
})();

GameObj.Loop = (function(){
	
	
	start = function(){

		GameObj.grid.frame++;
		if(GameObj.grid.frame % 5 === 0){

			GameObj.Game.update();

			GameObj.Draw.draw();
		}
			window.requestAnimationFrame(GameObj.Loop.start);
	};
	return {
		start: start
	}
})();
GameObj.Iteraction = (function(){

	var UP = 1,
			DOWN = 2,
			LEFT = 3,
			RIGHT = 4,
			KEY_UP = 38,
			KEY_DOWN = 40,
			KEY_LEFT = 37,
			KEY_RIGHT = 39;

	var direction = UP;

	function changeDirection(evt){

		if(evt.keyCode == KEY_UP && direction != DOWN){
			direction = UP;
		}
		if(evt.keyCode == KEY_DOWN && direction != UP){
			direction = DOWN;
		}
		if(evt.keyCode == KEY_LEFT && direction != RIGHT){
			direction = LEFT;
		}
		if(evt.keyCode == KEY_RIGHT && direction != LEFT){
			direction = RIGHT;
		}
	}
	function getDirection(){
		return direction;
	}
	resetDirection = function(){
		direction = UP;
	}
	registerEvents = function(){
		document.addEventListener("keyup", function(ev){
			changeDirection(ev);
		});
		document.addEventListener("keydown", function(ev){
		});
	};
	return {
		UP: UP,
		DOWN: DOWN,
		LEFT: LEFT,
		RIGHT: RIGHT,
		registerEvents: registerEvents,
		getDirection: getDirection,
		resetDirection: resetDirection
	};

})();
(function($){
	GameObj.grid.init();
	GameObj.Iteraction.registerEvents();
	GameObj.Snake.setStartPosition();
	GameObj.Draw.init();
	window.requestAnimationFrame(GameObj.Loop.start);
})(jQuery);