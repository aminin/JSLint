// rhino.js
// 2009-09-11
/*
Copyright (c) 2002 Douglas Crockford  (www.JSLint.com) Rhino Edition
*/

// This is the Rhino companion to fulljslint.js.

/*global JSLINT */
/*jslint rhino: true, strict: false */

(function (a) {
	var e, i, j, input, fails = 0;

	if (!a.length) {
		print("Setup problem: this function expects the first argument to be the absolute path to fulljslint.js - no arguments passed");
		quit(1);
	}
	load(a[0]);
	if (typeof(JSLINT) === undefined) {
		print("Setup problem: this function expects the first argument to be the absolute path to fulljslint.js - the path " + a[0] + " does not contain the JSLINT object");
		quit(1);
	}
	if (a.length < 2) {
		print("Usage: jslint file.js");
		quit(1);
	}
	for (i = 1; i < a.length; i += 1) {
		input = readFile(a[i]);
		if (!input) {
			print("jslint: Couldn't open file '" + a[i] + "'.");
			fails += 1;
			continue;
		}
		if (!JSLINT(input, {bitwise: true, eqeqeq: true, immed: true,
				newcap: true, nomen: true, onevar: true, plusplus: true,
				regexp: true, rhino: true, undef: true, white: true})) {
			print("jslint: Problems found in " + a[i]);
			for (j = 0; j < JSLINT.errors.length; j += 1) {
				e = JSLINT.errors[j];
				if (e) {
					print('Lint at line ' + e.line + ' character ' +
							e.character + ': ' + e.reason);
					print((e.evidence || '').replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"));
					print('');
				}
			}
			fails += 1;
			continue;
		}
		print("jslint: No problems found in " + a[i]);
	}
	if (fails) {
		quit(2);
	}
}(arguments));