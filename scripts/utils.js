let specialChars = /[^a-z0-9\-]/gi;

exports.normalizeElasticText = function (text) {
    return text.replace(specialChars, "_").trim();
};

exports.bytesToGB = function (totalBytes) {
    return Math.round(totalBytes / 1024 / 1024 / 1024);
};

exports.bytesToMB = function (totalBytes) {
    return Math.round(totalBytes / 1024 / 1024);
};