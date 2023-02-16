
import Vue from 'vue'
import VueEvents from 'vue-events'
import Vuelidate from 'vuelidate'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vue2Editor from "vue2-editor"
import vueCountryRegionSelect from 'vue-country-region-select'
import VueTelInput from 'vue-tel-input';

import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue2-editor/dist/vue2-editor.css'
import 'quill/dist/quill.core.css'

require('bootstrap')
require('admin-lte')
// require('admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js');
// require('admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js');
// require('admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js');
// require('admin-lte/plugins/toastr/toastr.min.js');

Vue.use(VueEvents)
Vue.use(Vuelidate)
Vue.use(Vue2Editor);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(require('vue-moment'))
Vue.use(vueCountryRegionSelect)
Vue.use(VueTelInput)

var p_json = require('/package.json')
console.log("Version: " + p_json.version + " [Last Updated: " + p_json.last_updated + "]")