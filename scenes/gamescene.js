goog.provide("catdogpig.scenes.GameScene")

goog.require('lime.Scene');
goog.require('lime.Sprite')

catdogpig.scenes.GameScene = function() {
    lime.Scene.call(this);

    this.level = 1;

    this.label = new lime.Label().setPosition(540,100).setSize(500,100).setFontSize(40);
    this.label.setText("What kind of chain is this?");
    this.appendChild(this.label);

    this.currentAnimal = null;
    this.allowDrag = true;

    this.pauseButton = new lime.GlossyButton("Pause").setFontSize(20).setSize(100,50).setPosition(100,100);

    goog.events.listen(this.pauseButton,['click'], function(e) {
        catdogpig.director.setPaused(true);
        lime.updateDirtyObjects();
    });
    this.appendChild(this.pauseButton);
}

goog.inherits(catdogpig.scenes.GameScene, lime.Scene);

catdogpig.scenes.GameScene.prototype.start = function() {
    console.log("Starting game at level " + this.level)
    var allLevelBoxes = {
        1: [3,4,5,6],
        2: [4,5,6,7],
        3: [3,4,5,6,7]
    }
    var levelBoxes = allLevelBoxes[this.level];
    this.dropBoxes = []
    for(var i in levelBoxes) {
        console.log(i);
        var boxNumber = levelBoxes[i];

        var boxSprite = new lime.Sprite().setFill("#AAA").setPosition(200 + 200 * i, 1920-200).setSize(150,150);
        var label = new lime.Label(boxNumber).setFontSize(30).setSize(100,30);
        boxSprite.appendChild(label);
        boxSprite.showDropHighlight = function() {
            this.runAction(new lime.animation.FadeTo(.6).setDuration(.3));
        }
        boxSprite.hideDropHighlight = function() {
            this.runAction(new lime.animation.FadeTo(1.0).setDuration(.3));
        }

        boxSprite.chainNumber = boxNumber;
        this.dropBoxes.push(boxSprite);
        this.appendChild(boxSprite);
    }

    this.addRandomAnimal();
}


catdogpig.scenes.GameScene.prototype.addRandomAnimal = function() {
    var self = this;
    var allImages = {
        1: [[3,"1-3-1"], [3,"1-3-2"], [4,"1-4-1"], [5,"1-5-1"], [6,"1-6-1"]],
        2: [[4,"1-4-1"], [5,"1-5-1"], [6,"1-6-1"], [7,"2-7-1"], [7,"2-7-2"]],
        3: [[5,"1-5-1"], [6,"1-6-1"], [7,"2-7-1"], [7,"2-7-2"], [3,"3-3-1"], [4,"3-4-1"], [5,"3-5-1"], [6,"3-6-1"], [6,"3-6-2"], [6,"3-6-3"]]
    }

    var levelImages = allImages[this.level];
    var randomType = goog.math.randomInt(levelImages.length);
    var randomImageSet = levelImages[randomType];
    var chainNumber = randomImageSet[0];
    var chainImage = randomImageSet[1];

    var parentSize = catdogpig.director.getSize();
    var animal = new lime.Sprite().setFill("images/chain-" + chainImage + ".png").setPosition(parentSize.width / 2, parentSize.height / 2).setScale(1).setOpacity(0);
    animal.chainNumber = chainNumber;
    this.appendChild(animal);
    this.currentAnimal = animal;
    this.setDragAnimal(animal);
    self.label.setText("What kind of chain is this?");

    var animation = new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(0.5)
                );
    animal.runAction(animation);
    this.allowDrag = true;
}

catdogpig.scenes.GameScene.prototype.setDragAnimal = function(target) {
    var self = this;
    goog.events.listen(target,['mousedown','touchstart'], function(e){
        if(!self.allowDrag) {
            return;
        }

        //animate
        target.runAction(new lime.animation.Spawn(
                             new lime.animation.FadeTo(.5).setDuration(.2),
                             new lime.animation.ScaleTo(0.6).setDuration(.8)
                             ));

        //        title.runAction(new lime.animation.FadeTo(1));

        //let target follow the mouse/finger
        var drag = e.startDrag();

        for(var i in self.dropBoxes) {
            var dropBox = self.dropBoxes[i];
            drag.addDropTarget(dropBox);
        }

        //listen for end event
        e.swallow(['mouseup','touchend'],function(){
            target.runAction(new lime.animation.Spawn(
                                 new lime.animation.FadeTo(1),
                                 new lime.animation.ScaleTo(0.5)
                                 ));

            //            title.runAction(new lime.animation.FadeTo(0));
        });

        // show move position
        goog.events.listen(drag, lime.events.Drag.Event.DROP, function(ev){
            self.allowDrag = false;
            var dropTarget = ev.activeDropTarget;
            var animation;
            if(dropTarget.chainNumber === target.chainNumber) {
                self.label.setText("Success!");
                animation = new lime.animation.Spawn(
                            new lime.animation.FadeTo(0),
                            new lime.animation.ScaleTo(0)
                            );
            } else {
                self.label.setText("You failed!");
                animation = new lime.animation.Spawn(
                            new lime.animation.FadeTo(0),
                            new lime.animation.ScaleTo(20)
                            );
            }
            goog.events.listen(animation, lime.animation.Event.STOP,function(){
                self.removeChild(target);
                self.addRandomAnimal();
            });
            target.runAction(animation);
        });
    });
}
