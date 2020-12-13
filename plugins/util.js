import Vue from 'vue'

// 時間の値からコロンがあれば削除。なければ挿入する。
// 例1：'13:15' ⇒ '1315' 例2：'1315' ⇒ '13:15'
Vue.prototype.$fmtTime = (time) => {
  return time.includes(':')
    ? time.replace(/:/g, '')
    : `${time.substr(0, 2)}:${time.substr(2, 2)}`
}
