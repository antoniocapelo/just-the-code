/**
 * Builds temporary folder name.
 *
 * @param {String} archiveName - temporary folder name.
 * @returns {String} Temporary folder name.
 */
function buildTempFolderName(archiveName) {
    return `tmp-${archiveName}/`;
}

module.exports = {
    buildTempFolderName,
};
