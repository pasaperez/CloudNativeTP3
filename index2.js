var AWS = require('aws-sdk');

var handler = async (event,context,callback) =>
{
  var dynamodb = new AWS.DynamoDB(
    {
      apiVersion: '2012-08-10',
      endpoint: 'http://dynamodb​:8000',
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

  var params = {Limit: 10};
  dynamodb.listTables(params, function(err, data)
  {
      if (err) console.log(err); // an error occurred
      else console.log(data); // successful response
  });

  let id = (event.pathParameters || {}).id || false;
	switch(event.httpMethod)
	{
		case "GET":
    {
      callback(null, { body: JSON.stringify("GET pendiente "+ id) });

      break;
    }
    default:
    {
      console.log("Metodo no soportado (" + event.httpMethod + ")");
      callback(null, { statusCode: 501 });
    }
  }
};

exports.handler = handler;
