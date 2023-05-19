import fs from 'fs'
import fse from 'fs-extra'

import axios from 'axios'

import Qs from 'qs'

import chalk from '#utils/chalk.js'

import {downloadImage} from '#utils/download.js'

import {resolve} from '#root/project.js'

class SomeACG {
  static host = 'https://www.someacg.top'
  static saveDir = resolve('./dist/SomeACG')

  constructor() {
    this.currentPage = 1
  }

  getApiListURLWithPage(page) {
    const suffix = '/api/list' + Qs.stringify({page}, {addQueryPrefix: true})
    const url = SomeACG.host + suffix
    return url
  }

  getApiDetailURL(id) {
    return [SomeACG.host, 'api/detail', id].join('/')
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
        }
      })
      .catch((e) => {
        console.log(chalk.red(e))
      })
  }

  saveImage(path, filename) {
    const filePath = [SomeACG.saveDir, filename].join('/')
    fse.ensureDirSync(SomeACG.saveDir)
    const hasExisit = fs.existsSync(filePath)
    if (!hasExisit) {
      downloadImage(path, filePath)
        .on('finish', () => {
          console.log(`${filename} save success`)
        })
        .on('error', () => {
          console.log(chalk.red(`${filename} save fail`))
        })
    }
  }
}

const acg = new SomeACG()
