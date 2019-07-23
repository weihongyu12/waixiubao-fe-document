<template>
  <button
    type="button"
    class="btn"
    :class="styles"
    :disabled="disabled"
    @click="handleClick"
  >
    <!-- @slot 放置按钮内容 -->
    <slot />
  </button>
</template>

<script>
export default {
  name: 'ExampleButton',
  props: {
    /**
     * 设置按钮样式
     */
    type: {
      type: String,
      default: 'primary',
    },
    /**
     * 设置按钮大小
     */
    size: {
      type: String,
      default: '',
    },
    /**
     * Outline按钮样式
     */
    outline: {
      type: Boolean,
      default: false,
    },
    /**
     * 块状按钮
     */
    block: {
      type: Boolean,
      default: false,
    },
    /**
     * 禁用状态
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    styles() {
      return {
        [`btn-${this.type}`]: !this.outline,
        [`btn-outline-${this.type}`]: this.outline,
        [`btn-${this.size}`]: !!this.size,
        'btn-block': this.block,
      };
    },
  },
  methods: {
    /**
     * click事件
     * @param e
     */
    handleClick(e) {
      /**
       * click事件
       * @event click
       * @type {Event}
       * @type {string}
       */
      this.$emit('click', e);
    },
  },
};
</script>

<style lang="scss">
@import 'style';
</style>
