var Shot = function (game) {

    var gra;

    this.active = false;
    this.frame = 0;
    this.maxFrame = 100;

    this.blastRadius = 50;

    gra = game.add.graphics(0, 0);
    gra.beginFill(0xffffff);
    gra.drawRect(0, 0, 8, 8);
    gra.endFill();

    this.sprite = gra;

};

Shot.prototype.tick = function (ships) {

    if (this.active) {

        this.frame += 1;

        this.x = this.sx + this.dx * this.frame;
        this.y = this.sy + this.dy * this.frame;

        if (this.frame >= this.maxFrame) {

            this.done(ships);

        }

    }

    this.sprite.x = this.x;
    this.sprite.y = this.y;

};

Shot.prototype.done = function (ships) {

    var self = this;

    this.active = false;
    this.x = -8;
    this.y = -8;

    ships.ships.forEach(function (ship) {

        if (ship.active) {

            var d = Phaser.Math.distance(ship.x, ship.y, self.x, self.y);

            if (d <= self.blastRadius) {

                console.log(d);
                ship.active = false;

            }

        }

    });

}

Shot.prototype.set = function (gun, x, y) {

    this.sx = gun.x;
    this.sy = gun.y;
    this.x = this.sx;
    this.y = this.sy;

    this.sprite.x = this.x;
    this.sprite.y = this.y;

    this.frame = 0;
    this.active = true;

    // distance
    this.d = Phaser.Math.distance(gun.x, gun.y, x, y);

    // angle
    this.a = Phaser.Point.angle(
            new Phaser.Point(x, y),
            new Phaser.Point(gun.x, gun.y));

    this.dx = Math.cos(this.a) * this.d / this.maxFrame;
    this.dy = Math.sin(this.a) * this.d / this.maxFrame;

};

var Gun = function (game) {

    var gra;

    this.x = 320 - 32;
    this.y = 240 - 32;

    this.maxShots = 10;
    this.activeShots = 0;
    this.shots = [];

    this.fireRate = 1000;
    this.lastFire = new Date();

    var i = 0;
    while (i < this.maxShots) {

        this.shots.push(new Shot(game));

        i += 1;
    }

    gra = game.add.graphics(this.x, this.y);

    gra.beginFill(0x0000ff);
    gra.drawRect(0, 0, 32, 32);
    gra.endFill();

    this.sprite = gra;

};

Gun.prototype.update = function (ships) {

    var now = new Date(),
    time = now - this.lastFire,
    self = this;

    if (time >= this.fireRate) {

        this.findActive();

        if (this.activeShots < this.maxShots) {

            this.activeShots += 1;
            this.fire(ships);

        }

        this.lastFire = now;

    }

    this.shots.forEach(function (shot) {

        shot.tick(ships);

    });

};

Gun.prototype.fire = function (ships) {

    var i = 0,
    targets = ships.getActiveArray();

    if (targets.length > 0) {
        while (i < this.shots.length) {

            var shot = this.shots[i];

            if (!shot.active) {

                shot.set(this, targets[0].x, targets[0].y);

                break;
            }

            i += 1;
        }

    }

};

Gun.prototype.findActive = function () {

    var self = this;
    this.activeShots = 0;

    this.shots.forEach(function (shot) {

        if (shot.active) {

            self.activeShots += 1;

        }

    });

};
