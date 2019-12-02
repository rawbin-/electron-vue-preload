import internetAvailable from 'internet-available'

export function isInternet () { // 判断当前环境是否有网
  return new Promise((resolve, reject) => {
    internetAvailable({
      domainName: 'http://beike.xdf.cn',
      port: 53,
      host: '114.114.114.114' // 默认8.8.8.8，国内请改成114.114.114.114
    }).then(() => {
      resolve('ONLINE')
    }).catch(() => {
      resolve('NOTLINE')
    })
  })
}
