
var Person = Class.extend({
	init: function(){
		console.log("this is constr");
	},
	sayHi: function(){
		var p = new Promise(function(resolve, reject){
			setTimeout(function(){
				console.log("hi");
				resolve(this);
			}, 3000);
		});
		return p;
	},
	loop: function(){
		this.allPromise().then(this.globalPromise);
		console.log("run");
	},
	allPromise: function(){
		return  Promise.all([
			this.sayHi(),
			this.doOther()
		]
				).then(this.saybuy);
	},
	globalPromise: function(ob){
		return  new Promise(function(resolve, reject){
			resolve();
			console.log("everethinh is Done");
			
		});
	},
	saybuy: function(){
		return new Promise(function(resolve, reject){
			setTimeout(function(){
				console.log("buy");
				resolve(this);
			}, 1000);
		});
	},
	doOther: function(){
		return new Promise(function(resolve, reject){
			setTimeout(function(){
				console.log("doother");
				resolve(this);
			}, 1000);
		});
	}
});

var Man = Person.extend({      
//	init : function(){
//		this._super();
//	}
});

//new Person();
var m = new Man();
		m.loop();
var  frame = 0;
function step() {
	frame++;
	if(frame % 60 === 0){
//		console.log(frame);
	}
	window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);


//m.allPromise().then(m.globalPromise);
//m.sayHi();
//m.sayHi().then(m.saybuy);

