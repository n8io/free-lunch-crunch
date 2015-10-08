// setTimeout runs in its own isolate scope, no need for IIFE
setTimeout(function() {
  // GIVEN INFORMATION
  var pixels = [
    'http://www.google.com/s2/favicons?domain=facebook.com',
    'http://www.google.com/s2/favicons?domain=plus.google.com',
    'http://www.google.com/s2/favicons?domain=twitter.com',
    'http://www.google.com/s2/favicons?domain=instagram.com'
  ];
  var cookies = [
    {name: 'cookie1', value: 'I like Tutles!', maxAge: 432000},
    {name: 'cookie2', value: 'I like money too, we should be friends.'}
  ];
  var indexCookieName = '_b9553c4_lpdi';
  var maxDrops = 5;
  // END GIVEN

  // ** set cookies **
  if(cookies.length) {
    var cookiesLen = cookies.length;

    while(cookiesLen--) {
      // write each cookie
      document.cookie = cookies[cookiesLen].name + '=' + cookies[cookiesLen].value + ';max-age=' + cookies[cookiesLen].maxAge;
    }
  }

  // ** drop zee pixels **
  if(pixels.length) {
    // http://stackoverflow.com/questions/10730362/get-cookie-by-name#answer-21125098
    var lpdiCookieValueRegex = new RegExp(indexCookieName + '=([^;]+)');

    // Leverage regex on that bad boy to parse out the value eliminating the
    // need to loop. Then if no matches are found we try to pull index 1 from
    // an empty array which safely returns undefined
    var cookieCurrentDropIndex = (document.cookie.match(lpdiCookieValueRegex) || [])[1];

    // Determine next drop index to use
    var nextDropIndex = cookieCurrentDropIndex ? parseInt(cookieCurrentDropIndex, 10) + 1 : 0;

    // If the next drop index is smaller than the pixel array
    if(nextDropIndex < pixels.length) {
      var lastIndexDropped;
      var stopIndex = nextDropIndex + maxDrops < pixels.length ? nextDropIndex + maxDrops : pixels.length;
      var div = document.createElement('div');

      div.style.display = 'none';

      while(nextDropIndex < stopIndex) {
        var singlePixel = document.createElement('img');

        singlePixel.src = pixels[nextDropIndex];
        div.appendChild(singlePixel);
        lastIndexDropped = nextDropIndex++; // Increment happens after this line is executed
      }

      document.body.appendChild(div);
      // write the indexCookie
      document.cookie = indexCookieName + '=' + lastIndexDropped;
    }
  }
});
