import { server } from "../server"

server.post('/user', (req, resp)=>{
    return "Created!"
})