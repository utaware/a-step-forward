import axios from 'axios'

import Qs from 'qs'

import chalk from '#utils/chalk.js'

class SomeACG {
  static host = 'https://www.someacg.top'

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
}

const acg = new SomeACG()

acg.requestList()
