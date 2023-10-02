const { prompt } = require('prompts')
const {
  defaultENV, qaENV, stageENV, prodENV,
} = require('./vars')
const { root } = require('./helpers/root')
const { urlJsonPath } = require('./constants')

let interval
function cleanup() {
  clearInterval(interval)
}

const tenants = Object.keys(require('./constants/const.config').getClients())

const appStart = async () => {
  const questions = [
    {
      type: 'select',
      name: 'tenant',
      message: 'Which tenant you want to start ?',
      choices: tenants.map((tenant) => ({
        title: tenant,
        value: tenant,
        disabled: false,
        description: tenant,
      })),
    },
    {
      type: 'select',
      name: 'env',
      message: 'Which ENV you want to start ?',
      choices: [defaultENV, qaENV, stageENV, prodENV].map((env) => ({
        title: env,
        value: env,
        disabled: false,
        description: env,
      })),
    },
  ]

  const answers = await prompt(questions, { onCancel: cleanup, onSubmit: cleanup })

  const questionsConfirm = [
    {
      type: 'select',
      name: 'region',
      message: 'Which REGION you want to start ?',
      choices: require(root(urlJsonPath))?.[answers.tenant].regions.map((region) => ({
        title: region,
        value: region,
        disabled: false,
        description: region,
      })),
    },
    {
      type: 'confirm',
      name: 'confirmed',
      message: 'Are you sure ?',
      initial: true,
    },
  ]

  const answersConfirm = await prompt(questionsConfirm, { onCancel: cleanup, onSubmit: cleanup })
  if (answersConfirm.confirmed) {
    const command = `start:${answers.tenant} ${answersConfirm.region}`
    const exeCommand = `concurrently "wsrun --parallel cross-env CLIENT_NAME=${answers.tenant} CLIENT_ENV=${answers.env} CLIENT_REGION=${answersConfirm.region} npm-run-all start:init"`
    console.log(command, exeCommand)
    require('child_process').exec(exeCommand).stdout.on('data', (data) => {
      console.log(data.toString())
    })
  }
}
appStart()
