<template>
  <v-app>
    <v-row justify="center" align-content="center" no-gutters>
      <v-col cols="12">
        <div class="text-center">
          <p>トップページ</p>
          <p>シェアスケジュール</p>
          <v-btn dark depressed color="blue" @click="toLogin">ログイン</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-app>
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
