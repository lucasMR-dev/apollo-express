# ExpressJS && Apollo Server

This project integrate ExpressJS with [Apollo Express package](https://github.com/apollographql/apollo-server/tree/main/packages/apollo-server-express) and MongoDB usign Puglin [GraphQL-Compose for MongoDB](https://github.com/graphql-compose/graphql-compose-mongoose)

## Installation

Clone the repository to your machine

`git clone git@github.com:lucasMardones91/apollo-express.git`

Inside the folder install dependencies

`npm install`

Copy and configure the config file
` cp example.config.js src/config.js`

Once ready Start the application

`npm run dev`

## Usage

Open your browser and start using the [Playground](http://localhost:4000/graphql)

For more information about GraphQL Query Structure visit [GraphQL Query Docs](https://graphql.org/learn/queries/)

### Examples

This command will Create a Single Register into MongoDB

*** GraphQL Default Date format its 'YYYY-MM-DD' ***

##### Playground
```
  mutation{
    proyectCreateOne(record: {name: "", startpoint: "",endpoint:"",location:""}){
      record{
        name
        startpoint
        endpoint
        location
      }
    }
  }
```
##### With Variables
```
  mutation INSERT_ONE($name: String!, $start: Date!, $end: Date!, $loc: String!){
    createProyect(record:{name:$name, startpoint: $start, endpoint: $end, location: $loc}){
      record{
        name
        startpoint
        endpoint
        location
      }
    }  
  }
```

##### Upload Files, Firecamp Example
```
  mutation INSERT_ONE($user: String!, $employee: String!, $file: Upload!){
    employeeFileUpload(input:{user:$user, employee: $employee, file: $file}){
        employee
        imagepath
    }
  }
  -----------------------------------------
  Variables
  {
    "user": "userid",
    "employee": "employeeId"    
  }
  -----------------------------------------
  Files
  {
    "file": "file.extension"
  }
```