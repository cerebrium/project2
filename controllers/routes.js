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
    let myTweet = req.query.tweet;

    let myGrandObject = {
        match1 : {
        value : 0,
        string : '',
        },
        match2 : {
        value : 0,
        string : '',
        },
        match3 : {
        value : 0,
        string : '',
        }
    }
    //COMPARISON CODE
    let comparison = function(myStringTwo, myStringOne) {
        let myArrayOne = myStringOne.split(' ');
        let myArrayTwo = myStringTwo.split(' ');
        let matchingArry = [];
        let matchValue = 0;
        for (a=0; a < myArrayOne.length; a++) {
        for (b=0; b < myArrayTwo.length; b++) {
            if (myArrayOne[a] === myArrayTwo[b]) {
            matchingArry.push(myArrayOne[a])
            matchingArry.forEach(function(ele) {
                matchValue += ele.length
            })
                if (myGrandObject.match1.value < matchValue) {
                myGrandObject.match1.value = matchValue;
                myGrandObject.match1.string = myStringTwo;
                } else if (myGrandObject.match2.value < matchValue) {
                myGrandObject.match2.value = matchValue;
                myGrandObject.match2.string = myStringTwo;
                } else if (myGrandObject.match3.value < matchValue) {
                myGrandObject.match3.value = matchValue;
                myGrandObject.match3.string = myStringTwo;
                }
                }  
            } 
        }
    };
    
    const comparisonGenerator = function(arr, myStringOne) {
        for (let i=0; i<arr.length; i++) {
        comparison(arr[i], myStringOne)
        }
    };
    


      // end of comparison code
    console.log('-------------------------------------------------------------------------------')
    console.log('req tweet: ' + req.query.tweet)
    let newsName = 'breitbart';
    let async_One = function(cb) {
        axios.get(newsSites[0])
            .then(function(response) {
                let newsObj = {};
                let titleObj = {};
                let checkerHref = response.data.match(/href="(\w|.)[^"]*"{1}/gi);
                let checkerTitle = response.data.match(/title="(\w|.)[^"]*"{1}/gi);
                comparisonGenerator(checkerHref, myTweet);
                newsObj = myGrandObject;
                comparisonGenerator(checkerTitle, myTweet);
                titleObj = myGrandObject;

                cb(null, newsObj, titleObj, newsName)
                myGrandObject = {
                    match1 : {
                    value : 0,
                    string : '',
                    },
                    match2 : {
                    value : 0,
                    string : '',
                    },
                    match3 : {
                    value : 0,
                    string : '',
                    }
                }
            })
    }

    let async_Two = function(cb) {
        let newsName = 'bbc';
        axios.get(newsSites[1])
            .then(function(response) {
                let newsObj = {};
                let titleObj = {};
                let checkerHref = response.data.match(/href="(\w|.)[^"]*"{1}/gi);
                let checkerTitle = response.data.match(/<h3 class="gs-c-promo-heading__title gel-pica-bold nw-o-link-split__text">(\w|.)[^<]*/gi);
                console.log(checkerTitle)
                comparisonGenerator(checkerHref, myTweet);
                newsObj = myGrandObject;
                comparisonGenerator(checkerTitle, myTweet);
                titleObj = myGrandObject;

                cb(null, newsObj, titleObj, newsName)
                myGrandObject = {
                    match1 : {
                    value : 0,
                    string : '',
                    },
                    match2 : {
                    value : 0,
                    string : '',
                    },
                    match3 : {
                    value : 0,
                    string : '',
                    }
                }
            })
    }

    let async_Three = function(cb) {
        let newsName = 'nytimes';
        axios.get(newsSites[2])
            .then(function(response) {
                let newsObj = {};
                let titleObj = {};
                let checkerHref = response.data.match(/href="(\w|.)[^"]*"{1}/gi);
                let checkerTitle = response.data.match(/<h2 class="css-1j9dxys e1xfvim30">(\w|.)[^<]*/gi);
                comparisonGenerator(checkerHref, myTweet);
                newsObj = myGrandObject;
                comparisonGenerator(checkerTitle, myTweet);
                titleObj = myGrandObject;

                cb(null, newsObj, titleObj, newsName)
                myGrandObject = {
                    match1 : {
                    value : 0,
                    string : '',
                    },
                    match2 : {
                    value : 0,
                    string : '',
                    },
                    match3 : {
                    value : 0,
                    string : '',
                    }
                }
            })
    }

    let async_Four = function(cb) {
        let newsName = 'infowars';
        axios.get(newsSites[3])
            .then(function(response) {
                let newsObj = {};
                let titleObj = {};
                let checkerHref = response.data.match(/href="(\w|.)[^"]*"{1}/gi);
                let checkerTitle = response.data.match(/title="(\w|.)[^"]*"{1}/gi);
                comparisonGenerator(checkerHref, myTweet);
                newsObj = myGrandObject;
                comparisonGenerator(checkerTitle, myTweet);
                titleObj = myGrandObject;

                cb(null, newsObj, titleObj, newsName)
                myGrandObject = {
                    match1 : {
                    value : 0,
                    string : '',
                    },
                    match2 : {
                    value : 0,
                    string : '',
                    },
                    match3 : {
                    value : 0,
                    string : '',
                    }
                }
            })
    }

    let async_Five = function(cb) {
        let newsName = 'foxnews';
        axios.get(newsSites[4])
        .then(function(response) {
            let newsObj = {};
            let titleObj = {};
            let checkerHref = response.data.match(/href="(\w|.)[^"]*"{1}/gi);
            let checkerTitle = response.data.match(/<h2 class="title"><(\w|.[^<])*/gi);
            comparisonGenerator(checkerHref, myTweet);
                newsObj = myGrandObject;
                comparisonGenerator(checkerTitle, myTweet);
                titleObj = myGrandObject;

            cb(null, newsObj, titleObj, newsName)
            myGrandObject = {
                match1 : {
                value : 0,
                string : '',
                },
                match2 : {
                value : 0,
                string : '',
                },
                match3 : {
                value : 0,
                string : '',
                }
            }
        })
    }

    async.series([async_One, async_Two, async_Three, async_Four, async_Five], function(err, results) {
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

    router.post('/favourites/delete', function(req, res){
        console.log('Tweet to delete -------------------' + req.body.tweet)
        db.favourite.findOne({
            where : {
                tweet : req.body.deleteTweet
            }
        }).then(function(deleter) {
            deleter.getFavarticletwos().then(function(articles) {
                console.log(deleter)
                db.favarticletwo.destroy({
                    where : {
                        favouriteId : deleter.id
                    }
                })
            }).then(function(articlefav) {
                db.favourite.destroy({
                    where : {
                        tweet : req.body.deleteTweet
                    }
                })
            })
        })
        .then(function(response) {
            res.redirect('/compcoll/favourites')
        })
    })

    router.get('/favourites', function(req, res) {
        db.favourite.findAll()
        .then(function(tweets) {
            db.favarticletwo.findAll()
            .then(function(articles) {
                console.log('favourites are: ' + tweets)
                console.log('favarts are: ' + articles)
                res.render('favourites/favourites', {
                    tweets, articles
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
            if (Array.isArray(req.body.article)) {
            req.body.article.forEach(function(ele) {
                favourite.createFavarticletwo({
                    title : ele
                }).then(function(data) {
            })
                console.log('------------------------------------------------------------------')
                console.log(req.body.article)
                res.redirect('/compcoll/favourites')
        })
    } else {
        favourite.createFavarticletwo({
            title : req.body.article
        }).then(function(data) {
            res.redirect('/compcoll/favourites')
        })
    }
    })
})

    router.put('/favourites/edit/:id', function(req, res) {
        db.favarticletwo.update({
            title : req.body.editEle
        },
        {
            where : {   
                id : req.params.id
            }
        }).then(function(result) {
            res.redirect('/compcoll/favourites')
        })
    })


module.exports = router;