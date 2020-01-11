module.exports = function(req, res, next) {
    if (!req.user) {
        req.flash('error', '');
        res.redirect('/auth/login');
    } else {
        next();
    }
};