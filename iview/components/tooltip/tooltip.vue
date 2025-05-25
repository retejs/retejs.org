<template>
    <div :class="[prefixCls]" @mouseenter="handleShowPopper" @mouseleave="handleClosePopper">
        <div :class="[prefixCls + '-rel']" ref="reference">
            <slot></slot>
        </div>
        <teleport to="body" :disabled="!transfer">
            <transition name="fade">
                <div
                    ref="popper"
                    v-show="!disabled && (visible || always)"
                    :class="dropdownCls"
                    :style="dropStyles"
                    @mouseenter="handleShowPopper"
                    @mouseleave="handleClosePopper"
                >
                    <div :class="[prefixCls + '-content']">
                        <div :class="[prefixCls + '-arrow']"></div>
                        <div :class="innerClasses" :style="innerStyles"><slot name="content">{{ content }}</slot></div>
                    </div>
                </div>
            </transition>
        </teleport>
    </div>
</template>
<script>
    import { getCurrentInstance } from 'vue';
    import Popper from '../base/popper';
    import { oneOf } from '../../utils/assist';
    import { transferIndex, transferIncrease } from '../../utils/transfer-queue';

    const prefixCls = 'ivu-tooltip';

    export default {
        name: 'Tooltip',
        mixins: [ Popper ],
        props: {
            placement: {
                validator (value) {
                    return oneOf(value, ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']);
                },
                default: 'bottom'
            },
            content: {
                type: [String, Number],
                default: ''
            },
            delay: {
                type: Number,
                default: 100
            },
            disabled: {
                type: Boolean,
                default: false
            },
            controlled: {    // under this prop,Tooltip will not close when mouseleave
                type: Boolean,
                default: false
            },
            always: {
                type: Boolean,
                default: false
            },
            transfer: {
                type: Boolean,
                default () {
                    const global = getCurrentInstance().appContext.config.globalProperties;
                    return !global.$VIEWUI || global.$VIEWUI.transfer === '' ? false : global.$VIEWUI.transfer;
                }
            },
            theme: {
                validator (value) {
                    return oneOf(value, ['dark', 'light']);
                },
                default: 'dark'
            },
            maxWidth: {
                type: [String, Number]
            },
            transferClassName: {
                type: String
            }
        },
        data () {
            return {
                prefixCls: prefixCls,
                tIndex: this.handleGetIndex()
            };
        },
        computed: {
            innerStyles () {
                const styles = {};
                if (this.maxWidth) styles['max-width'] = `${this.maxWidth}px`;
                return styles;
            },
            innerClasses () {
                return [
                    `${prefixCls}-inner`,
                    {
                        [`${prefixCls}-inner-with-width`]: !!this.maxWidth
                    }
                ];
            },
            dropStyles () {
                let styles = {};
                if (this.transfer) styles['z-index'] = 1060 + this.tIndex;

                return styles;
            },
            dropdownCls () {
                return [
                    `${prefixCls}-popper`,
                    `${prefixCls}-${this.theme}`,
                    {
                        [prefixCls + '-transfer']: this.transfer,
                        [this.transferClassName]: this.transferClassName
                    }
                ];
            }
        },
        watch: {
            content () {
                this.updatePopper();
            }
        },
        methods: {
            handleShowPopper() {
                if (this.timeout) clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.visible = true;
                }, this.delay);
                this.tIndex = this.handleGetIndex();
            },
            handleClosePopper() {
                if (this.timeout) {
                    clearTimeout(this.timeout);
                    if (!this.controlled) {
                        this.timeout = setTimeout(() => {
                            this.visible = false;
                        }, 100);
                    }
                }
            },
            handleGetIndex () {
                transferIncrease();
                return transferIndex;
            },
        },
        mounted () {
            if (this.always) {
                this.updatePopper();
            }
        }
    };
</script>

<style lang="less">
@import '../../styles/custom.less';
@import '../../styles/mixins/tooltip.less';

@tooltip-prefix-cls: ~"@{css-prefix}tooltip";
@tooltip-arrow: ~"@{tooltip-prefix-cls}-arrow";
@tooltip-max-width: 250px;
@tooltip-arrow-width: 5px;
@tooltip-distance: @tooltip-arrow-width - 1 + 4;

@tooltip-arrow-width-light: 7px;
@tooltip-distance-light: @tooltip-arrow-width-light - 1 + 4;
@tooltip-arrow-outer-width-light: (@tooltip-arrow-width-light + 1);
@tooltip-arrow-color: hsla(0,0%,85%,.5);

.@{tooltip-prefix-cls} {
    display: inline-block;

    &-rel{
        display: inline-block;
        position: relative;
        width: inherit;
    }

    &-popper{
        .popper(@tooltip-arrow, @tooltip-arrow-width, @tooltip-distance, @tooltip-bg);
    }
    &-light&-popper{
        .popper(@tooltip-arrow, @tooltip-arrow-width-light, @tooltip-distance-light, @tooltip-arrow-color);

        &[x-placement^="top"] .@{tooltip-arrow}:after {
            content: " ";
            bottom: 1px;
            margin-left: -@tooltip-arrow-width-light;
            border-bottom-width: 0;
            border-top-width: @tooltip-arrow-width-light;
            border-top-color: #fff;
        }

        &[x-placement^="right"] .@{tooltip-arrow}:after {
            content: " ";
            left: 1px;
            bottom: -@tooltip-arrow-width-light;
            border-left-width: 0;
            border-right-width: @tooltip-arrow-width-light;
            border-right-color: #fff;
        }

        &[x-placement^="bottom"] .@{tooltip-arrow}:after {
            content: " ";
            top: 1px;
            margin-left: -@tooltip-arrow-width-light;
            border-top-width: 0;
            border-bottom-width: @tooltip-arrow-width-light;
            border-bottom-color: #fff;
        }

        &[x-placement^="left"] .@{tooltip-arrow}:after {
            content: " ";
            right: 1px;
            border-right-width: 0;
            border-left-width: @tooltip-arrow-width-light;
            border-left-color: #fff;
            bottom: -@tooltip-arrow-width-light;
        }
    }

    &-inner{
        max-width: @tooltip-max-width;
        min-height: 34px;
        padding: 8px 12px;
        color: @tooltip-color;
        text-align: left;
        text-decoration: none;
        background-color: @tooltip-bg;
        border-radius: @border-radius-small;
        box-shadow: @shadow-base;
        white-space: nowrap;

        &-with-width{
            white-space: pre-wrap;
            text-align: justify;
            // 解决纯字母或数字不换行的问题
            word-wrap: break-word;
            word-break: break-all;
        }
    }

    &-light &-inner{
        background-color: #fff;
        color: @text-color;
    }

    &-arrow{
        position: absolute;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
    }

    &-light {
        .@{tooltip-arrow}{
            &:after{
                display: block;
                width: 0;
                height: 0;
                position: absolute;
                border-color: transparent;
                border-style: solid;
                content: "";
                border-width: @tooltip-arrow-width-light;
            }
            border-width: @tooltip-arrow-outer-width-light;
        }
    }
}


</style>