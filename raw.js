(function() {
  // Make it async (non blocking)
  setTimeout(function() {
    // GIVEN INFORMATION
    var pixels = [
      'http://www.google.com/s2/favicons?domain=facebook.com',
      'http://www.google.com/s2/favicons?domain=plus.google.com',
      'http://www.google.com/s2/favicons?domain=twitter.com',
      'http://www.google.com/s2/favicons?domain=isntagram.com'
    ];
    var cookies = [
      {name: 'cookie1', value: 'I like Tutles!', maxAge: 432000},
      {name: 'cookie2', value: 'I like money too, we should be friends.'}
    ];
    var indexCookieName = '_b9553c4_lpdi';
    var maxDrops = 5;
    // END GIVEN

    var tempDocument = document;
    var indexCookieNameEq = indexCookieName + '=';
    var cookieArray = tempDocument.cookie.split(';');
    var cookieCurrentDropIndex;

    // ** set cookies **
    if(cookies.length) {
      for(var i = 0; i < cookies.length; i++) {
        // write each cookie
        tempDocument.cookie = cookies[i].name + '=' + cookies[i].value + ';max-age=' + cookies[i].maxAge;
      }
    }

    // ** drop zee pixels **
    if(pixels.length) {
      // find the indexCookie by name and set cookieCurrentDropIndex
      for(var n = 0; n < cookieArray.length; n++) {
        var cookie = cookieArray[n];

        while(cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1, cookie.length);
        }

        if(cookie.indexOf(indexCookieNameEq) === 0) {
          cookieCurrentDropIndex = cookie.substring(indexCookieNameEq.length, cookie.length);
        }
      }

      // determine next drop index to use
      var nextDropIndex = (cookieCurrentDropIndex && !isNaN(cookieCurrentDropIndex)) ? parseInt(cookieCurrentDropIndex, 10) + 1 : 0;

      // if the next drop index is within the array
      if(pixels.length > nextDropIndex) {
        var lastIndexDropped = 0;
        var stopIndex = nextDropIndex + maxDrops < pixels.length ? nextDropIndex + maxDrops : pixels.length;
        var div = tempDocument.createElement('div');

        div.style.display = 'none';

        for(var m = nextDropIndex; m < stopIndex; m++) {
          var singlePixel = tempDocument.createElement('img');

          singlePixel.src = pixels[m];
          div.appendChild(singlePixel);
          lastIndexDropped = m;
        }

        document.body.appendChild(div);
        // write the indexCookie
        tempDocument.cookie = indexCookieName + '=' + lastIndexDropped;
      }
    }
  });
})();
