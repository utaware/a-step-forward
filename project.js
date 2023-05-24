import path from 'path'

import url from 'url'

export const metaPath = import.meta.url

export const filePath = url.fileURLToPath(metaPath)

export const rootPath = path.dirname(filePath)

export function rootResolve(args) {
  return path.resolve(rootPath, args)
}
