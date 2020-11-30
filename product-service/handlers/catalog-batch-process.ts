import { SQSEvent } from 'aws-lambda';
import { ProductsService } from '../services/products-service';
import { SNS } from 'aws-sdk';

export async function catalogBatchProcess(event: SQSEvent) {
  const sns = new SNS({region : 'eu-west-1'});
  const products = event.Records.map(({body}) => body);
  console.log('catalogBatchProcess invoked, number of records:', products.length);
  try {
    const addedProducts = Promise.all(products.map(product => {
      const { title, description, price, count } = JSON.parse(product);
      return ProductsService.setProduct({title, description, price, count})
    }));
    await addedProducts;
    console.log('Items were succesfully added', JSON.stringify(products));

    await sns.publish({
      Subject: 'New board games were added',
      Message: JSON.stringify(products),
      TopicArn: process.env.SNS_ARN
    }, () => console.log('Email was succesfully sent')).promise();
  } catch (e) {
    console.error('There is an error while importing products from csv', e);
  }
}
