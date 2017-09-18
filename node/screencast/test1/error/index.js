var util = require('util');

function PhraseError(message) {
    this.message = message;
    Error.captureStackTrace(this);
}

util.inherits(PhraseError, Error);
PhraseError.prototype.name = 'PhraseError';

function HttpError(status, message) {
    this.status = status;
    this.message = message;
    Error.captureStackTrace(this);
}
util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';

exports.PhraseError = PhraseError;
exports.HttpError = HttpError;