let gitSpawn = require('./gitSpawn');

const showFile = (req, res) => {
    let file = req.params.param;

    return gitSpawn(['cat-file', 'blob', file]).then((result) => {
        res.render('fileContent', {fileContent: result});
    }, (err) => {
        throw err;
    });
};

module.exports = showFile;
