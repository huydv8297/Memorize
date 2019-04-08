class PlayScreen extends Phaser.Scene{

    constructor(){
        super({ key: 'PlayScreen', active: false});
    }

    preload(){
        this.load.image('background', 'assets/sprites/Gameplay/NewBG.png');
        this.load.image('base-bg-btn', 'assets/sprites/Gameplay/New Update/Header-Btn-Base.png');
        this.load.image('shadow-bg-btn', 'assets/sprites/Gameplay/New Update/Exit-Btn-Shadow.png');
        this.load.image('exit-btn', 'assets/sprites/Gameplay/New Update/Exit-Btn.png');
        this.load.image('sound-btn', 'assets/sprites/Gameplay/New Update/Sound-Btn.png');
        this.load.image('header-base', 'assets/sprites/Gameplay/New Update/Header-base.png');
        this.load.image('white-heart', 'assets/sprites/Gameplay/New Update/White-Heart.png');
        this.load.image('heart', 'assets/sprites/Gameplay/New Update/Heart.png');
        this.load.image('time-white', 'assets/sprites/Gameplay/Time-white.png');
        this.load.image('time-left', 'assets/sprites/Gameplay/Time-left.png');

        this.load.image('tile-base', 'assets/sprites/Gameplay/New Update/Tile-Base.png');
        this.load.image('tile-cover', 'assets/sprites/Gameplay/New Update/Tile-Cover.png');
        this.load.image('blue-tile-base', 'assets/sprites/Gameplay/New Update/Blue-Tile-Base.png');
        this.load.image('blue-tile-cover', 'assets/sprites/Gameplay/New Update/Blue-Tile-Cover.png');
    }

    create ()
    {
        this.add.image(216, 384,'background').setScale(0.5);

        var header = this.physics.add.staticGroup();

        header.create(60, 60, 'base-bg-btn').setScale(0.395).refreshBody();
        header.create(60, 55, 'shadow-bg-btn').setScale(0.39).refreshBody();
        var exitButton = header.create(60, 50, 'exit-btn').setScale(0.39).refreshBody();
		exitButton.setInteractive();
		exitButton.on('pointerdown', ()=> {
			this.sound.play('button_click');
			this.scene.setVisible(true, 'MainMenu');
			this.scene.setVisible(false, 'PlayScreen');
			this.scene.switch('MainMenu');			
		});
		
		
		
        header.create(216, 57, 'header-base').setScale(0.42).refreshBody();
        header.create(250, 57, 'heart').setScale(0.45).refreshBody();
        header.create(280, 57, 'heart').setScale(0.45).refreshBody();
        header.create(310, 57, 'heart').setScale(0.45).refreshBody();

        this.levelText = this.add.text(
            120,
            50,
            "Level 1",
            {
                font: "25px Arial",
                fill: "#68707c",
                align: "center",
                //fontFamily: 'SourceSansPro-Regular',
            }
        );


        header.create(372, 60, 'base-bg-btn').setScale(0.395).refreshBody();
        header.create(372, 55, 'shadow-bg-btn').setScale(0.39).refreshBody();
        header.create(372, 50, 'sound-btn').setScale(0.39).refreshBody();

        header.create(216, 100, 'time-white').setScale(0.395).refreshBody();
        var time_left = header.create(29, 94.5, 'time-left').setScale(0.395).refreshBody();
        time_left.setOrigin(0);
        time_left.scaleX = 0.5;

        var tiles = [];
        for(var i = 0; i < 3; i++)
        {
            for(var j = 0; j < 3; j++)
            {
                var tile_base = this.add.sprite(100 + 88 * i, 302 + 81 * j,'tile-base').setScale(0.55);
                var tile = this.add.sprite(100 + 88 * i, 300 + 81 * j,'tile-cover').setScale(0.55);

                tile.setInteractive();
                tile.on('pointerdown', () => {
                    tile.y += 4;

                    var delayInMilliseconds = 400;
                    setTimeout(() => {
                        tile.y -= 4;
                        tile_base.setTexture('blue-tile-base');
                        tile.setTexture('blue-tile-cover');
                        this.add.text(
                            tile.x - 8,
                            tile.y - 15,
                            "1",
                            {
                                font: "25px Arial",
                                fill: "#fff",
                                align: "center",
                                fontFamily: 'SourceSansPro-Regular',
                            }
                        );
                    }, delayInMilliseconds);
                    console.log("Hit tile");
                });
                tiles.push(tile);
            }
        }

        /*for(var i = 0; i < tiles.length; i++)
        {
            console.log(tiles[i].x);
            tiles[i].setInteractive();
            var tile = tiles[i];
            tile.on('pointerdown', () => {
                tile.y += 4;

                var delayInMilliseconds = 400;
                setTimeout(() => {
                    tile.y -= 4;
                    this.add.image(tile.x, tile.y + 2,'blue-tile-base').setScale(0.55);
                    this.add.image(tile.x, tile.y,'blue-tile-cover').setScale(0.55);
                    tile.destroy();
                    tile_base.destroy();
                }, delayInMilliseconds);
                console.log("Hit tile");
                console.log(tile.y);
            });
        }*/
        
        /*
        // Load a map from a 2D array of tile indices
        var level = [
            [  0,   0,   0],
            [  0,   0,   0],
            [  0,   0,   0],
        ];

        // When loading from an array, make sure to specify the tileWidth and tileHeight
        var map_1 = this.make.tilemap({ data: level, tileWidth: 171, tileHeight: 157 });
        var tiles_1 = map_1.addTilesetImage("tile1");
        var layer_1 = map_1.createStaticLayer(0, tiles_1, 55, 255);
        layer_1.setScale(0.65);

        var map_3 = this.make.tilemap({ data: level, tileWidth: 171, tileHeight: 157 });
        var tiles_3 = map_3.addTilesetImage("tile3");
        var layer_3 = map_3.createStaticLayer(0, tiles_3, 55, 255);
        layer_3.setScale(0.65);
        map_3.setCollisionBetween(0, 0);
        map_3.setTileIndexCallback(0, this.hitTile, this);*/
    }

    hitTile(tile) {
        tile.y += 2;
        console.log("Hit tile");
    }

    update ()
    {
        
    }
}