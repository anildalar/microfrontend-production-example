fetch(`${window.location.origin}/configs/env.json`)
  .then((response) => response.text())
  .then((result) => {
    const json = JSON.parse(result)
    Object.keys(json).forEach((key) => {
      window[`${key}`] = json[`${key}`]
    })
    import('./bootstrap')
  })
  .catch((error) => console.log('error', error))
