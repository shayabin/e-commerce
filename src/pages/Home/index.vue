<template>
  <div>
    <!-- 三级联动全局组件 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor></Floor>
    <Floor></Floor>
    <Brand></Brand>

  </div>
</template>

<script>
  import ListContainer from '@/pages/Home/ListContainer'
  import Recommend from '@/pages/Home/Recommend'
  import Rank from '@/pages/Home/Rank'
  import Like from '@/pages/Home/Like'
  import Floor from '@/pages/Home/Floor'
  import Brand from '@/pages/Home/Brand'

  export default {
      name:'Home',
      components:{ListContainer,Recommend,Rank,Like,Floor,Brand},
      mounted(){
        //获取用户信息在首页展示
        this.getUserInfo()  
      },
      methods:{
        async getUserInfo(){
          try{
            await this.$store.dispatch('getUserInfo')
          }catch(error){
            console.log(error.message);
          }
        }
      }
  }
</script>

<style>

</style>