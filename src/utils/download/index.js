import fs from 'fs'

import {EventEmitter} from 'node:events'

import request from 'request'

export function downloadFile(url, dest) {
  const event = new EventEmitter()
  const stream = fs.createWriteStream(dest)

  request(url)
    .on('response', (response) => {
      const total = Number(response.headers['content-length'] || 0)

      let current = 0

      event.emit('start')

      response.on('data', (data) => {
        current += data.length
        event.emit('downloading', current, total)
      })
    })
    .pipe(stream)
    .on('close', () => {
      event.emit('end')
    })
    .on('error', (error) => {
      event.emit('error', error)
    })

  return event
}
