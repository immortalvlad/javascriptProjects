var phrases;
var util = require('util');
var error = require('../error');

exports.connect = function () {
    phrases = require('./ru');
}

var getPhrase = function (name) {
    if (!phrases[name]) {
        throw new error.PhraseError('Нет такой фразы ' + name);
    }
    return phrases[name];
};
exports.getPhrase = getPhrase;

exports.makePage = function (url) {
    if (url !== 'index.html') {
        throw new error.HttpError(404,'нет такой страницы');
    }
    return util.format("%s, %s!", getPhrase("hello1"), getPhrase("world"));
}

