<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select :value="value" v-on="listeners" v-bind="$attrs">
      <option
        v-for="option in options"
        :value="option"
        :key="option.id"
        :selected="option === value"
      >{{ option }}</option>
    </select>
  </div>
</template>

<script>
import {formFieldMixin} from '../mixins/formFieldMixins';

export default {
  mixins: [formFieldMixin],
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
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
