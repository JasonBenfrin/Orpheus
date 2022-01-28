module.exports = {
  convert(time) {
    let timeHHMMSS;
    const hours = Math.floor(time/3600)
    var mins = Math.floor((time - (hours * 3600)) / 60)
    var secs = time - (hours * 3600) - (mins * 60)

    if(secs<10) secs = `0${secs}`
    if(mins<10) mins = `0${mins}`
    if(hours>0){
      timeHHMMSS = `${hours}:${mins}:${secs}`
    }else{
      timeHHMMSS = `${mins}:${secs}`        
    }
    return timeHHMMSS
  }
}