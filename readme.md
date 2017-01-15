# requi-re [![Build Status](https://travis-ci.org/safebyte/requi-re.svg?branch=master)](https://travis-ci.org/safebyte/requi-re)

> Re-Require a module bypassing the [cache](https://nodejs.org/api/modules.html#modules_caching) when not in a production environment.

Useful for development purposes when you need to freshly require a module after modifying it.  

## Install

```
$ npm install --save requi-re
```

## Setup

By default, `requi-re` returns node's native `require`, in order to *not fuck things up* in bad setups.

Only when `NODE_ENV` is set to anything else than `production` (and is not `undefined`) all calls will return be fleshly required modules. 

There are various ways of setting `NODE_ENV` on different operation systems. To avoid cross-plattform problems, the usage of the module [cross-env](https://github.com/kentcdodds/cross-env) is recommended.

#### Defining the environment using the `package.json`
```
  "scripts": {
    "start": "cross-env NODE_ENV=production node app",
    "development": "cross-env NODE_ENV=development node app"
  }
```

Then start your app using `npm development` to enable cache-deletion when calling `requi-re`.  
Notice: `npm start` and any other scripts starting your app will continue to behave as usual.

## Usage

```js
// foo.js
let i = 0;
module.exports = () => ++i;
```

```js
require('./foo')();
//=> 1

require('./foo')();
//=> 2

// overwrite node's require for convenience
require = require('requi-re');

require('./foo')();
//=> 1

require('./foo')();
//=> 1
```


## Related

- [cross-env](https://github.com/kentcdodds/cross-env) - Recommended for defining `NODE_ENV`
- [require-uncached](https://github.com/sindresorhus/require-uncached) - Require a module bypassing the cache
- [clear-require](https://github.com/sindresorhus/clear-require) - Clear a module from the require cache


## License

`requi-re` is a fork of `require-uncached`: MIT © [Sindre Sorhus](https://sindresorhus.com)
