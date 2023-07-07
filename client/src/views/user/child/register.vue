<script setup lang="ts">
import { apiBaseCode, apiRegoster } from '@/api/user';
import { throttle } from '@/utils/tools';
import { reactive, onMounted } from 'vue';

const formData = reactive({
    userName: '',
    password: '',
})

const baseData = reactive({
    code: '',
    checkCode: '',
    svg: '',
})

// todo 前端格式校验

const getBaseData = throttle(function () {
    apiBaseCode().then((res) => {
        if (res.code === 0) {
            baseData.code = res.data?.code ?? ''
            baseData.svg = res.data?.data ?? ''
        }
    })
}, 1000)

const register = throttle(function () {
    apiRegoster({
        userName: formData.userName,
        password: formData.password,
        code: baseData.code,
        checkCode: baseData.checkCode
    }).then((res) => {
        if (res.code === 0) {
            console.log('res', res)
        }
    }).catch(err => console.error(err))
}, 1000)

onMounted(() => {
    getBaseData()
})

</script>

<template>
    <div class="register">
        <div class="title">注册</div>
        <div class="input">
            <input type="text" v-model="formData.userName">
        </div>
        <div class="input">
            <input type="password" v-model="formData.password">
        </div>
        <div class="check">
            <input type="text" v-model="baseData.checkCode">
            <!-- pointer 全局类名 -->
            <div class="svg pointer" v-html="baseData.svg" @click="getBaseData"></div>
        </div>
        <div>
            <button @click="register">注册</button>
        </div>
    </div>
</template>

<style scoped lang="less">
.register {
    width: 400px;
    height: 300px;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    padding: 20px 30px;

    .check {
        img {
            width: 100px;
            height: 30px;
        }
        .defaultClickStyle()
    }
}
</style>
