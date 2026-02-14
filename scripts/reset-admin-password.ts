import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function resetAdminPassword() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const email = process.argv[2]
  const newPassword = process.argv[3]

  if (!email || !newPassword) {
    console.error('Usage: tsx scripts/reset-admin-password.ts <email> <new-password>')
    process.exit(1)
  }

  try {
    // Find user by email
    const users = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email,
        },
      },
    })

    if (users.docs.length === 0) {
      console.error(`User with email ${email} not found`)
      process.exit(1)
    }

    const user = users.docs[0]

    // Update password
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        password: newPassword,
      },
    })

    console.log(`✅ Password successfully reset for ${email}`)
    console.log(`You can now login with:`)
    console.log(`Email: ${email}`)
    console.log(`Password: ${newPassword}`)
    process.exit(0)
  } catch (error) {
    console.error('Error resetting password:', error)
    process.exit(1)
  }
}

resetAdminPassword()
