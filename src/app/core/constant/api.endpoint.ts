export const endpoints = {
  auth: {
    login: '/api/v1/authentication/login',
    verify2fa:'/api/v1/authentication/verify-2fa'
  },
  dashboard:{
    projects:'/api/v1/lookup/projects',
  projectDetails:'/api/v1/public/projects/',
  projectLotDetails:'/api/v1/public/projects/{projectId}/lot-mapping',
  referencePage:'/share/project/{projectId}/map'
  }
};
