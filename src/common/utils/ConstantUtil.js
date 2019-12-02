export const getRendererAPIName = (key) => {
  if (!key) {
    throw Error('renderer: key argument is required')
  }
  return `renderer_${key}`
}
export const getMainAPIName = (key) => {
  if (!key) {
    throw Error('main: key argument is required')
  }
  return `main_${key}`
}
