const path = require('path')
const fs = require('fs')

class StorageService {
  constructor () {
    const folder = '/uploads'
    this._folder = path.resolve(__dirname, `../../../${folder}`)
    this._baseUrl = folder
  }

  writeFile (file, meta, subFolder = '/images') {
    const targetFolder = this._folder + subFolder
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true })
    }

    const filename = +new Date() + meta.filename
    const fullpath = `${targetFolder}/${filename}`

    const fileStream = fs.createWriteStream(fullpath)

    return new Promise((resolve, reject) => {
      fileStream.on('error', (error) => reject(error))
      file.pipe(fileStream)
      file.on('end', () => resolve(this.getFileUrl(`${subFolder}/${filename}`)))
    })
  }

  getFileUrl (file) {
    const targetFile = (file[0] === '/') ? file.substring(1, file.length - 1) : `/${file}`
    return `http://${process.env.HOST}:${process.env.PORT}${this._baseUrl}/${targetFile}`
  }
}

module.exports = StorageService
