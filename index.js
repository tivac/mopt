"use strict";

var path = require("path"),

    through = require("through2"),
    falafel = require("falafel"),

    objectify = require("./lib/objectify");

function transform(file) {
    var text = "";

    if(path.extname(file) !== ".js") {
        return through();
    }

    return through(
        function(buf, encoding, done) {
            text += buf;

            done();
        },
        function(done) {
            this.push(falafel(text, objectify).toString());

            done();
        }
    );
}

module.exports = transform;

module.exports.objectify = objectify;