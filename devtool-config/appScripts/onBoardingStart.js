const { prompt } = require('prompts')

let interval
function cleanup() {
  clearInterval(interval)
}

const tenants = Object.keys(require('../devtool-config/constants/const.config').getClients())

const onboardingStart = async () => {
  const questions = [
    {
      type: 'select',
      name: 'tenant',
      message: 'Select your existing Client name to create a copy of ?',
      choices: tenants.map((tenant, index) => ({
        title: `${tenant}${index === 0 ? ' (default)' : ''}`,
        value: tenant,
        disabled: false,
        description: tenant,
      })),
    },
    {
      type: 'text',
      name: 'new_tenant',
      message: 'What\'s your new Client name ?',
      validate: (value) => (!value ? 'Sorry, please enter new Client name' : true),
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
    require('child_process').exec(`cross-env EXISTING_CLIENT_NAME=${answers.tenant} NEW_CLIENT_NAME=${answers.new_tenant} node ./appScripts/onBoarding.js`).stdout.on('data', (data) => {
      console.log(data.toString())
    })
  }
}
onboardingStart()
