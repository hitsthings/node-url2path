var path = require('path');

var windowsPathComponentReplacerRE = /[\\\/\?\*\|<>":_]/g;
var decodeRE = /_([a-fA-F0-9]+)_/g;
function pathComponentReplacer(str) {
    return '_' + str.charCodeAt(0).toString(16) + '_';
}

function encodePathComponent(str) {
    windowsPathComponentReplacerRE.lastIndex = 0;
    return str.replace(windowsPathComponentReplacerRE, pathComponentReplacer);
}
function decodePathComponent(str) {
    decodeRE.lastIndex = 0;
    return str.replace(decodeRE, function(str) {
        return String.fromCharCode(parseInt(str, 16));
    });
}

function url2pathRelative(url) {
    return schemaToPathComponent(url)
        .split('/')
            .map(decodeURIComponent)
            .map(encodePathComponent)
        .join(path.sep);
}
function url2path(url, root) {
    return path.resolve(root || process.cwd(), url2pathRelative(url)); 
}

function schemaToPathComponent(schema) {
    return schema.replace('://', '/');
}

var knownSchemas = ['http', 'ftp', 'ssh', 'https', 'file', 'git'];
function path2url(path_in, defaultSchema) {
    var urlParts = path_in.split(path.sep)
        .map(decodePathComponent)
        .map(encodeURIComponent);
    var hasSchema = ~knownSchemas.indexOf(urlParts[0]);
    var schema;
    if (hasSchema) {
        schema = urlParts.shift();
    } else {
        schema =  defaultSchema;
    }
    return (schema ? schema + '://' : '') + urlParts.join('/');
}

module.exports = url2path;
module.exports.url2path = url2path;
module.exports.path2url = path2url;
module.exports.url2pathRelative = url2pathRelative;
module.exports.encodePathComponent = encodePathComponent;
module.exports.decodePathComponent = decodePathComponent;
module.exports.encodeURIComponent = encodeURIComponent;
module.exports.decodeURIComponent = decodeURIComponent;
