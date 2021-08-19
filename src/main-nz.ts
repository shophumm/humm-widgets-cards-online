import { createDynamicAppAtScriptTag } from 'src/utils/createDynamicAppAtScriptTag'
import { appName } from 'src/utils/constants'
import App from 'src/App.vue'

createDynamicAppAtScriptTag(App, `#${appName}-nz`)
