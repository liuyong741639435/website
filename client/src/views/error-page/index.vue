<script setup lang="ts">
import { LocationQueryValue, useRoute } from "vue-router";

const route = useRoute();

const code = Number(route.query.code as LocationQueryValue) ?? 401;

const errorList = [
  {
    code: 401,
    text: "未经授权",
    url: "",
  },
  {
    code: 403,
    text: "权限不够",
    url: "",
  },

  {
    code: 404,
    text: "没有该资源",
    url: "",
  },
];
const error = errorList.find((item) => item.code == code) ?? errorList[0]
</script>
<template>
  <div>
    <p>{{ error.code }}</p>
    <p>{{ error.text }}</p>
  </div>
</template>

<style scoped></style>
