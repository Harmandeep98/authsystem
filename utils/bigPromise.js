module.exports = (bigPromise) => (req, res, next) => {
    Promise.resolve(bigPromise(req, res, next)).catch(next);
};