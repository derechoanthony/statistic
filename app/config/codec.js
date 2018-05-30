var res = {};
res.codec = function(callback) {
    var timeInMs = Date.now();
    callback(timeInMs);
};
module.exports = res;