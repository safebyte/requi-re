import test from 'ava';

process.env.NODE_ENV = 'test';
const m = require('./');

test(t => {
	const id = './fixture';
	t.is(require(id)(), 1);
	t.is(require(id)(), 2);
	t.is(require(id)(), 3);
	t.is(m(id)(), 1);
	t.is(m(id)(), 1);
	t.is(m(id)(), 1);
});
