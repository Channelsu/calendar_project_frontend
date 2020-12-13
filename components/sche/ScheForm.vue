<template>
  <v-dialog
    v-model="formOpenBySche"
    max-width="420"
    @click:outside="closeForm()"
  >
    <v-form
      ref="scheForm"
      v-model="scheForm.valid"
      lazy-validation
      @submit.prevent="postForm()"
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
                :rules="[rules.required]"
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
                :rules="[rules.required]"
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
                :rules="[rules.required]"
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
                :rules="[rules.required]"
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
            :rules="[rules.required]"
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
              color="blue white--text"
              type="submit"
              :disabled="!scheForm.valid"
              @click="valiForm()"
            >
              登録
            </v-btn>
            <v-btn class="ml-2" color="error white--text" @click="closeForm()">
              閉じる
            </v-btn>
            <!-- フォーム入力エラーメッセージ -->
            <div class="text-center">
              <span
                v-show="!scheForm.valid"
                class="red--text subtitle-1 font-weight-bold"
                >※入力に不備があるので確認して下さい</span
              >
            </div>
            <!-- フォーム入力エラーメッセージ ここまで -->
            {{ scheForm }}
          </v-row>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import rules from '@/mixins/rules.js'

export default {
  mixins: [rules],

  props: { formOpenBySche: Boolean },

  data() {
    return {
      scheForm: {
        // フォームの項目に不備がないかの有効性を判断
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
    // 日本語入力中のEnterキー操作は無効にする
    trigger: (e) => {
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

    // 登録ボタン押下時のバリデーション処理
    valiForm() {
      this.$refs.scheForm.validate()
    },

    // 予定ポスト処理
    async postForm() {
      // 日付の値を整形
      const fmtedStartDate = this.$fmtDate(this.scheForm.startDate)
      const fmtedEndDate = this.$fmtDate(this.scheForm.endDate)
      // 時間の値を整形
      const fmtedStartTime = this.$fmtTime(this.scheForm.startTime)
      const fmtedEndTime = this.$fmtTime(this.scheForm.endTime)
      // ポストするオブジェクトの作成
      const postObj = {
        title: this.scheForm.title,
        startDate: fmtedStartDate,
        startTime: fmtedStartTime,
        endDate: fmtedEndDate,
        endTime: fmtedEndTime,
        barColor: this.scheForm.barColor,
        remark: this.scheForm.remark,
      }
      const response = await this.$axios
        .$post('/ins', postObj)
        .then((response) => {
          console.log('response data', response.object)
          alert('予定を追加しました')
          this.$refs.scheForm.reset()
          this.$emit('init')
          this.closeForm()
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
