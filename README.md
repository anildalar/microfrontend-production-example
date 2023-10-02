# Protection (Business Enterprise) (1.0.0)
A Protection (Business Enterprise) app using React UI

## Confluence Docs / Architecture / Design Pattern / Standards

* https://confluence.tenerity.com/display/CS/SME+UI+Architecture?src=contextnavpagetreemode

## Zeplin UX Designs

* https://app.zeplin.io/project/61dbff79f47fda152105cf81

## Table of Contents

- [How do I get set up](#how-do-i-get-set-up)
- [Who do I talk to?](#who-do-i-talk-to?)
- [Scripts](#scripts)
  * [ENV variables?](#env-variables)
  * [Main Dev Scripts](#main-dev-scripts)
  * [Basic Dev Flow](#basic-dev-flow)
- [Commit Message Strategy](#commit-message-strategy)
- [Application Architecture](#application-architecture)
- [Folder Structure](#folder-structure)
- [Basic System Test Flow](#basic-system-test-flow)
- [Additional Info](#additional-info)

<a name="how-do-i-get-set-up"></a>
## How do I get set up? ###

* Require node version >= 12.22.0 (https://nodejs.org/en/download/releases/)
* Install NVM for having multiple version of node js (optional) (https://github.com/coreybutler/nvm-windows/releases)
* How to run this | Configuration | Dependencies -> Refer - [Main Dev Scripts](#main-dev-scripts)
* Environment configuration -> Refer Confluence
* How to run Automation test(s) -> Refer - [Basic System Test Flow](#basic-system-test-flow)
* Deployment instructions -> Refer Confluence
* Backend configuration
* Database configuration

<a name="who-do-i-talk-to?"></a>
## Who do I talk to? ###

* UI -> KARAN KHILWANI | SUNIL SALVE | VAIBHAV BOTRE | SOURAV GHOSH
* UX (Zeplin) -> ALLAMA GURUMURTHY
* QA -> PRIYA LAHOTI | AKSHAY SAGARE
* BACKEND -> VIDHYA BHARAMBE | TUSHAR KADALE
* DEVOPS -> Hiren Thakar | Mohseen Pathan
* BA/JE -> MEHUL GUPTA
* Scrum Master -> CHAITANYA PATIL

<a name="scripts"></a>
## Scripts

<a name="env-variables"></a>
### ENV variables?

* CLIENT_NAME  -> Sets Client Id for future details and workflow
* CLIENT_ENV     -> Sets Domain Info for future details and workflow (dev / qa / stage / prod)
* CLIENT_LANG     -> Sets Client Language for future details and workflow (en)
* NODE_ENV     -> This lets build tool know which kind of build (dev / prod) it is
* BUILD_DOMAIN -> This lets build tool know which build settings (dev / release / prod) has to be applied (dev | prod - is same)

<a name="main-dev-scripts"></a>
### Main Dev Scripts

* `npm run start` (Run the local browser-sync development environment)
* `npm run build` (Create the production package)
* `npm run format` (Fix minor lint issues on styles and scripts)
* `npm run lint` (Check the code style for styles and scripts)
* `npm run test` (Run all unit tests)
* `npm run commit` (Commit the code)

<a name="basic-dev-flow"></a>
### Basic Dev Flow    

1. Run `npm install` to install all required dependencies
2. Run `npm start` to run your application
3. Code will start run on browser using http://localhost:4000/
4. Update the code
5. Track your changes using git
6. In order to commit your code refer [Commit Message Strategy](#commit-message-strategy)

Any changes will be watched and auto refreshed in the browser

Tests and linting will be run before your commit message is accepted

Linting will also be run per file change on your development local server

If you wish to add a new package you can do so by below command
```sh
npm i <package>
```
OR

for dev dependencies
```sh
npm i <package> -D
```


<a name="commit-message-strategy"></a>
## Commit Message Strategy

* In order to commit your code run `npm run commit` to follow commit standards. Configured values wil help you add commit message in a interactive way.
* `git commit -m "<type>(scope): <Message>"` Hint: scope should contain bracket, type and message don't need.
* Supported Types → `['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'hotfix', 'perf', 'refactor', 'revert', 'style', 'test', 'WIP']`
* Supported Scopes → `['cleanup', 'code', 'config', 'dependency', 'design', 'packages', 'readme', 'scripts', 'style', 'unit', 'automation']`
* Push your code using `git push`

<a name="application-architecture"></a>
## Application Architecture

> * Application build scripts, dev scripts, prod scripts and all prod / dev dependencies listed in package.json
> * devtool-config/ -> holds all the config files required for build, dev run, and unit test configs
> * * commitlint/ - holds conventional commit config file to help better commit message design
> * * constants/ -> holds all constants which are required in build & test process
> * * helpers/ -> holds helpers scripts used in build & test process
> * * * index.js -> common file to export all build helper functions in one place
> * * * root.js -> helper function for build script
> * * jest/
> * * * mocks/ -> mocks required for unit testing for images & files
> * * * * fileMock.js -> mock file loader for jest
> * * * * snapSvgMock.js -> mock snap svg file loader for jest
> * * * config.json -> jest config file with custom config for this project
> * * * enzymeAdapter.js -> helper adapter function for enzyme used along with jest
> * * webpack/
> * * * base-config.js -> webpack base config required for both dev and prod build
> * * * dev-config.js -> webpack config specific for dev build
> * * * prod-config.js -> config specific for prod build
> * * .eslintrc.js -> eslint config for js file used within config folder
> * reports/ -> reports of unit test, automation test, error screen shots are stored here
> * src/ -> all application specific code and file
> * * app/ -> js code and styles
> * * * components/ react components and code
> * * * * App/ -> Main App Component
> * * * * * AppContainer/ -> main react component which holds all the theme and header footer as application wrapper
> * * * * * AppThemePalette/ -> theme component which holds all global styles and theming part
> * * * * common/ -> will hold all common dumb components which can be injected and used in required feature components.
> * * * * Pages/
> * * * * * <Feature>/
> * * * * *  index.jsx -> based on feature this will have connect methods of redux store to components, but if component is pretty small then will be whole component logic along with connect methods
> * * * * Root/ -> Root react component with wrapper of app, i.e Heart of App
> * * * * SMEApplication/
> * * * resources/
> * * * * locales/
> * * * * * <clientId>/ -> locales files based on client is needed
> * * * * * default/ -> default locales files which will be inherited by client if personalization is applied
> * * * styles/
> * * assets/
> * * build-templates/
> * * index.html
> * * index.jsx -> start of application
> * .eslintignore -> eslint ignore config for project
> * .eslintrc.js -> eslint config for project
> * .gitignore -> git ignore config for project
> * .husky/ -> git hooks config for project
> * .commitlint.config.js -> commit lint config for project to follow commit standards
> * package.json -> package config for project
> * README.md -> ReadMe for project
> * webpack.config.js -> build tools config for project

<a name="folder-structure"></a>
## Folder Structure

After creation, your project should look like this:

```
<APPLICATION NAME>/
  devtool-config/
    commitlint/
    constants/
    helpers/
    jest/
    webpack/
  node_modules/
  npm-packages-cache/
  reports/
    coverage/
      jest/
  src/
    app/
      components/
        App/
          AppContainer/
              index.jsx
              index.spec.jsx
          AppThemePalette/
              index.jsx
              index.spec.jsx
        common/
          <dumb/common> components/
        Pages/
          <feature> components/
            index.jsx
            index.spec.jsx
            <feature>.jsx
            <feature>.spec.jsx
            styles.js
            types.js
        Root/
          index.jsx
          index.spec.jsx
          styles.js
          types.js
        SMEApplication/
      resources/
        locales/
          <clientId>/
          default/
        globalConstants.js
        regexConstants.js
      redux/
        reducers/
          <featureBasedAction>Reducer/
            index.js
            index.spec.js
          index.js
          index.spec.js
        sagas/
          <featureBasedAction>Saga/
            index.js
            index.spec.js
          index.js
          rootSaga.spec.js
        store.js
      styles/
        <content>styles.js
        <global>.js
        <globalstyles>.js
        <styles>.js
      utils/
        <apiConfig>.js
        <device>.js
        <formatData>.js
        <globalJSMethods>.js
        <sessionStorage>.js
        <utils>.js
    assets/
      fonts/
      img/
        favicons/
    build-templates/ -> contains buildConfig.json for external config
    index.html
    index.jsx
  <.babelrc>
  <commitlint.config>.js
  <.eslintrc/eslintignore>.js
  <.gitignore>
  <.husky>/
  <webpack.config>.js
  package.json
  README.md
```

<a name="basic-system-test-flow"></a>
## Basic System Test Flow

* Other community or team contact

<a name="additional-info"></a>
## Additional Info

Below are the details related to different types of commits

https://github.com/conventional-changelog-archived-repos/conventional-changelog-angular/blob/master/convention.md

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/leonardoanalista/corp-semantic-release)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=007dba&colorA=db748e)](https://github.com/styled-components/styled-components)

## MFE
To import component: const Protection = lazy(() => import('PROTECTION_UI/ng-app'))

To consume app(webpack con):

 new ModuleFederationPlugin({
      name: "PRODUCER_AND_CONSUMER_APP",
      filename: "remoteEntry.js",
      remotes: {
        PROTECTION_UI: 'PROTECTION_UI@http://localhost:4000/moduleEntry.js',
      },
      exposes: {
        "/<exposed-component-name>" : "<path-to-component>"
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
          eager:true
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
          eager:true
        },

      },
    })
