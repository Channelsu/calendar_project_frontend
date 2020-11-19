<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <p>トップページ</p>
      <p>ログインしていない時のヘッダーを用意</p>
      <p>右上にログインボタン</p>
      <v-btn dark depressed color="blue" @click="toLogin">ログイン</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
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
