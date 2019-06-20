import Vue from 'vue';
import Router from 'vue-router';
import EventList from './views/EventList.vue';
import EventCreate from './views/EventCreate.vue';
import EventShow from './views/EventShow.vue';
import User from './views/User.vue';
import NProgress from 'nprogress';
import store from '@/store/store';
import NotFound from '@/components/NotFound';
import NetworkIssue from '@/components/NetworkIssue';
import Example from '@/views/Example.vue';
import ExampleFilters from '@/views/ExampleFilters.vue';

Vue.use(Router);

const router = new Router({
  mode:   'history',
  base:   process.env.BASE_URL,
  routes: [
    {
      path:      '/',
      name:      'event-list',
      component: EventList,
      props:     true,
    },
    {
      path:      '/example',
      component: Example
    },
    {
      path:      '/example-filters',
      component: ExampleFilters
    },
    {
      path:      '/events/:id',
      name:      'event-show',
      component: EventShow,
      props:     true,
      beforeEnter(routeTo, routeFrom, next) {
        store.dispatch('event/fetchEvent', routeTo.params.id).then((event) => {
          routeTo.params.event = event;
          next();
        }).catch((error) => {
          if (error.response && error.response.status == 404) {
            next({
              name:   '404',
              params: {resource: 'event'}
            });
          } else {
            next({name: 'network-issue'});
          }
        });
      }
    },
    {
      path:      '/events/create',
      name:      'event-create',
      component: EventCreate,
    },
    {
      path:      '/user/:username',
      name:      'user',
      component: User,
      props:     true,
    },
    {
      path:      '/404',
      name:      '404',
      component: NotFound,
      props:     true
    },
    {
      path:      '/network-issue',
      name:      'network-issue',
      component: NetworkIssue,
    },
    {
      path:     '*',
      redirect: {
        name:   '404',
        params: {
          name:   '404',
          params: {resource: 'page'}
        }
      }
    },


  ],
});

router.beforeEach((routeTO, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
