<template>
  <v-app dark>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        // {
        //   icon: 'mdi-calendar',
        //   title: 'スケジュール',
        //   to: '/',
        // },
        {
          icon: 'mdi-calendar',
          title: 'スケジュール',
          to: '/sche',
        },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'Inspire',
        //   to: '/inspire',
        // },
        {
          icon: 'mdi-calendar-account',
          title: '自分の予定一覧',
          to: '/mySches',
        },
        {
          icon: 'mdi-cog',
          title: '設定',
          to: '/settings',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'スケジュールアプリ',
    }
  },
}
</script>
