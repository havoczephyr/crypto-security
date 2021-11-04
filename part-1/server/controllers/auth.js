const users = []
const bcrypt = require("bcrypt")
const salt = bcrypt.genSaltSync(5)

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        const pwHash = bcrypt.hashSync(password, salt)
        if (users[i].username === username && users[i].pwHash === pwHash) {
          res.status(200).send(users[i])
          return
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
      console.log(req.body)
      console.log(`salt is here ${salt}`)
      const pwHash = bcrypt.hashSync(req.body.password, salt)
      
      users.push(pwHash)
      let user = {
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        pwHash
      }
      let hashedpassword = {...user}
      delete hashedpassword.pwHash


      console.log(`pw hash is here ${pwHash}`)
      res.status(200).send(req.body)
      }
        
        
    }