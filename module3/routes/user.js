import {
    createUser,
    updateUser,
    getUser,
    getAllUsers,
    deleteUser,
    getAutoSuggestUsers
} from "../controllers/user"
import { userSchema, validateSchema } from '../validator'


module.exports = function (router) {
    router.post('/user', validateSchema(userSchema), createUser)
    router.get('/user/:suggest/:limit', getAutoSuggestUsers)
    router.get('/user/:id', getUser)
    router.get('/users', getAllUsers)
    router.put('/user', updateUser)
    router.delete('/user/:id', deleteUser)
}