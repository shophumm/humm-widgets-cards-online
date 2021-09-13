import { createDynamicAppAtScriptTag } from 'src/utils/createDynamicAppAtScriptTag'
import { appName } from 'src/utils/constants'
import LanguageCodeEnum from 'src/models/enums/LanguageCodeEnum'
import App from 'src/App-nz.vue'

createDynamicAppAtScriptTag(App, {
  elementID: `#${appName}`,
  lang: LanguageCodeEnum.NewZealand,
})
