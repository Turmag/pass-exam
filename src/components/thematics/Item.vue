<template>
    <div
        :class="[$style.item, { [$style.itemActive]: store.chosenThematicId === props.id }]"
        @click="chooseThematics"
    >
        {{ name }}
    </div>
</template>

<script setup lang="ts">
import { mainStore } from '@/store/main';

interface Props {
    id: string;
    name: string;
}

const props = defineProps<Props>();
const store = mainStore();

const chooseThematics = () => store.chosenThematicId = props.id;
</script>

<style lang="scss" module>
    .item {
        padding: 10px 15px;
        border-radius: 15px;
        background: rgb(255 255 255 / 20%);
        transition: 0.3s ease;
        cursor: pointer;
        user-select: none;

        &:hover {
            background-color: #f1dc65;
            color: #181818;
        }

        &:active {
            background-color: #fcde35;
            color: #181818;
        }
    }

    .itemActive {
        background-color: #fcde35;
        color: #181818;
    }
</style>
