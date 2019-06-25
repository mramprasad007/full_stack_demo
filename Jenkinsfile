pipeline {
    agent any
    tools {nodejs "node"}
    environment {
        BUILD_FOLDER="dist"
        BASE_FOLDER="ng-demo"
    }
    stages {
        stage('Install') {
            steps {
                echo 'Installing source NPM dependencies...'
                cd ${BASE_FOLDER}
                npm install
            }
        }
        stage('Build') {
            steps {
                echo Build started on `date`
                ng build --${BUILD_ENV}   
            }
        }
        stage('Archive') {
            steps {
                echo 'Deploying....'
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: '${BASE_FOLDER}/${BUILD_FOLDER}/**'
        }
    }
}