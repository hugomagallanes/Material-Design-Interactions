require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"colors":[function(require,module,exports){
exports.white = "#ffffff";

exports.black = "#000000";

exports.seekPink = "#E60278";

exports.cardBackground = "#ffffff";

exports.screenBackground = "#f5f5f5";

exports.cardShadow = "rgba(0,0,0,0.2)";



},{}],"materialComponents":[function(require,module,exports){
exports.fab = function(superLayer, color, icon, initialOpacity, initialScale) {
  var diameter, fabExternalPadding, newFab;
  diameter = 56;
  fabExternalPadding = 16;
  newFab = new Layer({
    backgroundColor: color,
    opacity: initialOpacity,
    width: diameter,
    height: diameter,
    scale: initialScale,
    borderRadius: diameter,
    superLayer: superLayer,
    html: icon,
    style: {
      "padding": "10px 0",
      "text-align": "center",
      "font-weight": "light",
      "font-size": "36px"
    },
    x: superLayer.maxX - (diameter + fabExternalPadding),
    y: superLayer.maxY - (diameter + fabExternalPadding)
  });
  return newFab;
};

exports.card = function(superLayer, initialColor, initialX, initialY, initialWidth, initialHeight, initialBorderRadius, initialOpacity, initialScale, shadowX, shadowY, shadowColor, shadowBlur, shadowSpread) {
  var cardLayer, cardObject;
  cardLayer = new Layer({
    backgroundColor: initialColor,
    x: initialX,
    y: initialY,
    width: initialWidth,
    height: initialHeight,
    borderRadius: initialBorderRadius,
    opacity: initialOpacity,
    scale: initialScale,
    superLayer: superLayer,
    shadowX: shadowX,
    shadowY: shadowY,
    shadowColor: shadowColor,
    shadowBlur: shadowBlur,
    shadowSpread: shadowSpread
  });
  cardLayer.states.add({
    initiaWidthHeight: {
      backgroundColor: initialColor,
      x: initialX,
      y: initialY,
      width: initialWidth,
      height: initialHeight,
      borderRadius: initialBorderRadius,
      opacity: initialOpacity,
      scale: initialScale,
      superLayer: superLayer,
      shadowX: shadowX,
      shadowY: shadowY,
      shadowColor: shadowColor,
      shadowBlur: shadowBlur,
      shadowSpread: shadowSpread
    },
    initialWidth: {
      backgroundColor: initialColor,
      x: initialX,
      width: initialWidth,
      borderRadius: initialBorderRadius,
      opacity: initialOpacity,
      scale: initialScale,
      superLayer: superLayer,
      shadowX: shadowX,
      shadowY: shadowY,
      shadowColor: shadowColor,
      shadowBlur: shadowBlur,
      shadowSpread: shadowSpread
    },
    initialHeight: {
      backgroundColor: initialColor,
      y: initialY,
      height: initialHeight,
      borderRadius: initialBorderRadius,
      opacity: initialOpacity,
      scale: initialScale,
      superLayer: superLayer,
      shadowX: shadowX,
      shadowY: shadowY,
      shadowColor: shadowColor,
      shadowBlur: shadowBlur,
      shadowSpread: shadowSpread
    }
  });
  cardObject = {
    initialX: initialX,
    initialY: initialY,
    initialWidth: initialWidth,
    initialHeight: initialHeight,
    initialBorderRadius: initialBorderRadius,
    initialOpacity: initialOpacity,
    initialScale: initialScale,
    cardLayer: cardLayer
  };
  return cardObject;
};



},{}],"materialInteractions":[function(require,module,exports){
var raiseLayerShadowMultiplier;

raiseLayerShadowMultiplier = 4;

exports.raiseAndLowerLayer = function(layer) {
  var inialShadowSpread, initialShadowBlur, lowerlayerAnimation, raiseLayerAnimation;
  initialShadowBlur = layer.shadowBlur;
  inialShadowSpread = layer.shadowSpread;
  raiseLayerAnimation = new Animation({
    layer: layer,
    properties: {
      scale: 1.01,
      shadowBlur: initialShadowBlur * raiseLayerShadowMultiplier,
      shadowSpread: inialShadowSpread * raiseLayerShadowMultiplier
    },
    time: 0.2,
    curve: "ease-in-out"
  });
  lowerlayerAnimation = new Animation({
    layer: layer,
    properties: {
      scale: 1,
      shadowBlur: initialShadowBlur,
      shadowSpread: inialShadowSpread
    },
    delay: 0.4,
    time: 0.4,
    curve: "ease-in-out"
  });
  raiseLayerAnimation.start();
  return raiseLayerAnimation.on("end", function() {
    return lowerlayerAnimation.start();
  });
};

exports.raiseLayer = function(layer) {
  var raiseLayerAnimation;
  raiseLayerAnimation = new Animation({
    layer: layer,
    properties: {
      scale: 1.01,
      shadowBlur: layer.shadowBlur * raiseLayerShadowMultiplier,
      shadowSpread: layer.shadowSpread * raiseLayerShadowMultiplier
    },
    time: 0.2,
    curve: "ease-in-out"
  });
  return raiseLayerAnimation.start();
};

exports.expandHorizontally = function(layer, animationDelay) {
  var exandHorizontallyAnimation;
  exandHorizontallyAnimation = new Animation({
    layer: layer,
    properties: {
      width: layer.superLayer.width,
      x: layer.superLayer.x
    },
    delay: animationDelay,
    time: 0.2,
    curve: "ease-in-out"
  });
  return exandHorizontallyAnimation.start();
};

exports.shrinkHorizontally = function(layer, animationDelay) {
  layer.states.animationOptions = {
    delay: animationDelay,
    time: 0.2,
    curve: "ease-in-out"
  };
  return layer.states["switch"]("initialWidth");
};

exports.expandVertically = function(layer, animationDelay) {
  var expandVerticallyAnimation;
  expandVerticallyAnimation = new Animation({
    layer: layer,
    properties: {
      height: layer.superLayer.height,
      y: layer.superLayer.y
    },
    delay: animationDelay,
    time: 0.2,
    curve: "ease-in-out"
  });
  return expandVerticallyAnimation.start();
};

exports.shrinkVertically = function(layer, animationDelay) {
  layer.states.animationOptions = {
    delay: animationDelay,
    time: 0.2,
    curve: "ease-in-out"
  };
  return layer.states["switch"]("initialHeight");
};

exports.rotateLayer = function(layer, rotationAngle) {
  var rotateAnimation;
  rotateAnimation = new Animation({
    layer: layer,
    properties: {
      rotation: rotationAngle
    },
    time: 0.2,
    curve: "ease-in-out"
  });
  return rotateAnimation.start();
};

exports.moveLayer = function(layer, moveByX, moveByY, moveDelay) {
  var moveAnimation;
  moveAnimation = new Animation({
    layer: layer,
    properties: {
      x: layer.x + moveByX,
      y: layer.y + moveByY
    },
    delay: moveDelay,
    time: 0.2,
    curve: "ease-in-out"
  });
  return moveAnimation.start();
};

exports.rippleEffect = function(touchX, touchY, layer) {
  var ripple, rippleAnimation;
  layer.clip = true;
  ripple = new Layer({
    borderRadius: "50%",
    scale: 0,
    opacity: .5,
    superLayer: layer,
    backgroundColor: layer.backgroundColor,
    brightness: 75,
    midX: touchX,
    midY: touchY,
    index: 0,
    force2d: true
  });
  rippleAnimation = ripple.animate({
    properties: {
      scale: layer.width / 50,
      clip: true,
      opacity: 0
    },
    curve: "ease-out",
    time: .3
  });
  return rippleAnimation.on(Events.AnimationEnd, function() {
    return ripple.destroy();
  });
};

exports.animateIconBounds = function(icon, iconBoundsColor) {
  var iconTapBounds;
  iconTapBounds = new Layer({
    backgroundColor: iconBoundsColor,
    opacity: 0.5,
    brightness: 75,
    width: 45,
    height: 45,
    borderRadius: 45,
    midX: icon.midX,
    midY: icon.midY
  });
  iconTapBounds.animate({
    properties: {
      opacity: 0
    },
    curve: "ease-out",
    time: 0.5
  });
  return iconTapBounds.on(Events.AnimationEnd, function() {
    iconTapBounds.animate({
      properties: {
        opacity: 0
      },
      curve: "ease-in-out"
    });
    return iconTapBounds.destroy();
  });
};

exports.appearFromCentre = function(layer, animationDelay) {
  var animation;
  layer.bringToFront();
  animation = new Animation({
    layer: layer,
    properties: {
      opacity: 1,
      scale: 1
    },
    delay: animationDelay,
    curve: "spring(100,20,25)"
  });
  return animation.start();
};

exports.showWithDelay = function(layer, animationDelay) {
  var animation;
  layer.bringToFront();
  animation = new Animation({
    layer: layer,
    properties: {
      opacity: 1,
      scale: 1
    },
    delay: animationDelay,
    time: 0.2,
    curve: "ease-in-out"
  });
  return animation.start();
};



},{}]},{},[])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdmFybmF1dG92aWMvRHJvcGJveC8wNiAtIFRoYXRCYWxkVVhHdXkvTWF0ZXJpYWwtRGVzaWduLUludGVyYWN0aW9ucy9NYXRlcmlhbENvbXBvbmVudHMuZnJhbWVyL21vZHVsZXMvY29sb3JzLmNvZmZlZSIsIi9Vc2Vycy92YXJuYXV0b3ZpYy9Ecm9wYm94LzA2IC0gVGhhdEJhbGRVWEd1eS9NYXRlcmlhbC1EZXNpZ24tSW50ZXJhY3Rpb25zL01hdGVyaWFsQ29tcG9uZW50cy5mcmFtZXIvbW9kdWxlcy9tYXRlcmlhbENvbXBvbmVudHMuY29mZmVlIiwiL1VzZXJzL3Zhcm5hdXRvdmljL0Ryb3Bib3gvMDYgLSBUaGF0QmFsZFVYR3V5L01hdGVyaWFsLURlc2lnbi1JbnRlcmFjdGlvbnMvTWF0ZXJpYWxDb21wb25lbnRzLmZyYW1lci9tb2R1bGVzL21hdGVyaWFsSW50ZXJhY3Rpb25zLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0VBLE9BQU8sQ0FBQyxLQUFSLEdBQWdCLFNBQWhCLENBQUE7O0FBQUEsT0FDTyxDQUFDLEtBQVIsR0FBZ0IsU0FEaEIsQ0FBQTs7QUFBQSxPQUVPLENBQUMsUUFBUixHQUFtQixTQUZuQixDQUFBOztBQUFBLE9BSU8sQ0FBQyxjQUFSLEdBQXlCLFNBSnpCLENBQUE7O0FBQUEsT0FLTyxDQUFDLGdCQUFSLEdBQTJCLFNBTDNCLENBQUE7O0FBQUEsT0FPTyxDQUFDLFVBQVIsR0FBcUIsaUJBUHJCLENBQUE7Ozs7O0FDWUEsT0FBTyxDQUFDLEdBQVIsR0FBYyxTQUFDLFVBQUQsRUFBYSxLQUFiLEVBQW9CLElBQXBCLEVBQTBCLGNBQTFCLEVBQTBDLFlBQTFDLEdBQUE7QUFFYixNQUFBLG9DQUFBO0FBQUEsRUFBQSxRQUFBLEdBQVcsRUFBWCxDQUFBO0FBQUEsRUFDQSxrQkFBQSxH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Z2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiIyBVc2UgdGhpcyBmaWxlIHRvIGRlZmluZSBjb2xvciBhbmQgc2hhZG93IGRlZmluaXRpb25zXG5cbmV4cG9ydHMud2hpdGUgPSBcIiNmZmZmZmZcIlxuZXhwb3J0cy5ibGFjayA9IFwiIzAwMDAwMFwiXG5leHBvcnRzLnNlZWtQaW5rID0gXCIjRTYwMjc4XCJcblxuZXhwb3J0cy5jYXJkQmFja2dyb3VuZCA9IFwiI2ZmZmZmZlwiXG5leHBvcnRzLnNjcmVlbkJhY2tncm91bmQgPSBcIiNmNWY1ZjVcIlxuXG5leHBvcnRzLmNhcmRTaGFkb3cgPSBcInJnYmEoMCwwLDAsMC4yKVwiIiwiIyBUaGlzIG1vZHVsZSBkZWZpbmVzIHRoZSBNYXRlcmlhbCBEZXNpZ24gY29tcG9uZW50cywgc3VjaCBhcyBjYXJkcywgYnV0dG9ucyBldGNcbiMgVGhlc2UgY29tcG9uZW50cyBtYXkgYWx0ZXJuYXRpdmVseSBiZSBkZWZpbmVkIGluIFNrZXRjaCBhbmQgaW1wb3J0ZWQgaW50byB5b3VyIHByb2plY3QsXG4jIGJ1dCBzb21ldGltZXMgaXQgaXMgYmV0dGVyIHRvIGNyZWF0ZSB0aGVtIHByb2dyYW1hdGljYWxseSAoZS5nLiB3aGVuIHlvdSB3YW50IHRvIHBhcmFtZXRyaXNlIFxuIyBzb21lIG9mIHRoZSBvYmplY3RzIHByb3BlcnRpZXMpXG5cbiMgQWltIHRvIGRlZmluZSB0aGUgZ2VvbWV0cnksIGJ1dCBub3QgYmVoYXZpb3VyIG9mIGNvbXBvbmVudHMgaW4gdGhpcyBtb2R1bGVcbiMgSGFyZCBhbmQgZmFzdCBydWxlcyAobGlrZSB0aGUgc2l6ZSBvZiB0aGUgRkFCKSBzaG91bGQgYmUgZGVmaW5lZCBoZXJlLCB3aGlsZSB0cmFuc2llbnQgYW5kIFxuIyB2YXJpYWJsZSBwcm9wZXJ0aWVzIHN1Y2ggYXMgb3BhY2lsdHkgYW5kIGNvbG9yLCBzaG91bGQgYmUgcGFzc2VkIGluXG5cblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgVGhlIE1hdGVyaWFsIERlc2lnbiBGbG9hdGluZyBBY3Rpb24gQnV0dG9uIChGQUIpIFxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0cy5mYWIgPSAoc3VwZXJMYXllciwgY29sb3IsIGljb24sIGluaXRpYWxPcGFjaXR5LCBpbml0aWFsU2NhbGUpIC0+XG5cblx0ZGlhbWV0ZXIgPSA1NlxuXHRmYWJFeHRlcm5hbFBhZGRpbmcgPSAxNlxuXG5cdG5ld0ZhYiA9IG5ldyBMYXllclxuXHRcdGJhY2tncm91bmRDb2xvcjogY29sb3Jcblx0XHRvcGFjaXR5OiBpbml0aWFsT3BhY2l0eVxuXHRcdHdpZHRoOiBkaWFtZXRlclxuXHRcdGhlaWdodDogZGlhbWV0ZXJcblx0XHRzY2FsZTogaW5pdGlhbFNjYWxlXG5cdFx0Ym9yZGVyUmFkaXVzOiBkaWFtZXRlclxuXHRcdHN1cGVyTGF5ZXI6IHN1cGVyTGF5ZXJcblx0XHRodG1sOiBpY29uXG5cdFx0c3R5bGU6XG5cdFx0XHRcInBhZGRpbmdcIiA6IFwiMTBweCAwXCJcblx0XHRcdFwidGV4dC1hbGlnblwiIDogXCJjZW50ZXJcIlxuXHRcdFx0XCJmb250LXdlaWdodFwiIDogXCJsaWdodFwiXG5cdFx0XHRcImZvbnQtc2l6ZVwiIDogXCIzNnB4XCJcblx0XHR4OiBzdXBlckxheWVyLm1heFggLSAoZGlhbWV0ZXIgKyBmYWJFeHRlcm5hbFBhZGRpbmcpXG5cdFx0eTogc3VwZXJMYXllci5tYXhZIC0gKGRpYW1ldGVyICsgZmFiRXh0ZXJuYWxQYWRkaW5nKVxuXG5cdHJldHVybiBuZXdGYWJcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgQSBzaW1wbGUgY2FyZCwgdGhhdCBhbGxvd3MgeW91IHRvIHNwZWNpZnkgaXQncyBpbml0aWFsIGdlb21ldHJ5IChwb3NpdGlvbiBhbmQgc2l6ZSlcbiMgVGhpcyBpcyB1c2VmdWwsIGJlY2F1c2UgeW91IGNhbiB0aGVuIGV4cGFuZCB0aGlzIGNhcmQgQU5EIHJldHVybiBpdCB0byBpdCdzIG9yaWdpbmFsIHNpemVcbiMgYnkgYWNjZXNzaW5nIGl0J3MgaW5pdGlhbCBnZW9tZXRyeSBcbiNcbiMgVE9ETzogaW52ZXN0aWdhdGUgaWYgdGhlcmUgaXMgYSBiZXR0ZXIgd2F5IHRvIHN0b3JlIHRoZSBkaWZmZXJlbnQgc3RhdGVzIG9mIHRoZSBjYXJkIG9iamVjdFxuI1x0XHRlLmcuIHVzaW5nIHN0YXRlcyB0byBzdG9yZSB0aGUgaW5pdGlhbCBzdGF0ZSwgaW5zdGVhZCBvZiBoYXZpbmcgaXQgYXMgcHJvcGVydGllc1xuI1xuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmV4cG9ydHMuY2FyZCA9IChzdXBlckxheWVyLCBpbml0aWFsQ29sb3IsIGluaXRpYWxYLCBpbml0aWFsWSwgaW5pdGlhbFdpZHRoLCBpbml0aWFsSGVpZ2h0LCBpbml0aWFsQm9yZGVyUmFkaXVzLCBpbml0aWFsT3BhY2l0eSwgaW5pdGlhbFNjYWxlLCBzaGFkb3dYLCBzaGFkb3dZLCBzaGFkb3dDb2xvciwgc2hhZG93Qmx1ciwgc2hhZG93U3ByZWFkKSAtPlxuXHRcblx0IyBjcmVhdGUgYSBsYXllciByZXByZXNlbnRpbmcgdGhlIGNhcmRcblx0Y2FyZExheWVyID0gbmV3IExheWVyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBpbml0aWFsQ29sb3Jcblx0XHR4OiBpbml0aWFsWFxuXHRcdHk6IGluaXRpYWxZXG5cdFx0d2lkdGg6IGluaXRpYWxXaWR0aFxuXHRcdGhlaWdodDogaW5pdGlhbEhlaWdodFxuXHRcdGJvcmRlclJhZGl1czogaW5pdGlhbEJvcmRlclJhZGl1c1xuXHRcdG9wYWNpdHk6IGluaXRpYWxPcGFjaXR5XG5cdFx0c2NhbGU6IGluaXRpYWxTY2FsZVxuXHRcdHN1cGVyTGF5ZXI6IHN1cGVyTGF5ZXJcblx0XHRzaGFkb3dYOiBzaGFkb3dYXG5cdFx0c2hhZG93WTogc2hhZG93WVxuXHRcdHNoYWRvd0NvbG9yOiBzaGFkb3dDb2xvclxuXHRcdHNoYWRvd0JsdXI6IHNoYWRvd0JsdXJcblx0XHRzaGFkb3dTcHJlYWQ6IHNoYWRvd1NwcmVhZFxuXG5cdGNhcmRMYXllci5zdGF0ZXMuYWRkXG5cdFx0aW5pdGlhV2lkdGhIZWlnaHQ6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGluaXRpYWxDb2xvclxuXHRcdFx0eDogaW5pdGlhbFhcblx0XHRcdHk6IGluaXRpYWxZXG5cdFx0XHR3aWR0aDogaW5pdGlhbFdpZHRoXG5cdFx0XHRoZWlnaHQ6IGluaXRpYWxIZWlnaHRcblx0XHRcdGJvcmRlclJhZGl1czogaW5pdGlhbEJvcmRlclJhZGl1c1xuXHRcdFx0b3BhY2l0eTogaW5pdGlhbE9wYWNpdHlcblx0XHRcdHNjYWxlOiBpbml0aWFsU2NhbGVcblx0XHRcdHN1cGVyTGF5ZXI6IHN1cGVyTGF5ZXJcblx0XHRcdHNoYWRvd1g6IHNoYWRvd1hcblx0XHRcdHNoYWRvd1k6IHNoYWRvd1lcblx0XHRcdHNoYWRvd0NvbG9yOiBzaGFkb3dDb2xvclxuXHRcdFx0c2hhZG93Qmx1cjogc2hhZG93Qmx1clxuXHRcdFx0c2hhZG93U3ByZWFkOiBzaGFkb3dTcHJlYWRcblx0XHRpbml0aWFsV2lkdGg6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGluaXRpYWxDb2xvclxuXHRcdFx0eDogaW5pdGlhbFhcblx0XHRcdHdpZHRoOiBpbml0aWFsV2lkdGhcblx0XHRcdGJvcmRlclJhZGl1czogaW5pdGlhbEJvcmRlclJhZGl1c1xuXHRcdFx0b3BhY2l0eTogaW5pdGlhbE9wYWNpdHlcblx0XHRcdHNjYWxlOiBpbml0aWFsU2NhbGVcblx0XHRcdHN1cGVyTGF5ZXI6IHN1cGVyTGF5ZXJcblx0XHRcdHNoYWRvd1g6IHNoYWRvd1hcblx0XHRcdHNoYWRvd1k6IHNoYWRvd1lcblx0XHRcdHNoYWRvd0NvbG9yOiBzaGFkb3dDb2xvclxuXHRcdFx0c2hhZG93Qmx1cjogc2hhZG93Qmx1clxuXHRcdFx0c2hhZG93U3ByZWFkOiBzaGFkb3dTcHJlYWRcblx0XHRpbml0aWFsSGVpZ2h0OlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBpbml0aWFsQ29sb3Jcblx0XHRcdHk6IGluaXRpYWxZXG5cdFx0XHRoZWlnaHQ6IGluaXRpYWxIZWlnaHRcblx0XHRcdGJvcmRlclJhZGl1czogaW5pdGlhbEJvcmRlclJhZGl1c1xuXHRcdFx0b3BhY2l0eTogaW5pdGlhbE9wYWNpdHlcblx0XHRcdHNjYWxlOiBpbml0aWFsU2NhbGVcblx0XHRcdHN1cGVyTGF5ZXI6IHN1cGVyTGF5ZXJcblx0XHRcdHNoYWRvd1g6IHNoYWRvd1hcblx0XHRcdHNoYWRvd1k6IHNoYWRvd1lcblx0XHRcdHNoYWRvd0NvbG9yOiBzaGFkb3dDb2xvclxuXHRcdFx0c2hhZG93Qmx1cjogc2hhZG93Qmx1clxuXHRcdFx0c2hhZG93U3ByZWFkOiBzaGFkb3dTcHJlYWRcblx0XHRcblxuXHQjIFRoZSBjYXJkT2JqZWN0IGNvbnNpc3RzIG9mIHRoZSBsYXllciAodGhlIGdyYXBoaWNhbCByZXByZXNlbnRhdGlvbiBvZiB0aGUgY2FyZCksIGFuZCBhbHNvIHN0b3JlcyBpdCdzIGluaXRpYWwgZ2VvbWV0cnlcblx0IyBXZSB3YW50IHRvIGFsd2F5cyByZW1lbWJlciB0aGUgaW5pdGlhbCBnZW9tZXRyeSwgaW4gY2FzZSB3ZSBuZWVkIHRvIGNoYW5nZSBpdCBkdXJpbmcgZXhlY3V0aW9uIFxuXHRjYXJkT2JqZWN0ID1cblx0XHRpbml0aWFsWDogaW5pdGlhbFhcblx0XHRpbml0aWFsWTogaW5pdGlhbFlcblx0XHRpbml0aWFsV2lkdGg6IGluaXRpYWxXaWR0aFxuXHRcdGluaXRpYWxIZWlnaHQ6IGluaXRpYWxIZWlnaHRcblx0XHRpbml0aWFsQm9yZGVyUmFkaXVzOiBpbml0aWFsQm9yZGVyUmFkaXVzXG5cdFx0aW5pdGlhbE9wYWNpdHk6IGluaXRpYWxPcGFjaXR5XG5cdFx0aW5pdGlhbFNjYWxlOiBpbml0aWFsU2NhbGVcblx0XHRjYXJkTGF5ZXI6IGNhcmRMYXllclxuXG5cdFxuXHRyZXR1cm4gY2FyZE9iamVjdFxuIiwiXHQjIFRoaXMgbW9kdWxlIGRlZmluZXMgdGhlIE1hdGVyaWFsIERlc2lnbiBhbmltYXRpb25zIHdoaWNoIGFyZSB0cmlnZ2VyZWQgd2hlbiB5b3UgaW50ZXJhY3Qgd2l0aCBcbiMgYSBVSSBjb21wb25lbnQuIEZvciBleGFtcGxlLCB3aGVuIHlvdSB0YXAvY2xpY2sgYSBjYXJkLCB5b3Ugc2VlIHRoYXQgcmlwcGxlIGVmZmVjdCBhbmQgdGhlIGNhcmRcbiMgbGlmdHMgc2xpZ2h0bHkgXG5cbnJhaXNlTGF5ZXJTaGFkb3dNdWx0aXBsaWVyID0gNFxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBSYWlzZSBhbmQgbG93ZXIgYSBsYXllciBieSBhbmltYXRpbmcgaXQncyBzaXplIGFuZCBzaGFkb3cgcHJvcGVydGllc1xuIyBFeGFtcGxlIHVzZSBjYXNlczogY2xpY2tpbmcgYSBidXR0b24gb3IgYSBjYXJkXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0cy5yYWlzZUFuZExvd2VyTGF5ZXIgPSAobGF5ZXIpIC0+XG5cblx0aW5pdGlhbFNoYWRvd0JsdXIgPSBsYXllci5zaGFkb3dCbHVyXG5cdGluaWFsU2hhZG93U3ByZWFkID0gbGF5ZXIuc2hhZG93U3ByZWFkXG5cblx0XG5cdCMgZGVmaW5lIHRoZSBhbmltYXRpb25zIFxuXHRyYWlzZUxheWVyQW5pbWF0aW9uID0gbmV3IEFuaW1hdGlvblxuXHRcdGxheWVyOiBsYXllclxuXHRcdHByb3BlcnRpZXM6XG5cdFx0XHRzY2FsZTogMS4wMVxuXHRcdFx0c2hhZG93Qmx1cjogaW5pdGlhbFNoYWRvd0JsdXIgKiByYWlzZUxheWVyU2hhZG93TXVsdGlwbGllclxuXHRcdFx0c2hhZG93U3ByZWFkOiBpbmlhbFNoYWRvd1NwcmVhZCAqIHJhaXNlTGF5ZXJTaGFkb3dNdWx0aXBsaWVyXG5cdFx0dGltZTogMC4yXG5cdFx0Y3VydmU6IFwiZWFzZS1pbi1vdXRcIlxuXG5cdGxvd2VybGF5ZXJBbmltYXRpb24gPSBuZXcgQW5pbWF0aW9uXG5cdFx0bGF5ZXI6IGxheWVyXG5cdFx0cHJvcGVydGllczpcblx0XHRcdHNjYWxlOiAxXG5cdFx0XHRzaGFkb3dCbHVyOiBpbml0aWFsU2hhZG93Qmx1clxuXHRcdFx0c2hhZG93U3ByZWFkOiBpbmlhbFNoYWRvd1NwcmVhZFxuXHRcdGRlbGF5OiAwLjRcblx0XHR0aW1lOiAwLjRcblx0XHRjdXJ2ZTogXCJlYXNlLWluLW91dFwiXG5cblx0XG5cdHJhaXNlTGF5ZXJBbmltYXRpb24uc3RhcnQoKVxuXHRcblx0cmFpc2VMYXllckFuaW1hdGlvbi5vbiBcImVuZFwiLCAtPiBcblx0XHRsb3dlcmxheWVyQW5pbWF0aW9uLnN0YXJ0KClcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgUmFpc2UgYSBsYXllciBieSBhbmltYXRpbmcgaXQncyBzaXplIGFuZCBzaGFkb3cgcHJvcGVydGllc1xuIyBFeGFtcGxlIHVzZSBjYXNlczogY2xpY2tpbmcgYSBidXR0b24gb3IgYSBjYXJkXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0cy5yYWlzZUxheWVyID0gKGxheWVyKSAtPlxuXG5cdCMgZGVmaW5lIHRoZSBhbmltYXRpb25zIFxuXHRyYWlzZUxheWVyQW5pbWF0aW9uID0gbmV3IEFuaW1hdGlvblxuXHRcdGxheWVyOiBsYXllclxuXHRcdHByb3BlcnRpZXM6XG5cdFx0XHRzY2FsZTogMS4wMVxuXHRcdFx0c2hhZG93Qmx1cjogbGF5ZXIuc2hhZG93Qmx1ciAqIHJhaXNlTGF5ZXJTaGFkb3dNdWx0aXBsaWVyXG5cdFx0XHRzaGFkb3dTcHJlYWQ6IGxheWVyLnNoYWRvd1NwcmVhZCAqIHJhaXNlTGF5ZXJTaGFkb3dNdWx0aXBsaWVyXG5cdFx0dGltZTogMC4yXG5cdFx0Y3VydmU6IFwiZWFzZS1pbi1vdXRcIlxuXG5cdFxuXHRyYWlzZUxheWVyQW5pbWF0aW9uLnN0YXJ0KClcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgRXhwYW5kIHRoZSBsYXllciBob3Jpem9udGFsbHkgdG8gdGhlIGJvcmRlcnMgb2YgaXQncyBjb250YWluZXJcbiMgRXhhbXBsZSB1c2UgY2FzZTogY2xpY2tpbmcgYSBjYXJkIGNhdXNlcyBpdCB0byByYWlzZSwgdGhlbiBleHBhbmQgaG9yaXpvbnRhbGx5IGFuZCB2ZXJ0aWNhbGx5XG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0cy5leHBhbmRIb3Jpem9udGFsbHkgPSAobGF5ZXIsIGFuaW1hdGlvbkRlbGF5KSAtPlxuXHRcblx0IyBkZWZpbmUgdGhlIGFuaW1hdGlvbnMgXG5cdGV4YW5kSG9yaXpvbnRhbGx5QW5pbWF0aW9uID0gbmV3IEFuaW1hdGlvblxuXHRcdGxheWVyOiBsYXllclxuXHRcdHByb3BlcnRpZXM6XG5cdFx0XHR3aWR0aDogbGF5ZXIuc3VwZXJMYXllci53aWR0aFxuXHRcdFx0eDogbGF5ZXIuc3VwZXJMYXllci54XG5cdFx0ZGVsYXk6IGFuaW1hdGlvbkRlbGF5XG5cdFx0dGltZTogMC4yXG5cdFx0Y3VydmU6IFwiZWFzZS1pbi1vdXRcIlxuXG5cdFxuXHRleGFuZEhvcml6b250YWxseUFuaW1hdGlvbi5zdGFydCgpXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIFNocmluayB0aGUgbGF5ZXIgaG9yaXpvbnRhbGx5IHRvIGl0J3Mgb3JpZ2luYWwgc2l6ZVxuIyBFeGFtcGxlIHVzZSBjYXNlOiBjb2xsYXBzaW5nIGEgY2FyZCBwcmV2aW91c2x5IG9wZW5lZFxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmV4cG9ydHMuc2hyaW5rSG9yaXpvbnRhbGx5ID0gKGxheWVyLCBhbmltYXRpb25EZWxheSkgLT5cblx0XG5cblx0bGF5ZXIuc3RhdGVzLmFuaW1hdGlvbk9wdGlvbnMgPSBcblx0XHRkZWxheTogYW5pbWF0aW9uRGVsYXlcblx0XHR0aW1lOiAwLjJcblx0XHRjdXJ2ZTogXCJlYXNlLWluLW91dFwiXG5cblx0bGF5ZXIuc3RhdGVzLnN3aXRjaChcImluaXRpYWxXaWR0aFwiKVxuXHRcdFxuXHRcblx0XHRcblx0XG5cblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgRXhwYW5kIHRoZSBsYXllciB2ZXJ0aWNhbGx5IHRvIHRoZSBib3JkZXJzIG9mIGl0J3MgY29udGFpbmVyXG4jIEV4YW1wbGUgdXNlIGNhc2U6IGNsaWNraW5nIGEgY2FyZCBjYXVzZXMgaXQgdG8gcmFpc2UsIHRoZW4gZXhwYW5kIGhvcml6b250YWxseSBhbmQgdmVydGljYWxseVxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmV4cG9ydHMuZXhwYW5kVmVydGljYWxseSA9IChsYXllciwgYW5pbWF0aW9uRGVsYXkpIC0+XG5cdFxuXHQjIGRlZmluZSB0aGUgYW5pbWF0aW9ucyBcblx0ZXhwYW5kVmVydGljYWxseUFuaW1hdGlvbiA9IG5ldyBBbmltYXRpb25cblx0XHRsYXllcjogbGF5ZXJcblx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0aGVpZ2h0OiBsYXllci5zdXBlckxheWVyLmhlaWdodFxuXHRcdFx0eTogbGF5ZXIuc3VwZXJMYXllci55XG5cdFx0ZGVsYXk6IGFuaW1hdGlvbkRlbGF5XG5cdFx0dGltZTogMC4yXG5cdFx0Y3VydmU6IFwiZWFzZS1pbi1vdXRcIlxuXG5cdFxuXHRleHBhbmRWZXJ0aWNhbGx5QW5pbWF0aW9uLnN0YXJ0KClcblxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBTaHJpbmsgdGhlIGxheWVyIHZlcnRpY2FsbHkgdG8gaXQncyBvcmlnaW5hbCBzaXplXG4jIEV4YW1wbGUgdXNlIGNhc2U6IGNvbGxhcHNpbmcgYSBjYXJkIHByZXZpb3VzbHkgb3BlbmVkXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0cy5zaHJpbmtWZXJ0aWNhbGx5ID0gKGxheWVyLCBhbmltYXRpb25EZWxheSkgLT5cblx0XG5cdGxheWVyLnN0YXRlcy5hbmltYXRpb25PcHRpb25zID0gXG5cdFx0ZGVsYXk6IGFuaW1hdGlvbkRlbGF5XG5cdFx0dGltZTogMC4yXG5cdFx0Y3VydmU6IFwiZWFzZS1pbi1vdXRcIlxuXG5cdGxheWVyLnN0YXRlcy5zd2l0Y2goXCJpbml0aWFsSGVpZ2h0XCIpXG5cblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgUm90YXRlIGxheWVyXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0cy5yb3RhdGVMYXllciA9IChsYXllciwgcm90YXRpb25BbmdsZSkgLT5cblx0XG5cdCMgZGVmaW5lIHRoZSBhbmltYXRpb25zIFxuXHRyb3RhdGVBbmltYXRpb24gPSBuZXcgQW5pbWF0aW9uXG5cdFx0bGF5ZXI6IGxheWVyXG5cdFx0cHJvcGVydGllczpcblx0XHRcdHJvdGF0aW9uOiByb3RhdGlvbkFuZ2xlXG5cdFx0dGltZTogMC4yXG5cdFx0Y3VydmU6IFwiZWFzZS1pbi1vdXRcIlxuXG5cdFxuXHRyb3RhdGVBbmltYXRpb24uc3RhcnQoKVxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBNb3ZlIGxheWVyXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0cy5tb3ZlTGF5ZXIgPSAobGF5ZXIsIG1vdmVCeVgsIG1vdmVCeVksIG1vdmVEZWxheSkgLT5cblx0XG5cdCMgZGVmaW5lIHRoZSBhbmltYXRpb25zIFxuXHRtb3ZlQW5pbWF0aW9uID0gbmV3IEFuaW1hdGlvblxuXHRcdGxheWVyOiBsYXllclxuXHRcdHByb3BlcnRpZXM6XG5cdFx0XHR4OiBsYXllci54ICsgbW92ZUJ5WFxuXHRcdFx0eTogbGF5ZXIueSArIG1vdmVCeVlcblx0XHRkZWxheTogbW92ZURlbGF5XG5cdFx0dGltZTogMC4yXG5cdFx0Y3VydmU6IFwiZWFzZS1pbi1vdXRcIlx0XG5cdFx0IyBjdXJ2ZTogXCJzcHJpbmcoNjAwLDQwLDEwLDApXCJcblxuXHRcblx0bW92ZUFuaW1hdGlvbi5zdGFydCgpXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIFNpbXVsYXRlIHRoZSBtYXRlcmlhbCBkZXNpZ24gc3VyZmFjZSByaXBwbGUgZWZmZWN0XG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0cy5yaXBwbGVFZmZlY3QgPSAodG91Y2hYLCB0b3VjaFksIGxheWVyKSAtPlxuXHRcblx0bGF5ZXIuY2xpcCA9IHRydWVcblxuXHRyaXBwbGUgPSBuZXcgTGF5ZXJcblx0XHRib3JkZXJSYWRpdXM6IFwiNTAlXCJcblx0XHRzY2FsZTogMFxuXHRcdG9wYWNpdHk6IC41XG5cdFx0c3VwZXJMYXllcjogbGF5ZXJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IGxheWVyLmJhY2tncm91bmRDb2xvclxuXHRcdGJyaWdodG5lc3M6IDc1XG5cdFx0bWlkWDogdG91Y2hYXG5cdFx0bWlkWTogdG91Y2hZXG5cdFx0aW5kZXg6IDBcblx0XHRmb3JjZTJkOiB0cnVlXHRcblx0XHRcblx0cmlwcGxlQW5pbWF0aW9uID0gcmlwcGxlLmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOiBcblx0XHRcdHNjYWxlOiBsYXllci53aWR0aCAvIDUwXG5cdFx0XHRjbGlwOiB0cnVlXG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0Y3VydmU6IFwiZWFzZS1vdXRcIlxuXHRcdHRpbWU6IC4zXG5cdFxuXHRyaXBwbGVBbmltYXRpb24ub24gRXZlbnRzLkFuaW1hdGlvbkVuZCwgLT4gXG5cdFx0cmlwcGxlLmRlc3Ryb3koKVxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBTaW11bGF0ZSB0aGUgbWF0ZXJpYWwgZGVzaWduIGFuaW1hdGlvbiB3aGVuIGFuIGljb24gaXMgdGFwcGVkXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0cy5hbmltYXRlSWNvbkJvdW5kcyA9IChpY29uLCBpY29uQm91bmRzQ29sb3IpIC0+XG5cblx0aWNvblRhcEJvdW5kcyA9IG5ldyBMYXllclxuXHRcdGJhY2tncm91bmRDb2xvcjogaWNvbkJvdW5kc0NvbG9yXG5cdFx0b3BhY2l0eTogMC41XG5cdFx0YnJpZ2h0bmVzczogNzVcblx0XHR3aWR0aDo0NVxuXHRcdGhlaWdodDo0NVxuXHRcdGJvcmRlclJhZGl1czo0NVxuXHRcdG1pZFg6IGljb24ubWlkWFxuXHRcdG1pZFk6IGljb24ubWlkWVxuXHRcdFxuXHRpY29uVGFwQm91bmRzLmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0b3BhY2l0eTogMFxuXHRcdGN1cnZlOiBcImVhc2Utb3V0XCJcblx0XHR0aW1lOiAwLjVcblxuXHRpY29uVGFwQm91bmRzLm9uIEV2ZW50cy5BbmltYXRpb25FbmQsIC0+XG5cdFx0aWNvblRhcEJvdW5kcy5hbmltYXRlXG5cdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRjdXJ2ZTogXCJlYXNlLWluLW91dFwiXG5cdFx0aWNvblRhcEJvdW5kcy5kZXN0cm95KClcblxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBhbmltYXRlIHRoZSBsYXllciBpbiBmcm9tIGl0J3MgY2VudHJlXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0cy5hcHBlYXJGcm9tQ2VudHJlID0gKGxheWVyLCBhbmltYXRpb25EZWxheSkgLT5cblxuXHRsYXllci5icmluZ1RvRnJvbnQoKVxuXG5cdGFuaW1hdGlvbiA9IG5ldyBBbmltYXRpb25cblx0XHRsYXllcjogbGF5ZXJcblx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0c2NhbGU6IDFcblx0XHRkZWxheTogYW5pbWF0aW9uRGVsYXlcblx0XHRjdXJ2ZTogXCJzcHJpbmcoMTAwLDIwLDI1KVwiXG5cblx0YW5pbWF0aW9uLnN0YXJ0KClcblxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBzaG93IGxheWVyIHdpdGggYSBkZWxheVxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmV4cG9ydHMuc2hvd1dpdGhEZWxheSA9IChsYXllciwgYW5pbWF0aW9uRGVsYXkpIC0+XG5cblx0bGF5ZXIuYnJpbmdUb0Zyb250KClcblxuXHRhbmltYXRpb24gPSBuZXcgQW5pbWF0aW9uXG5cdFx0bGF5ZXI6IGxheWVyXG5cdFx0cHJvcGVydGllczpcblx0XHRcdG9wYWNpdHk6IDFcblx0XHRcdHNjYWxlOiAxXG5cdFx0ZGVsYXk6IGFuaW1hdGlvbkRlbGF5XG5cdFx0dGltZTogMC4yXG5cdFx0Y3VydmU6IFwiZWFzZS1pbi1vdXRcIlxuXG5cdGFuaW1hdGlvbi5zdGFydCgpXG5cblxuXG5cbiJdfQ==
