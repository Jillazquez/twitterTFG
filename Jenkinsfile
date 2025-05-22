pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Run Mongo container') {
            steps {
                sh '''
                docker rm -f mongo-container || true
                docker run -d --name mongo-container -p 27017:27017 mongo:6
                '''
            }
        }

        stage('Run frontend npm run dev') {
            steps {
                sh '''
                docker rm -f frontend-container || true
                docker run -d --name frontend-container -p 5173:5173 -v $WORKSPACE/frontend:/app -w /app node:18-alpine sh -c "npm install && npm run dev -- --host 0.0.0.0"
                '''
            }
        }

        stage('Run backend npm start') {
            steps {
                sh '''
                docker rm -f backend-container || true
                docker run -d --name backend-container -p 3000:3000 \
                  -v ${WORKSPACE}/rsrs:/app \
                  -w /app \
                  --link mongo-container:mongo \
                  node:18-alpine \
                  sh -c "npm install && npm start"
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizado'
        }
    }
}
