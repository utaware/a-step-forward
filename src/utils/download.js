import fs from 'fs'

import request from 'request'

export function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    request({url, timeout: 3600 * 1000})
      .pipe(fs.createWriteStream(dest))
      .once('close', () => {
        resolve()
      })
      .once('error', (error) => {
        reject(error)
      })
  })
}
