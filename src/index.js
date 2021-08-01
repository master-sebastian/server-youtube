const express = require('express')
const app = express()
const env = require('./env')

const { google } = require("googleapis")
const service = google.youtube({
    version: 'v3',
    auth: env.apiKeyYoutube
})

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get("/api/search/videos", async (req, res)=>{
    let request = req
    let response = res
    let {channelId} = request.query
    let {pageToken} = request.query

    let filter = {
        part: [
            'snippet'
        ],
        type: 'video',
        order: 'date',
        maxResults: 20
    }

    filter.channelId = channelId

    if(pageToken !== ""){
        filter.pageToken = pageToken
    }

    service.search.list(filter).then(res => {
        response.json(res.data)
    })
    .catch(error => {
        console.error(error);
    });
})

app.get("/api/search/channel", async (req, res)=>{
    let request = req
    let response = res
    let {q} = request.query
    let {channelId} = request.query
    let {pageToken} = request.query

    let filter = {
        part: [
            'snippet'
        ],
        q: q,
        type: 'channel',
        maxResults: 1
    }

    filter.channelId = channelId

    if(pageToken !== ""){
        filter.pageToken = pageToken
    }

    service.search.list(filter).then(res => {
        response.json(res.data)
    })
    .catch(error => {
        console.error(error);
    });
})

app.get("/api/search/playlist", async (req, res)=>{
    let request = req
    let response = res
    let {q} = request.query
    let {channelId} = request.query
    let {pageToken} = request.query

    let filter = {
        part: [
            'snippet'
        ],
        q: q,
        type: 'playlist',
        maxResults: 20
    }

    filter.channelId = channelId

    if(pageToken !== ""){
        filter.pageToken = pageToken
    }

    service.search.list(filter).then(res => {
        response.json(res.data)
    })
    .catch(error => {
        console.error(error);
    });
})

app.get("/api/list/statistics", async (req, res)=>{
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

app.get("/api/list/snippet", async (req, res)=>{
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