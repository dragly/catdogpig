goog.provide("catdogpig.scenes.MainMenuScene");

goog.require("lime.Scene");
goog.require("lime.Label");
goog.require("lime.GlossyButton");

goog.require("catdogpig.scenes.GameScene");

catdogpig.scenes.MainMenuScene = function(director) {
    lime.Scene.call(this);

    var label = new lime.GlossyButton("Start game").setSize(200,50).setPosition(100,100);
    this.appendChild(label);

    var self = this;
    goog.events.listen(label, 'click', function() {
        self.startGame();
    });
}

goog.inherits(catdogpig.scenes.MainMenuScene, lime.Scene);

catdogpig.scenes.MainMenuScene.prototype.startGame = function() {
    var gameScene = new catdogpig.scenes.GameScene();
    catdogpig.director.replaceScene(gameScene);
    gameScene.start();
}
