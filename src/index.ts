import 'reflect-metadata'
import { createConnection, getRepository, Raw } from 'typeorm'
import { User } from './entity/User'

createConnection().then(async connection => {
    const repository = getRepository(User)
    const firstName = 'Timber'

    let user = await repository.findOne({ where: { firstName } })

    if (!user) {
        const newUser = new User()
        newUser.firstName = 'Timber'
        newUser.lastName = 'Saw'
        newUser.age = 25

        console.log('Inserting a new user into the database...')
        await connection.manager.save(newUser)
        console.log('Saved a new user with id: ' + newUser.id)
    } else {
        console.log(`Found existing user with id: ${user.id}`)
    }

    console.log('Querying user by name with unquoted parameter...')

    user = await repository.findOne({
        firstName: Raw(
          alias => `${alias} = :firstName`, // No quotes
          { firstName }
        )
    })

    console.log(
      `Successfully found user by name with unquoted parameter. User id: ${user.id}`)

    console.log('Querying user by name with quoted parameter...')

    user = await repository.findOne({
        firstName: Raw(
          alias => `${alias} = ':firstName'`, // Quotes
          { firstName }
        )
    })

    console.log(
      `Successfully found user by name with quoted parameter. User id: ${user.id}`)
}).catch(error => console.log(error))
