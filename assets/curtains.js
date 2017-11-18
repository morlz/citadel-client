/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 681);
/******/ })
/************************************************************************/
/******/ ({

/***/ 681:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(682);


/***/ }),

/***/ 682:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}console.log('fast loaded');var Curtains=function(){function Curtains(){var _this=this;_classCallCheck(this,Curtains);this.opened=false;this.afkTimeout=30000;this._lastMouseMove=Date.now();this.curtainsElement=document.querySelector('.curtains');this.loaded={fast:true,big:false};window.document.addEventListener('mousemove',function(){return _this._updateLastMouseMove()});setInterval(function(){return _this._checkTimeout()},1000)}_createClass(Curtains,[{key:'open',value:function open(){var _this2=this;if(this.opened)return;if(!this.loaded.big)return;this.opened=true;setTimeout(function(){_this2.curtainsElement.classList.remove('curtainsActive');_this2.sctollToTop()},400)}},{key:'close',value:function close(){if(!this.opened)return;this.curtainsElement.classList.add('curtainsActive');this.opened=false}},{key:'sctollToTop',value:function sctollToTop(){//this._scrollTo(document.querySelector("html"), 0, 400)
this._scrollToTop()}},{key:'_updateLastMouseMove',value:function _updateLastMouseMove(){this._lastMouseMove=Date.now();if(!this.opened)this.open()}},{key:'_checkTimeout',value:function _checkTimeout(){if(Date.now()-this._lastMouseMove>this.afkTimeout&&document.body.clientWidth>699)this.close()}},{key:'_scrollTo',value:function _scrollTo(element,to,duration){var _this3=this;if(duration<=0)return;var difference=to-element.scrollTop;var perTick=difference/duration*10;setTimeout(function(){element.scrollTop=element.scrollTop+perTick;if(element.scrollTop===to)return;_this3._scrollTo(element,to,duration-10)},10)}},{key:'_scrollToTop',value:function _scrollToTop(){// easing functions http://goo.gl/5HLl8
Math.easeInOutQuad=function(t,b,c,d){t/=d/2;if(t<1){return c/2*t*t+b}t--;return-c/2*(t*(t-2)-1)+b};Math.easeInCubic=function(t,b,c,d){var tc=(t/=d)*t*t;return b+c*tc};Math.inOutQuintic=function(t,b,c,d){var ts=(t/=d)*t,tc=ts*t;return b+c*(6*tc*ts+-15*ts*ts+10*tc)};// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
var requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){window.setTimeout(callback,1000/60)}}();function scrollTo(to,callback,duration){// because it's so fucking difficult to detect the scrolling element, just move them all
function move(amount){document.documentElement.scrollTop=amount;document.body.parentNode.scrollTop=amount;document.body.scrollTop=amount}function position(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}var start=position(),change=to-start,currentTime=0,increment=20;duration=typeof duration==='undefined'?500:duration;var animateScroll=function animateScroll(){// increment the time
currentTime+=increment;// find the value with the quadratic in-out easing function
var val=Math.easeInOutQuad(currentTime,start,change,duration);// move the document.body
move(val);// do the animation unless its over
if(currentTime<duration){requestAnimFrame(animateScroll)}else{if(callback&&typeof callback==='function'){// the animation is done so lets callback
callback()}}};animateScroll()}scrollTo(0)}},{key:'_easeInOutFunction',value:function _easeInOutFunction(t){return t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1}}]);return Curtains}();var c1=document.querySelector('.leftCurtain .curt'),c2=document.querySelector('.rightCurtain .curt');var w=c1.width=c2.width=window.innerWidth,h=c1.height=c2.height=window.innerHeight,ctx1=c1.getContext('2d'),ctx2=c2.getContext('2d'),opts={len:20,count:50,baseTime:10,addedTime:10,dieChance:.05,spawnChance:1,sparkChance:.1,sparkDist:10,sparkSize:2,color:'hsl(hue,100%,light%)',baseLight:50,addedLight:10,// [50-10,50+10]
shadowToTimePropMult:6,baseLightInputMultiplier:.01,addedLightInputMultiplier:.02,cx:w/2,cy:h/2,repaintAlpha:.04,hueChange:.1},tick=0,lines=[],dieX=w/2/opts.len,dieY=h/2/opts.len,baseRad=Math.PI*2/6;ctx1.fillStyle=ctx2.fillStyle='black';ctx1.fillRect(0,0,w,h);ctx2.fillRect(0,0,w,h);function loop(){window.requestAnimationFrame(loop);++tick;ctx1.globalCompositeOperation=ctx2.globalCompositeOperation='source-over';ctx1.shadowBlur=ctx2.shadowBlur=0;ctx1.fillStyle=ctx2.fillStyle='rgba(0,0,0,alp)'.replace('alp',opts.repaintAlpha);ctx1.fillRect(0,0,w,h);ctx2.fillRect(0,0,w,h);ctx1.globalCompositeOperation=ctx2.globalCompositeOperation='lighter';if(lines.length<opts.count&&Math.random()<opts.spawnChance)lines.push(new Line);lines.map(function(line){line.step()})}function Line(){this.reset()}Line.prototype.reset=function(){this.x=0;this.y=0;this.addedX=0;this.addedY=0;this.rad=0;this.lightInputMultiplier=opts.baseLightInputMultiplier+opts.addedLightInputMultiplier*Math.random();this.color=opts.color.replace('hue',tick*opts.hueChange);this.cumulativeTime=0;this.beginPhase()};Line.prototype.beginPhase=function(){this.x+=this.addedX;this.y+=this.addedY;this.time=0;this.targetTime=opts.baseTime+opts.addedTime*Math.random()|0;this.rad+=baseRad*(Math.random()<.5?1:-1);this.addedX=Math.cos(this.rad);this.addedY=Math.sin(this.rad);if(Math.random()<opts.dieChance||this.x>dieX||this.x<-dieX||this.y>dieY||this.y<-dieY)this.reset()};Line.prototype.step=function(){++this.time;++this.cumulativeTime;if(this.time>=this.targetTime)this.beginPhase();var prop=this.time/this.targetTime,wave=Math.sin(prop*Math.PI/2),x=this.addedX*wave,y=this.addedY*wave;ctx1.shadowBlur=ctx2.shadowBlur=prop*opts.shadowToTimePropMult;ctx1.fillStyle=ctx1.shadowColor=ctx2.fillStyle=ctx2.shadowColor=this.color.replace('light',opts.baseLight+opts.addedLight*Math.sin(this.cumulativeTime*this.lightInputMultiplier));ctx1.fillRect(opts.cx+(this.x+x)*opts.len,opts.cy+(this.y+y)*opts.len,2,2);ctx2.fillRect(opts.cx+(this.x+x)*opts.len,opts.cy+(this.y+y)*opts.len,2,2);if(Math.random()<opts.sparkChance){var na=opts.cx+(this.x+x)*opts.len+Math.random()*opts.sparkDist*(Math.random()<.5?1:-1)-opts.sparkSize/2,nb=opts.cy+(this.y+y)*opts.len+Math.random()*opts.sparkDist*(Math.random()<.5?1:-1)-opts.sparkSize/2;ctx1.fillRect(na,nb,opts.sparkSize,opts.sparkSize);ctx2.fillRect(na,nb,opts.sparkSize,opts.sparkSize)}};loop();window.addEventListener('resize',function(){w=c1.width=c2.width=window.innerWidth;h=c1.height=c2.height=window.innerHeight;ctx1.fillStyle=ctx2.fillStyle='black';ctx1.fillRect(0,0,w,h);ctx2.fillRect(0,0,w,h);opts.cx=w/2;opts.cy=h/2;dieX=w/2/opts.len;dieY=h/2/opts.len});window.curtains=new Curtains;

/***/ })

/******/ });