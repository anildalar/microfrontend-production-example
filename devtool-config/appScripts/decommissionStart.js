const { prompt } = require('prompts')

let interval
function cleanup() {
  clearInterval(interval)
}

const tenants = Object.keys(require('./constants/const.config').getClients())

const decommissionStart = async () => {
  const questions = [
    {
      type: 'select',
      name: 'tenant',
      message: 'Which tenant you want to decommission ?',
      choices: tenants.map((tenant) => ({
        title: tenant,
        value: tenant,
        disabled: false,
        description: tenant,
      })),
    },
    {
      type: 'confirm',
      name: 'confirmed',
      message: 'Are you sure ?',
    },
  ]

  const answers = await prompt(questions, { onCancel: cleanup, onSubmit: cleanup })
  if (answers.confirmed) {
    console.log('Thank you for your valuable information: ', answers)
    require('child_process').exec(`cross-env EXISTING_CLIENT_NAME=${answers.tenant} node ./appScripts/decommission.js`).stdout.on('data', (data) => {
      console.log(data.toString())
    })
  }
}
decommissionStart()
