import fs from 'fs'
import fse from 'fs-extra'

import axios from 'axios'
import Qs from 'qs'

import chalk from '#utils/chalk.js'

import {resolve} from '#root/project.js'

import {downloadImage} from '#utils/download.js'
import {isValidArray} from '#utils/array/index.js'

class SomeACG {
  static host = 'https://www.someacg.top'
  static saveDirPath = resolve('./dist/SomeACG')

  constructor() {
    this.currentPage = 1
    this.ensureSaveImageDir()
  }

  getApiListURLWithPage(page) {
    const suffix = '/api/list' + Qs.stringify({page}, {addQueryPrefix: true})
    const url = SomeACG.host + suffix
    return url
  }

  getApiDetailURL(id) {
    return [SomeACG.host, 'api/detail', id].join('/')
  }

  getImageThumbUrl(img_thumb) {
    return ['https://cdn.someacg.top/thumbs', img_thumb].join('/')
  }

  async handleDownloadImage(item) {
    const {file_name, img_thumb} = item
    const url = this.getImageThumbUrl(img_thumb)
    await this.saveImageToDir(url, file_name)
  }

  handleDownloadAllImage(images) {
    images.forEach((item) => {
      this.handleDownloadImage(item)
    })
  }

  requestList() {
    const {currentPage} = this
    const url = this.getApiListURLWithPage(currentPage)
    axios
      .get(url)
      .then((res) => {
        const {status, data} = res
        if (status === 200) {
          const {body} = data
          if (isValidArray(body)) {
            this.handleDownloadAllImage(body)
          }
        } else {
          console.log(chalk.red('request status error'))
        }
      })
      .catch((e) => {
        console.log(chalk.red(e))
      })
  }

  ensureSaveImageDir() {
    fse.ensureDirSync(SomeACG.saveDirPath)
  }

  async saveImageToDir(url, filename) {
    const filePath = [SomeACG.saveDirPath, filename].join('/')
    const hasExisit = fs.existsSync(filePath)
    if (!hasExisit) {
      try {
        await downloadImage(url, filePath)
        console.log('success')
      } catch {
        console.log('fail')
      }
    }
  }
}

const acg = new SomeACG()

acg.requestList()
