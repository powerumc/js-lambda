JS Lambda
=========
- It is possible lambda expression that can be used JavaScript.
- you just got a function F();


Simple Examples
===============
```js
    // Before
    function func(a,b) {
        return a + b;
    }
    console.info( func(4,6) );


    // ** After with JS-Lambda **
    var func = F("a,b => a + b");
    console.info( func(4,6) );

    // Result
    10
```

Or you can invoke directly

```js
    // Before
    function anonymousMethod(a,b) {
        return a + b;
    }
    console.info( anonymousMethod(4,6) );

    // ** After with JS-Lambda **
    console.info( F("a,b => a + b")(4,6) );

    // Result
    10
```

Callback Examples
=================
```js
    // Before
    function callback( func ) {
        if( func ) func();
    }

    callback( function() { console.info('My name is Junil Um); } );

    // ** After with JS-Lambda **
    callback(  F("() => console.info('My name is Junil Um');")  );

    // Result
    My name is Junil Um
```

With jQuery
===========
```js
    // Before
    var li = $("item li");

    li.each( function(o) {
        $(o).addClass("some");
    } );


    // ** After with JS-Lambda **
    var li = $("item li");

    li.each( F(" o => $(o).addClass('some');  ") );

```