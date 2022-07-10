# NodeAPI
All Endpoints 

//Checking email present or not 
POST - http://nodeapi-env.eba-vsznnvpe.ap-south-1.elasticbeanstalk.com/emailcheck
Body:
{
    "email":"kaushikghosh325dfg@gmail.com"
}


//Login
POST - http://nodeapi-env.eba-vsznnvpe.ap-south-1.elasticbeanstalk.com/login
Body:
{
    "email":"Kaushikghosh325@gmail.com",
    "password":"hefgbwejhrfjejfrf8"
}


//Signup
POST - http://nodeapi-env.eba-vsznnvpe.ap-south-1.elasticbeanstalk.com/signup
Body:
{
    "name":"Puka Ghosh",
    "email":"Kaushikghosh325@gmail.com",
    "password":"hefgbwejhrfjejfrf8",
    "phone":"9999999999"
}

//logout
POST -  http://nodeapi-env.eba-vsznnvpe.ap-south-1.elasticbeanstalk.com/logout
Body: Nothing


//Video Data
GET -  http://nodeapi-env.eba-vsznnvpe.ap-south-1.elasticbeanstalk.com/alldata


//Video Data insertion API
POST - http://nodeapi-env.eba-vsznnvpe.ap-south-1.elasticbeanstalk.com/insertdata
Body:
{
    "name":"97. Interleaving String",
    "videolink":"https://www.youtube.com/watch?v=s2R6S6iflDM"
}
