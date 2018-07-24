const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

module.exports.getTouchMoveDirection = (eStart, eEnd, minDeviation = 5) => {
  const { changedTouches: startTouches} = eStart;
  const { changedTouches: endTouches } = eEnd;
  const xDeviation = endTouches[0].clientX - startTouches[0].clientX;
  const yDeviation = endTouches[0].clientY - startTouches[0].clientY;

  if (Math.abs(xDeviation) < minDeviation && Math.abs(yDeviation) < minDeviation ){
    return null;
  }
  
  if (Math.abs(xDeviation) >= Math.abs(yDeviation)){
    return xDeviation > 0 ? 'right' : 'left';
  }else{
    return yDeviation > 0 ? 'down' : 'up';
  }
}

