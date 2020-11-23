<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <p>設定画面</p>
      <p>名前変更、パスワード変更等の変更が可能</p>
      <p>data-tableかsimple-tableかcardを使用</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  // ヘッダーの種類記述（指定がない時はlayouts/default.vueが適応される）
  layout: 'hd_general',

  data() {
    return {}
  },
  methods: {},
}
</script>
