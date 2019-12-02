import path from 'path'

export function getAppCacheDir () {
  const homedir = require('os').homedir()
  let result
  if (process.platform === 'win32') {
    result = process.env.LOCALAPPDATA || path.join(homedir, 'AppData', 'Local')
  } else if (process.platform === 'darwin') {
    result = path.join(homedir, 'Library', 'Application Support', 'Caches')
  } else {
    result = process.env.XDG_CACHE_HOME || path.join(homedir, '.cache')
  }
  return result
}
