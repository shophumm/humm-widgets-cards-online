import { createApp, Component } from 'vue'
import {
  getCurrentScript,
  getAllScriptURLParameters,
  parseThemeParameter,
  loadStyles,
} from 'src/utils/utils'
import { isDevelopment, publicUrl, appName } from 'src/utils/constants'
import LanguageCodeEnum from 'src/models/enums/LanguageCodeEnum'

/**
 * Mounts the Vue app at a created root element directly after the initialising script tag
 * @param component Vue app entry point component
 * @param config
 * * @param elementID element id selector, with # prefix
 * * @param lang region language code
 */
export const createDynamicAppAtScriptTag = async (
  component: Component,
  config: {
    elementID: string
    lang: LanguageCodeEnum
  }
): Promise<void> => {
  const { elementID, lang } = config
  const scriptEl = getCurrentScript()
  const props = getAllScriptURLParameters(scriptEl)
  const removeCss = String(props.removeCss).toLowerCase() === 'true'
  const theme = parseThemeParameter(props.theme, removeCss)

  if (elementID.slice(0, 1) !== '#') {
    throw new Error(
      'elementID must be a valid id selector string. E.g: #my-component'
    )
  }

  const mountTargetSelector = `${elementID.substring(1)}-${lang}${
    theme ? `-${theme}` : ``
  }`

  // Inject the stylesheet by default if in prod
  // TODO, reserve the space for the widget before it loads to prevent CLS
  if (!isDevelopment && !removeCss) {
    const stylesheetUrl = `${publicUrl}/${appName}-${lang}.css`

    try {
      await loadStyles(stylesheetUrl)
    } catch (error) {
      if (error instanceof Error)
        throw new Error(
          `Could not load CSS from ${stylesheetUrl}\n More details: ${error.toString()}`
        )
    }
  }

  if (!isDevelopment && document.getElementById(mountTargetSelector)) {
    throw new Error(
      'An instance of the widget has already been initialized. You can only add one widget script tag per page'
    )
  }

  // In development we don't want to inject the app at the script tag in index.html
  if (!isDevelopment) {
    const mountTargetEl = document.createElement('div')
    mountTargetEl.id = mountTargetSelector

    scriptEl.insertAdjacentElement('afterend', mountTargetEl)
  }

  // In development we only render one region's app at the time by using a generic selector
  // in production we use a region specific selector
  const mountTargetID = isDevelopment
    ? elementID
    : `${elementID}-${lang}${theme ? `-${theme}` : ``}`

  console.warn('mounttargetSelector', mountTargetSelector)
  console.warn('mountTargetID', mountTargetID)
  console.warn(document.getElementById(mountTargetSelector))
  console.warn('isDevelopment', isDevelopment)

  createApp(component, { ...props, lang, theme }).mount(mountTargetID)
}
