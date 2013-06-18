goog.provide("catdogpig.scenes.MainMenuScene");

goog.require("lime.Scene");
goog.require("lime.Label");
goog.require("lime.GlossyButton");

goog.require("catdogpig.scenes.GameScene");

catdogpig.scenes.MainMenuScene = function(director) {
    lime.Scene.call(this);

    var label1 = new lime.GlossyButton("Level 1").setSize(200,50).setPosition(100,100);

    var self = this;
    goog.events.listen(label1, 'click', function() {
        self.startGame(1);
    });

    var label2 = new lime.GlossyButton("Level 2").setSize(200,50).setPosition(100,150);

    goog.events.listen(label2, 'click', function() {
        self.startGame(2);
    });

    var label3 = new lime.GlossyButton("Level 3").setSize(200,50).setPosition(100,200);

    goog.events.listen(label3, 'click', function() {
        self.startGame(3);
    });

    this.appendChild(label1);
    this.appendChild(label2);
    this.appendChild(label3);
}

goog.inherits(catdogpig.scenes.MainMenuScene, lime.Scene);

catdogpig.scenes.MainMenuScene.prototype.startGame = function(level) {
    var gameScene = new catdogpig.scenes.GameScene();
    gameScene.level = level;
    catdogpig.director.replaceScene(gameScene);
    gameScene.start();
}
