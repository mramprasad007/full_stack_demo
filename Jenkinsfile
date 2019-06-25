pipeline {
    agent any
    environment {
        BUILD_ENV = "prod"
    }
    stages {
        stage('Install') {
            steps {
                sh '''
                echo 'Installing source NPM dependencies...'
                cd ng-demo
                npm install
                '''
            }
        }
        stage('Build') {
            steps {
                sh '''
                echo 'Build started'
                cd ng-demo
                ng build --${BUILD_ENV}
                echo 'Build Success'
                '''
            }
        }
    }
    post {
        Success {
            archiveArtifacts artifacts: 'ng-demo/dist/**/*.*', caseSensitive: false
        }
    }
}