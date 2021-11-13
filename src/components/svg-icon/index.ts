import { App } from 'vue'
import SsSvgIcon from './src/svg-icon'

const allRequireSvg: __WebpackModuleApi.RequireContext = require.context('./icons', false, /\.svg$/)

const requireAll = (requireContext: __WebpackModuleApi.RequireContext) => {
  console.log('加载全部svg')
  requireContext.keys().map(requireContext)
}
requireAll(allRequireSvg)

SsSvgIcon.install = (app: App) => {
  app.component(SsSvgIcon.name, SsSvgIcon)
}

export default SsSvgIcon
