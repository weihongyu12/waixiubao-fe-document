<template>
  <span
    :class="[type]"
    :style="{verticalAlign: vertical}"
    class="badge">{{ text }}</span>
</template>

<script>
export default {
  name: 'CustomBadge',
  props: {
    type: {
      type: String,
      default: 'tip',
    },
    text: {
      type: String,
      required: true,
    },
    vertical: {
      type: String,
      default: 'top',
    },
  },
};
</script>

<style lang="stylus" scoped>
.badge
  display inline-block
  font-size 14px
  height 18px
  line-height 18px
  border-radius 3px
  padding 0 6px
  color white
  background-color #42b983
  &.tip, &.green
    background-color #42b983
  &.error
    background-color #DA5961 //#f66
  &.warning, &.warn, &.yellow
    background-color darken(#ffe564, 35%)
  &.info, &.blue
    background-color #1ba9fd
  & + &
    margin-left 5px
</style>
