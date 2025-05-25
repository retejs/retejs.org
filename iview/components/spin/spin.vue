<template>
    <transition name="fade">
        <div :class="classes" v-if="fullscreenVisible && show">
            <div :class="mainClasses">
                <span :class="dotClasses"></span>
                <div :class="textClasses"><slot></slot></div>
            </div>
        </div>
    </transition>
</template>
<script>
    import { getCurrentInstance } from 'vue';
    import { oneOf } from '../../utils/assist';
    import ScrollbarMixins from '../modal/mixins-scrollbar';

    const prefixCls = 'ivu-spin';

    export default {
        name: 'Spin',
        mixins: [ ScrollbarMixins ],
        props: {
            size: {
                validator (value) {
                    return oneOf(value, ['small', 'large', 'default']);
                },
                default () {
                    const global = getCurrentInstance().appContext.config.globalProperties;
                    return !global.$VIEWUI || global.$VIEWUI.size === '' ? 'default' : global.$VIEWUI.size;
                }
            },
            fix: {
                type: Boolean,
                default: false
            },
            fullscreen: {
                type: Boolean,
                default: false
            },
            show: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                showText: false,
                // used for $Spin
                visible: false
            };
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-${this.size}`]: !!this.size,
                        [`${prefixCls}-fix`]: this.fix,
                        [`${prefixCls}-show-text`]: this.showText,
                        [`${prefixCls}-fullscreen`]: this.fullscreen
                    }
                ];
            },
            mainClasses () {
                return `${prefixCls}-main`;
            },
            dotClasses () {
                return `${prefixCls}-dot`;
            },
            textClasses () {
                return `${prefixCls}-text`;
            },
            fullscreenVisible () {
                if (this.fullscreen) {
                    return this.visible;
                } else {
                    return true;
                }
            }
        },
        watch: {
            visible (val) {
                if (val) {
                    this.addScrollEffect();
                } else {
                    this.removeScrollEffect();
                }
            }
        },
        mounted () {
            this.showText = !!this.$slots.default && this.$slots.default().some(item => item.children && item.children.length);
        }
    };
</script>


<style lang="less">
@import '../../styles/custom.less';
@import '../../styles/mixins/common.less';
@import '../../styles/common/iconfont/ionicons.less';
@import '../../styles/mixins/select.less';
@import '../../styles/components/form.less';
@import '../../styles/mixins/clearfix.less';
@import '../../styles/components/table.less';
@import '../../styles/mixins/checkbox.less';
@import '../../styles/components/checkbox.less';
@import '../../styles/mixins/size.less';
@import '../../styles/mixins/input.less';
@import '../../styles/mixins/caret.less';

@spin-prefix-cls: ~"@{css-prefix}spin";
@spin-dot-size-small: 12px;
@spin-dot-size: 20px;
@spin-dot-size-large: 32px;

.@{spin-prefix-cls} {
    color: @primary-color;
    vertical-align: middle;
    text-align: center;

    &-dot {
        position: relative;
        display: block;
        border-radius: 50%;
        background-color: @primary-color;
        .square(@spin-dot-size);
        animation: ani-spin-bounce 1s 0s ease-in-out infinite;
    }

    &-large &-dot {
        .square(@spin-dot-size-large);
    }

    &-small &-dot {
        .square(@spin-dot-size-small);
    }

    &-fix {
        position: absolute;
        top: 0;
        left: 0;
        z-index: @zindex-spin;
        .square(100%);
        background-color: rgba(255,255,255,.9);
    }
    &-fullscreen{
        z-index: @zindex-spin-fullscreen;
        &-wrapper{
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }
    }

    &-fix &-main {
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }

    &-fix &-dot {
        display: inline-block;
    }

    &-text,
    &-show-text &-dot {
        display: none;
    }

    &-show-text &-text {
        display: block;
    }
}

// use in Table loading, Table right border is not included in .ivu-table-wrapper, so fix it
.@{table-prefix-cls}-wrapper{
    > .@{spin-prefix-cls}-fix{
        border: none;
    }
}
.@{table-prefix-cls}-wrapper-with-border{
    > .@{spin-prefix-cls}-fix{
        border: 1px solid @border-color-base;
        border-top: 0;
        border-left: 0;
    }
}

@keyframes ani-spin-bounce {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
        opacity: 0;
    }
}

</style>