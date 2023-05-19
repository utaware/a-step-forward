import fs from 'fs'

import request from 'request'

export function downloadImage(url, dest) {
  return request(url).pipe(fs.createWriteStream(dest))
}
