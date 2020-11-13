import bcrypt from 'bcryptjs'

const users = [
    {
        name: "khalid",
        email: "khalid@gmail.com",
        password: bcrypt.hashSync('123456'),
    },
    {
        name: "Ahmed",
        email: "ahmed@gmail.com",
        password:bcrypt.hashSync('123456'),
    },
    {
        name: "admin",
        email: "admin@gmail.com",
        password:bcrypt.hashSync('123456'),
        isAdmin: true
    }
]
export default users