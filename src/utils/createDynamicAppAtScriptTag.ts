import { createApp, Component } from 'vue'
import { getCurrentScript, getAllScriptURLParameters } from 'src/utils/utils'
import { isDevelopment } from 'src/utils/constants'
import { LanguageCodeEnum } from 'src/models/LanguageCodeEnum'

/**
 * Mounts the Vue app at a created root element directly after the initialising script tag
 * @param component Vue app entry point component
 * @param config
 * * @param elementID element id selector, with # prefix
 * * @param lang region language code
 */
export const createDynamicAppAtScriptTag = (
  component: Component,
  config: {
    elementID: string
    lang: LanguageCodeEnum
  }
): void => {
  const { elementID, lang } = config

  if (elementID.slice(0, 1) !== '#') {
    throw new Error(
      'elementID must be a valid id selector string. E.g: #my-component'
    )
  }

  const mountTargetSelector = `${elementID.substring(1)}-${lang}`
  if (!isDevelopment && document.getElementById(mountTargetSelector)) {
    throw new Error(
      'An instance of the widget has already been initialized. You can only add one widget script tag per page'
    )
  }

  const scriptEl = getCurrentScript()
  const props = getAllScriptURLParameters(scriptEl)

  // In development we don't want to inject the app at the script tag in index.html
  if (!isDevelopment) {
    const mountTargetEl = document.createElement('div')
    mountTargetEl.id = mountTargetSelector

    scriptEl.insertAdjacentElement('afterend', mountTargetEl)
  }

  // In development we only render one region's app at the time by using a generic selector
  // in production we use a region specific selector
  const mountTargetID = isDevelopment ? elementID : `${elementID}-${lang}`

  createApp(component, { ...props, lang }).mount(mountTargetID)
}
