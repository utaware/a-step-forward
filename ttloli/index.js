import path from 'path'

import fse from 'fs-extra'
import axios from 'axios'
import {JSDOM} from 'jsdom'

import {rootResolve} from '#root/project.js'
import {downloadImage} from '#utils/download.js'

class TTloli {
  static host = 'https://www.ttloli.com/'
  static saveDirPath = rootResolve('./dist/TTloli')

  constructor({limit = 3, sleepTime = 2000} = {}) {
    this.limit = limit
    this.count = 1
    this.sleepTime = sleepTime
    this.lib = new Set()
    this.ensureSaveDirPath()
  }

  request() {
    const {sleepTime} = this
    axios
      .get(TTloli.host)
      .then(({status, data}) => {
        if (status === 200) {
          this.getImageContent(data)
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
      console.log(this.lib)
    } else {
      this.request()
    }
  }

  getImageContent(html) {
    const {window} = new JSDOM(html)
    const {document} = window
    const els = document.querySelectorAll('.cb-slideshow li span')
    const images = Array.from(els, (el) => {
      const {backgroundImage} = window.getComputedStyle(el)
      const url = this.getImageURL(backgroundImage)
      this.lib.add(url)
      return url
    })
  }

  getImageURL(url) {
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
    fse.ensureDir(TTloli.saveDirPath)
  }

  downloadAllImages(images) {
    images.forEach((url) => {
      this.saveImageToLocalDir(url)
    })
  }

  saveImageToLocalDir(url) {
    const fileName = this.getImageFileName(url)
    const filePath = this.getSaveFilePath(fileName)
    downloadImage(url, filePath)
      .then(() => {
        console.log(`${fileName} save succcess`)
      })
      .catch(() => {
        console.log(`${fileName} save fail`)
      })
  }
}

const loli = new TTloli()

loli.start()
