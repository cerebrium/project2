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
// router.get(`/`, function(req, res) {
//     res.render('news/scraper')
//     })

router.get('/displayarticles', function(req, res) {
    console.log('-------------------------------------------------------------------------------')
    console.log('req tweet: ' + req.query.tweet)
    let searchstring = req.query.tweet.match(/[Trump|Hillary|Truth|Pelosi]/).toString()
    let hrefSearch = searchstring.toLowerCase();
    console.log('searchstring :' + searchstring)
    let newsName = 'breitbart';
    let async_One = function(cb) {
        axios.get(newsSites[0])
            .then(function(response) {
                let newsArray = [];
                let titleArray = [];
                let checkerHref = response.data.match(/href="(\w|.)[^"]*"{1}/gi);
                let checkerTitle = response.data.match(/title="(\w|.)[^"]*"{1}/gi);
                checkerTitle.forEach(function(ele) {
                    if (ele.includes(searchstring)) {
                        titleArray.push(ele);
                    }
                })
                checkerHref.forEach(function(ele) {
                    if (ele.includes(hrefSearch)) {
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
                let checkerHref = response.data.match(/href="(\w|.)[^"]*"{1}/gi);
                let checkerTitle = response.data.match(/title="(\w|.)[^"]*"{1}/gi);
                checkerTitle.forEach(function(ele) {
                    if (ele.includes(searchstring)) {
                        titleArray.push(ele);
                    }
                })
                checkerHref.forEach(function(ele) {
                    if (ele.includes(hrefSearch)) {
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
                let checkerHref = response.data.match(/href="(\w|.)[^"]*"{1}/gi);
                let checkerTitle = response.data.match(/title="(\w|.)[^"]*"{1}/gi);
                checkerTitle.forEach(function(ele) {
                    if (ele.includes(searchstring)) {
                        titleArray.push(ele);
                    }
                })
                checkerHref.forEach(function(ele) {
                    if (ele.includes(hrefSearch)) {
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
                let checkerHref = response.data.match(/href="(\w|.)[^"]*"{1}/gi);
                let checkerTitle = response.data.match(/title="(\w|.)[^"]*"{1}/gi);
                checkerTitle.forEach(function(ele) {
                    if (ele.includes(searchstring)) {
                        titleArray.push(ele);
                    }
                })
                checkerHref.forEach(function(ele) {
                    if (ele.includes(hrefSearch)) {
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
            let checkerHref = response.data.match(/href="(\w|.)[^"]*"{1}/gi);
            let checkerTitle = response.data.match(/title="(\w|.)[^"]*"{1}/g);
            checkerTitle.forEach(function(ele) {
                if (ele.includes(searchstring)) {
                    titleArray.push(ele);
                }
            })
            checkerHref.forEach(function(ele) {
                if (ele.includes(hrefSearch)) {
                    newsArray.push(ele);
                }
            })
            cb(null, newsArray, titleArray, newsName)
        })
    }

    async.series([async_One, async_Two, async_Three, async_Four, async_Five], function(err, results) {
        console.log(results)
        res.render('articles/displayarticles', {
            results : results,
            websites : newsSites,
            tweet: req.query.tweet,
            author: req.query.person
        })
        })
    })

    router.get('/displaytwitter', function(req, res) {
        axios.get(`https://twitter.com/${req.query.inputtext}`)
        .then(function(results) {
            let checkerSpan = results.data.match(/<p class="TweetTextSize TweetTextSize--normal js-tweet-text tweet-text" lang="en" data-aria-label-part="0">(\w|.)[^<]*/g);
            res.render('twitter/displaytwitter', {
                results: checkerSpan,
                person: req.query.inputtext
            });
        }).catch(function(err) {
            console.log(err)
            res.redirect('/profile')
        })
    })

    router.get('/favourites', function(req, res) {
        db.favourite.findAll()
        .then(function(tweets) {
            db.favarticletwo.findAll()
            .then(function(articles) {
                console.log('favourites are: ' + tweets.tweet)
                console.log('favarts are: ' + articles.title)
                res.render('favourites/favourites', {
                    articles, tweets
                })
            })
        })
    })

    router.post('/favourites', function(req, res) {
        console.log('inside favourites for each --------------------------------')
        db.favourite.findOrCreate({
            where : {
                tweet : req.body.tweet
            }
        })
        .then(function([favourite, created]) {
            favourite.createFavarticletwo({
                title : req.body.article
            }).then(function(data) {
                console.log('------------------------------------------------------------------')
                console.log(req.body.article)
                res.redirect('/compcoll/favourites')
        })
    })
})


module.exports = router;