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
                echo $PWD
                echo 'Installing source NPM dependencies...'
                cd '${BASE_FOLDER}'
                npm install
            }
        }
        // stage('Build') {
        //     steps {
        //         echo $PWD
        //         echo 'Build started'
        //         ng build --'${BUILD_ENV}'   
        //     }
        // }
    }
    post {
        always {
            archiveArtifacts artifacts: '${BASE_FOLDER}/${BUILD_FOLDER}/**'
        }
    }
}