# ExpressJS && Apollo Server

This project integrate ExpressJS with [Apollo Express package](https://github.com/apollographql/apollo-server/tree/main/packages/apollo-server-express) and MongoDB usign Puglin [GraphQL-Compose for MongoDB](https://github.com/graphql-compose/graphql-compose-mongoose)

## Installation

Clone the repository to your machine
`git clone git@gitlab.com:vgr-dev/apollo-express.git`

Inside the folder install dependencies
`npm install`

Once ready Start the application
`npm run dev`

## Usage

Open your browser and start using the [Playground](http://localhost:4000/graphql)

For more information about GraphQL Query Structure visit [GraphQL Query Docs](https://graphql.org/learn/queries/)

### Examples

This command will Create a Single Register into MongoDB
    `mutation {
        userCreateOne(record: { name: "your name", email: "your@email" }){
            record{
            name
            email
            }
        }
    }`
