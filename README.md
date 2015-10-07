# free-lunch-crunch
Make this script smaller so you can get bigger.

![alt tag](https://raw.githubusercontent.com/n8io/free-lunch-crunch/master/crunched.png)

All,

In this repo you will find a script (raw.js) that we intend on using for pixel drops on the client. We believe we have optimized it a decent amount but wanted to open it up to anyone that is looking for a challenge.

Given:
    1. Must be cross browser and working on IE6+. Reference [caniuse.com](http://caniuse.com) for compatibility.
    2. Speed of execution on the client is not a concern.
    3. The functionality must remain the same (write 3 cookies and drop 4 hidden images onto the page).

Goal:
    Make the minimized script as small as possible to save across the wire. The current minimized, gzipped code is ~763B as shown above.

I am interested in seeing what all you brilliant minds can cook up.

## Getting started
1. `npm install`
2. `npm start'
3. Visit [http://localhost:3000/min.js](http://localhost:3000/min.js)

## Making changes
1. Edit raw.js as you see fit.
2. Hit the `/min.js` endpoint and evaluate your Dev Tools to check the size.
3. Repeat.

Submit your best attempts as pull requests. Good luck.