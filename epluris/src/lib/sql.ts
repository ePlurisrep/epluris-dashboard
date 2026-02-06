import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('Missing DATABASE_URL environment variable')
}

// Configure the client for server-side usage. Adjust options as needed.
const sql = postgres(connectionString, {
  // example options: max: 1, ssl: true, etc.
  max: 1,
})

export default sql
