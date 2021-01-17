<template>
  <v-app>
    <div id="overlay"></div>
    <v-row justify="center" align-content="center" no-gutters>
      <v-col cols="12">
        <v-card id="content" width="600px" class="mx-auto">
          <v-card-title class="headline justify-center">
            ログイン
          </v-card-title>
          <v-card-text>
            <!-- <v-form v-model="valid" @submit.prevent="toSche"> -->
            <v-form v-model="valid" @submit.prevent="loginUser">
              <v-text-field
                v-model="user.id"
                maxlength="10"
                counter
                label="ユーザーID"
                prepend-icon="mdi-account-circle"
              />
              <v-text-field
                v-model="user.password"
                maxlength="20"
                counter
                :type="showPassword ? 'text' : 'password'"
                label="パスワード"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              />
              <v-container class="pa-1">
                <v-row class="justify-center">
                  <v-card-actions>
                    <v-btn
                      class="info"
                      type="submit"
                      :loading="loading"
                      :disabled="!valid"
                      >ログイン</v-btn
                    >
                    <v-btn class="mx-2" @click="cancel">キャンセル</v-btn>
                  </v-card-actions>
                </v-row>
                <v-row class="justify-center">
                  <p class="mx-5 pt-2 mb-n2 red--text font-weight-black">
                    {{ errorMessage }}
                  </p>
                  <p>
                    {{ returnMessage }}
                  </p>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  // ヘッダーの種類記述（指定がない時はlayouts/default.vueが適応される）
  layout: 'hd_blank',

  data() {
    return {
      error: null,
      user: {
        id: '',
        password: '',
      },
      showPassword: false,
      errorMessage: null,
      returnMessage: null,
      loading: false,
      valid: true,
    }
  },
  methods: {
    toSche() {
      this.$router.push('/sche')
    },
    loginUser() {
      this.$auth.loginWith('local', {
        data: this.user,
      })
    },
    cancel() {
      this.$router.replace('/')
    },
  },
}
</script>

<style scoped>
#content {
  z-index: 10;
  background: #fff;
}

#overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
