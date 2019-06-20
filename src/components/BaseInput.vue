<template>
  <div>
    <label v-if="label">{{label}}</label>
    <input type="text" :value="value" v-bind="$attrs" v-on="listeners">
  </div>
</template>

<script>
import {formFieldMixin} from '../mixins/formFieldMixins';

  export default {
    mixins: [formFieldMixin],
    computed: {
      listeners() {
        return {
          ...this.$listeners,
          input: this.updateValue
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
