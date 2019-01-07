import express from 'express'
import http from 'http'
import socketIO from 'socket.io'
import logger from './logger'

const app = express()
const server = new http.Server(app)
const io = socketIO(server)

let audienceCount = 0

io.on('connection', (socket) => {
  audienceCount ++
  socket.broadcast.emit('audience', audienceCount)
  logger.info('a user connected, count:', audienceCount)
  socket.on('danmaku', (text: string) => {
    logger.info('Recieve danmaku: ', text)
    socket.broadcast.emit('danmaku', text)
  })
  socket.on('disconnect', () => {
    audienceCount --
    logger.info('a user disconnected, count: ', audienceCount)
    socket.broadcast.emit('audience', audienceCount)
  })
})

server.listen(2020, () => {
  logger.info('server listening on 2020')
})
