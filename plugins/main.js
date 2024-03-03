import {
  Menu, MenuItem, Icon, Select, Submenu, Dropdown, Option,
  Drawer, Button, Alert, Tag, Tooltip, Collapse, Panel,
  Card, Spin, Modal, SkeletonItem,
} from 'view-ui-plus-es';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faDiscord, faTwitter, faGithub, faPatreon, faYoutube, faNpm,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// eslint-disable-next-line no-undef
export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp;

  library.add(faDiscord, faTwitter, faGithub, faPatreon, faYoutube, faNpm);

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
  app.component('IViewAlert', Alert);
  app.component('Tag', Tag);
  app.component('Tooltip', Tooltip);
  app.component('Collapse', Collapse);
  app.component('Panel', Panel);
  app.component('Card', Card);
  app.component('Spin', Spin);
  app.component('Modal', Modal);
  app.component('SkeletonItem', SkeletonItem);

  nuxtApp.$router.options.scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) return savedPosition;
    return new Promise((resolve) => {
      setTimeout(() => {
        const elem = to.hash && document.querySelector(to.hash);

        if (elem) {
          const offset = parseFloat(getComputedStyle(elem).scrollMarginTop);

          resolve({
            el: to.hash,
            top: offset,
          });
          return;
        }
        resolve({ top: 0, left: 0 });
      }, 200);
    });
  };
});
