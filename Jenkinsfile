pipeline {
    agent any

    environment {
        SONAR_TOKEN = credentials('SONAR_TOKEN')
        APP_VERSION = "v1.${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/ananyag279-boop/7.3HD-Jenkins-DevOps-Pipeline.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Code Quality') {
            steps {
                sh 'npm run coverage'

                sh '''
                ./node_modules/.bin/sonar-scanner \
                -Dsonar.token=$SONAR_TOKEN
                '''
            }
        }

        stage('Security Scan') {
            steps {
                sh 'npm audit || true'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker build -t hd-devops-app:$APP_VERSION .'

                sh '''
                docker rm -f hd-devops-container || true
                docker run -d --name hd-devops-container -p 3000:3000 hd-devops-app:$APP_VERSION
                '''
            }
        }

        stage('Release') {
            steps {
                sh 'echo "Application release version: $APP_VERSION"'
            }
        }

        stage('Monitoring') {
            steps {
                sh '''
                curl -f http://localhost:3000/health || exit 1
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed!'
        }
    }
}