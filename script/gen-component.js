const file = require('./common/file')
const fs = require('fs')
const logger = require('./common/logger')
const tpl = require('./template/index')

logger.info('请输入名称')
process.stdin.on('data', async chunk => {
  const componentName = String(chunk).trim().toLowerCase()

  // 页面目录路径
  const componentDirectory = file.resolvePath('../src/components', componentName)
  console.log(componentDirectory)
  logger.info(`组件名称: ${componentName}`)
  if (fs.existsSync(componentDirectory)) {
    logger.error('组件已存在，请重新输入')
    return
  }
  logger.info('开始创建组件')
  const srcDirectory = file.resolvePath(componentDirectory, 'src')
  await file.createDir(srcDirectory)
  logger.info('目录创建成功')

  // 入口文件
  const indexTsFile = file.resolvePath(componentDirectory, 'index.ts')
  await file.generateFile(indexTsFile, tpl.indexTsTpl(componentName))
  logger.info('按需引入文件创建成功')

  // tsx 组件文件
  const componentTsxFile = file.resolvePath(srcDirectory, `${componentName}.tsx`)
  await file.generateFile(componentTsxFile, tpl.componentTsxTpl(componentName))
  logger.info('组件创建成功')

  // 组件库入口文件
  const indexPath = file.resolvePath('../src/components', 'index.ts')
  await file.updateIndexTs(indexPath, componentName)
  logger.info('在组件库入口引入成功')

  // scss
  const componentScssDirectory = file.resolvePath('../src/scss', 'components')
  const scssFile = file.resolvePath(componentScssDirectory, `_${componentName}.scss`)
  await file.generateFile(scssFile, tpl.scssTpl(componentName))
  logger.info('样式文件创建成功')

  // index.scss
  const indexScss = file.resolvePath('../src/scss/components', 'index.scss')
  await file.appendText(indexScss, tpl.importScssTpl(componentName))
  logger.info('样式文件引入成功')

  // 组件文档
  const docFile = file.resolvePath('../md-docs/components', `${componentName}.md`)
  await file.generateFile(docFile, tpl.docTpl(componentName))

  // 组件文档菜单
  // const docMenuFile = file.resolvePath('../packages/website/docs/', 'components-menu.ts')
  // await file.updateDocMenu(docMenuFile, componentName)

  logger.success(`组件 ${componentName} 创建成功`)
  process.stdin.emit('end')
})
process.stdin.on('end', () => {
  logger.info('exit')
  process.exit()
})
