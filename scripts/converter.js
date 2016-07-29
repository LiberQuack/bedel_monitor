module.exports = {
    bytesToGB: function (totalBytes) {
        return Math.round(totalBytes / 1024 / 1024 / 1024);
    },

    bytesToMB: function (totalBytes) {
        return Math.round(totalBytes / 1024 / 1024);
    }
};