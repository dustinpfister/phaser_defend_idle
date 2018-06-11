var game = (function () {

    var sh,
    gun;

    return new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        // create method
        create: function () {

            // fix scrollTo Problem
            game.scale.compatibility.scrollTo = false;

            sh = new ShipCollection(game);

            gun = new Gun(game);

        },

        // the update method will be called on each tick
        update: function () {

            sh.update();
            gun.update(sh);

        }

    });

}
    ());
