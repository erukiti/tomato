// Copyright 2016 SASAKI, Shunsuke. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const app = require('electron').app
const BrowserWindow = require('electron').BrowserWindow

let client
try {
    client = require('electron-connect').client
} catch (error) {
    client = null
}


app.on('window-all-closed', () => {
    app.quit
})

let win = null

app.on('ready', () => {
    win = new BrowserWindow({
        width: 400,
        height: 200
    })
    win.loadURL(`file://${__dirname}/../renderer/index.html`)
    win.on('closed', () => {
        win = null
    })
    if (client) {
        client.create(win)
    }
})
