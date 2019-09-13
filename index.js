var AWS = require('aws-sdk');
var handler =  (event,context,callback) =>
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
  let id = (event.pathParameters || {}).idEnvio || false;
	switch(event.httpMethod)
	{
		case "GET":
    {
      if (id==false)
      {
        var params =
        {
          TableName: 'Envio',
          IndexName: 'EnviosPendientesIndex',
          Limit: '20',
          Select:  'ALL_PROJECTED_ATTRIBUTES'
        };
        dynamodb.scan(params, function(err, data) {
            if (err) console.log(err);
            else callback(null, {statusCode: 200, body: JSON.stringify(data.Items)});});
      }
      if (id!=false && id!=null)
      {
        var params =
        {
            TableName: 'Envio',
            KeyConditionExpression: 'id = :value',
            ExpressionAttributeValues: {':value' : id}
        };
        docClient.query(params, function(err, data) {
            if (err) console.log(err);
            else callback(null, {statusCode: 200, body: JSON.stringify(data.Items)});});
      }
      break;
    }
    case "POST":
    {
      if (id==false)
      {
        var idn=Math.random();
        var params = {
            TableName: 'Envio',
            Item: {
                id: ''+idn,
                fechaAlta: 'hoy',
                destino:'Mendoza',
                email: 'no@yahoo.com.ar',
                pendiente: '1'}
          };
        docClient.put(params, function(err, data) {
            if (err) console.log(err); // an error occurred
            else callback(null, {statusCode: 200, body: JSON.stringify(data.Items)});});
        }
        if (id!=false && id!=null)
        {
          var params = {
                TableName: 'Envio',
                Key: {"id": id,  "fechaAlta": "hoy"},
                UpdateExpression: "REMOVE pendiente",
                ReturnValues: 'ALL_NEW'
          };
          docClient.update(params, function(err, data) {
              if (err) console.log(err);
              else callback(null, {statusCode: 200, body: JSON.stringify(data.Items)});});

      }
      break;
    }
    default:
    {
      console.log("Metodo no soportado (" + event.httpMethod + ")");
      callback(null, { statusCode: 505 });
      break;
    }
  }
};

exports.handler = handler;
