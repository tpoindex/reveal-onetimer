# reveal-onetimer
A [Reveal.js](https://revealjs.com/) plugin to animate fragments only once, so that
going to a previous slide shows final fragment state(s),
rather than tediously stepping through fragments backwards.

No one wants to see the same trick twice.


## Installation

Copy this repository into the plugin folder of your reveal.js presentation, i.e. ```plugin/onetimer```.

Add the plugin to the Reveal initialization https://revealjs.com/of your presentation, as shown:

### reveal 4.x

```javascript
<script src="plugin/onetimer/onetimer.js"></script>
// .. 
Reveal.initialize({
	// ...
	plugins: [
		// ..
		OneTimer,
	]
});
```

## License

[MIT licensed](https://en.wikipedia.org/wiki/MIT_License).

Copyright 2023 [Tom Poindexter](https://github.com/tpoindex)
