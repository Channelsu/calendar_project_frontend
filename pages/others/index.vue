<template>
  <section class="cards">
    <!-- <Card
      id="3"
      thumbnail="https://thumb.photo-ac.com/c3/c38945f7f63294b4c0f127cab5ed4141_t.jpeg"
      title="タイトル"
      previewText="プレテキスト"
    />
    <Card
      id="4"
      thumbnail="https://thumb.photo-ac.com/e3/e311ea8b9bd8c4520975e7500c3221ce_t.jpeg"
      title="タイトル2"
      previewText="プレテキスト2"
    /> -->
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :thumbnail="item.thumbnail"
      :title="item.title"
      :previewText="item.previewText"
    />
  </section>
</template>

<script>
import Card from '~/components/others/Card.vue'

export default {
  // ヘッダーの種類記述（指定がない時はlayouts/default.vueが適応される）
  layout: 'hd_general',

  component: {
    Card,
  },

  asyncData() {},

  data() {
    return {
      items: [
        {
          id: 1,
          thumbnail:
            'https://thumb.photo-ac.com/c3/c38945f7f63294b4c0f127cab5ed4141_t.jpeg',
          title: 'タイトル',
          previewText: 'プレテキスト',
        },
        {
          id: 2,
          thumbnail:
            'https://thumb.photo-ac.com/e3/e311ea8b9bd8c4520975e7500c3221ce_t.jpeg',
          title: 'タイトル2',
          previewText: 'プレテキスト2',
        },
      ],
    }
  },
  methods: {},
}
</script>

<style scoped>
.cards {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
}
</style>
