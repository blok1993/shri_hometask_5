let express = require('express');
let router = express.Router();

let checkout = require('../modules/gitCheckout');
let showFile = require('../modules/showFile');
let showCommitFiles = require('../modules/showCommitFiles');
let gitBranch = require('../modules/gitBranch');

router.get('/git/show/:param/*', showCommitFiles);
router.get('/git/cat/:param', showFile);
router.get('/git/:action/:branch', checkout);

router.get('/', (req, res) => {
    gitBranch(res);
});

module.exports = router;
