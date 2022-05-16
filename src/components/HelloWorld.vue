<script setup>
import { useAppStore } from "@store/app";

const appStore = useAppStore();

const commons = reactive({
  msg: "Hello World",
});

function showMsg() {
  ElMessage.success("message");
}

function changeStore(value) {
  appStore.count += value;
}
</script>

<template>
  <div class="box w-[400px] my-20 mx-50">
    <p>vue-api：</p>
    <h1>{{ commons.msg }}</h1>
    <el-divider />
    <p>Element-Plus组件：</p>
    <el-button type="primary" @click="showMsg">Primary</el-button>
    <el-divider />
    <p>pinia：</p>
    <p>显示状态：</p>
    <div>device: {{ appStore.device }}</div>
    <div>count: {{ appStore.count }}</div>
    <p>状态修改：</p>
    <el-button type="info" @click="changeStore(-1)">Count -1</el-button>
    <el-button type="primary" @click="changeStore(1)">Count +1</el-button>
  </div>
</template>
