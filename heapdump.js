'use strict';
const heapdump = require('heapdump');
const requi_re = require('./');

for (let i = 0; i < 100000; i++) {
	require('./fixture.js')();
}

heapdump.writeSnapshot(`require-${Date.now()}.heapsnapshot`);

for (let i = 0; i < 100000; i++) {
	requi_re('./fixture.js')();
}

heapdump.writeSnapshot(`requiRe-${Date.now()}.heapsnapshot`);
