<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <p>トップページ</p>
      <p>ログインしていない時のヘッダーを用意</p>
      <v-btn dark depressed color="blue" @click="toLogin">ログイン</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  // ヘッダーの種類記述（指定がない時はlayouts/default.vueが適応される）
  layout: 'hd_blank',

  data() {
    return {}
  },
  methods: {
    toLogin() {
      this.$router.push('/login')
    },
  },
}
</script>
