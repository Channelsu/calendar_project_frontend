<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <p>ログインページ</p>
      <p>ログインボタンを押すとスケジュールに遷移</p>
      <v-btn dark depressed color="blue" @click="toSche">ログイン</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    toSche() {
      this.$router.push('/sche')
    },
  },
}
</script>
