const { dirname } = require('path');

const getFile = (req, res) =>{
    const appDir = dirname(require.main.filename);

    const filePath = appDir + '/images/' + req.params.fileName;
    res.sendFile(filePath)
}

module.exports = {getFile}