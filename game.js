//set main namespace
goog.provide('catdogpig.Game');

// get our requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Label');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('catdogpig.scenes.GameScene');

catdogpig.Game = function(director) {
    catdogpig.Game.loadGameScene(director);
}

catdogpig.Game.loadGameScene = function(director) {
    var scene = new catdogpig.scenes.GameScene();

    // set current scene active
    director.replaceScene(scene);
}
