import express from 'express'
import http from 'http'
import socketIO from 'socket.io'

const app = express()
const server = new http.Server(app)
const io = socketIO(server)

let audienceCount = 0

io.on('connection', (socket) => {
  audienceCount ++
  socket.broadcast.emit('audience', audienceCount)
  console.log('a user connected, audience: ', audienceCount)
  socket.on('danmaku', (text: string) => {
    socket.broadcast.emit('danmaku', text)
  })
  socket.on('disconnect', () => {
    audienceCount --
    socket.broadcast.emit('audience', audienceCount)
  })
})

server.listen(2020, () => {
  console.log('server listening on 2020')
})
