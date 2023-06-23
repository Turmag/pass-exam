<template>
    <div class="item" :class="itemClass">
        <div class="item__num">{{ num }}</div>
        <div class="item__name">{{ name }}</div>
    </div>
</template>

<script setup>
    import { computed } from 'vue-demi';
    import { mainStore } from '../../store/main';

    const props = defineProps({
        num: {
            type: Number,
            default: 0,
        },
        name: {
            type: String,
            default: '',
        },
        isFireproof: {
            type: Boolean,
            default: false,
        },
    });

    const store = mainStore();

    const itemClass = computed(() => ({
        'item--fireproof': props.isFireproof,
        'item--current': store.currentQuestionNum === props.num,
        'item--decided': store.currentQuestionNum > props.num,
    }));
</script>

<style lang="scss" scoped>
    .item {
        display: flex;
        gap: 8px;
        width: 213px;
        height: 19px;
        font-size: 16px;
        line-height: 19px;
        color: rgb(225, 160, 46);

        &--fireproof {
            color: #fff;
            font-weight: bold;
        }

        &--current {
            background-image: url(../../assets/img/gameComplect.png);
            background-position: -637px -119px;
            color: black;
        }

        &--decided {
            background-image: url(../../assets/img/gameComplect.png);
            background-position: -648px -146px;
        }

        &__num {
            width: 40px;
            text-align: right;
        }
    }
</style>
