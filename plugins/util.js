import Vue from 'vue'

// 日付の値からハイフンがあれば削除。なければ挿入する。
// 例1：'2020-12-15' ⇒ '20201215' 例2：'20201230' ⇒ '2020-12-30'
Vue.prototype.$fmtDate = (date) => {
  return date.includes('-')
    ? date.replace(/-/g, '')
    : `${date.substr(0, 4)}-${date.substr(4, 2)}-${date.substr(6, 2)}`
}

// 時間の値からコロンがあれば削除。なければ挿入する。
// 例1：'13:15' ⇒ '1315' 例2：'1315' ⇒ '13:15'
Vue.prototype.$fmtTime = (time) => {
  return time.includes(':')
    ? time.replace(/:/g, '')
    : `${time.substr(0, 2)}:${time.substr(2, 2)}`
}

// フォーム入力の際、エンターキーで送信されるのを防ぐ
Vue.prototype.$blockEnterKey = (event) => {
  if (event.keyCode === 13) {
    event.preventDefault()
  }
}
