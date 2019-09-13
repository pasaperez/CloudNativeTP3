var AWS = require('aws-sdk');
var handler = function()
{
  var dynamodb = new AWS.DynamoDB(
    {
      apiVersion: '2012-08-10',
      endpoint: "http://localhost:8000",
      region: 'us-west-2',
      credentials:
      {
        accessKeyId: '2345',
        secretAccessKey: '2345'
      }
    }
  );
  var docClient = new AWS.DynamoDB.DocumentClient(
    {
      apiVersion: '2012-08-10',
      service: dynamodb
    }
  );

llamada(dynamodb,docClient);

}

var llamada = function(dynamodb, docClient)
{

  var params = {Limit: 10};
  dynamodb.listTables(params, function(err, data)
  {
      if (err) console.log(err); // an error occurred
      else console.log(data); // successful response
  });
}

handler();
