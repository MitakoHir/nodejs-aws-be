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
  plugins: ['serverless-webpack'],
  package: { individually: true },
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    stage: "${opt:stage, 'dev'}",
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PG_HOST: 'nodejs-aws-db.cstefe38xxmz.us-east-1.rds.amazonaws.com',
      PG_PORT: 5432,
      PG_DATABASE: 'task4_1',
      PG_USERNAME: 'postgres',
      PG_PASSWORD: 'CTlvLlfciegwzwwHDWZg'
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
