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
goog.require('catdogpig.scenes.MainMenuScene');
//goog.require('catdogpig.Game');

catdogpig.App = function() {
}

catdogpig.App.prototype.exec = function() {
    var mainMenuScene = new catdogpig.scenes.MainMenuScene();
    catdogpig.director.replaceScene(mainMenuScene);
}
