let gitSpawn = require('./gitSpawn');
let gitBranch = require('./gitBranch');

const checkout = (req, res) => {
    let branch = req.params.branch;

    return gitSpawn(['checkout', branch]).then((err) => {
        throw err;
    }, () => {
        gitBranch(res);
    });
};

module.exports = checkout;