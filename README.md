Junil Um  
http://blog.powerumc.kr

JS Lambda
=========
- It is possible lambda expression that can be used JavaScript.
- you just got a function F();

History
=======
- v1.1
  Fixed bug expression body. \(2013-07-22)
- v1.0
  Released v1.0 \(2013-07-21)

Use it
=======
Nuget
```js
PM> Install-Package JS.Lambda
```

Node.JS
```js
$ npm install js-lambda-expression

require('js-lambda-expression');
```

1. Simple Examples
===============

### Before
```js
    function func(a,b) {
        return a + b;
    }
    console.info( func(4,6) );

    // Result
    10
```

### After with JS-Lambda
```js
    var func = F("a,b => a + b");
    console.info( func(4,6) );
```

Or you can invoke directly

### Before
```js 
    function anonymousMethod(a,b) {
        return a + b;
    }
    console.info( anonymousMethod(4,6) );

    // Result
    10
```

### After with JS-Lambda
```js
    console.info( F("a,b => a + b")(4,6) );
```

2. Callback Examples
=================

### Before
```js
    function callback( func ) {
        if( func ) func();
    }

    callback( function() { console.info('My name is Junil Um'); } );
```

### After with JS-Lambda
```js
    callback(  F("() => console.info('My name is Junil Um');")  );

    // Result
    My name is Junil Um
```

3. With jQuery
===========

### Before
```js
    var li = $("item li");

    li.each( function(i, o) {
        $(o).addClass("some");
    } );
```

### After
```js
    var li = $("item li");

    li.each( F("(i, o) => $(o).addClass('some');") );

```
