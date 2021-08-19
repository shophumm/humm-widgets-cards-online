import { createDynamicAppAtScriptTag } from 'src/utils/createDynamicAppAtScriptTag'
import { appName } from 'src/utils/constants'
import { LanguageCodeEnum } from 'src/models/LanguageCodeEnum'
import App from 'src/App.vue'

createDynamicAppAtScriptTag(App, {
  elementID: `#${appName}`,
  lang: LanguageCodeEnum.Australia,
})
