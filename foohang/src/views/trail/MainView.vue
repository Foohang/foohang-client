<script setup>
import {ref} from "vue";
const {dataObj} = history.state;
const sidoCode = ref(dataObj.sidoCode);
const sidoName = ref(dataObj.sidoName);
console.log(sidoCode.value)
console.log(sidoName.value)
</script>

<template>
    <div>
        <h1>메인화면</h1>
        <p>{{ sidoCode }}</p>
        <p>{{ sidoName }}</p>
    </div>
</template>

<style scoped>

</style>