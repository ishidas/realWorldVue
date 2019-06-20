<template>
  <div>
    <p>{{comment | reply('bro') | shout | exclaim }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        comment: 'no one cares'
      }
    },
    filters: {
      shout(value) {
        return value.toUpperCase()
      },
      exclaim(value) {
        return value + '!!!'
      },
      reply(value, name) {
        return value + ', ' + name
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
