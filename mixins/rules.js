const rules = {
  // ←vはstring型
  required: (v) => !!v || '※必須入力です',

  notOnlySpace: (v) => {
    if (v === '') {
      return true
    } else {
      return /\S/g.test(v) || '※スペースのみを登録する事は出来ません'
    }
  },
}

export default {
  data() {
    return {
      rules,
    }
  },
}
