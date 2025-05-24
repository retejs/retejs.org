<script>
    import { h, getCurrentInstance } from 'vue';
    import Icon from '../icon';
    import { oneOf } from '../../utils/assist';
    import mixinsLink from '../../mixins/link';
    import mixinsForm from '../../mixins/form';

    const prefixCls = 'ivu-btn';

    export default {
        name: 'Button',
        mixins: [ mixinsLink, mixinsForm ],
        components: { Icon },
        emits: ['click'],
        props: {
            type: {
                validator (value) {
                    return oneOf(value, ['default', 'primary', 'dashed', 'text', 'info', 'success', 'warning', 'error']);
                },
                default: 'default'
            },
            shape: {
                validator (value) {
                    return oneOf(value, ['circle', 'circle-outline']);
                }
            },
            size: {
                validator (value) {
                    return oneOf(value, ['small', 'large', 'default']);
                },
                default () {
                    const global = getCurrentInstance().appContext.config.globalProperties;
                    return !global.$VIEWUI || global.$VIEWUI.size === '' ? 'default' : global.$VIEWUI.size;
                }
            },
            loading: Boolean,
            disabled: Boolean,
            htmlType: {
                default: 'button',
                validator (value) {
                    return oneOf(value, ['button', 'submit', 'reset']);
                }
            },
            icon: {
                type: String,
                default: ''
            },
            customIcon: {
                type: String,
                default: ''
            },
            long: {
                type: Boolean,
                default: false
            },
            ghost: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            showSlot () {
                return !!this.$slots.default;
            },
            classes () {
                return [
                    `${prefixCls}`,
                    `${prefixCls}-${this.type}`,
                    {
                        [`${prefixCls}-long`]: this.long,
                        [`${prefixCls}-${this.shape}`]: !!this.shape,
                        [`${prefixCls}-${this.size}`]: this.size !== 'default',
                        [`${prefixCls}-loading`]: this.loading != null && this.loading,
                        [`${prefixCls}-icon-only`]: !this.showSlot && (!!this.icon || !!this.customIcon || this.loading),
                        [`${prefixCls}-ghost`]: this.ghost
                    }
                ];
            },
            // Point out if it should render as <a> tag
            isHrefPattern () {
                const { to } = this;
                return !!to;
            },
            tagName () {
                const { isHrefPattern } = this;
                return isHrefPattern ? 'a' : 'button';
            },
            tagProps () {
                const { isHrefPattern } = this;
                if (isHrefPattern) {
                    const { linkUrl,target } = this;
                    return { href: linkUrl, target };
                } else {
                    const { htmlType } = this;
                    return { type: htmlType };
                }
            }
        },
        methods: {
            // Ctrl or CMD and click, open in new window when use `to`
            handleClickLink (event) {
                this.$emit('click', event);
                const openInNewWindow = event.ctrlKey || event.metaKey;

                this.handleCheckClick(event, openInNewWindow);
            }
        },
        render () {
            let tag;
            if (this.tagName === 'button') tag = 'button';
            else if (this.tagName === 'a') tag = 'a';

            let slots = [];
            if (this.loading) {
                slots.push(h(Icon, {
                    class: 'ivu-load-loop',
                    type: 'ios-loading'
                }));
            }
            if ((this.icon || this.customIcon) && !this.loading) {
                slots.push(h(Icon, {
                    type: this.icon,
                    custom: this.customIcon
                }));
            }
            if (this.$slots.default) {
                slots.push(h('span', {
                    ref: 'slot'
                }, this.$slots.default()));
            }

            return h(tag, {
                class: this.classes,
                disabled: this.itemDisabled,
                onClick: this.handleClickLink,
                ...this.tagProps
            }, slots);
        }
    };
</script>

<style lang="less">
@import '../../styles/custom.less';
@import '../../styles/mixins/button.less';
@import '../../styles/mixins/size.less';
@btn-prefix-cls: ~"@{css-prefix}btn";

.@{btn-prefix-cls} {
    .btn;
    .btn-default;

    &-long{
        width: 100%;
    }

    & > .ivu-icon + span, & > span + .ivu-icon{
        margin-left: 4px;
    }

    &-primary {
        .btn-primary;

        .@{btn-prefix-cls}-group:not(.@{btn-prefix-cls}-group-vertical) &:not(:first-child):not(:last-child) {
            border-right-color: @btn-group-border;
            border-left-color: @btn-group-border;
        }

        .@{btn-prefix-cls}-group:not(.@{btn-prefix-cls}-group-vertical) &:first-child {
            &:not(:last-child) {
                border-right-color: @btn-group-border;
                &[disabled] {
                    border-right-color: @btn-default-border;
                }
            }
        }

        .@{btn-prefix-cls}-group:not(.@{btn-prefix-cls}-group-vertical) &:last-child:not(:first-child),
        .@{btn-prefix-cls}-group:not(.@{btn-prefix-cls}-group-vertical) & + .@{btn-prefix-cls} {
            border-left-color: @btn-group-border;
            &[disabled] {
                border-left-color: @btn-default-border;
            }
        }

        .@{btn-prefix-cls}-group-vertical &:not(:first-child):not(:last-child) {
            border-top-color: @btn-group-border;
            border-bottom-color: @btn-group-border;
        }

        .@{btn-prefix-cls}-group-vertical &:first-child {
            &:not(:last-child) {
                border-bottom-color: @btn-group-border;
                &[disabled] {
                    border-top-color: @btn-default-border;
                }
            }
        }

        .@{btn-prefix-cls}-group-vertical &:last-child:not(:first-child),
        .@{btn-prefix-cls}-group-vertical & + .@{btn-prefix-cls} {
            border-top-color: @btn-group-border;
            &[disabled] {
                border-bottom-color: @btn-default-border;
            }
        }
    }

    //&-ghost {
    //    .btn-ghost;
    //}

    &-dashed{
        .btn-dashed;
    }

    &-text{
        .btn-text;
    }

    &-success {
        .btn-color(@success-color);
    }

    &-warning {
        .btn-color(@warning-color);
    }

    &-error {
        .btn-color(@error-color);
    }

    &-info {
        .btn-color(@info-color);
    }

    &-circle,
    &-circle-outline {
        .btn-circle(@btn-prefix-cls);
    }

    &:before {
        position: absolute;
        top: -1px;
        left: -1px;
        bottom: -1px;
        right: -1px;
        background: #fff;
        opacity: 0.35;
        content: '';
        border-radius: inherit;
        z-index: 1;
        transition: opacity @transition-time;
        pointer-events: none;
        display: none;
    }

    &&-loading {
        pointer-events: none;
        position: relative;

        &:before {
            display: block;
        }
    }

    &-group {
        .btn-group(@btn-prefix-cls);
    }

    &-group-vertical {
        .btn-group-vertical(@btn-prefix-cls);
    }

    // The new ghost in 3.0
    &-ghost{
        color: #fff;
        background: transparent;
        &:hover{
            background: transparent;
        }
    }
    &-ghost&-dashed, &-ghost&-default{
        color: #fff;
        border-color: #fff;
        &:hover{
            color: tint(@primary-color, 20%);
            border-color: tint(@primary-color, 20%);
        }
    }
    &-ghost&-primary{
        color: @primary-color;
        &:hover{
            color: tint(@primary-color, 20%);
            background: fade(tint(@primary-color, 95%), 50%);
        }
    }
    &-ghost&-info{
        color: @info-color;
        &:hover{
            color: tint(@info-color, 20%);
            background: fade(tint(@info-color, 95%), 50%);
        }
    }
    &-ghost&-success{
        color: @success-color;
        &:hover{
            color: tint(@success-color, 20%);
            background: fade(tint(@success-color, 95%), 50%);
        }
    }
    &-ghost&-warning{
        color: @warning-color;
        &:hover{
            color: tint(@warning-color, 20%);
            background: fade(tint(@warning-color, 95%), 50%);
        }
    }
    &-ghost&-error{
        color: @error-color;
        &:hover{
            color: tint(@error-color, 20%);
            background: fade(tint(@error-color, 95%), 50%);
        }
    }

    &-ghost&-default[disabled], &-ghost&-dashed[disabled], &-ghost&-primary[disabled], &-ghost&-info[disabled], &-ghost&-success[disabled], &-ghost&-warning[disabled], &-ghost&-error[disabled]{
        background: transparent;
        color: fade(#000, 25%);
        border-color: @btn-disable-border;
    }
    &-ghost&-text[disabled]{
        background: transparent;
        color: fade(#000, 25%);
    }
}

a.@{btn-prefix-cls} {
    padding-top: 0.1px;
    line-height: @btn-height-base - 2px;

    &-large {
        line-height: @btn-height-large - 2px;
    }
    &-small {
        line-height: @btn-height-small - 2px;
    }
}

</style>