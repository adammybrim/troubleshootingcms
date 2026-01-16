import { defineCliConfig } from '@sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'b0jjhurd',
    dataset: 'troubleshooting',
  },
  graphql: {
    playground: true,
  },
  http: {
    cors: {
      origin: ['http://localhost:3000', 'http://localhost:3333'],
      credentials: true,
    },
  },
  env: {
    development: {
      api: {
        projectId: 'b0jjhurd',
        dataset: 'troubleshooting',
      },
    },
    production: {
      api: {
        projectId: 'b0jjhurd',
        dataset: 'troubleshooting',
      },
    },
  },
  studioHost: 'troubleshootingcms',
})
