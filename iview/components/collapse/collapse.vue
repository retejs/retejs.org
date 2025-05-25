<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>
<script>
    const prefixCls = 'ivu-collapse';

    export default {
        name: 'Collapse',
        emits: ['on-change', 'update:modelValue'],
        provide () {
            return {
                CollapseInstance: this
            }
        },
        props: {
            accordion: {
                type: Boolean,
                default: false
            },
            modelValue: {
                type: [Array, String]
            },
            simple: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                currentValue: this.modelValue,
                panelCount: 0 // Vue3 不能由父组件遍历子组件实例，因此无法在父组件操作子组件
            };
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-simple`]: this.simple
                    }
                ];
            }
        },
        methods: {
            getActiveKey () {
                let activeKey = this.currentValue || [];
                const accordion = this.accordion;

                if (!Array.isArray(activeKey)) {
                    activeKey = [activeKey];
                }

                if (accordion && activeKey.length > 1) {
                    activeKey = [activeKey[0]];
                }

                for (let i = 0; i < activeKey.length; i++) {
                    activeKey[i] = activeKey[i].toString();
                }

                return activeKey;
            },
            toggle (data) {
                const name = data.name.toString();
                let newActiveKey = [];

                if (this.accordion) {
                    if (!data.isActive) {
                        newActiveKey.push(name);
                    }
                } else {
                    let activeKey = this.getActiveKey();
                    const nameIndex = activeKey.indexOf(name);

                    if (data.isActive) {
                        if (nameIndex > -1) {
                            activeKey.splice(nameIndex, 1);
                        }
                    } else {
                        if (nameIndex < 0) {
                            activeKey.push(name);
                        }
                    }

                    newActiveKey = activeKey;
                }

                this.currentValue = newActiveKey;
                this.$emit('update:modelValue', newActiveKey);
                this.$emit('on-change', newActiveKey);
            }
        },
        watch: {
            modelValue (val) {
                this.currentValue = val;
            },
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
@import '../../styles/mixins/input.less';

@collapse-prefix-cls: ~"@{css-prefix}collapse";

.@{collapse-prefix-cls}{
    background-color: @background-color-base;
    border-radius: 3px;
    border: 1px solid @border-color-base;

    &-simple{
        border-left: none;
        border-right: none;
        background-color: #fff;
        border-radius: 0;
    }

    & > &-item{
        border-top: 1px solid @border-color-base;
        &:first-child {
            border-top: 0;
        }

        > .@{collapse-prefix-cls}-header{
            height: 38px;
            line-height: 38px;
            padding-left: 16px;
            color: #666;
            cursor: pointer;
            position: relative;
            border-bottom: 1px solid transparent;
            transition: all @transition-time @ease-in-out;

            > i{
                transition: transform @transition-time @ease-in-out;
                margin-right: 14px;
            }
        }
    }
    &  > &-item&-item-active > &-header{
        border-bottom: 1px solid @border-color-base;
    }
    &-simple > &-item&-item-active > &-header{
        border-bottom: 1px solid transparent;
    }
    &  > &-item&-item-active > &-header > i{
        transform: rotate(90deg);
    }

    &-content{
        //display: none;
        //overflow: hidden;
        color: @text-color;
        padding: 0 16px;
        background-color: #fff;

        & > &-box {
            padding-top: 16px;
            padding-bottom: 16px;
        }
    }
    &-simple > &-item > &-content > &-content-box{
        padding-top: 0;
    }
    &-item-active > &-content{
        //display: block;
    }
    &-item:last-child {
        > .@{collapse-prefix-cls}-content {
            border-radius: 0 0 3px 3px;
        }
    }
}

</style>