/**
 * 为了兼顾 renderer-preload中的加载语法问题，这里使用CommonJS的模块
 * @type {string}
 */

export let BASE_URL = '../../../static'
if (process.env.NODE_ENV !== 'development') { // 开发环境
  BASE_URL = global.__static
}

export const STATUS_OK = 'ok'
export const STATUS_ERROR = 'error'
export const APP_SOURCE_NAME = 'electron'

const API_NAMES = [
  'TEST_API',
  'GET_DOWNLOAD_URL',
  'OPEN_FILE_DIRECTORY',
  'OPEN_MY_FILE_DIRECTORY',
  'OPEN_DOWNLOAD_FILE',
  'LOGIN_MESSAGE',
  'POST_DOWNLOAD_ID',
  'CLOSE_CHILD_WINDOW',
  'COPY_IMAGE',
  'PAUSE_DOWNLOAD',
  'DELETE_DOWNLOADED_ITEM',
  'REPEAT_NAME',
  'GET_ID',
  'IS_INTERNET'
]

export const API_NAMES_MAP = API_NAMES.reduce((result, name) => {
  result[name] = name
  return result
}, {})

export const SDK_API_LIST = [
  'getDownloadUrl',
  'openDownloadFile',
  'loginMessage',
  'postDownloadId',
  'closeChilrenWin',
  'copyImage',
  'pauseDownload',
  'openFileDirectory',
  'deleteDownloadedItem'
]
