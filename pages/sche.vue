<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            本日
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            <!-- {{ $refs.calendar.title }} -->
            {{ yearMonth }}
          </v-toolbar-title>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small> mdi-chevron-right </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            dark
            depressed
            class="mr-10"
            color="blue"
            @click="formOpen = true"
            >追加
          </v-btn>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>日</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>週</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>月</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getBarColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        >
          <template v-slot:event="props">
            <div class="pl-1">
              <!-- {{ props.eventParsed.start.time }} - {{ props.eventParsed.end.time }} -->
              {{ props.eventParsed.start.time | delFstZero }}
              {{ props.event.name }}
            </div>
          </template>
        </v-calendar>
        <!-- 追加フォーム -->
        <v-row justify="center">
          <ScheForm
            :form-open-by-sche="formOpen"
            @updateCalendar="updateCalendar()"
            @closeForm="closeForm()"
          >
          </ScheForm>
        </v-row>
        <!-- 追加フォーム ここまで -->
        <!-- スケジュール詳細画面 -->
        <v-row justify="center">
          <ScheDetail
            :sche-detail-open="selectedOpen"
            :selected-event="selectedEvent"
            @updateCalendar="updateCalendar()"
            @closeDetail="closeForm()"
          >
          </ScheDetail>
        </v-row>
        <!-- スケジュール詳細画面 ここまで -->
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import ScheForm from '~/components/sche/ScheForm.vue'
import ScheDetail from '~/components/sche/ScheDetail.vue'

export default {
  // ヘッダーの種類記述（指定がない時はlayouts/default.vueが適応される）
  layout: 'hd_general',

  component: {
    ScheForm,
    ScheDetail,
  },

  data() {
    return {
      focus: '',
      type: 'month',
      typeToLabel: {
        month: '月',
        week: '週',
        day: '日',
      },
      selectedEvent: {},
      selectedElement: null,
      formOpen: false,
      selectedOpen: false,
      startDateInfo: null,
      endDateInfo: null,
      events: [],
      barColors: [
        'blue',
        'indigo',
        'deep-purple',
        'cyan',
        'green',
        'orange',
        'grey darken-1',
      ],
      names: [
        'Meeting',
        'Holiday',
        'PTO',
        'Travel',
        'Event',
        'Birthday',
        'Conference',
        'Party',
      ],
    }
  },
  filters: {
    delFstZero(time) {
      if (time.slice(0, 1) === '0') {
        time = time.slice(1)
      }
      return time
    },
  },
  computed: {
    yearMonth() {
      return this.fmtYearMonth(this.$refs.calendar.title)
    },
  },
  mounted() {
    this.$refs.calendar.checkChange()
  },
  methods: {
    // バックエンドから予定のデータを取得する処理
    updateCalendar() {
      const obj = {
        start: this.startDateInfo,
        end: this.endDateInfo,
      }
      this.updateRange(obj)
    },

    // バックエンドから予定のデータを取得し、フォーマットしてスケジュール配列を返すメソッド
    async getSches() {
      const response = await this.$axios
        .$get('/sches')
        .then((response) => {
          console.log('response.object', response.object)
          const sches = response.object
          const fmtedSches = this.fmtSches(sches)
          console.log('fmtedSches', fmtedSches)
          return fmtedSches
        })
        .catch((error) => {
          console.log('※※※ get sches response error ※※※')
          if (error.response) {
            console.log('the contents of error→', error.response)
          }
          return []
        })
      console.log('response→', response)
      return response
    },

    // スケジュールデータの各値を整形するメソッド
    fmtSches(sches) {
      const fmtedSches = sches.map((sche) => {
        // console.log('sche→', sche)
        // 日付の値を整形
        sche.startDate = this.$fmtDate(sche.startDate)
        sche.endDate = this.$fmtDate(sche.endDate)
        // 時間の値を整形
        sche.startTime = this.$fmtTime(sche.startTime)
        sche.endTime = this.$fmtTime(sche.endTime)
        // カレンダーに表示させるためのプロパティをセット
        sche.name = sche.title
        sche.start = `${sche.startDate} ${sche.startTime}`
        sche.end = `${sche.endDate} ${sche.endTime}`
        // sche.timed = !allDay
        return sche
      })
      return fmtedSches
    },

    fmtYearMonth(ym) {
      const [month, year] = ym.split(' ')
      return `${year}年 ${month}`
    },

    viewDay({ date }) {
      this.focus = date
      this.type = 'day'
    },

    getBarColor(event) {
      return event.barColor
    },

    setToday(event) {
      this.focus = ''
    },

    prev() {
      this.$refs.calendar.prev()
    },

    next() {
      this.$refs.calendar.next()
    },

    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => {
          this.selectedOpen = true
        }, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },

    async updateRange({ start, end }) {
      // const events = []
      const sches = await this.getSches()
      console.log('sches→', sches)

      // const min = new Date(`${start.date}T00:00:00`)
      // const max = new Date(`${end.date}T23:59:59`)
      // const days = (max.getTime() - min.getTime()) / 86400000
      // const eventCount = this.rnd(days, days + 20)

      // for (let i = 0; i < eventCount; i++) {
      //   const allDay = this.rnd(0, 3) === 0
      //   const firstTimestamp = this.rnd(min.getTime(), max.getTime())
      //   const first = new Date(firstTimestamp - (firstTimestamp % 900000))
      //   const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
      //   const second = new Date(first.getTime() + secondTimestamp)

      //   events.push({
      //     name: this.names[this.rnd(0, this.names.length - 1)],
      //     start: first,
      //     end: second,
      //     barColor: this.barColors[this.rnd(0, this.barColors.length - 1)],
      //     timed: !allDay,
      //   })
      // }
      // this.events = events
      this.events = sches
      this.startDateInfo = start
      this.endDateInfo = end
    },

    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },

    closeForm() {
      this.formOpen = false
      this.selectedOpen = false
    },
  },
}
</script>
