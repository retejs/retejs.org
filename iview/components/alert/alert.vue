<template>
    <transition :name="fade ? 'fade' : ''">
        <div v-if="!closed" :class="wrapClasses">
            <span :class="iconClasses" v-if="showIcon">
                <slot name="icon">
                    <Icon :type="iconType"></Icon>
                </slot>
            </span>
            <span :class="messageClasses"><slot></slot></span>
            <span :class="descClasses"><slot name="desc"></slot></span>
            <a :class="closeClasses" v-if="closable" @click="close">
                <slot name="close">
                    <Icon type="ios-close"></Icon>
                </slot>
            </a>
        </div>
    </transition>
</template>
<script>
    import Icon from '../icon';
    import { oneOf } from '../../utils/assist';

    const prefixCls = 'ivu-alert';

    export default {
        name: 'Alert',
        components: { Icon },
        props: {
            type: {
                validator (value) {
                    return oneOf(value, ['success', 'info', 'warning', 'error']);
                },
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
        },
        data () {
            return {
                closed: false,
                desc: false
            };
        },
        computed: {
            wrapClasses () {
                return [
                    `${prefixCls}`,
                    `${prefixCls}-${this.type}`,
                    {
                        [`${prefixCls}-with-icon`]: this.showIcon,
                        [`${prefixCls}-with-desc`]: this.desc,
                        [`${prefixCls}-with-banner`]: this.banner
                    }
                ];
            },
            messageClasses () {
                return `${prefixCls}-message`;
            },
            descClasses () {
                return `${prefixCls}-desc`;
            },
            closeClasses () {
                return `${prefixCls}-close`;
            },
            iconClasses () {
                return `${prefixCls}-icon`;
            },
            iconType () {
                let type = '';

                switch (this.type) {
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

                if (this.desc) type += '-outline';
                return type;
            }
        },
        methods: {
            close (e) {
                this.closed = true;
                this.$emit('on-close', e);
            }
        },
        mounted () {
            this.desc = this.$slots.desc !== undefined;
        }
    };
</script>

<style lang="less">
@import '../../styles/custom.less';
@import '../../styles/mixins/close.less';
@import '../../styles/mixins/content.less';

@alert-prefix-cls: ~"@{css-prefix}alert";
@icon-prefix-cls: ~"@{css-prefix}icon";

.@{alert-prefix-cls}{
    position: relative;
    padding: 8px 48px 8px 16px;
    border-radius: @border-radius-small;
    color: @text-color;
    font-size: @font-size-base;
    line-height: 16px;
    margin-bottom: 10px;

    &&-with-icon{
        padding: 8px 48px 8px 38px;
    }

    &-icon {
        position: absolute;
        margin-top: -8.5px;
        top: 50%;
        left: 12px;
        font-size: @font-size-large;
    }

    &-desc {
        font-size: @font-size-base;
        color: @text-color;
        line-height: 21px;
        display: none;
        text-align: justify;
    }

    &-success {
        border: @border-width-base @border-style-base ~`colorPalette("@{success-color}", 3)`;
        //background-color: tint(@success-color, 90%);
        background-color: ~`colorPalette("@{success-color}", 1)`;
        .@{alert-prefix-cls}-icon {
            color: @success-color;
        }
    }

    &-info {
        border: @border-width-base @border-style-base ~`colorPalette("@{primary-color}", 3)`;
        //background-color: tint(@primary-color, 90%);
        background-color: ~`colorPalette("@{primary-color}", 1)`;
        .@{alert-prefix-cls}-icon {
            color: @primary-color;
        }
    }

    &-warning {
        border: @border-width-base @border-style-base ~`colorPalette("@{warning-color}", 3)`;
        //background-color: tint(@warning-color, 90%);
        background-color: ~`colorPalette("@{warning-color}", 1)`;
        .@{alert-prefix-cls}-icon {
            color: @warning-color;
        }
    }

    &-error {
        border: @border-width-base @border-style-base ~`colorPalette("@{error-color}", 3)`;
        //background-color: tint(@error-color, 90%);
        background-color: ~`colorPalette("@{error-color}", 1)`;
        .@{alert-prefix-cls}-icon {
            color: @error-color;
        }
    }

    &-close {
        .content-close(-3px);
    }

    &-with-desc {
        padding: 16px;
        position: relative;
        border-radius: @border-radius-small;
        margin-bottom: 10px;
        color: @text-color;
        line-height: 1.5;
    }

    &-with-desc&-with-icon{
        padding: 16px 16px 16px 69px;
    }

    &-with-desc &-desc{
        display: block;
    }

    &-with-desc &-message {
        font-size: @font-size-large;
        color: @title-color;
        display: block;
        margin-bottom: 4px;
    }

    &-with-desc &-icon {
        top: 50%;
        left: 24px;
        margin-top: -24px;
        font-size: 28px;
    }

    &-with-banner{
        border-radius: 0;
    }
}

</style>