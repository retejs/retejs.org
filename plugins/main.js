import {
  Menu, MenuItem, Icon, Select, Submenu, Dropdown, Option,
  Drawer, Button, Alert, Tag, Tooltip,
} from 'view-ui-plus/dist/viewuiplus.min.esm';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDiscord, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// eslint-disable-next-line no-undef
export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp;

  library.add(faDiscord, faTwitter, faGithub);

  app.component('font-awesome-icon', FontAwesomeIcon);

  app.use(library);

  app.component('Menu', Menu);
  app.component('Icon', Icon);
  app.component('MenuItem', MenuItem);
  app.component('Submenu', Submenu);
  app.component('Select', Select);
  app.component('Dropdown', Dropdown);
  app.component('Option', Option);
  app.component('Drawer', Drawer);
  app.component('Button', Button);
  app.component('Alert', Alert);
  app.component('Tag', Tag);
  app.component('Tooltip', Tooltip);
});
