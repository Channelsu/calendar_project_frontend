<template>
  <section class="cards">
    <article class="card">
      <div
        class="thumbnail"
        style="
          background-image: url('https://thumb.photo-ac.com/c3/c38945f7f63294b4c0f127cab5ed4141_t.jpeg');
        "
      ></div>
      <h1>h1</h1>
      <p>p</p>
    </article>
    <article class="card">
      <div
        class="thumbnail"
        style="
          background-image: url('https://thumb.photo-ac.com/e3/e311ea8b9bd8c4520975e7500c3221ce_t.jpeg');
        "
      ></div>
      <h1>h1</h1>
      <p>p</p>
    </article>
  </section>
  <!-- <p>YouTubeに似せたもの</p>
  <p>賃貸・物件検索サイト</p> -->
</template>

<script>
export default {
  // ヘッダーの種類記述（指定がない時はlayouts/default.vueが適応される）
  layout: 'hd_general',

  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped>
.cards {
  display: flex;
  flex-flow: row wrap;
}

.card {
  box-sizing: border-box;
  width: 280px;
  padding: 8px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px #aaa;
  margin: 10px;
}

.thumbnail {
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 200px;
}
</style>
