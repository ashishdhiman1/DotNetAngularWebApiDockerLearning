pipeline {
    agent any

    stages {
        stage('Build and Run Services') {
            steps {
                // Build and start clientApi service
                dir('clientApi') {
                    bat 'docker-compose up --build -d'
                }
                
                // Build and start clientUI service
                dir('clientUI') {
                    bat '''
                    docker build -t clientui .
                    docker rm -f ui-container || true  // Remove existing container if running
                    docker run -p 4201:80 --name ui-container clientui
                    '''
                }
            }
        }
    }
}
