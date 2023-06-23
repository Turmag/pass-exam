<template>
    <div
        class="item"
        :class="store.chosenThematicId === props.id ? 'item--active' : ''"
        @click="chooseThematics"
    >
        {{ name }}
    </div>
</template>

<script setup>
    import { mainStore } from '../../store/main';
    const props = defineProps({
        id: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: '',
        },
    });

    const store = mainStore();

    const chooseThematics = () => {
        store.$patch({
            chosenThematicId: props.id,
        });
    };
</script>

<style lang="scss" scoped>
    .item {
        padding: 10px 15px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 15px;
        cursor: pointer;
        user-select: none;
        transition: 0.3s ease;

        &:hover {
            background-color: #f1dc65;
            color: #181818;
        }

        &--active,
        &:active {
            background-color: #fcde35;
            color: #181818;
        }
    }
</style>
