import path from 'path'

import fse from 'fs-extra'
import axios from 'axios'
import {JSDOM} from 'jsdom'
import bytes from 'bytes'
import {consola} from 'consola'

import {rootResolve} from '#root/project.js'
import {downloadFile} from '#utils/download/index.js'

import EnhanceSet from '#root/src/utils/set/index.js'
import chalk from 'chalk'

class TTloli {
  static host = 'https://www.ttloli.com/'
  static saveDirPath = rootResolve('./dist/TTloli')

  constructor({limit = 3, sleepTime = 2000} = {}) {
    this.limit = limit
    this.count = 1
    this.sleepTime = sleepTime
    this.downloadFiles = new EnhanceSet()
    this.hasExistFiles = new EnhanceSet()
    this.ensureSaveDirPath()
    this.resolveHasExistFile()
  }

  request() {
    const {sleepTime} = this
    axios
      .get(TTloli.host)
      .then(({status, data}) => {
        if (status === 200) {
          this.getImageUrlList(data)
          setTimeout(() => {
            this.count++
            this.start()
          }, sleepTime)
        } else {
          console.log('request ttloli.com error')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  start() {
    const {count, limit} = this
    if (count > limit) {
      this.downloadAllImages()
    } else {
      this.request()
    }
  }

  getImageUrlList(html) {
    const {window} = new JSDOM(html)
    const {document} = window
    const els = document.querySelectorAll('.cb-slideshow li span')
    els.forEach((el) => {
      const {backgroundImage} = window.getComputedStyle(el)
      const url = this.getImageURLofContent(backgroundImage)
      const filename = this.getImageFileName(url)
      if (!this.hasExistFiles.has(filename)) {
        this.downloadFiles.add(url)
      }
    })
  }

  getImageURLofContent(url) {
    const reg = /url\((?<img>.*)\)/
    const result = reg.exec(url)
    return result.groups.img
  }

  getImageFileName(url) {
    const {base} = path.parse(url)
    return base
  }

  getSaveFilePath(filename) {
    return path.resolve(TTloli.saveDirPath, filename)
  }

  ensureSaveDirPath() {
    fse.ensureDirSync(TTloli.saveDirPath)
  }

  resolveHasExistFile() {
    const dir = fse.readdirSync(TTloli.saveDirPath)
    this.hasExistFiles.update(dir)
  }

  downloadAllImages = () => {
    const current = this.downloadFiles.shift()
    if (current) {
      this.saveImageToLocalDir(current, this.downloadAllImages)
    } else {
      console.log('download all')
    }
  }

  saveImageToLocalDir(url, callback) {
    const fileName = this.getImageFileName(url)
    const filePath = this.getSaveFilePath(fileName)
    downloadFile(
      {
        url,
        headers: {
          Connection: 'close',
        },
      },
      filePath,
    )
      .on('start', () => {
        consola.start(chalk.yellow(`${fileName} is starting download`))
      })
      .on('downloading', (current, total) => {
        const [c, t] = [current, total].map((v) => bytes(v))
        process.stdout.write(`${fileName} download process with ${c}/${t} \r`)
      })
      .on('end', () => {
        process.stdout.write('\n')
        consola.success(chalk.blue(`${fileName} has download success`))
        callback()
      })
      .on('error', () => {
        consola.error(chalk.red(`${fileName} has download fail`))
      })
  }
}

const loli = new TTloli()

loli.start()
