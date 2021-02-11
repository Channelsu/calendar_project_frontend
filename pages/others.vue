<template>
  <section class="cards">
    <Card
      thumbnail="https://thumb.photo-ac.com/c3/c38945f7f63294b4c0f127cab5ed4141_t.jpeg"
      title="タイトル"
      previewText="プレテキスト"
    />
    <Card
      thumbnail="https://thumb.photo-ac.com/e3/e311ea8b9bd8c4520975e7500c3221ce_t.jpeg"
      title="タイトル2"
      previewText="プレテキスト2"
    />
    <Card
      v-for="item in items"
      :key="item.title"
      :thumbnail="item.thumbnail"
      :title="item.title"
      :previewText="item.previewText"
    />
  </section>
  <!-- <p>YouTubeに似せたもの</p>
  <p>賃貸・物件検索サイト</p> -->
</template>

<script>
import Card from '~/components/others/Card.vue'

export default {
  // ヘッダーの種類記述（指定がない時はlayouts/default.vueが適応される）
  layout: 'hd_general',

  component: {
    Card,
  },

  data() {
    return {
      items: [
        {
          thumbnail:
            'https://thumb.photo-ac.com/c3/c38945f7f63294b4c0f127cab5ed4141_t.jpeg',
          title: 'タイトル',
          previewText: 'プレテキスト',
        },
        {
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
