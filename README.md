# reveal-onetimer
A [Reveal.js](https://revealjs.com/) plugin to animate fragments only once, so that
going to a previous slide shows final fragment state(s),
rather than tediously stepping through fragments backwards and forwards again.

No one wants to see the same trick twice.


## Installation

Copy this repository into the plugin folder of your reveal.js presentation, i.e. ```plugin/reveal-onetimer```.

Source the onetimer.js plugin and add the plugin to the Reveal initialization of your presentation, as shown:

### reveal 4.x

```javascript
<script src="plugin/reveal-onetimer/onetimer.js"></script>
// .. 
Reveal.initialize({
        // ...
        oneTimer: {immediateMode: true},        // optional, default is 'false'

	// ...
	plugins: [
		// ..
		OneTimer,
	]
});
```

## Usage

OneTimer operates in one of two modes:  *slide mode* (default), or *immediate mode*.

Slide mode allows fragments to re-animate by navigating backwards 
and forwards while on the same slide.  When the end of a slide is reached, 
OneTimer removes the "fragment" class from each fragment before proceeding
to the next slide. After that, going backward in your deck will show the 
final state of each fragment on the previous slide, without stepping
backwards through each fragment's transition.  Slide mode is the default.

Immediate mode removes the "fragment" class on each fragment within a slide 
immediately when the fragment transition occurs. 
Navigating backwards within a slide will go to the previous slide, bypassing 
stepping through any previous fragment transitions.  Immediate mode is enabled 
by a specifying a 'oneTimer' object in the Reveal.initalize() method, as 
shown in the Installation section above.


## Demo

Two demo files are included (```demo_slide_mode.html``` and ```demo_immediate_mode.html```).  Copy
these into the top level of your Reveal.js distribution, and be sure to install the onetimer.js
plugin into the plugin/ directory.  


## Quirks

Reveal.js 4.x allows many added effects for fragments (i.e., 'grow', 'shrink', 
'strike', 'highlight-red', etc.), which are bound to the
"fragment" class.  Once OneTimer removes the "fragment" class, the added 
effects are re-enabled by OneTimer.  Additional handling is needed for 'two-step'
fragment classes.  Fragments with these extras must defer fragment cleanup until
the next fragment cycle or slide.


## License

[MIT licensed](https://en.wikipedia.org/wiki/MIT_License).

Copyright 2023 [Tom Poindexter](https://github.com/tpoindex)
