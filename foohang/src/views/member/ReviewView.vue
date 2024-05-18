<script setup>
</script>

<template>
    <div>
        <RouterLink :to="{name: 'review'}">리뷰 확인</RouterLink>
    <RouterLink :to="{name: 'reviewWrite'}"> 리뷰 작성</RouterLink>
        <RouterView />
    </div>
</template>

<style scoped>

</style>