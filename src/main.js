'use strict';

/**
* Returns the generated YUIDoc JSON directly.
*/
function generateYuiDoc (sourcePaths) {

    var fs = require('fs');
    var path = require('path');
    var Y = require('yuidocjs');
    var starttime = Date.now();
    var json;

    var options = {
        parseOnly: true,
        quiet: false,
        paths: sourcePaths
    };

    try {
        return (new Y.YUIDoc(options)).run();
    } catch(e) {
        console.warn(e);
    }
}

(function () {

    var output = '../out/out.js';

    var fs = require('fs');
    var converter = require('./converter');

    var text = fs.readFileSync('../yuidoc-data/pixi.json');
    //var yuidoc = JSON.parse(text);
    var yuidoc = generateYuiDoc(['C:/code/ph/pixi/src']);
    if (!yuidoc) {
        console.warn("YUIDoc not generated - nothing to do")
        return;
    }

    var res = converter.convert(yuidoc);
    fs.writeFileSync(output, res.join("\n"));

}).call(this);
