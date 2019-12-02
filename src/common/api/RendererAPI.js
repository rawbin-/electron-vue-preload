/**
 * 在渲染进程中调用本模块
 */
import {getRendererAPIName, getMainAPIName} from '../utils/ConstantUtil'
// const constantUtil = require('../utils/ConstantUtil')
// const getRendererAPIName = constantUtil.getRendererAPIName
// const getMainAPIName = constantUtil.getMainAPIName

import {API_NAMES_MAP} from '../constant'
// const API_NAMES_MAP = require('../constant').API_NAMES_MAP

import {ipcRenderer} from 'electron'
// const ipcRenderer = require('electron').ipcRenderer

// const rendererConsole = (apiName, ...params) => {
//   console.log(`rendererAPI ${apiName} request:`, ...params)
// }

const rendererResponseConsole = (apiName, ...params) => {
  console.log(`rendererAPI ${apiName} response:`, ...params)
}

const sendToMain = (mainKey, rendererKey, data) => {
  console.log(mainKey, rendererKey, data, '看看这几个是啥啊')
  if (typeof mainKey !== 'string') {
    throw Error('the mainKey argument is required')
  } else if (typeof rendererKey !== 'string') {
    throw Error('the rendererKey argument is required')
  }
  ipcRenderer.send(getMainAPIName(mainKey), rendererKey, data)
}

const getUniqueKey = (() => {
  let apiCounter = 0
  return (apiKey) => {
    if (apiCounter >= Number.MAX_SAFE_INTEGER) {
      apiCounter = 0
    }
    return `${apiKey}-${apiCounter++}`
  }
})()

const isInternet = getMainAPIName(API_NAMES_MAP.IS_INTERNET)
const testAPI = getRendererAPIName(API_NAMES_MAP.TEST_API)
const getDownloadUrl = getRendererAPIName(API_NAMES_MAP.GET_DOWNLOAD_URL)
const openFileDirectory = getRendererAPIName(API_NAMES_MAP.OPEN_FILE_DIRECTORY)
const openMyFileDirectory = getRendererAPIName(API_NAMES_MAP.OPEN_MY_FILE_DIRECTORY)
const openDownloadFile = getRendererAPIName(API_NAMES_MAP.OPEN_DOWNLOAD_FILE)
const loginMessage = getRendererAPIName(API_NAMES_MAP.LOGIN_MESSAGE)
const postDownloadId = getRendererAPIName(API_NAMES_MAP.POST_DOWNLOAD_ID)
const closeChildrenWin = getRendererAPIName(API_NAMES_MAP.CLOSE_CHILD_WINDOW)
const copyImage = getRendererAPIName(API_NAMES_MAP.COPY_IMAGE)
const pauseDownload = getRendererAPIName(API_NAMES_MAP.PAUSE_DOWNLOAD)
const deleteDownloadedItem = getRendererAPIName(API_NAMES_MAP.DELETE_DOWNLOADED_ITEM)

ipcRenderer.setMaxListeners(0)
const rendererAPIConfig = {
  [isInternet]: () => {
    let isInternetKey = getUniqueKey(isInternet)
    return new Promise((resolve, reject) => {
      ipcRenderer.once(isInternetKey, (event, data) => {
        rendererResponseConsole(isInternetKey, data)
        resolve(data)
      })
      sendToMain(API_NAMES_MAP.IS_INTERNET, isInternetKey, '判断有没有网络的方法')
    }).catch(error => {
      console.log(`${isInternetKey}`, error)
    }).catch(error => console.log(error))
  },
  [testAPI]: () => {
    let testAPIKey = getUniqueKey(testAPI)
    return new Promise((resolve, reject) => {
      ipcRenderer.once(testAPIKey, (event, data) => {
        rendererResponseConsole(testAPIKey, data)
        resolve(data)
      })
      sendToMain(API_NAMES_MAP.TEST_API, testAPIKey, 'rendererToMain')
    }).catch(error => {
      console.log(`${testAPIKey}`, error)
    }).catch(error => console.log(error))
  },
  [getDownloadUrl]: (data) => {
    let getDownloadUrlKey = getUniqueKey(getDownloadUrl)
    return new Promise((resolve, reject) => {
      ipcRenderer.once(getDownloadUrlKey, (event, data) => {
        rendererResponseConsole(getDownloadUrlKey, data)
        resolve(data)
      })
      sendToMain(API_NAMES_MAP.OPEN_FILE_DIRECTORY, getDownloadUrlKey, data || {})
    }).catch(error => console.log(error))
  },
  [openDownloadFile]: () => {
    let openDownloadFileKey = getUniqueKey(openDownloadFile)
    return new Promise((resolve, reject) => {
      ipcRenderer.once(openDownloadFileKey, (event, data) => {
        rendererResponseConsole(openDownloadFileKey, data)
        resolve(data)
      })
      sendToMain(API_NAMES_MAP.OPEN_MY_FILE_DIRECTORY, openDownloadFileKey)
    })
  },
  [loginMessage]: (data) => {
    let loginMessageKey = getUniqueKey(loginMessage)
    return new Promise((resolve, reject) => {
      ipcRenderer.once(loginMessageKey, (event, data) => {
        rendererResponseConsole(loginMessageKey, data)
        resolve(data)
      })
      sendToMain(API_NAMES_MAP.LOGIN_MESSAGE, loginMessageKey, data)
    })
  },
  [postDownloadId]: (data) => {
    let postDownloadIdKey = getUniqueKey(postDownloadId)
    return new Promise((resolve, reject) => {
      ipcRenderer.once(postDownloadIdKey, (event, data) => {
        rendererResponseConsole(postDownloadIdKey, data)
        resolve(data)
      })
      sendToMain(API_NAMES_MAP.POST_DOWNLOAD_ID, postDownloadIdKey)
    })
  },
  [closeChildrenWin]: () => {
    let closeChildrenWinKey = getUniqueKey(closeChildrenWin)
    return new Promise((resolve, reject) => {
      ipcRenderer.once(closeChildrenWinKey, (event, data) => {
        rendererResponseConsole(closeChildrenWinKey, data)
        resolve(data)
      })

      sendToMain(API_NAMES_MAP.CLOSE_CHILD_WINDOW, closeChildrenWinKey)
    })
  },
  [copyImage]: (params) => {
    let copyImageKey = getUniqueKey(copyImage)
    return new Promise((resolve, reject) => {
      ipcRenderer.once(copyImageKey, (event, data) => {
        rendererResponseConsole(copyImageKey, data)
        resolve(data)
      })

      sendToMain(API_NAMES_MAP.COPY_IMAGE, copyImageKey, {
        imageDataURL: params
      })
    })
  },
  [pauseDownload]: (params) => {
    let pauseDownloadKey = getUniqueKey(pauseDownload)
    return new Promise((resolve, reject) => {
      ipcRenderer.once(pauseDownloadKey, (event, data) => {
        rendererResponseConsole(pauseDownloadKey, data)
        resolve(data)
      })
      sendToMain(API_NAMES_MAP.PAUSE_DOWNLOAD, pauseDownloadKey, params)
    })
  },
  [openFileDirectory]: (data) => {
    let openFileDirectoryKey = getUniqueKey(openFileDirectory)
    // 与getDownlodUrl接口相同，这个有data参数，getDownloadUrl没参数
    return new Promise((resolve, reject) => {
      if (!data || !data.contain) {
        data = {
          contain: ''
        }
      }
      ipcRenderer.once(openFileDirectoryKey, (event, data) => {
        rendererResponseConsole(openFileDirectoryKey, data)
        resolve(data)
      })
      sendToMain(API_NAMES_MAP.OPEN_FILE_DIRECTORY, openFileDirectoryKey, data || {})
    })
  },
  [deleteDownloadedItem]: (downloadId) => {
    let deleteDownloadedItemKey = getUniqueKey(deleteDownloadedItem)
    return new Promise((resolve, reject) => {
      ipcRenderer.once(deleteDownloadedItemKey, (event, data) => {
        rendererResponseConsole(deleteDownloadedItemKey, data)
        resolve(data)
      })
      sendToMain(API_NAMES_MAP.DELETE_DOWNLOADED_ITEM, deleteDownloadedItemKey, {
        downloadId
      })
    })
  },
  [openMyFileDirectory]: () => {
    let openMyFileDirectoryKey = getUniqueKey(openMyFileDirectory)
    return new Promise((resolve, reject) => {
      ipcRenderer.once(openMyFileDirectoryKey, (event, data) => {
        rendererResponseConsole(openMyFileDirectoryKey, data)
        resolve(data)
      })
      sendToMain(API_NAMES_MAP.OPEN_MY_FILE_DIRECTORY, openMyFileDirectoryKey)
    })
  }
}

export default () => {
  window.rendererTestAPI = rendererAPIConfig[testAPI]
  window.getDownloadUrl = rendererAPIConfig[getDownloadUrl]
  window.openDownloadFile = rendererAPIConfig[openDownloadFile]
  window.loginMessage = rendererAPIConfig[loginMessage]
  window.postDownloadId = rendererAPIConfig[postDownloadId]
  window.closeChildrenWin = rendererAPIConfig[closeChildrenWin]
  window.copyImage = rendererAPIConfig[copyImage]
  window.pauseDownload = rendererAPIConfig[pauseDownload]
  window.openFileDirectory = rendererAPIConfig[openFileDirectory]
  window.deleteDownloadedItem = rendererAPIConfig[deleteDownloadedItem]
  window.openMyFileDirectory = rendererAPIConfig[openMyFileDirectory]
  window.isInternet = rendererAPIConfig[isInternet]
}
