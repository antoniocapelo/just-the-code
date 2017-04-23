function buildTempFolderName(archiveName) {
    // return `.tmp.${archiveName}/`;
    return `tmp-${archiveName}/`;
}

module.exports = {
    buildTempFolderName,
};
