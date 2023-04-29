<template lang="pug">
.sponsor
  Head
    Title  {{ $t('sponsor') }} - {{ $t('name') }}
  .section.header
    .title {{ $t('sponsorPage.title') }}
    p.description {{ $t('sponsorPage.subtitle1') }}
    p.description {{ $t('sponsorPage.subtitle2') }}

  .section
    .methods
      .patreon.payment
        a.button(:href="patreon.link" target="_blank")
          client-only
            font-awesome-icon.icon(:icon="['fa-brands', 'patreon']")
          .text Become a patron
        p.description {{ $t('sponsorPage.patreon.description') }}
        p.description
          b {{ $t('benefits') }}:
          | !{' '}
          | {{ $t('sponsorPage.patreon.benefits') }}
      .opencollective.payment
        a(:href="opencollective.link" target="_blank")
          img.button(:src="opencollective.link + '/button@2x.png?color=blue'")
        p.description {{ $t('sponsorPage.opencollective.description') }}
        p.description
          b {{ $t('benefits') }}:
          | !{' '}
          | {{ $t('sponsorPage.opencollective.benefits') }}

  .section
    p.contacts {{ $t('sponsorPage.contacts') }}
      | !{' '}
      a(href="mailto:info@retejs.org") info@retejs.org
</template>

<script>
import { useI18n } from 'vue-i18n';
import sponsor from '../../consts/sponsor.json';
import { mainPreview } from '../../shared/assets';

export default {
  setup() {
    const { t } = useI18n();
    const title = `${t('sponsor')} - ${t('name')}`;
    const description = `${t('sponsorPage.subtitle1')} ${t('sponsorPage.subtitle2')}`;

    // eslint-disable-next-line no-undef
    useSeoMeta({
      title,
      ogTitle: title,
      description,
      ogDescription: description,
      ogImage: mainPreview,
      twitterSite: 'rete_js',
      twitterCreator: 'rete_js',
      twitterImageSrc: mainPreview,
    });

    return {
      ...sponsor,
    };
  },
};
</script>

<style lang="sass" scoped>
@import '@/assets/styles/media.sass'

.sponsor
  .header
    max-width: 40em
  .description
    font-size: 1.1em

.methods
  display: flex
  margin: 2em
  .payment
    flex: 1
    text-align: center
    font-size: 0.95em
  +phone
    flex-direction: column

.patreon
  .button
    display: flex
    align-items: center
    gap: 1em
    color: white
    padding: 0.8em 1.2em 0.7em 1.2em
    width: fit-content
    border-radius: 2em
    font-weight: 400
    letter-spacing: 0.2em
    font-size: 0.7em
    margin: auto
    background-color: #f1465a
    height: 45px
    width: 280px
    .icon
      font-size: 1.5em
    .text
      display: inline
      text-transform: uppercase
      margin: auto

.opencollective
  .button
    height: 45px
    width: 280px

.contacts
  font-size: 0.95em
</style>
