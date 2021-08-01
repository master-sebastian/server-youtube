const express = require('express')
const app = express()
const env = require('./env')
const jwt = require('jsonwebtoken')
const verifyToken = require('./middlewares/verifyToken')
const { google } = require("googleapis")

const service = google.youtube({
    version: 'v3',
    auth: env.apiKeyYoutube
})

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post("/api/login", (req, res)=>{
    
    const { username, password } =  req.body

    if(env.usersJWT.filter(user => user.username == username && user.password == password ).length > 0){
        jwt.sign({
            username,
            password
        },env.secretJWT,
        {
            expiresIn: env.expiresInJWT
        },
            (err, token)=>{
               if(err){
                   res.status(500).json({
                       message: "Error generating token"
                   })
               }else{
                   res.status(200).json({
                       token
                   })
               } 
            }
        )
    }else{
        res.status(400).json({
            message: "Invalid data"
        })
    }

})
    
app.get("/api/search/videos", verifyToken, async (req, res)=>{
    let request = req
    let response = res
    let {channelId} = request.query

    let filter = {
        part: [
            'snippet'
        ],
        type: 'video',
        order: 'date',
        maxResults: 20
    }

    filter.channelId = channelId

    service.search.list(filter).then(res => {
        response.json(res.data)
    })
    .catch(error => {
        console.error(error);
    });
})

app.get("/api/search/channel", verifyToken, async (req, res)=>{
    let request = req
    let response = res
    let {q} = request.query
    let {channelId} = request.query

    let filter = {
        part: [
            'snippet'
        ],
        q: q,
        type: 'channel',
        maxResults: 1
    }

    filter.channelId = channelId

    service.search.list(filter).then(res => {
        response.json(res.data)
    })
    .catch(error => {
        console.error(error);
    });
})

app.get("/api/search/playlist", verifyToken, async (req, res)=>{
    let request = req
    let response = res
    let {q} = request.query
    let {channelId} = request.query

    let filter = {
        part: [
            'snippet'
        ],
        q: q,
        type: 'playlist',
        maxResults: 20
    }

    filter.channelId = channelId

    service.search.list(filter).then(res => {
        response.json(res.data)
    })
    .catch(error => {
        console.error(error);
    });
})

app.get("/api/list/statistics", verifyToken, async (req, res)=>{
    let request = req
    let response = res
    let {videoId} = request.query
    service.videos.list({
        part:'statistics',
        id: videoId
    }).then(res => {
        response.json(res.data)
    })
    .catch(error => {
        console.error(error);
    });
})

app.get("/api/list/snippet", verifyToken, async (req, res)=>{
    let request = req
    let response = res
    let {videoId} = request.query
    service.videos.list({
        part:'snippet',
        id: videoId
    }).then(res => {
        response.json(res.data)
    })
    .catch(error => {
        console.error(error);
    });
})

app.listen(env.port, () => {
    console.log("run service en port: "+env.port)
})