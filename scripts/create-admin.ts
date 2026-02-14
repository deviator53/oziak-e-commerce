import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function createAdmin() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const email = process.argv[2] || 'admin@oziak.com'
  const password = process.argv[3] || 'admin123'

  try {
    // Check if user already exists
    const existingUsers = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email,
        },
      },
    })

    if (existingUsers.docs.length > 0) {
      console.log(`⚠️  User with email ${email} already exists`)
      console.log('Use reset-admin-password.ts to reset the password instead')
      process.exit(1)
    }

    // Create new admin user
    const user = await payload.create({
      collection: 'users',
      data: {
        email,
        password,
      },
    })

    console.log(`✅ Admin user created successfully!`)
    console.log(`Email: ${email}`)
    console.log(`Password: ${password}`)
    console.log(`\nLogin at: http://localhost:3000/admin`)
    process.exit(0)
  } catch (error) {
    console.error('Error creating admin user:', error)
    process.exit(1)
  }
}

createAdmin()
