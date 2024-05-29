<template>
    <div class="aside">
        <Item v-for="(item, i) in asideConfig" :key="i" v-bind="item" />
    </div>
</template>

<script setup lang="ts">
import Item from '@/components/game/AsideItem.vue';

let asideConfig = [
    {
        num: 1,
        name: 'Вопрос №1',
    },
    {
        num: 2,
        name: 'Вопрос №2',
    },
    {
        num: 3,
        name: 'Вопрос №3',
    },
    {
        num: 4,
        name: 'Вопрос №4',
    },
    {
        num: 5,
        name: 'Тройка',
        isFireproof: true,
    },
    {
        num: 6,
        name: 'Вопрос №6',
    },
    {
        num: 7,
        name: 'Вопрос №7',
    },
    {
        num: 8,
        name: 'Вопрос №8',
    },
    {
        num: 9,
        name: 'Вопрос №9',
    },
    {
        num: 10,
        name: 'Четвёрка',
        isFireproof: true,
    },
    {
        num: 11,
        name: 'Вопрос №11',
    },
    {
        num: 12,
        name: 'Вопрос №12',
    },
    {
        num: 13,
        name: 'Вопрос №13',
    },
    {
        num: 14,
        name: 'Вопрос №14',
    },
    {
        num: 15,
        name: 'Пятёрка',
        isFireproof: true,
    },
];

asideConfig = asideConfig.reverse();
</script>

<style lang="scss" scoped>
    .aside {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 8px;
        width: 270px;
        height: 480px;
    }
</style>
