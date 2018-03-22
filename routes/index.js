let express = require('express');
let router = express.Router();

let gitSpawn = require('../modules/gitSpawn');
let showFile = require('../modules/showFile');
let showCommitFiles = require('../modules/showCommitFiles');
let gitBranch = require('../modules/gitBranch');

const checkout = (req, res) => {
    let branch = req.params.branch;

    gitSpawn(['checkout', branch]).then((err) => {
        console.log(err);
    }, (result) => {
        gitBranch(res);
    });
};

router.get('/git/show/:param/*', showCommitFiles);
router.get('/git/cat/:param', showFile);
router.get('/git/:action/:branch', checkout);

router.get('/', (req, res, next) => {
    gitBranch(res);
});

module.exports = router;