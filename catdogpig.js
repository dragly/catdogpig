//set main namespace
goog.provide('catdogpig');


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
goog.require('catdogpig.App');


// entrypoint
catdogpig.start = function(){

    catdogpig.director = new lime.Director(document.body,1080,1920);
    catdogpig.director.makeMobileWebAppCapable();
//    catdogpig.loadMenuScene();
    catdogpig.loadApp();
}

catdogpig.loadApp = function() {
    var app = new catdogpig.App(catdogpig.director);
    app.exec();
}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('catdogpig.start', catdogpig.start);
