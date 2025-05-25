<template>
    <transition :name="fade ? 'fade' : ''">
        <div v-if="!closed" :class="classes.root">
            <span :class="classes.icon" v-if="showIcon">
                <slot name="icon">
                    <Icon :type="iconType"></Icon>
                </slot>
            </span>
            <span :class="classes.message"><slot></slot></span>
            <span :class="classes.desc"><slot name="desc"></slot></span>
            <a :class="classes.close" v-if="closable" @click="close">
                <slot name="close">
                    <Icon type="ios-close"></Icon>
                </slot>
            </a>
        </div>
    </transition>
</template>
<script setup lang="ts">
import { ref, computed, useSlots } from 'vue';
import Icon from '../icon';
import { oneOf } from '../../utils/assist';
import { alert } from 'styled/recipes';

const props = defineProps({
    type: {
        validator: (value) => oneOf(value, ['success', 'info', 'warning', 'error']),
        type: String as () => 'success' | 'info' | 'warning' | 'error',
        default: 'info'
    },
    closable: {
        type: Boolean,
        default: false
    },
    showIcon: {
        type: Boolean,
        default: false
    },
    banner: {
        type: Boolean,
        default: false
    },
    fade: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['on-close']);
const closed = ref(false);
const slots = useSlots();
const desc = ref(false);

desc.value = slots.desc !== undefined;

const classes = alert({
    type: props.type,
    withIcon: props.showIcon,
    withDesc: desc.value,
    banner: props.banner,
    closable: props.closable
})

const iconType = computed(() => {
    let type = '';
    switch (props.type) {
        case 'success':
            type = 'ios-checkmark-circle';
            break;
        case 'info':
            type = 'ios-information-circle';
            break;
        case 'warning':
            type = 'ios-alert';
            break;
        case 'error':
            type = 'ios-close-circle';
            break;
    }
    if (desc.value) type += '-outline';
    return type;
});

function close(e: MouseEvent) {
    closed.value = true;
    emit('on-close', e);
}
</script>

