import RendererAPI from './RendererAPI'
RendererAPI()

// const rendererAPI = require('./RendererAPI')
// rendererAPI()

const nodeEnv = process.env.NODE_ENV
if (['test', 'development'].includes(nodeEnv)) {
  window.electronRequire = require

  window.statusOK = 'ok'
  window.statusError = 'error'
  window.appSource = 'electron'
  window.commonConsole = (apiName, apiAssert) => {
    window.console.log(`__APPAPI:${apiName}:${apiAssert}`)
  }
  window.apiOK = (result) => {
    return result === 'ok'
  }
  window.apiError = (result) => {
    return result === 'error'
  }

  window.getRendererAPIName = (key) => {
    if (!key) {
      throw Error('renderer: key argument is required')
    }
    return `renderer_${key}`
  }

  window.addEventListener('unhandledRejection', (reason, promise) => {
    window.console.error(`unhandledRejection:renderer-preload:${reason}`)
  })
}
