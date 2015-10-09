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

  var pixelsLen = pixels.length;
  var cookiesLen = cookies.length;

  // ** set cookies **
  if(cookiesLen) {
    while(cookiesLen--) {
      // write each cookie
      document.cookie = cookies[cookiesLen].name + '=' + cookies[cookiesLen].value + ';max-age=' + cookies[cookiesLen].maxAge;
    }
  }

  // ** drop zee pixels **
  if(pixelsLen) {
    // Leverage regex on that bad boy to parse out the value eliminating the
    // need to loop. Goes as follows:
    //  * Note when you see [...] in the info below, it is the shorthand for the code explained above it
    //  * RegExp(indexCookieName + '=([^;]+)')
    //      returns a regex to find the start of the cookie we're looking for
    //      http://stackoverflow.com/questions/10730362/get-cookie-by-name#answer-21125098
    //  * document.cookie.match(..)
    //      returns ["cookie=value", "value"] if a match is found, otherwise null (falsy)
    //  * ((...|| [])[1])
    //      return the second element of the match array, otherwise undefined (falsy)
    //  * +...
    //      returns integer representation of the match, othewise NaN (falsy)
    //  * ... + 1
    //      returns the cookie value + 1, otherwise adding NaN + 1 = NaN
    //  * ~~(...)
    //      returns the next index integer leveraging the double NOT bitwise operator for integer casting, otherwise 0
    var nextDropIndex = ~~(+((document.cookie.match(RegExp(indexCookieName + '=([^;]+)')) || [])[1]) + 1);

    // If the next drop index is smaller than the pixel array
    if(nextDropIndex < pixelsLen) {
      while(nextDropIndex <= (nextDropIndex + maxDrops < pixelsLen ? nextDropIndex + maxDrops : pixelsLen) - 1) {
        // A couple things we are assuming here:
        //  * The urls from the service have been cleaned, verified, and are trustingly encoded to be plugged in
        //  * We don't need a div wrapper or any special identifier on the img
        //  * Uris are to a natively sized 1px by 1px transparent png
        document.body.innerHTML += '<img src="' + pixels[nextDropIndex] + '" style="visibility:hidden;" />';
        document.cookie = indexCookieName + '=' + nextDropIndex++;
      }
    }
  }
});
