goog.provide("catdogpig.scenes.GameScene")

goog.require('lime.Scene');
goog.require('lime.Sprite')

catdogpig.scenes.GameScene = function(director) {
    lime.Scene.call(this);

    this.test = 3;

    this.pigBox = new lime.Sprite().setFill("images/pig1.jpg").setPosition(200, 1920-200).setSize(300,200);

    this.pigBox.animalType = "pig";
    this.appendChild(this.pigBox);

    this.catBox = new lime.Sprite().setFill("images/cat1.jpg").setPosition(500, 1920-200).setSize(300,200);

    this.catBox.animalType = "cat";
    this.appendChild(this.catBox);

    this.dogBox = new lime.Sprite().setFill("images/dog1.jpg").setPosition(800, 1920-200).setSize(300,200);

    this.dogBox.animalType = "dog";
    this.appendChild(this.dogBox);

    this.label = new lime.Label().setPosition(540,100).setSize(500,100).setFontSize(40);
    this.label.setText("What kind of animal is this?");
    this.appendChild(this.label);

    this.currentAnimal = null;

    this.allowDrag = true;
}

goog.inherits(catdogpig.scenes.GameScene, lime.Scene);

catdogpig.scenes.GameScene.prototype.start = function() {
    console.log("Starting game!")
    this.addRandomAnimal();
}


catdogpig.scenes.GameScene.prototype.addRandomAnimal = function() {
    var self = this;
    var animals = {0: "pig", 1: "cat", 2: "dog"};
    var randomType = parseInt(Math.random() * 3);
    var randomAnimal = animals[randomType];
    var randomNumber = parseInt(Math.random() * 3) + 1;
    var parentSize = this.getParent().getSize();
    var animal = new lime.Sprite().setFill("images/" + randomAnimal + randomNumber + ".jpg").setPosition(parentSize.width / 2, parentSize.height / 2).setScale(1).setOpacity(0);
    animal.animalType = randomAnimal;
    this.appendChild(animal);
    this.currentAnimal = animal;
    this.setDragAnimal(animal);
    self.label.setText("What kind of animal is this?");

    var animation = new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1)
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
                             new lime.animation.ScaleTo(1.5).setDuration(.8)
                             ));

        //        title.runAction(new lime.animation.FadeTo(1));

        //let target follow the mouse/finger
        var drag = e.startDrag();

        drag.addDropTarget(self.dogBox);
        drag.addDropTarget(self.catBox);
        drag.addDropTarget(self.pigBox);

        //listen for end event
        e.swallow(['mouseup','touchend'],function(){
            target.runAction(new lime.animation.Spawn(
                                 new lime.animation.FadeTo(1),
                                 new lime.animation.ScaleTo(1)
                                 ));

            //            title.runAction(new lime.animation.FadeTo(0));
        });

        // show move position
        goog.events.listen(drag, lime.events.Drag.Event.DROP, function(ev){
            self.allowDrag = false;
            var dropTarget = ev.activeDropTarget;
            var animation;
            if(dropTarget.animalType === target.animalType) {
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
