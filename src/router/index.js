import { createRouter, createWebHistory } from 'vue-router';
import Stopwatch from '../lily_learning/202404_js_trainging/javascript_8/components/Stopwatch.vue';
import Notes from '../lily_learning/202404_js_trainging/javascript_8/components/Notes.vue';
import SplitBill from '../lily_learning/202404_js_trainging/javascript_8/components/SplitBill.vue';
import Calendar from '../lily_learning/202404_js_trainging/javascript_8/components/Calendar.vue';
import WeightTrackerApp from '../lily_learning/202404_js_trainging/javascript_8/components/weightTrackerApp.vue';
import WeatherQuery from '../lily_learning/202404_js_trainging/javascript_8/components/WeatherQuery.vue';
import CountryInfo from '../lily_learning/202404_js_trainging/javascript_8/components/CountryInfo.vue';



const routes = [
  { 
    path: '/',
    name: 'Home',
    component: Stopwatch 
  },
  { path: '/stopwatch', 
    name: 'Stopwatch',
    component: Stopwatch 
  },
  { path: '/notes',
    name: 'Notes',
    component: Notes 
  },
  { 
    path: '/splitbill',
    name: 'SplitBill',
    component: SplitBill 
  },
  { 
    path: '/calendar',
    name: 'Calendar',
    component: Calendar 
  
  },
  { 
    path: '/weightTrackerApp',
    name: 'WeightTrackerApp',
    component: WeightTrackerApp 
  
  },
  { 
    path: '/weather', 
    name: 'WeatherQuery',
    component: WeatherQuery 
  },
  { 
    path: '/countryinfo',
    name: 'CountryInfo',
    component: CountryInfo 
  
  },
  
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
