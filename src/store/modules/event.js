import EventService from '@/services/EventService';
export const namespaced = true;

export const state = {
  events:      [],
  eventCounts: 0,
  pageCounts:  0,
  event:       {},
  perPage:     3,
};

export const mutations = {
  // you should only use mutation within the scope.
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_PAGE_COUNTS(state, pageCounts) {
    state.pageCounts = parseInt(pageCounts);
  },
  SET_EVENT(state, event) {
    state.event = event;
  }
};
export const actions = {
  // you can also use dispatch('moduleName/actionToCall', null, {root: true}) inside of an action method to call other module's actions.
  updateCount({
    state, commit
  }, value) {
    if (state.user) {
      commit('INCREMENT_COUNT', value);
    }
  },
  createEvent({
    commit, dispatch
  }, event) {
    return EventService.postEvent(event).then(() => {
      commit('ADD_EVENT', event);
      const notification = {
        type:    'success',
        message: 'Your event has been created!'
      };
      dispatch('notification/add', notification, {root: true});
    })
      .catch((error) => {
        const notification = {
          type:    'error',
          message: `There was a problem creating your event:${error.message}`
        };
        dispatch('notification/add', notification, {root: true});
        throw error;
      });
  },
  fetchEvents({
    commit, dispatch, state
  }, {page}) {
    return EventService.getEvents(state.perPage, page)
      .then((response) => {
        commit('SET_EVENTS', response.data);
        commit('SET_PAGE_COUNTS', parseInt(response.headers['x-total-count']) / state.perPage);
      })
      .catch((error) => {
        const notification = {
          type:    'error',
          message: `There was a problem fetching events: ${error.message}`
        };
        dispatch('notification/add', notification, {root: true});
      });
  },
  fetchEvent({
    commit, getters
  }, id) {
    const event = getters.getEventById(id);
    if (event) {
      commit('SET_EVENT', event);
      return event;
    }
    return EventService.getEvent(id)
      .then((response) => {
        commit('SET_EVENT', response.data);
        return response.data;
      });
  }

};

export const getters = {
  getEventById: state => (id) => {
    return state.events.find(event => event.id == id);
  }
};
