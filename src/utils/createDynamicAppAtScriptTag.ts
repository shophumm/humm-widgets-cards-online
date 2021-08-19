import { createApp, Component } from 'vue'
import { getCurrentScript, getAllScriptURLParameters } from 'src/utils/utils'
import { isDevelopment } from 'src/utils/constants'

/**
 * Mounts the Vue app at a created root element directly after the initialising script tag
 * @param component Vue app entry point component
 * @param elementID element id selector, with # prefix
 */
export const createDynamicAppAtScriptTag = (
  component: Component,
  elementID: string
): void => {
  if (elementID.slice(0, 1) !== '#') {
    throw new Error(
      'elementID must be a valid id selector string. E.g: #my-component'
    )
  }

  const mountTargetID = elementID.substring(1)
  if (!isDevelopment && document.getElementById(mountTargetID)) {
    throw new Error(
      'An instance of the widget has already been initialized. You can only add one widget script tag per page'
    )
  }

  const scriptEl = getCurrentScript()
  const props = getAllScriptURLParameters(scriptEl)

  // In development we don't want to inject the app at the script tag in index.html
  // In this case we use the element in index.html - remember to define VUE_APP_NAME and VUE_APP_DEFAULT_LANG in a .env
  if (!isDevelopment) {
    const mountTargetEl = document.createElement('div')
    mountTargetEl.id = mountTargetID

    scriptEl.insertAdjacentElement('afterend', mountTargetEl)
  }

  createApp(component, props).mount(elementID)
}
