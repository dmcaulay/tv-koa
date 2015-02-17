module.exports = {
  port: process.env.TV_PORT || 3000,
  logging: {
    level: 'info',
    levels: {
      debug: 0,
      stats: 1,
      info: 2,
      error: 3
    },
    colors: {
      stats: 'yellow'
    },
    colorize: true,
    timestamp: true
  }
}
