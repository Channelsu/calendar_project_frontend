<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-toolbar-title class="title">{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn outlined>管理画面</v-btn>
    </v-app-bar>
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
        {
          icon: 'mdi-calendar',
          title: 'スケジュール',
          to: '/sche',
        },
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
        {
          icon: 'mdi-account-cog',
          title: '管理画面',
          to: '/management',
        },
        {
          icon: 'mdi-logout',
          title: 'ログアウト',
          to: '/',
        },
      ],
      right: true,
      title: 'シェアスケジュール',
    }
  },
}
</script>
