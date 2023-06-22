import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import mongoose from 'mongoose'
import typeDefs from './models/typeDefs.js'
import resolvers from './resolvers.js'

const MONGO_URL = 'mongodb://100.68.209.60:27017/paperweight'

// Connect to MongoDB server

try {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  
  console.log(`Connected to MongoDB at ${MONGO_URL}.`)
} catch (e) {
  console.log(`Failed to connect to MongoDB at ${MONGO_URL}: ${e}`)
}


// Start Apollo

const server = new ApolloServer({ typeDefs, resolvers })

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
})

console.log(`==== SERVER START: Available at ${url} ====`)