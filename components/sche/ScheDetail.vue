<template>
  <v-dialog
    v-model="scheDetailOpen"
    max-width="420"
    @click:outside="changeRefMode(), closeDetail()"
  >
    <v-form
      ref="scheDetailForm"
      v-model="scheDetailForm.valid"
      lazy-validation
      @submit.prevent="postForm()"
    >
      <v-card>
        <v-toolbar :color="selectedEvent.barColor" dark>
          <v-tooltip open-delay="1000" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" icon v-on="on" @click="changeMode">
                <v-icon>{{ icon }}</v-icon>
              </v-btn>
            </template>
            <span>{{ editTooltipText }}</span>
          </v-tooltip>
          <v-spacer></v-spacer>
          <v-toolbar-title class="font-weight-bold">
            {{ title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip open-delay="1000" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                :disabled="editMode"
                v-on="on"
                @click="deleteSche()"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>削除</span>
          </v-tooltip>
        </v-toolbar>
        <v-container class="py-0">
          <v-card-text class="pb-0">
            <!-- タイトル入力欄 -->
            <v-text-field
              v-model="scheDetailForm.title"
              :rules="[rules.required, rules.notOnlySpace]"
              :counter="64"
              label="タイトル"
              :readonly="settings.readonly"
              @keydown.enter="$blockEnterKey($event)"
            ></v-text-field>
            <!-- タイトル入力欄 ここまで -->
            <!-- 開始日入力欄  -->
            <v-menu
              v-model="scheDetailForm.startDateMenu"
              :disabled="!editMode"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="scheDetailForm.startDate"
                  :rules="[rules.required]"
                  label="開始日"
                  append-icon="mdi-calendar"
                  v-bind="attrs"
                  :readonly="settings.readonly"
                  v-on="on"
                  @keydown.enter="$blockEnterKey($event)"
                >
                  <template v-if="editMode" v-slot:append-outer>
                    <v-btn small @click="insToday('start')">今日</v-btn>
                    <v-btn class="ml-2" small @click="insTomorrow('start')">
                      明日
                    </v-btn>
                  </template>
                </v-text-field>
              </template>
              <v-date-picker
                v-model="scheDetailForm.startDate"
                :max="scheDetailForm.endDate"
                locale="jp-ja"
                :day-format="(date) => new Date(date).getDate()"
                @input="scheDetailForm.startDateMenu = false"
              ></v-date-picker>
            </v-menu>
            <!-- 開始日入力欄 ここまで -->
            <!-- 開始時間入力欄  -->
            <v-menu
              ref="startTimeMenu"
              v-model="scheDetailForm.startTimeMenu"
              :disabled="!editMode"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="scheDetailForm.startTime"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="scheDetailForm.startTime"
                  :rules="[rules.required]"
                  label="開始時間"
                  append-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  @keydown.enter="$blockEnterKey($event)"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="scheDetailForm.startTimeMenu"
                v-model="scheDetailForm.startTime"
                format="24hr"
                full-width
                @click:minute="
                  $refs.startTimeMenu.save(scheDetailForm.startTime)
                "
              ></v-time-picker>
            </v-menu>
            <!-- 開始時間入力欄 ここまで -->
            <!-- 終了日入力欄  -->
            <v-menu
              v-model="scheDetailForm.endDateMenu"
              :disabled="!editMode"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="scheDetailForm.endDate"
                  :rules="[rules.required]"
                  label="終了日"
                  append-icon="mdi-calendar"
                  v-bind="attrs"
                  :readonly="settings.readonly"
                  v-on="on"
                  @keydown.enter="$blockEnterKey($event)"
                >
                  <template v-if="editMode" v-slot:append-outer>
                    <v-btn small @click="insToday('end')">今日</v-btn>
                    <v-btn class="ml-2" small @click="insTomorrow('end')">
                      明日
                    </v-btn>
                  </template>
                </v-text-field>
              </template>
              <v-date-picker
                v-model="scheDetailForm.endDate"
                :min="scheDetailForm.startDate"
                locale="jp-ja"
                :day-format="(date) => new Date(date).getDate()"
                @input="scheDetailForm.endDateMenu = false"
              ></v-date-picker>
            </v-menu>
            <!-- 終了日入力欄 ここまで -->
            <!-- 終了時間入力欄  -->
            <v-menu
              ref="endTimeMenu"
              v-model="scheDetailForm.endTimeMenu"
              :disabled="!editMode"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="scheDetailForm.endTime"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="scheDetailForm.endTime"
                  :rules="[rules.required]"
                  label="終了時間"
                  append-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  @keydown.enter="$blockEnterKey($event)"
                >
                </v-text-field>
              </template>
              <v-time-picker
                v-if="scheDetailForm.endTimeMenu"
                v-model="scheDetailForm.endTime"
                format="24hr"
                full-width
                @click:minute="$refs.endTimeMenu.save(scheDetailForm.endTime)"
              ></v-time-picker>
            </v-menu>
            <!-- 終了時間入力欄 ここまで -->
            <!-- スケジュールバーの色 -->
            <v-select
              v-model="scheDetailForm.barColor"
              :rules="[rules.required]"
              :items="colors"
              item-text="label"
              item-value="val"
              label="バーの色"
              :readonly="settings.readonly"
            >
            </v-select>
            <!-- スケジュールバーの色 ここまで -->
            <!-- 備考入力欄 -->
            <v-textarea
              v-model="scheDetailForm.remarks"
              :rules="[rules.notOnlySpace]"
              auto-grow
              label="備考"
              rows="4"
              :readonly="settings.readonly"
            ></v-textarea>
            <!-- 備考入力欄 ここまで -->
          </v-card-text>
          <v-card-actions class="py-0">
            <v-row justify="center" class="mb-5">
              <v-btn
                v-show="editMode"
                class="mr-2"
                color="blue white--text"
                type="submit"
                :disabled="!scheDetailForm.valid"
                @click="valiForm()"
              >
                登録
              </v-btn>
              <v-btn
                v-show="editMode"
                class="ml-2"
                color="error white--text"
                @click="changeRefMode()"
              >
                中止
              </v-btn>
              <!-- フォーム入力エラーメッセージ -->
              <div class="text-center">
                <span
                  v-show="!scheDetailForm.valid"
                  class="red--text subtitle-1 font-weight-bold"
                  >※入力に不備があるので確認して下さい</span
                >
              </div>
              <!-- フォーム入力エラーメッセージ ここまで -->
              <p>scheDetailForm➡︎{{ scheDetailForm }}</p>
              <p>selectedEvent➡︎{{ selectedEvent }}</p>
              <p>tmpData➡︎{{ tmpData }}</p>
            </v-row>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import rules from '@/mixins/rules.js'

export default {
  mixins: [rules],

  props: { scheDetailOpen: Boolean, selectedEvent: Object },

  data() {
    return {
      editMode: false,
      settings: {
        readonly: true,
      },
      colors: [
        { label: '赤', val: 'red' },
        { label: '青', val: 'blue' },
        { label: '緑', val: 'green' },
        { label: '紫', val: 'purple' },
        { label: 'ピンク', val: 'pink' },
      ],
      tmpData: {},
    }
  },
  computed: {
    scheDetailForm: {
      get() {
        return this.selectedEvent
      },
    },
    icon() {
      return this.editMode ? 'mdi-arrow-left' : 'mdi-pencil'
    },
    changeMode() {
      return this.editMode ? this.changeRefMode : this.changeEditMode
    },
    editTooltipText() {
      return this.editMode ? '戻る' : '編集'
    },
    title() {
      return this.editMode ? '予定編集' : '予定詳細'
    },
  },
  methods: {
    changeEditMode() {
      this.editMode = true
      this.settings.readonly = false
      // 値渡し(ディープコピー)する
      // Object.assignとスプレッド構文はほぼ同じ。プロパティに配列やオブジェクトがあるとそこだけ参照渡しになるので注意
      // 値渡しにしたい場合はプロパティを一つずつ書けば良い。だがプロパティが増えれば記述量が増えるのが問題
      // this.tmpData.title = this.scheDetailForm.title
      // this.tmpData.startDate = this.scheDetailForm.startDate
      this.tmpData = Object.assign({}, this.scheDetailForm)
    },
    changeRefMode() {
      this.editMode = false
      this.settings.readonly = true
      this.scheDetailForm = Object.assign(this.scheDetailForm, this.tmpData)
    },
    insToday(typeOfVar) {
      const today = new Date().toISOString().substr(0, 10)
      typeOfVar === 'start'
        ? (this.scheDetailForm.startDate = today)
        : (this.scheDetailForm.endDate = today)
    },

    insTomorrow(typeOfVar) {
      const today = new Date()
      // 本日の日付に一日加える
      today.setDate(today.getDate() + 1)
      const tomorrow = today.toISOString().substr(0, 10)
      typeOfVar === 'start'
        ? (this.scheDetailForm.startDate = tomorrow)
        : (this.scheDetailForm.endDate = tomorrow)
    },

    // 登録ボタン押下時のバリデーション処理
    valiForm() {
      this.$refs.scheDetailForm.validate()
    },

    // 予定ポスト処理
    async postForm() {
      // 日付の値を整形
      const fmtedStartDate = this.$fmtDate(this.scheDetailForm.startDate)
      const fmtedEndDate = this.$fmtDate(this.scheDetailForm.endDate)
      // 時間の値を整形
      const fmtedStartTime = this.$fmtTime(this.scheDetailForm.startTime)
      const fmtedEndTime = this.$fmtTime(this.scheDetailForm.endTime)
      // ポストするオブジェクトの作成
      const postObj = {
        title: this.scheDetailForm.title,
        start_date: fmtedStartDate,
        start_time: fmtedStartTime,
        end_date: fmtedEndDate,
        end_time: fmtedEndTime,
        bar_color: this.scheDetailForm.barColor,
        remarks: this.scheDetailForm.remarks,
      }
      const response = await this.$axios
        .$post('/sches/ins', postObj)
        .then((response) => {
          console.log('response data', response.object)
          alert('予定を追加しました')
          this.$refs.scheDetailForm.reset()
          this.$emit('updateCalendar')
          this.closeDetail()
        })
        .catch((error) => {
          console.log('response error', error)
        })
      console.log('response→', response)
    },

    // スケジュール削除処理
    async deleteSche() {
      const agreement = confirm('この予定を削除しますか？')
      // 「キャンセル」を選択した場合は何も処理しない
      if (!agreement) {
        return
      }
      const postObj = {
        id: this.scheDetailForm.id,
      }
      // ポスト処理
      const response = await this.$axios
        .$post('/sches/del', postObj)
        .then((response) => {
          console.log('response object', response.object)
          // this.$refs.scheDetailForm.reset()
          this.$emit('updateCalendar')
          this.closeDetail()
        })
        .catch((error) => {
          console.log('response error', error)
        })
      console.log('response→', response)
    },

    // フォームを閉じる処理
    closeDetail() {
      this.$emit('closeDetail')
    },
  },
}
</script>
