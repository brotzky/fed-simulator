import path from 'path'

function resolveApp(relativePath) {
  return path.resolve(relativePath)
}

module.exports = {
  appBuild: resolveApp('build'),
  appImgs: resolveApp('src/imgs'),
  appPublic: resolveApp('src/public'),
  appHtml: resolveApp('src/public/index.html'),
  appSprites: resolveApp('src/imgs/sprites'),
  appStylesheets: resolveApp('src/stylesheets'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appNodeModules: resolveApp('node_modules'),
  ownNodeModules: resolveApp('node_modules'),
}
