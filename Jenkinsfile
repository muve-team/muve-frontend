pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "my-docker-registry/muve-frontend:latest"  // 사용할 Docker 이미지 이름
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout') {
            steps {
                // GitHub에서 프로젝트 클론
                git credentialsId: 'github-credentials-id', url: 'https://github.com/muve-team/muve-frontend'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Docker 빌드 실행
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Docker 컨테이너에서 테스트 실행
                    sh 'docker run --rm $DOCKER_IMAGE npm run test'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Docker 레지스트리에 로그인 후 푸시
                    sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                    sh 'docker push $DOCKER_IMAGE'
                }
            }
        }
    }

    post {
        success {
            echo 'Docker image built and pushed successfully.'
        }
        failure {
            echo 'Build or test failed.'
        }
    }
}