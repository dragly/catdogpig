goog.provide('catdogpig.App');

//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Label');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('catdogpig.Game');

catdogpig.App = function(director) {
    this.gameScene = new catdogpig.scenes.GameScene(director);
    this.director = director;
    console.log(this.gameScene.test);
}

catdogpig.App.prototype.exec = function() {
    console.log(this.gameScene)
    this.director.replaceScene(this.gameScene);
    this.gameScene.start();
}
