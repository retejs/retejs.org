import { defineNitroPlugin } from 'nitropack/runtime'

const id = process.env.GTAG_ID

export default defineNitroPlugin((nitroApp: any) => {
  nitroApp.hooks.hook('render:html', (html: any) => {
    if (!id) return
    html.head.unshift(`<!-- Google Tag Manager -->
      <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${id}');</script>
      <!-- End Google Tag Manager -->`)
    html.body.unshift(`<!-- Google Tag Manager (noscript) -->
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${id}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
      <!-- End Google Tag Manager (noscript) -->`)
  })
})
