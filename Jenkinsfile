pipeline{
    agent any 
    options { 
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: "10"))
        timeout(time: 25, unit: 'MINUTES')
    }
    parameters{
        choice(name: 'Environment',choices: ['dev','qa','stage','prod'], description: 'Select the Environment to deploy. Stage and Prod will be deployed in us-east-1')
        choice(name: 'Region',choices: ['eu-west-1','us-east-1'], description: 'Select the region to deploy.For Stage and Prod region is us-east-1')
        string(name: 'CommitID', defaultValue: 'latest', description: 'For DEV and QA use "latest" as commit id and Short Commit ID is the first 8 digit of last successful deployment for Stage and Prod')

        }
    environment{
        TIER   = "${params.Environment.toLowerCase()}"
        AWS_REGION              = "${params.Region}"
        COMMIT_ID               = "${(env.TIER == "dev" || env.TIER == "qa") && params.CommitID.trim() == "latest" ? sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim() : params.CommitID.trim()}"
        APPLICATION = "container-ui-app,common-ui-app,protection-ui-app,protection-auth-ui-app,protection-identity-protection-ui-app,protection-credit-center-ui-app"
        ARTIFACT_BUCKET_NAME    = "gce-nextgen-artifacts"
        SERVICE_NAME = "interact-protection-ui"
        PROJECT_NAME = "NA"
        CLIENT = "demo-interact-protection"
        CLIENT_ID = "demo"
        UI_URL = "https://protection.${env.TIER}.tenerityservices.com"
    }
    stages {
          stage('Downloading terraform') {
                steps{
                    script{
                        dir('terraform'){
                            sh "wget https://releases.hashicorp.com/terraform/1.2.1/terraform_1.2.1_linux_amd64.zip"
                            sh "unzip terraform_1.2.1_linux_amd64.zip"
                        }
                    }
                }
            }
            stage('Initialising terraform') {
              when {
                expression {
                  return(env.TIER == 'dev' || env.TIER == 'qa' || env.TIER == 'stage' || env.TIER == 'prod')
                  }
                }
                steps{
                    script{
                        dir('terraform'){
                            sh "./terraform init -backend-config=configs/${env.AWS_REGION}/${env.TIER}/backend.tf"
                            echo "commit to be deployed is ${params.CommitID.trim()}"
                        }
                    }
                }
            }
           stage('Build'){
              tools {nodejs 'NodeJs-16'}
              when {
                expression {
                  return((env.TIER == 'dev' || env.TIER == 'qa') && params.CommitID.trim() == "latest")
                  }
                }
                steps {
                    script {
                        echo "----------installing packages and creating build----------"
                        sh "npm run packages-install:tenerity-ui-toolkit && npm install && node yarn-local-cli build"
                        echo "--------creating artifacts dir -------------"
                        sh '''
                        if [ -d "artifacts" ]; then 
                        echo "artifacts dir is present"
                        else 
                        mkdir artifacts
                        fi
                        '''
                        echo "--------copying application builds to artifacts -------------"
                        env.APPLICATION.tokenize(",").each { app ->
                            if (app == "container-ui-app"){
                                sh "cp -R ${app}/build/* artifacts/"
                            }
                            else
                            {
                                sh "cp -R ${app}/build/ artifacts/${app}"
                            }
                        
                        }
                        sh "cd $WORKSPACE/artifacts && zip -r ${SERVICE_NAME}-${env.COMMIT_ID}.zip . "
                    }
                    withAWS(region: 'eu-west-1') {
                        s3Upload(file: "$WORKSPACE/artifacts/${SERVICE_NAME}-${env.COMMIT_ID}.zip", bucket: "${ARTIFACT_BUCKET_NAME}", path: "${PROJECT_NAME}/${SERVICE_NAME}/${env.CLIENT}/${env.COMMIT_ID}.zip")
                    }
                }
            }
            stage("Deploying on Dev") {
                when {
                    allOf {
                        expression { env.BRANCH_NAME == "develop" || env.BRANCH_NAME =~ "build*" || env.BRANCH_NAME =~ "release*" || env.BRANCH_NAME == "devops-stage-deployment"}
                        expression { env.TIER == "dev"}
                    }
                }
                steps {
                    echo "Deployment Started for Dev Env"
                    deployToOriginServer()
                }
            }
            stage("Deploying on QA") {
                when {
                    allOf {
                        expression { env.BRANCH_NAME == "develop" || env.BRANCH_NAME =~ "build*" || env.BRANCH_NAME =~ "release*" || env.BRANCH_NAME =~ "cyberng-test-*"}
                        expression { env.TIER == "qa"}
                    }
                }
                steps {
                    echo "Deployment Started for QA Env"
                    deployToOriginServer()
                }
            }
              stage("Deploying on Stage us-east-1") {
                when {
                    allOf {
                        expression { env.BRANCH_NAME == "develop" || env.BRANCH_NAME =~ "build*" || env.BRANCH_NAME =~ "release*" || env.BRANCH_NAME == "devops-stage-deployment"}
                        expression { env.TIER == "stage"}
                    }
                }
                steps {
                    echo "Deployment Started for Stage Env us-east-1"
                    deployToOriginServer()
                }
            }

    }
    post{
        cleanup{
            echo "Cleanup"
            deleteDir()
        }
    }
}
def deployToOriginServer() {
    script {
        dir("terraform") {
            S3_BUCKET_NAME = sh(script: "terraform output -json clients | jq -r \'.\"${CLIENT}\".bucket_name\'", returnStdout: true).trim()
            CF_DISTRIBUTION_ID = sh(script: "terraform output -json clients | jq -r \'.\"${CLIENT}\".cloudfront_id\'", returnStdout: true).trim()
        }
        withAWS(region: 'eu-west-1') {
            s3Download(file: "${env.COMMIT_ID}.zip", bucket: "${ARTIFACT_BUCKET_NAME}", force: true, path: "${PROJECT_NAME}/${SERVICE_NAME}/${env.CLIENT}/${env.COMMIT_ID}.zip")
        }
        sh "unzip ${env.WORKSPACE}/${env.COMMIT_ID}.zip -d ${env.COMMIT_ID}/"
                    env.APPLICATION.tokenize(",").each { app ->
                        if (app == "container-ui-app"){
                            if(fileExists("${env.COMMIT_ID}/configs/buildConfig.json")) {
                                println "----- Enter into config check ---"
                                sh "sed -i 's/#client_id#/${CLIENT_ID}/g' ${env.COMMIT_ID}/configs/buildConfig.json"
                                sh "sed -i 's/#client_env#/${env.TIER}/g' ${env.COMMIT_ID}/configs/buildConfig.json"
                            }
                            if(fileExists("${env.COMMIT_ID}/configs/env.json")) {  
                                env.APPLICATION.tokenize(",").each { app_folder -> 
                                def app_url_placeholder = app_folder.replaceAll('-','_').replaceAll('app','url').toUpperCase()
                                    if (app_folder == "container-ui-app"){
                                        sh "sed -i 's@#${app_url_placeholder}#@${env.UI_URL}/@g' ${env.COMMIT_ID}/configs/env.json"
                                        }
                                    else{
                                        sh "sed -i 's@#${app_url_placeholder}#@${env.UI_URL}/${app_folder}@g' ${env.COMMIT_ID}/configs/env.json" 
                                    }
                                }
                            }
                        }
                        else
                        {
                            if(fileExists("${env.COMMIT_ID}/${app}/configs/env.json")) {  
                                env.APPLICATION.tokenize(",").each { app_folder -> 
                                def app_url_placeholder = app_folder.replaceAll('-','_').replaceAll('app','url').toUpperCase()
                                    if (app_folder == "container-ui-app"){
                                        sh "sed -i 's@#${app_url_placeholder}#@${env.UI_URL}/@g' ${env.COMMIT_ID}/${app}/configs/env.json"
                                        }
                                    else{
                                        sh "sed -i 's@#${app_url_placeholder}#@${env.UI_URL}/${app_folder}@g' ${env.COMMIT_ID}/${app}/configs/env.json" 
                                    }
                                }
                            }

                        }
                    }
        def awsAccountId = [
            "dev": "006378141167",
            "qa": "234218843518",
            "qa2": "234218843518",
            "stage": "215135100958",
            "prod": "212762427968"
        ]
         withAWS(role: 'ng-gce-deployment-role', roleAccount: "${awsAccountId[env.TIER]}", roleSessionName: "cyberng-${env.TIER}-ui-deployment-session") {
            sh "aws s3 cp '${env.COMMIT_ID}' s3://${S3_BUCKET_NAME}/ --sse AES256 --recursive"
         } 
    }
    invalidateCDN(CF_DISTRIBUTION_ID)
}
def invalidateCDN(id) {
    script {
        def awsAccountId = [
            "dev": "006378141167",
            "qa": "234218843518",
            "stage": "215135100958",
            "prod": "212762427968"
        ]
        withAWS(role: 'ng-gce-deployment-role', roleAccount: "${awsAccountId[env.TIER]}", roleSessionName: "cyberng-${env.TIER}-cdn-invalidation-session") {
            INVAL_ID = sh(script: "aws cloudfront create-invalidation --distribution-id ${id} --paths '/*' --region ${env.AWS_REGION} | jq -r '.Invalidation.Id'", returnStdout: true).trim()
            sh "aws cloudfront wait invalidation-completed --distribution-id ${id} --id ${INVAL_ID} --region ${env.AWS_REGION}"
        }
    }
}