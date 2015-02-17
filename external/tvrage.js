var apiCall = require('./apiCall')('http://services.tvrage.com/feeds/')
var async = require('async')
var moment = require('moment')

var search = function(show, callback) {
  apiCall('search.php?show=' + show, function(err, res) {
    if (err) return callback(err)
    callback(null, res.Results.show.map(function(show) { 
      return { showid: show.showid[0], name: show.name[0].toLowerCase() }
    }))
  })
}

var showinfo = function(showid, callback) {
  apiCall('showinfo.php?sid=' + showid, function(err, res) {
    if (err) return callback(err)
    callback(null, {
      showid: res.Showinfo.showid[0],
      name: res.Showinfo.showname[0].toLowerCase(),
      network: res.Showinfo.network[0]._.slice(0,3).toLowerCase()
    })
  })
}

var episodeList = function(showid, callback) {
  apiCall('episode_list.php?sid=' + showid, function(err, res) {
    if (err) return callback(err)
    var episodes = []
    res.Show.Episodelist.forEach(function(list) {
      list.Season.forEach(function(item) {
        var s = item.$.no
        item.episode.forEach(function(e) {
          episodes.push({
            show: res.Show.name[0].toLowerCase(),
            airdate: new Date(moment(e.airdate[0]).toDate()),
            title: e.title[0].toLowerCase(),
            number: 's'+s+'e'+e.seasonnum[0]
          })
        })
      })
    })
    callback(null, episodes)
  })
}

var episodes = function(showid, callback) {
  async.parallel({
    info: showinfo.bind(null, showid),
    episodes: episodeList.bind(null, showid)
  }, function(err, show) {
    if (err) return callback(err)
    show.episodes.forEach(function(ep) {
      ep.network = show.info.network
      ep.showid = show.info.showid
    })
    callback(null, show.episodes)
  })
}

// episodeInfo: 'http://services.tvrage.com/feeds/episodeinfo.php?sid=' + showId + '&ep=' + episodeId

module.exports = {
  search: search,
  episodes: episodes
}


