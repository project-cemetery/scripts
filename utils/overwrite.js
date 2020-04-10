const overwrite = (creator, name) => {
    const oldFile = creator(name)

    oldFile.delete()

    const newFile = creator(name)

    return newFile
}

module.exports = overwrite