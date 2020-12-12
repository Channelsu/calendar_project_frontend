<template>
  <v-dialog v-model="formOpenBySche" max-width="420" @click:outside="closeForm">
    <v-form
      ref="scheForm"
      v-model="scheForm.valid"
      lazy-validation
      @submit.prevent="postForm"
    >
      <v-card>
        <v-row justify="center">
          <v-card-title class="headline">新規予定登録</v-card-title>
        </v-row>
        <v-card-text>
          <!-- タイトル入力欄 -->
          <v-text-field
            v-model="scheForm.title"
            :rules="[rules.required, rules.notOnlySpace]"
            :counter="64"
            label="タイトル"
            @keydown.enter="trigger"
          ></v-text-field>
          <!-- タイトル入力欄 ここまで -->
          <!-- 開始日入力欄  -->
          <v-menu
            v-model="scheForm.startDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="scheForm.startDate"
                label="開始日"
                append-icon="mdi-calendar"
                v-bind="attrs"
                v-on="on"
                @keydown.enter="trigger"
              >
                <template v-slot:append-outer>
                  <v-btn small @click="insToday('start')">今日</v-btn>
                  <v-btn class="ml-2" small @click="insTomorrow('start')"
                    >明日</v-btn
                  >
                </template>
              </v-text-field>
            </template>
            <v-date-picker
              v-model="scheForm.startDate"
              :max="scheForm.endDate"
              locale="jp-ja"
              :day-format="(date) => new Date(date).getDate()"
              @input="scheForm.startDateMenu = false"
            ></v-date-picker>
          </v-menu>
          <!-- 開始日入力欄 ここまで -->
          <!-- 開始時間入力欄  -->
          <v-menu
            ref="startTimeMenu"
            v-model="scheForm.startTimeMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="scheForm.startTime"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="scheForm.startTime"
                label="開始時間"
                append-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
                @keydown.enter="trigger"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="scheForm.startTimeMenu"
              v-model="scheForm.startTime"
              format="24hr"
              full-width
              @click:minute="$refs.startTimeMenu.save(scheForm.startTime)"
            ></v-time-picker>
          </v-menu>
          <!-- 開始時間入力欄 ここまで -->
          <!-- 終了日入力欄  -->
          <v-menu
            v-model="scheForm.endDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="scheForm.endDate"
                label="終了日"
                append-icon="mdi-calendar"
                v-bind="attrs"
                v-on="on"
                @keydown.enter="trigger"
              >
                <template v-slot:append-outer>
                  <v-btn small @click="insToday('end')">今日</v-btn>
                  <v-btn class="ml-2" small @click="insTomorrow('end')"
                    >明日</v-btn
                  >
                </template>
              </v-text-field>
            </template>
            <v-date-picker
              v-model="scheForm.endDate"
              :min="scheForm.startDate"
              locale="jp-ja"
              :day-format="(date) => new Date(date).getDate()"
              @input="scheForm.endDateMenu = false"
            ></v-date-picker>
          </v-menu>
          <!-- 終了日入力欄 ここまで -->
          <!-- 終了時間入力欄  -->
          <v-menu
            ref="endTimeMenu"
            v-model="scheForm.endTimeMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="scheForm.endTime"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="scheForm.endTime"
                label="終了時間"
                append-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
                @keydown.enter="trigger"
              >
              </v-text-field>
            </template>
            <v-time-picker
              v-if="scheForm.endTimeMenu"
              v-model="scheForm.endTime"
              format="24hr"
              full-width
              @click:minute="$refs.endTimeMenu.save(scheForm.endTime)"
            ></v-time-picker>
          </v-menu>
          <!-- 終了時間入力欄 ここまで -->
          <!-- スケジュールバーの色 -->
          <v-select
            v-model="scheForm.barColor"
            :items="colors"
            item-text="label"
            item-value="val"
            label="バーの色"
          >
          </v-select>
          <!-- スケジュールバーの色 ここまで -->
          <!-- 備考入力欄 -->
          <v-textarea
            v-model="scheForm.remark"
            :rules="[rules.notOnlySpace]"
            auto-grow
            label="備考"
            rows="4"
          ></v-textarea>
          <!-- 備考入力欄 ここまで -->
        </v-card-text>
        <v-card-actions>
          <v-row justify="center" class="mb-5">
            <v-btn
              class="mr-2"
              color="blue"
              type="submit"
              dark
              @click="valiForm"
            >
              登録
            </v-btn>
            <v-btn class="ml-2" color="error" dark @click="closeForm">
              閉じる
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import rules from '@/mixins/rules.js'

export default {
  props: { formOpenBySche: Boolean },

  mixins: [rules],

  data() {
    return {
      scheForm: {
        valid: true,
        title: '',
        startDateMenu: false,
        startDate: '',
        startTimeMenu: false,
        startTime: '',
        endDateMenu: false,
        endDate: '',
        endTimeMenu: false,
        endTime: '',
        barColor: '',
        remark: '',
      },
      colors: [
        { label: '赤', val: 'red' },
        { label: '青', val: 'blue' },
        { label: '緑', val: 'green' },
        { label: '紫', val: 'purple' },
        { label: 'ピンク', val: 'pink' },
      ],
    }
  },
  computed: {
    // formOpen() {
    //   return this.formOpenBySche
    // },
  },
  methods: {
    trigger: (e) => {
      // 日本語入力中のEnterキー操作は無効にする
      if (e.keyCode === 13) {
        e.preventDefault()
      }
    },
    insToday(typeOfVar) {
      const today = new Date().toISOString().substr(0, 10)
      typeOfVar === 'start'
        ? (this.scheForm.startDate = today)
        : (this.scheForm.endDate = today)
    },
    insTomorrow(typeOfVar) {
      const today = new Date()
      // 本日の日付に一日加える
      today.setDate(today.getDate() + 1)
      const tomorrow = today.toISOString().substr(0, 10)
      typeOfVar === 'start'
        ? (this.scheForm.startDate = tomorrow)
        : (this.scheForm.endDate = tomorrow)
    },
    valiForm() {
      alert('バリデーション実行')
    },

    // 予定ポスト処理
    async postForm() {
      const postObj = {
        title: this.scheForm.title,
        startDate: this.scheForm.startDate,
        startTime: this.scheForm.startTime,
        endDate: this.scheForm.endDate,
        endTime: this.scheForm.endTime,
        barColor: this.scheForm.barColor,
        remark: this.scheForm.remark,
      }
      const response = await this.$axios
        .$post('/testpost', postObj)
        .then((response) => {
          console.log('response data', response.object)
          alert('予定を追加しました')
          this.$refs.scheForm.reset()
          this.$emit('init')
          this.$emit('closeForm')
        })
        .catch((error) => {
          console.log('response error', error)
        })
      console.log('response→', response)
    },

    // フォームを閉じる処理
    closeForm() {
      this.$emit('closeForm')
    },
  },
}
</script>
