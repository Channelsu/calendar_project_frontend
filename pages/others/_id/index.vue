<template>
  <section class="single-card">
    <h1>{{ $route.params.id }}</h1>
    <div>
      <img src="" alt="" />
    </div>
    <p>aaaaa</p>
  </section>
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
.single-card {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 30px;
}
</style>
