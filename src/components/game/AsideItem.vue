<template>
    <div :class="itemClass">
        <div :class="$style.itemNum">
            {{ num }}
        </div>
        <div :class="$style.itemName">
            {{ name }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import { mainStore } from '@/store/main';

interface IProps {
    num: number;
    name: string;
    isFireproof?: boolean;
}

const props = withDefaults(defineProps<IProps>(), { isFireproof: false });
const store = mainStore();
const $style = useCssModule();

const itemClass = computed(() => ({
    [$style.item]: true,
    [$style.itemFireproof]: props.isFireproof,
    [$style.itemCurrent]: store.currentQuestionNum === props.num,
    [$style.itemDecided]: store.currentQuestionNum > props.num,
}));
</script>

<style lang="scss" module>
    .item {
        display: flex;
        gap: 8px;
        width: 213px;
        height: 19px;
        font-size: 16px;
        line-height: 19px;
        color: rgb(225 160 46);
    }

    .itemCurrent {
        background-image: url("@/assets/img/gameComplect.png");
        background-position: -637px -119px;
        color: black;
    }

    .itemDecided {
        background-image: url("@/assets/img/gameComplect.png");
        background-position: -648px -146px;
    }

    .itemFireproof {
        color: #fff;
        font-weight: bold;
    }

    .itemNum {
        width: 40px;
        text-align: right;
    }
</style>
