import axios from 'axios'

import chalk from '#utils/chalk.js'

class SomeACG {
  static host = 'https://www.someacg.top'

  getApiListURL() {
    return [SomeACG.host, 'api/list'].join('/')
  }

  getApiDetailURL(id) {
    return [SomeACG.host, 'api/detail', id].join('/')
  }

  requestList(page = 0) {
    const url = this.getApiListURL()
    console.log(chalk.red(url))
    // axios.get(url, (res) => {
    //   const {status, data} = res
    //   if (status === 200) {
    //     console.log(chalk.red('12345'))
    //   }
    // })
  }
}

const acg = new SomeACG()

acg.requestList()
