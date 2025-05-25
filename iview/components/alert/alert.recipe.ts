import { defineSlotRecipe } from '@pandacss/dev'

export const alertRecipe = defineSlotRecipe({
  className: 'alert',
  slots: ['root', 'icon', 'message', 'desc', 'close'],
  base: {
    root: {
      position: 'relative',
      padding: 'sm',
      paddingRight: 'xxxl',
      paddingLeft: 'lg',
      borderRadius: 'sm',
      fontSize: 'sm',
      lineHeight: 'xs',
      marginBottom: 'md',
      border: 'thin',
      transitionProperty: 'all',
      transitionDuration: 'default',
      transitionTimingFunction: 'alert.default'
    },
    icon: {
      position: 'absolute',
      marginTop: '-sm',
      top: '50p',
      left: 'md',
      fontSize: 'md'
    },
    message: {},
    desc: {
      fontSize: 'sm',
      color: '[rgba(0, 0, 0, 0.65)]',
      lineHeight: 'sm',
      display: 'none',
      textAlign: 'justify'
    },
    close: {
      position: 'absolute',
      top: 'sm',
      right: 'md',
      padding: 'none',
      overflow: 'hidden',
      fontSize: 'xs',
      lineHeight: 'md',
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      color: '[rgba(0, 0, 0, 0.45)]',
      textDecoration: 'none',
      transitionProperty: 'color',
      transitionDuration: 'default',
      transitionTimingFunction: 'alert.close',
      _hover: {
        color: '[rgba(0, 0, 0, 0.75)]'
      }
    }
  },
  variants: {
    type: {
      success: {
        root: {
          borderColor: 'alert.success.border',
          backgroundColor: 'alert.success.bg',
          color: 'alert.text.default'
        },
        icon: {
          color: 'alert.success.icon'
        }
      },
      info: {
        root: {
          borderColor: 'alert.info.border',
          backgroundColor: 'alert.info.bg',
          color: 'alert.text.default'
        },
        icon: {
          color: 'alert.info.icon'
        }
      },
      warning: {
        root: {
          borderColor: 'alert.warning.border',
          backgroundColor: 'alert.warning.bg',
          color: 'alert.text.default'
        },
        icon: {
          color: 'alert.warning.icon'
        }
      },
      error: {
        root: {
          borderColor: 'alert.error.border',
          backgroundColor: 'alert.error.bg',
          color: 'alert.text.default'
        },
        icon: {
          color: 'alert.error.icon'
        }
      }
    },
    withIcon: {
      true: {
        root: {
          paddingLeft: '[38px]'
        }
      }
    },
    withDesc: {
      true: {
        root: {
          padding: 'lg',
          lineHeight: 'lg'
        },
        icon: {
          top: '50p',
          left: 'xl',
          marginTop: '-xl',
          fontSize: 'lg'
        },
        message: {
          fontSize: 'md',
          color: 'alert.text.dark',
          display: 'block',
          marginBottom: 'xs'
        },
        desc: {
          display: 'block'
        },
        close: {
          top: 'lg',
          right: 'lg'
        }
      }
    },
    banner: {
      true: {
        root: {
          borderRadius: 'none'
        }
      }
    },
    closable: {
      true: {
        root: {
          paddingRight: 'xxxl'
        }
      }
    }
  },
  compoundVariants: [
    {
      withDesc: true,
      withIcon: true,
      css: {
        root: {
          paddingLeft: '[69px]'
        }
      }
    }
  ]
})