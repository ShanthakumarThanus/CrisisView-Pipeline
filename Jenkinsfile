pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS'
    }
    
    environment {
        CI = 'true'
        DOCKER_IMAGE = 'shanthakumarthanus/crisisview-frontend'
        DOCKER_TAG = 'v1'
    }
    
    stages {

        stage('Init') {
            steps {
                sh 'chmod 666 /var/run/docker.sock'
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
                echo '✅ Code récupéré'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install --legacy-peer-deps'
                }
            }
        }
        
        stage('Test') {
            steps {
                dir('frontend') {
                    sh 'npm test -- --coverage'
                }
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                dir('frontend') {
                    script {
                        scannerHome = tool 'SonarQubeScanner'
                    }
                    withSonarQubeEnv('SonarCloud') {
                        sh """
                            ${scannerHome}/bin/sonar-scanner
                        """
                    }
                }
            }
        }
        
        stage('Build') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }
        
        stage('Docker Build & Delivery') {
            steps {
                dir('frontend') {
                    script {
                        sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                        sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
                        
                        withCredentials([string(credentialsId: 'docker-hub-pwd', variable: 'DOCKER_PWD')]) {
                            sh "docker login -u shanthakumarthanus -p ${DOCKER_PWD}"
                            sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                            sh "docker push ${DOCKER_IMAGE}:latest"
                            sh 'docker logout'
                        }
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                dir('frontend') {
                    withCredentials([
                        string(credentialsId: 'azure-vm-ip', variable: 'VM_IP'),
                        string(credentialsId: 'azure-vm-user', variable: 'VM_USER'),
                        sshUserPrivateKey(credentialsId: 'azure-ssh-key', keyFileVariable: 'SSH_KEY')
                    ]) {
                        sh '''
                            mkdir -p ~/.ssh
                            ssh-keyscan -H ${VM_IP} >> ~/.ssh/known_hosts
                            ssh -i ${SSH_KEY} ${VM_USER}@${VM_IP} "sudo mkdir -p /var/www/crisisview"
                            scp -i ${SSH_KEY} -r .next/* ${VM_USER}@${VM_IP}:/var/www/crisisview/
                        '''
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo '🎉 Pipeline CrisisView terminé !'
        }
        failure {
            echo '❌ Pipeline échoué'
        }
    }
}