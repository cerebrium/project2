WELCOME TO COMPCOLL

This app is twitter comparison app that tries to 'fact check' twitter statements. The way that works is by scraping the data from twitter upon twitter user name and then matching it to the data scraped from news websites.

Going through this I had a lot of problems I needed to handle, most of which were handled. 

The first problem was scraping:
   Scraping is problematic for many reasons (the worst being that with contemporary news sites they change their html almost daily), all of which were attempted to be dealt with using regex. The cheerio library was suggested as an alternative, but I thought learning to use regex would benefit me more than using the cheerio library. Each of my scrapes then uses a different regex algorithm to get the data.

The second problem was string matching:
   This would ideally be solved using the psikitlearn library in python. Tackling learning python and that library in a week seemed impossible, so instead I used some arrays and the cosine compare method. Or at least that was the intention, nth dimensional angular comparison is beyond my mathmatical understanding, so I used the idea and worked it into a less advanced version that returns an acceptable result for the scope of this project. what follows is my repl.it were I worked through the logic.


-------------------------------------------  repl.it ------------------------------------------------------------------------
   // string

let string1 = 'string1 the democrats are trying to have me fired';
let string2 = 'string2 democrats attempt to have president fired';
let string3 = 'string3 we are doing well in the business world';
let string4 = 'string4 the republicans are trying to have me fired';
let string5 = 'string5 democrats making to have president fired';
let string6 = 'string6 we are doing well in the business world';

// objects

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

// array of string
let newArray = [string2, string3, string4, string5, string6];

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
      } else if (myGrandObject.match2.value < matchValue && myGrandObject.match1.value > myGrandObject.match2.value) {
        myGrandObject.match2.value = matchValue;
        myGrandObject.match2.string = myStringTwo;
      } else if (myGrandObject.match3.value < matchValue && myGrandObject.match2.value > myGrandObject.match3.value) {
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
  console.log(myGrandObject)
  console.log(myStringOne)
  console.log(arr)
};

comparisonGenerator(newArray, string1);

------------------------------------------ end of repl.it ------------------------------------------------------

Problem three: 
   Then I wanted to save multiple articles and delete all articles associated with the tweet selected. this works through some array indexing and checkbox systems. This is an area that could definetly use some work to optimize this data structure. 