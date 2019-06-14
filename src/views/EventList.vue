<template>
  <div>
    <h1>EventList</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import EventService from '../services/EventService';
import EventCard from '../components/EventCard.vue';
  export default {
    components: {
      EventCard,
    },
    data() {
      return {
        events: []
      }
    },
    created() {
      EventService.getEvents()
      .then(response => {
        console.log(response.data);
        this.events = response.data;
      })
      .catch(error => {
        console.log('There was an error ', error)
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>
