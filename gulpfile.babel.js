import gulp from 'gulp'

import { clean } from './tasks/clean'
import { server } from './tasks/server'
import { markup, markupWatcher } from './tasks/markup'
import { styles, stylesWatcher } from './tasks/styles'
import { scripts, scriptsWatcher } from './tasks/scripts'
import { images, imagesWatcher, svgImages, svgImagesWatcher } from './tasks/images'
import { sprites, spritesWatcher } from './tasks/sprites'
import { publicTask, publicWatcher } from './tasks/public'

global.watch = false
global.changedFile = {
  markup: undefined,
  styles: undefined
}

const emittyInit = (callback) => {
  global.watch = true

  callback()
}

export const build = gulp.series(
  clean,
  gulp.parallel(
    markup,
    styles,
    scripts,
    images,
    svgImages,
    sprites,
    publicTask
  )
)

export const watch = gulp.series(
  emittyInit,
  build,
  server,
  gulp.parallel(
    markupWatcher,
    stylesWatcher,
    scriptsWatcher,
    imagesWatcher,
    svgImagesWatcher,
    spritesWatcher,
    publicWatcher
  )
)
