const contentstack = require('contentstack')

// const tenantUid = 'protection_web_app_tenants_v1'

export const getContentStackEntry = (config, locale, ctUid, ref) => {
  // console.log(config, ctUid, locale)
  const { region, ...rest } = config
  const contentStackConfig = rest || config?.getContentStackConfig()
  const Stack = contentstack.Stack(contentStackConfig)
  const isRef = Array.isArray(ref) && ref?.length > 0

  return new Promise((resolve, reject) => {
    const data = Stack.ContentType(ctUid)
      .Query()
      .language(locale?.toLowerCase())[isRef ? 'includeReference' : 'includeCount'](ref)
      .includeCount()
      .includeFallback()
      .toJSON()
      .find()

    data.then(
      (result) => {
        resolve(result)
      },
      (error) => {
        reject(error)
      },
    )
  })
}

export const getContentStackEntryByTenant = (config, locale, ctUid, ref) => {
  // console.log(config, ctUid, locale)
  const { tenantId, region, ...rest } = config
  const contentStackConfig = rest || config?.getContentStackConfig()
  const Stack = contentstack.Stack(contentStackConfig)
  const isRef = Array.isArray(ref) && ref?.length > 0

  try {
    return new Promise((resolve, reject) => {
      const data = Stack.ContentType(ctUid)
        .Query()
        .language(locale?.toLowerCase())[isRef ? 'includeReference' : 'includeCount'](ref)
        .includeCount()
        .includeFallback()
        .toJSON()
        .referenceIn('tenants', Stack.ContentType('protection_web_app_tenants_v1').Query().where('tenant_identity', tenantId))
        .find()

      data.then(
        (result) => {
          resolve(result)
        },
        (error) => {
          reject(error)
        },
      )
    })
  } catch (exception) {
    console.log(exception)
    return exception
  }
}
