const id = `loader-${Math.random().toString(16)
  .split('.')[1]}`

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default defineNitroPlugin((nitroApp: any) => {
  nitroApp.hooks.hook('render:html', (html: any) => {
    html.head.unshift(`<script>
        window.addEventListener("beforeunload", function (event) {
          document.querySelector('#${id}').style.display = 'none';
        })
        document.addEventListener('DOMContentLoaded', function () {
          document.querySelector('#${id}').style.display = 'none';
        });
      </script>
      <span id="${id}"></span>
      <style>
        #${id} {
          display: inline-block;
          position: fixed;
          left: 0;
          top: 0;
          width: 0px;
          box-shadow: 0 0 2px 0px #8fa1ff;
          height: 2px;
          animation: loader 100s cubic-bezier(0.000, 0.990, 0.595, 1.005) infinite;
          background: #8fa1ff;
          z-index: 3;
        }

        @keyframes loader {
          0% {
            width: 0vw;
          }

          100% {
            width: 100vw;
          }
        }
      </style>
      <noscript>
        <style>
          #${id} {
            display: none;
          }
        </style>
      </noscript>`)
  })
})
