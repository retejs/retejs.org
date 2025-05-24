import { defineNuxtPlugin } from "#app";
import {
  Menu, MenuItem, Select, Submenu, Dropdown, Option,
  Drawer, Button, Alert, Tag, Tooltip, Collapse, Panel,
  Card, Spin, Modal, SkeletonItem, Notice
} from "../iview";

// eslint-disable-next-line no-undef
export default defineNuxtPlugin((nuxtApp) => {

  const app = nuxtApp.vueApp;

  app.component(
    "Menu",
    Menu
  );
  app.component(
    "MenuItem",
    MenuItem
  );
  app.component(
    "Submenu",
    Submenu
  );
  app.component(
    "Select",
    Select
  );
  app.component(
    "Dropdown",
    Dropdown
  );
  app.component(
    "Option",
    Option
  );
  app.component(
    "Drawer",
    Drawer
  );
  app.component(
    "Button",
    Button
  );
  app.component(
    "IViewAlert",
    Alert
  );
  app.component(
    "Tag",
    Tag
  );
  app.component(
    "Tooltip",
    Tooltip
  );
  app.component(
    "Collapse",
    Collapse
  );
  app.component(
    "Panel",
    Panel
  );
  app.component(
    "Card",
    Card
  );
  app.component(
    "Spin",
    Spin
  );
  app.component(
    "Modal",
    Modal
  );
  app.component(
    "SkeletonItem",
    SkeletonItem
  );

  app.config.globalProperties.$Notice = Notice;
  Notice.config({
    "top": 70
  });

  nuxtApp.$router.options.scrollBehavior = (to, from, savedPosition) => {

    if (savedPosition) return savedPosition;
    return new Promise((resolve) => {

      setTimeout(
        () => {

          const elem = to.hash && document.querySelector(to.hash);

          if (elem) {

            const offset = parseFloat(getComputedStyle(elem).scrollMarginTop);

            resolve({
              "el": to.hash,
              "top": offset
            });
            return;

          }
          resolve({"top": 0,
            "left": 0});

        },
        200
      );

    });

  };

});
