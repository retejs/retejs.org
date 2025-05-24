<template>
    <div :class="wrapClasses"><slot></slot></div>
</template>
<script>
    const prefixCls = 'ivu-layout';
    export default {
        name: 'Header',
        computed: {
            wrapClasses () {
                return `${prefixCls}-header`;
            }
        }
    };
</script>

<style lang="less">
@import '../../styles/custom.less';
@import '../../styles/mixins/layout.less';
@import '../../styles/mixins/size.less';
@import '../../styles/components/layout.less';

</style>