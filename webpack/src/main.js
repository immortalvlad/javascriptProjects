import _ from 'lodash'
import css from './css/main.css'
console.log("Hello",_.isEqual(1,2));

let a = "a";
console.log(css);
document.body.innerHTML += `<div class="${css.container}">Test block</div>`;
