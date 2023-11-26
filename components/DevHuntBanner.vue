<template lang="pug">
.dh-banner
  .banner-container
    .content
      p We are live on DevHunt: tool of the week contest
    a.btn(href='https://devhunt.org/tool/retejs' target='_blank')
      | check it out
      svg(xmlns='http://www.w3.org/2000/svg' viewbox='0 0 20 20' fill='currentColor')
        path(fillrule='evenodd' d='M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z' cliprule='evenodd')
</template>

<style scoped>
*,
::before,
::after {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: #e5e7eb;
}

::before,
::after {
  --tw-content: "";
}

body {
  margin: 0;
  line-height: inherit;
}

hr {
  height: 0;
  color: inherit;
  border-top-width: 1px;
}

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
  text-decoration: underline dotted;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

a {
  color: inherit;
  text-decoration: inherit;
}

b,
strong {
  font-weight: bolder;
}

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  font-size: 1em;
}

small {
  font-size: 80%;
}

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

table {
  text-indent: 0;
  border-color: inherit;
  border-collapse: collapse;
}

button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  font-feature-settings: inherit;
  font-variation-settings: inherit;
  font-size: 100%;
  font-weight: inherit;
  line-height: inherit;
  color: inherit;
  margin: 0;
  padding: 0;
}

button,
select {
  text-transform: none;
}

button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
  background-color: transparent;
  background-image: none;
}

:-moz-focusring {
  outline: auto;
}

:-moz-ui-invalid {
  box-shadow: none;
}

progress {
  vertical-align: baseline;
}

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

[type="search"] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}

::-webkit-search-decoration {
  -webkit-appearance: none;
}

::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}

summary {
  display: list-item;
}

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

dialog {
  padding: 0;
}

textarea {
  resize: vertical;
}

input::placeholder,
textarea::placeholder {
  opacity: 1;
  color: #9ca3af;
}

button,
[role="button"] {
  cursor: pointer;
}

:disabled {
  cursor: default;
}

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block;
  vertical-align: middle;
}

img,
video {
  max-width: 100%;
  height: auto;
}

.dh-banner {
  width: 100%;
  border-bottom-width: 1px;
  --tw-border-opacity: 1;
  border-color: rgb(30 41 59 / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: rgb(15 23 42 / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgb(241 245 249 / var(--tw-text-opacity));
}

.dh-banner .banner-container {
  margin-left: auto;
  margin-right: auto;
  display: flex;
  max-width: 1280px;
  align-items: center;
  justify-content: center;
  column-gap: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.35rem;
  padding-bottom: 0.35rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

@media (min-width: 768px) {
  .dh-banner .banner-container {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

.dh-banner .banner-container .content {
  display: flex;
}

@media (min-width: 640px) {
  .dh-banner .banner-container .content {
    align-items: center;
  }
}

.dh-banner .banner-container .btn {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  --tw-text-opacity: 1;
  color: rgb(248 250 252 / var(--tw-text-opacity));
}

.dh-banner .banner-container .btn:hover {
  -webkit-text-decoration-line: underline;
  text-decoration-line: underline;
}

.dh-banner .banner-container .btn svg {
  height: 1.25rem;
  width: 1.25rem;
  transition-duration: 200ms;
}

.dh-banner .banner-container .btn:hover svg {
  transform: translateX(5px);
}
</style>
