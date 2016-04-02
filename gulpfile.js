'use strict'

const gulp = require('gulp')
const shell = require('gulp-shell')
const packager = require('electron-packager')
const childProcess = require('child_process')
const conf = require('./package.json')
const fs = require('fs')
const Zip = require('node-7z')

const git_hash = childProcess.execSync('git rev-parse HEAD').toString().trim()

const iconColor = '#ff8080'

gulp.task('update:icon', [], shell.task([
    'mkdir -p build/tmp build/tmp/app.iconset/',
    `curl ls8h.com/yosemite-icon/api -F "icon_image=@src/icon.png" -F "base_color=${iconColor}" > build/tmp/icon.png`,
    'sips -Z 16 build/tmp/icon.png --out build/tmp/app.iconset/icon_16x16.png',
    'sips -Z 32 build/tmp/icon.png --out build/tmp/app.iconset/icon_16x16@2x.png',
    'sips -Z 32 build/tmp/icon.png --out build/tmp/app.iconset/icon_32x32.png',
    'sips -Z 64 build/tmp/icon.png --out build/tmp/app.iconset/icon_32x32@2x.png',
    'sips -Z 128 build/tmp/icon.png --out build/tmp/app.iconset/icon_128x128.png',
    'sips -Z 256 build/tmp/icon.png --out build/tmp/app.iconset/icon_128x128@2x.png',
    'sips -Z 256 build/tmp/icon.png --out build/tmp/app.iconset/icon_256x256.png',
    'sips -Z 512 build/tmp/icon.png --out build/tmp/app.iconset/icon_256x256@2x.png',
    'sips -Z 512 build/tmp/icon.png --out build/tmp/app.iconset/icon_512x512.png',
    'sips -Z 1024 build/tmp/icon.png --out build/tmp/app.iconset/icon_512x512@2x.png',
    '(cd build && iconutil -c icns tmp/app.iconset && mv tmp/app.icns ../src/)',
    '(cd build && convert tmp/icon.png -define icon:auto-resize ../src/app.ico)',
    'sips -Z 18 src/icon.png --out src/browser/tray-icon.png'
]))

gulp.task('build:webpack', shell.task([
    'webpack --progress --colors'
]))

gulp.task('build', ['build:webpack'])

gulp.task('release:osx', ['build'], (done) => {
    let packagerConf = {
        dir: 'build',
        out: 'release/',
        name: conf.name,
        arch: 'x64',
        asar: true,
        platform: 'darwin',
        version: conf.dependencies['electron-prebuilt'],
        icon: 'build/tmp/app.icns',
        ignore: ['tmp'],
        overwrite: true
    }

    if (process.env.ELECTRON_SIGN) {
        packagerConf['sign'] = process.env.ELECTRON_SIGN
    }

    packager(packagerConf, (err, path) => {
        let archive = new Zip()
        archive.add(`release/${conf.name}-darwin-${conf.version}.7z`, `release/${conf.name}-darwin-x64/`, {
            m0: '=BCJ',
            m1: '=LZMA:d=21'
        }).then(() => {

        })
    })
})

gulp.task('release:win', ['build'], (done) => {
    let packagerConf = {
        dir: 'build',
        out: 'release/',
        name: conf.name,
        arch: ['ia32', 'x64'],
        asar: true,
        platform: 'win32',
        version: conf.dependencies['electron-prebuilt'],
        icon: 'build/tmp/app.ico',
        ignore: ['tmp'],
        overwrite: true
    }

    if (process.env.ELECTRON_SIGN) {
        packagerConf['sign'] = process.env.ELECTRON_SIGN
    }

    packager(packagerConf, (err, pathes) => {
        pathes.forEach((path) => {
            const a = path.split('-')
            const platform = a[1]
            const arch = a[2]

            let archive = new Zip()
            archive.add(`release/${conf.name}-${platform}-${arch}-${conf.version}.7z`, path, {
                m0: '=BCJ',
                m1: '=LZMA:d=21'
            }).then(() => {

            })

        })

    })
})

gulp.task('release', ['release:osx', 'release:win'])

gulp.task('serve', ['build'], () => {
    const electron = require('electron-connect').server.create({
        path: 'build/',
        spawnOpt: {
            env: {
                GIT_HASH: git_hash,
                ROOT: __dirname,
                NAME: conf.name,
                VERSION: conf.version
            }
        }
    })
    electron.start()
        // gulp.watch('src/browser/*', ['build:webpack', electron.restart])
    gulp.watch('src/renderer/**', ['build:webpack', electron.reload])
    electron.on('quit', () => {
            process.exit(0)
        })
        // electron.on('changeBounds', (arg) => console.dir(arg))
})

gulp.task('default', ['serve'])
