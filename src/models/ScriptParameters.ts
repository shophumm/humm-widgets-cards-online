import ScriptParametersEnum from 'src/models/enums/ScriptParametersEnum'

type ScriptParametersEnumKeys = `${ScriptParametersEnum}`
type ScriptParameters = {
  [key in ScriptParametersEnumKeys]: string | number | boolean
}

export default ScriptParameters
