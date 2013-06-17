goog.provide('catdogpig.PauseScene');

goog.require('lime.helper.PauseScene');
goog.require('lime.Label');
goog.require('lime.GlossyButton');

goog.require('catdogpig.scenes.MainMenuScene');

catdogpig.PauseScene = function() {
    lime.helper.PauseScene.call(this);

    var resumeButton = new lime.GlossyButton('Resume').setSize(200, 40).setPosition(150, 100);
    goog.events.listen(resumeButton, 'click', function() {
        catdogpig.director.setPaused(false);
    });
    this.appendChild(resumeButton);

    var exitToMainMenuButton = new lime.GlossyButton('Exit to main menu').setSize(200, 40).setPosition(150, 150);
    goog.events.listen(exitToMainMenuButton, 'click', function() {
        catdogpig.director.setPaused(false);
        var mainMenuScene = new catdogpig.scenes.MainMenuScene();
        catdogpig.director.replaceScene(mainMenuScene);
    });
    this.appendChild(exitToMainMenuButton);
}
goog.inherits(catdogpig.PauseScene, lime.helper.PauseScene);
