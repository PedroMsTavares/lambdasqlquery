# lambdasqlquery

Lambda function to execute a SQL Query located on s3. The function converts the output into CSV and write it to the defined bucket with the defined name. 


To run the Lambda you will need to setup the following environment variables:

 - user : username to login in the SQL Server
 - password: password to login in the SQL Server
 - server: dns name / IP of the SQL server
 - database: name of the database that you want to query


The Lambda will require the following parameters on the event:

- queryfile : name of the file that contains the SQL query
- querybucket : name of the bucket that contains the file with the SQL query
- outputbucket : name of the bucket where will be writing the output
- outputname : name of the file where the output will be write



