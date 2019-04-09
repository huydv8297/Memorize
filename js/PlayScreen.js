class PlayScreen extends Phaser.Scene{

    constructor(){
        super({ key: 'PlayScreen', active: true});
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
                size: "100px",
                fill: "#68707c",
                align: "center",
                fontFamily: 'SourceSansPro-Regular',
            }
        );


        header.create(372, 60, 'base-bg-btn').setScale(0.395).refreshBody();
        header.create(372, 55, 'shadow-bg-btn').setScale(0.39).refreshBody();
        header.create(372, 50, 'sound-btn').setScale(0.39).refreshBody();

        header.create(216, 100, 'time-white').setScale(0.395).refreshBody();
        header.create(167, 98, 'time-left').setScale(0.396).refreshBody();
    }
	
	display()
	{
		this.scene.wake('PlayScreen');
		this.scene.setVisible(true, 'PlayScreen');
		this.scene.bringToTop('PlayScreen');
	}
	
	dispose()
	{
		this.scene.setVisible(false, 'PlayScreen');
		//this.scene.sleep('PlayScreen');
	}

    update ()
    {
        
    }
}