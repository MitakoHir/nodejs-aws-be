import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'product-service',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack', 'serverless-dotenv-plugin'],
  package: { individually: true },
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    stage: "${opt:stage, 'dev'}",
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PG_HOST: "${env:PG_HOST}",
      PG_PORT: "${env:PG_PORT}",
      PG_DATABASE: "${env:PG_DATABASE}",
      PG_USERNAME: "${env:PG_USERNAME}",
      PG_PASSWORD: "${env:PG_PASSWORD}"
    },
  },
  functions: {
    getProductsList: {
      handler: 'handlers/get-products-list.getProductsList',
      events: [
        {
          http: {
            method: 'get',
            path: 'products',
            cors: true
          }
        }
      ],
      role: 'arn:aws:iam::879670539296:role/lambda-rds-exec'
    },
    getProductsById: {
      handler: 'handlers/get-products-by-id.getProductsById',
      events: [
        {
          http: {
            method: 'get',
            path: 'products/{productId}',
            cors: true
          }
        }
      ],
      role: 'arn:aws:iam::879670539296:role/lambda-rds-exec'
    },
    setProduct: {
      handler: 'handlers/set-product.setProduct',
      events: [
        {
          http: {
            method: 'post',
            path: 'products',
            cors: true
          }
        }
      ],
      role: 'arn:aws:iam::879670539296:role/lambda-rds-exec'
    },
    fillDatabaseWithInitValues: {
      handler: 'handlers/pg-pool-lambda.invoke'
    }
  }
}

module.exports = serverlessConfiguration;
