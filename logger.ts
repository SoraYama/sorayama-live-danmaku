import Logger from 'log4js'

export default Logger.configure({
  appenders: {
    default: {
      type: 'console',
      layout: {
        type: 'colored',
      },
    },
  },
  categories: { default: { appenders: ['default'], level: 'info' } }
}).getLogger('index');
