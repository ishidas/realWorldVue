export const formFieldMixin = {
  inheritAttrs: false,
  props:        {
    lebel: {
      type:    String,
      default: '',
    },
    value: [String, Number],
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value);
    }
  }
};


