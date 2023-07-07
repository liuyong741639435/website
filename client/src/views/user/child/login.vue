<script setup lang="ts">
import { apiLogin } from '@/api/user';
import { reactive } from 'vue';

const formData = reactive({
  userName: '',
  password: '',
  isRemember: false,
})

// todo 前端格式校验

function login() {
  apiLogin({
    userName: formData.userName,
    password: formData.password,
  }).then((res) => {
    if (res.code === 0) {
      console.log('res', res)
    }
  }).catch(err => console.error(err))
}

</script>

<template>
  <div class="login">
    <div class="title">登录</div>
    <div class="input">
      <input type="text" v-model="formData.userName">
    </div>
    <div class="input">
      <input type="password" v-model="formData.password">
    </div>
    <!-- <div class="check">
      <input type="text">
      <img src="https://fanyi-cdn.cdn.bcebos.com/static/translation/img/header/logo_e835568.png" alt="">
    </div> -->
    <div>
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<style scoped lang="less">
.login {
  width: 400px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 20px 30px;

  // .check {

  //   img {
  //     width: 100px;
  //     height: 30px;
  //   }
  // }
}
</style>
