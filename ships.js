var Ship = function (game) {

    var gra;

    this.sx = -32;
    this.x = this.sx;
    this.y = Math.floor(64 * Math.random());
    this.active = false;
    this.dx = .25 + Math.random() * .75;

    gra = game.add.graphics(this.x, this.y);

    gra.beginFill(0x00ff00);
    gra.drawRect(0, 0, 32, 32);
    gra.endFill();

    this.sprite = gra;

};

Ship.prototype.tick = function () {

    this.x += this.dx;
    this.sprite.x = this.x;

};

// shipCollection
var ShipCollection = function (game) {

    var i = 0,
    sh,
    bx;

    this.ships = [];

    this.level = 1;
    this.maxShips = 10; // max number of ships
    this.maxUse = 10; // max ships to use
    this.activeShips = 0;
    this.releaceRate = 1000; // the rate at which a ship will release from the stack
    this.lastReleace = new Date();

    this.xMax = 320;
    while (i < this.maxShips) {

        sh = new Ship(game);

        this.ships.push(sh);
        i += 1;

    }

};

ShipCollection.prototype.update = function () {

    var now = new Date(),
    time = now - this.lastReleace,
    self = this;

    // update ships
    this.ships.forEach(function (ship) {

        if (ship.active) {

            ship.tick();

            if (ship.x >= self.xMax) {

                ship.active = false;

            }

        }

    });

    // release new ship
    if (time >= this.releaceRate) {

        this.findActive();
        if (this.activeShips < this.maxUse) {

            this.setOneActive();

        }

        this.lastReleace = now;
    }

};

// find the current number of active ships
ShipCollection.prototype.findActive = function () {

    var self = this;
    self.activeShips = 0;

    this.ships.forEach(function (ship) {

        if (ship.active) {

            self.activeShips += 1;
        }

    });

};

// set a ship active
ShipCollection.prototype.setOneActive = function () {

    var i = 0,
    ship;
    while (i < this.maxShips) {

        ship = this.ships[i];

        if (!ship.active) {

            ship.active = true;
            ship.x = -32;
            ship.y = Math.floor(64 * Math.random());

            this.activeShips += 1;
            break;

        }

        i += 1;
    }

};

// return an array of active ships
ShipCollection.prototype.getActiveArray = function () {

    var activeShips = [];

    this.ships.forEach(function (ship) {

        if (ship.active) {

            activeShips.push(ship);

        }

    });

    return activeShips;

};
