class SomeACG {
  static host = 'https://www.someacg.top'

  getApiListURL() {
    return [SomeACG.host, 'api/list'].join('/')
  }

  getApiDetailURL(id) {
    return [SomeACG.host, 'api/detail', id].join('/')
  }
}

const acg = new SomeACG()

console.log(acg.getApiListURL())
