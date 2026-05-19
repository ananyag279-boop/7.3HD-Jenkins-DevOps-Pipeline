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
        sh '''
           pkill -f "node server.js" || true
           nohup npm start > app.log 2>&1 &
            sleep 5
            '''
           }
        }

        stage('Release') {
    steps {
        sh '''
           echo "Application release version: $APP_VERSION"
           echo "$APP_VERSION" > release-version.txt
           '''
          }
        }

        stage('Monitoring') {
     steps {
        sh '''
          curl -f http://localhost:3000/health || exit 1
          echo "Monitoring check passed: application health endpoint is available"
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