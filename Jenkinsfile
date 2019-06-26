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

        stage('Archive'){
            steps{
             archiveArtifacts artifacts: 'ng-demo/dist/**/*.*', caseSensitive: false
            }
        }
        
        stage('Deploy'){
            steps{
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'ec2',
                             transfers: [
                                 sshTransfer(
                                    cleanRemote: false,
                                    excludes: '',
                                    execCommand: 
                                    '''yum install -y httpd
                                        service httpd start''',
                                    execTimeout: 120000, 
                                    flatten: false, 
                                    makeEmptyDirs: true, 
                                    noDefaultExcludes: false,
                                    patternSeparator: '[, ]+',
                                    remoteDirectory: '/var/www/html/', 
                                    remoteDirectorySDF: false, 
                                    removePrefix: '', 
                                    sourceFiles: 'ng-demo/dist/demo/')
                            ], 
                            usePromotionTimestamp: false,
                            useWorkspaceInPromotion: false, 
                            verbose: false)
                    ]
                )
            }

        }
    }
}