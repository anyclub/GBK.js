var path = require('path');
var ststemjs = require('systemjs');
var GBK = require('../');
function test(name,GBK){
	var testStr = "时顺地?abc地"
		,testArr = [ 202, 177, 203, 179, 181, 216, 63, 97, 98, 99, 181, 216 ];
	var url = 'https://abc.com/?kk=abv&bb=火车头#top',
		URI = 'https://abc.com/?kk=abv&bb=%BB%F0%B3%B5%CD%B7#top',
		URIComponent = 'https%3A%2F%2Fabc.com%2F%3Fkk%3Dabv%26bb%3D%BB%F0%B3%B5%CD%B7%23top';	

	var runThrow = function(err){
		throw '['+name + '] ERROR: ' + err;
	}

	// console.log(GBK.encode(testStr).join());
	if(GBK.encode(testStr).join() != testArr.join()) runThrow('gbk编码错误!');
	if(GBK.decode(testArr) != testStr) runThrow('gbk解码错误!');
	if(GBK.URI.encodeURI(url) != URI) runThrow('URI编码错误!');
	if(GBK.URI.decodeURI(URI) != url) runThrow('URI解码错误!');
	if(GBK.URI.encodeURIComponent(url) != URIComponent) runThrow('URI编码错误!');
	if(GBK.URI.decodeURIComponent(URIComponent) != url) runThrow('URI解码错误!');	
	return name;
}

var testOK = console.log.bind(console,'Test OK --> ');

Promise.resolve(GBK)
.then(test.bind(null,'node'))
.then(testOK,console.error);

ststemjs.import(path.join(__dirname ,'../dist/gbk.js'))
.then(test.bind(null,'gbk_b'))
.then(testOK,console.error);

ststemjs.import(path.join(__dirname ,'../dist/gbk2.js'))
.then(test.bind(null,'gbk2_b'))
.then(testOK,console.error);