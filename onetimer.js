// onetimer - reveal.js plugin, Only animates fragments once, so that
//            going to a previous slide shows final fragment state(s),
//            rather than tediously stepping through fragments backwards.
//            No one wants to see the same trick twice.

var OneTimer = window.OneTimer  ||  (function() {

  var fragmentClassList = [];

  return {
      id: 'OneTimer',
      init: (deck) => {

          // each time we progress to the next slide, remove the "fragment" class from accumlated fragments.
          Reveal.on('slidechanged', event => {
              // event.previousSlide, event.currentSlide, event.indexh, event.indexv
              fragmentClassList.forEach(cl => cl.remove("fragment"));
              fragmentClassList = [];
          } );

          // on each fragment accumulate the fragment classList
          Reveal.on('fragmentshown', event => {
              // event.fragment
              fragmentClassList.push(event.fragment.classList);   // each classList is a DOMTokenList obj
          } );

      }
  }

})();
