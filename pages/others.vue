<template>
  <section class="recipes">
    <article class="recipe">
      <div></div>
      <h1>h1</h1>
      <p>p</p>
    </article>
    <article class="recipe">
      <div></div>
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
/* .recipes {} */

.recipe {
  box-sizing: border-box;
  width: 280px;
  padding: 8px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px #aaa;
}
</style>
