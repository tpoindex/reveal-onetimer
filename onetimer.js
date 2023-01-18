// onetimer - reveal.js plugin, Only animates fragments once, so that
//            going to a previous slide shows final fragment state(s),
//            rather than tediously stepping through fragments backwards.
//            No one wants to see the same trick twice.

var OneTimer = window.OneTimer  ||  (function() {

  // slide mode (default), or immediate mode if set in Reveal.initialize()
  var immediateMode = false;

  // fragment list: in slide mode, accumulate frags until next page.
  //                in immediate mode, keep track of frags w/ special states
  var fragmentList = [];

  // list of effect style fix-ups, since removing "fragment" hinders other fragment effects
  // 'two step' fragment effects currently not handled, see readme
  const effects = [
     {effect: 'fade-out',                style: {prop: 'opacity',         value: '0'            } },
     {effect: 'semi-fade-out',           style: {prop: 'opacity',         value: '0.5'          } },
     {effect: 'fade-in-then-out',        style: {prop: 'opacity',         value: '0'            } },
     {effect: 'fade-in-then-semi-out',   style: {prop: 'opacity',         value: '0.5'          } },
     {effect: 'grow',                    style: {prop: 'transform',       value: 'scale(1.3)'   } },
     {effect: 'shrink',                  style: {prop: 'transform',       value: 'scale(0.7)'   } },
     {effect: 'strike',                  style: {prop: 'text-decoration', value: 'line-through' } },
     {effect: 'highlight-red',           style: {prop: 'color',           value: '#ff2c2d'      } },
     {effect: 'highlight-blue',          style: {prop: 'color',           value: '#17ff2e'      } },
     {effect: 'highlight-green',         style: {prop: 'color',           value: '#1b91ff'      } },
  ]

  // special handling for these fragment extras, when in immediate mode
  // these are 'two-step' extras.
  const special = [ 'fade-in-then-out', 'fade-in-then-semi-out', 'highlight-current-red', 'highlight-current-blue', 'highlight-current-green' ];


  function killFragment(frag, force) {

      // force == false, try to manage the two-step state
      if (! force ) {
	  // immediate mode special cases, kludgy state handling..
	  // check for special state handling class, if found and not already on fragmentList, add it, and stop
	  if (immediateMode && ! fragmentList.includes(frag)) {
	      var found = false;
	      special.forEach( sp => {
		  if (frag.classList.contains(sp)) {
		      fragmentList.push(frag);
		      found = true;
		  }
	      });
	      if (found) {
                  // pushed the frag onto the fragmentList, next time we apply
		  return;
	      }
	  } else if (immediateMode) {
              // apply precessing to all frags on the fragmentList
              fragmentList.forEach(frag => killFragment(frag, true));
	  }
      }

      // continue with regular handling and fix-ups
      frag.classList.remove("fragment");

      // apply extra effects to restore the fragment text appearence
      effects.forEach(ef => { 
          if (frag.classList.contains(ef.effect)) {
              frag.style[ef.style.prop] = ef.style.value;
          }
      });
  }

  return {
      id: 'OneTimer',
      init: (deck) => {

          // check if reveal config object has oneTimer.immediateMode
          var config = Reveal.getConfig();
          if (config && config.oneTimer && config.oneTimer.immediateMode) {
              immediateMode = config.oneTimer.immediateMode;
          }

          // each time we progress to the next slide, remove the "fragment" class from accumlated fragments.
          // and reset the fragmentList to empty
          Reveal.on('slidechanged', event => {
              // event.previousSlide, event.currentSlide, event.indexh, event.indexv
              fragmentList.forEach(frag => killFragment(frag, true));
              fragmentList = [];
          } );

          // on each fragment accumulate to apply on slide change, or
          // if immediateMode is true, remove the "fragment" class now.
          Reveal.on('fragmentshown', event => {
              // event.fragment
              if (immediateMode) {
                  killFragment(event.fragment, false);
              } else {
                  fragmentList.push(event.fragment);
              }
          } );

          // if immediateMode is true, remove all "fragment" on fragmenthidden now.
          Reveal.on('fragmenthidden', event => {
              // event.fragment
              if (immediateMode) {
                  killFragment(event.fragment, true);
              }
          } );

      }
  }

})();
