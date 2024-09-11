<template>
  <div id="app">
    <!-- <h1 v-upper="msg"></h1>  测试 -->
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  data(){
    return {
      msg:'abc'
    }
  },
  components:{Header,Footer},
  mounted(){
    //通过Vuex发请求，获取数据，存储在仓库中
    this.$store.dispatch("categoryList");
  }
}
</script>

<style scoped>
</style>