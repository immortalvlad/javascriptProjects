function Grid(){
	var i = 0;
	this.i = 2;
	return {i : this.i};
//	return this;
}
var Some = (function Grid(){
	var i = 0;
	this.i = 5;
	process = function(val){
		val= val ? val:1;
		this.i = 5*5*val;
	};
	return {
		i : this.i,
		load : process
	};
//	return this;
})();

var SomeOther = function Grid(){
	var i = 0;
	this.i = 15;
	process = function(){
	
		this.i = 15*5;
	};
	return {
		i : this.i,
		load : process
	};
//	return this;
};

//grid1 = SomeOther();
//console.log(grid1.i);
//grid1.i = 4;
//console.log(grid1.i);

console.log("-----------------------");
//
//grid3 = SomeOther();
//console.log(grid3.i);
//grid3.i = 3;
//console.log(grid3.i);

console.log("-----------------------");

console.log(Some.i);
Some.load();
console.log(Some.i);

console.log("-----------------------");
var Some2 = Some;
console.log(Some2.i);
Some2.load(3);
console.log(Some2.i);
console.log(Some.i);
console.log("-----------------------");

//console.log(SomeOther);
//grid2 = new Grid();
//console.log(grid2.i);
//grid2.i = 1;
//console.log(grid2.i);

console.log("-----------------------");



