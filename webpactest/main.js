// import './mainless.less';
import './main.css';
import _ from "lodash";
import template from './main.hbs';

//var _ = require('lodash');

console.log('template',template({name:'WebPack'}));
document.write(require('./content'));
console.log(_.isEqual(1,2));

let obj = {
	field:111,
	someFn () {
		console.log('someFN');
	}
};

obj.someFn();