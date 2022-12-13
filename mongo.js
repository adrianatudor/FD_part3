const mongoose = require('mongoose')


if ((process.argv.length < 3) || (process.argv.length == 4) || (process.argv.length > 5))  {
    console.log('Please provide the password and the optionals parameters: node mongo.js <password> [person_name] [person_number]')
    process.exit(1)
 }

const password = process.argv[2]

const url = `mongodb+srv://fsstudent:${password}@cluster0.bnhjxug.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    if (process.argv[3]) {
      const name = process.argv[3]
      const number = process.argv[4]

      const person = new Person({
        name: name,
        number: number,
      })

      return person
        .save()
        .then(result => {
          console.log(`added ${name} number ${number} to phonebook`)
          mongoose.connection.close()
        })
    } else {
      console.log('phonebook:')

      Person
        .find({})
        .then(persons=> {
          persons.forEach(person =>
              console.log(`${person.name} ${person.number}`)
          )
          
          mongoose.connection.close()
        })
    }
  })
  .catch((err) => console.log(err))