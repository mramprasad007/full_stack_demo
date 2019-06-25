pipeline {
    agent any
    environment {
        BUILD_FOLDER="dist"
        BASE_FOLDER="ng-demo"
        BUILD_ENV = "prod"
    }
    stages {
        stage('Install') {
            steps {
                sh '''
                echo 'Installing source NPM dependencies...'
                cd ${BASE_FOLDER}
                npm install
                '''
            }
        }
        stage('Build') {
            steps {
                sh '''
                echo 'Build started'
                cd ${BASE_FOLDER}
                ng build --${BUILD_ENV}
                echo 'Build Success'
                '''
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: '${BASE_FOLDER}/${BUILD_FOLDER}/'
        }
    }
}