# NodeAPI
All Endpoints 

Currently AWS Beanstalk service got suspended from 2023 December
You can Download and test using the Body according the request Body


## Check if Email Exists

Checks whether an email address is already present in the system.

### Endpoint
**POST** http://nodeapi-env.eba-vsznnvpe.ap-south-1.elasticbeanstalk.com/emailcheck
### Request Body
```json
{
  "email": "kaushikghosh325dfg@gmail.com"
}
```


## Checking email present or not 
**POST** - http://nodeapi-env.eba-vsznnvpe.ap-south-1.elasticbeanstalk.com/emailcheck
### Request Body
```json
{
    "email":"kaushikghosh325dfg@gmail.com"
}
```


## Login
**POST** - http://nodeapi-env.eba-vsznnvpe.ap-south-1.elasticbeanstalk.com/login
### Request Body
```json
{
    "email":"Kaushikghosh325@gmail.com",
    "password":"hefgbwejhrfjejfrf8"
}
```

## Signup
**POST** - http://nodeapi-env.eba-vsznnvpe.ap-south-1.elasticbeanstalk.com/signup
### Request Body
```json
{
    "name":"Puka Ghosh",
    "email":"Kaushikghosh325@gmail.com",
    "password":"hefgbwejhrfjejfrf8",
    "phone":"9999999999"
}
```

## logout
**POST** -  http://nodeapi-env.eba-vsznnvpe.ap-south-1.elasticbeanstalk.com/logout
### Request Body
Nothing


## Video Data
**GET** -  http://nodeapi-env.eba-vsznnvpe.ap-south-1.elasticbeanstalk.com/alldata


## Video Data insertion API
**POST** - http://nodeapi-env.eba-vsznnvpe.ap-south-1.elasticbeanstalk.com/insertdata
### Request Body
{
    "name":"97. Interleaving String",
    "videolink":"https://www.youtube.com/watch?v=s2R6S6iflDM"
}
