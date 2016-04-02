#! /usr/bin/env coffee

esc = require './ansi-escape.js'

# console.dir esc.parse("\x1b[11;1Hx\x1b[1;32;48mo\x1b[1A")
# console.dir esc.parse("hoge")
console.dir esc.parse(" ")
