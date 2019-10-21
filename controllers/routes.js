const express = require('express');
const router = express.Router();
const axios = require('axios');
const async = require('async');
const db = require('../models')
const newsSites = [
`https://www.breitbart.com/politics/`,
'https://www.bbc.com/news/world/us_and_canada',
'https://www.nytimes.com/section/politics',
'https://www.infowars.com/category/us-news/',
'https://www.foxnews.com/politics'
]

    
// MY ASYNC DATA GATHERING

///////    Get Routes
router.get(`/`, function(req, res) {
    res.render('news/scraper')
    })

router.post(`/results`, function(req, res) {
    res.redirect('/compcoll/results')
    console.log('---------------------------------------------------------')
    console.log('post')
})

router.get('/results', function(req, res) {
    let newsName = 'breitbart';
    let async_One = function(cb) {
        axios.get(newsSites[0])
            .then(function(response) {
                let newsArray = [];
                let titleArray = [];
                let checkerHref = response.data.match(/href="(\w|.)[^"]*"{1}/g);
                let checkerTitle = response.data.match(/title="(\w|.)[^"]*"{1}/g);
                checkerTitle.forEach(function(ele) {
                    if (ele.includes(req.query.inputtext)) {
                        titleArray.push(ele);
                    }
                })
                checkerHref.forEach(function(ele) {
                    if (ele.includes(req.query.inputtext)) {
                        newsArray.push(ele);
                    }
                })
                
                cb(null, newsArray, titleArray, newsName)
            })
    }

    let async_Two = function(cb) {
        let newsName = 'bbc';
        axios.get(newsSites[1])
            .then(function(response) {
                let newsArray = [];
                let titleArray = [];
                let checkerHref = response.data.match(/href="(\w|.)[^"]*"{1}/g);
                let checkerTitle = response.data.match(/title="(\w|.)[^"]*"{1}/g);
                checkerTitle.forEach(function(ele) {
                    if (ele.includes(req.query.inputtext)) {
                        titleArray.push(ele);
                    }
                })
                checkerHref.forEach(function(ele) {
                    if (ele.includes(req.query.inputtext)) {
                        newsArray.push(ele);
                    }
                })
                cb(null, newsArray, titleArray, newsName)
            })
    }

    let async_Three = function(cb) {
        let newsName = 'nytimes';
        axios.get(newsSites[2])
            .then(function(response) {
                let newsArray = [];
                let titleArray = [];
                let checkerHref = response.data.match(/href="(\w|.)[^"]*"{1}/g);
                let checkerTitle = response.data.match(/title="(\w|.)[^"]*"{1}/g);
                checkerTitle.forEach(function(ele) {
                    if (ele.includes(req.query.inputtext)) {
                        titleArray.push(ele);
                    }
                })
                checkerHref.forEach(function(ele) {
                    if (ele.includes(req.query.inputtext)) {
                        newsArray.push(ele);
                    }
                })
                cb(null, newsArray, titleArray, newsName)
            })
    }

    let async_Four = function(cb) {
        let newsName = 'infowars';
        axios.get(newsSites[3])
            .then(function(response) {
                let newsArray = [];
                let titleArray = [];
                let checkerHref = response.data.match(/href="(\w|.)[^"]*"{1}/g);
                let checkerTitle = response.data.match(/title="(\w|.)[^"]*"{1}/g);
                checkerTitle.forEach(function(ele) {
                    if (ele.includes(req.query.inputtext)) {
                        titleArray.push(ele);
                    }
                })
                checkerHref.forEach(function(ele) {
                    if (ele.includes(req.query.inputtext)) {
                        newsArray.push(ele);
                    }
                })
                cb(null, newsArray, titleArray, newsName)
            })
    }

    let async_Five = function(cb) {
        let newsName = 'foxnews';
        axios.get(newsSites[4])
        .then(function(response) {
            let newsArray = [];
            let titleArray = [];
            let checkerHref = response.data.match(/href="(\w|.)[^"]*"{1}/g);
            let checkerTitle = response.data.match(/title="(\w|.)[^"]*"{1}/g);
            checkerTitle.forEach(function(ele) {
                if (ele.includes(req.query.inputtext)) {
                    titleArray.push(ele);
                }
            })
            checkerHref.forEach(function(ele) {
                if (ele.includes(req.query.inputtext)) {
                    newsArray.push(ele);
                }
            })
            cb(null, newsArray, titleArray, newsName)
        })
    }

    async.series([async_One, async_Two, async_Three, async_Four, async_Five], function(err, results) {
        res.render('news/results', {
            results : results,
            websites : newsSites,
        })
        })
    })

    router.get('/searchtwitter', function(req, res) {
        res.render('twitter/searchtwitter')
    })

    router.get('/displaytwitter', function(req, res) {
        console.log(`https://twitter.com/${req.query.inputtext}`)
        axios.get(`https://twitter.com/${req.query.inputtext}`)
        .then(function(results) {
            let checkerSpan = results.data.match(/<p class="TweetTextSize TweetTextSize--normal js-tweet-text tweet-text" lang="en" data-aria-label-part="0">(\w|.)[^<]*/g);
            console.log(checkerSpan)
            res.render('twitter/displaytwitter', {
                results: checkerSpan,
                person: req.query.inputtext
            });
        }).catch(function(err) {
            console.log(err)
            res.redirect('/compcoll/searchtwitter')
        })
    })

module.exports = router;