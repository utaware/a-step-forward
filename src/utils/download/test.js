import path from 'path'

import bytes from 'bytes'

import {downloadFile} from './index.js'

const imageUrl = 'https://cdn2.ttloli.com/pic2/A8FE4FEC.jpg'

const {base} = path.parse(imageUrl)

const imagePath = `./${base}`

downloadFile(imageUrl, imagePath)
  .on('start', () => {
    console.log('download start')
  })
  .on('downloading', (current, total) => {
    process.stdout.write(`download process ${bytes(current)}/${bytes(total)} \r`)
  })
  .on('end', () => {
    process.stdout.clearLine()
    console.log('download end')
  })
