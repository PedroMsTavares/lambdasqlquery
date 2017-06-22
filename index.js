var AWS = require('aws-sdk')
var s3 = new AWS.S3({ region: "eu-west-1" });
var converter = require('json-2-csv');
const sql = require('mssql')




const config = {
	user: process.env.user,
	password: process.env.password,
	server: process.env.server,
	database: process.env.database,
	pool: {
		max: 10,
		min: 0,
		idleTimeoutMillis: 30000
	}
}


//execute an query 
exports.query = function(event, context, callback) {


	var queryfile = event.queryfile
	var querybucket = event.querybucket

	var outputbucket=event.outputbucket
	var outputname=event.outputname

	var paramsquery = {Bucket: querybucket, Key: queryfile};

	s3.getObject(paramsquery, function(err, data) {
		if (err) console.log(err, err.stack); 
		
		var query = data.Body.toString();      


		sql.connect(config, err => {
			console.log("connected to SQL")

			new sql.Request().query(query, (err, recordset) => {
				console.log("query executed")

				converter.json2csv(recordset.recordset, function (err, csv){
					console.log("Creating CSV")
        // ... error checks 
        if (err) callback(err.stack);

       //upload to bucket

       var paramsoutput = {
       	Body: csv, 
       	Bucket: outputbucket, 
       	Key: outputname
       };

       s3.putObject(paramsoutput, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     {

   	sql.close()
   	context.done(null,("report done")) 
   }        // successful response

});

   });


			})




		});


	});

}

