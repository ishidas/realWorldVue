<template>
  <div>
    <h1>Opps!</h1>
    <p>The {{resource}}} you are looking for is not found.</p>
    <router-link :to="{name: 'event-list'}">Back to the home page.</router-link>
  </div>
</template>

<script>
  export default {
    props: {
      resource: {
        type: String,
        required: true,
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>
