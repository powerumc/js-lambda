//	JS-Lambda v1.1
//  ==============
//
//	Copyright 2013 Junil Um(엄준일)
//  =============================
//
//	LGPL LICENSE
//  http://blog.powerumc.kr
//	Date: 2013-07-21


var _DEBUG_ = _DEBUG_ || false;
var DEBUG = DEBUG || function(arg) { if( _DEBUG_ ) console.info(arg); };
var F = undefined;
;(function() {
	;"use strict";

	function INHERITANCE(CLASS, PARENT) {
		for(var p in PARENT) if(PARENT.hasOwnProperty(p)) CLASS[p] = PARENT[p];

		var PROXY 					= function() { };
		PROXY.prototype 			= PARENT.prototype;
		CLASS.prototype				= new PROXY();
		CLASS.prototype.constructor = CLASS;
	}

	function FUNC( args ) {

		var index = arguments.length - 1;

		return new Function([].slice.call(arguments, 0, index), arguments[index]);

	}



	function IQueryContext() {
		return (function() {
			IQueryContext.prototype.result = function() { throw "not implementation exception" };
		})();
	}

	INHERITANCE(IQueryContext, QueryContext);
	function QueryContext( expression ) {

		IQueryContext.apply(this, arguments);

		QueryContext.prototype.result = function() {

			var value = new LambdaExpression(expression);
			return value.execute(expression);

		}
	}

	function Expression( expression ) {
		this.expression = expression;
		this.body		= "";
		this.params		= [];
	}

	Expression.Lambda = function( expressionBody, expressionParams ) {
	};


	var LambdaExpression = (function(_base) { INHERITANCE(LambdaExpression, _base);
		function LambdaExpression( expression ) {
			_base.apply(this, arguments);

			var self 	= this,
				arr 	= getLambdaExpressionObject(self.expression),
				arrvar  = arr[0].split(","),
				body 	= arr[1],
				params  = [];

			self.body 	= body;
			for(var i=0; i<arrvar.length; i++) this.params.push( new ParameterExpression(arrvar[i]) );

			DEBUG(self);
		}

		function getLambdaExpressionObject( expressionString ) {
			expressionString = expressionString || "";

			var regex = /[\(^\)]?([\w,\s]*)[\)^\(]?\s=>\s([\{^\}]?.*[^;^\}][;\s\}^\{]?)/gi;
			var match = regex.exec(expressionString);
			if( match == null ) throw "It's correct expression string that " + expressionString;

			DEBUG("getLambdaExpressionObject.match: " + match);

			return match.slice(1, 3);
		}

		LambdaExpression.prototype.exec = function() {
		};

		return LambdaExpression;

	})(Expression);

	var ParameterExpression = (function(_base) { INHERITANCE(ParameterExpression, _base);
		function ParameterExpression(parameterName) {
			_base.apply(this, arguments);

			this.name = parameterName;
			DEBUG("ParameterExpression.act Set: " + this.name);
		}

		ParameterExpression.prototype.name = "";

		return ParameterExpression;
	})(Expression);


	F = function( expressionString ) {
		expressionString = expressionString || "";

		var expression 	= new LambdaExpression(expressionString),
			param 		= [],
			body		= expression.body;

		for(var i=0; i<expression.params.length; i++) param.push(expression.params[i].name);

		if( body[0] == '{') {
			body = "return (function() {" + body + "})();";
		} else {
			body = "return (function() { return (" + body + "); })();";
		}

		DEBUG("LambdaExpression.prototype.exec.param: " + param);
		DEBUG("LambdaExpression.prototype.exec.body : " + body);

		return new Function(param, body);
	}

})();



//var sum = F("(a,b) => { var c = a + b; return c; }");
var a = b = undefined;
console.info( "(a,b) => " + { return ""; });

console.info( sum(2,3) );