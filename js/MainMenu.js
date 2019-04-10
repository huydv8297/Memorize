class MainMenu extends Phaser.Scene{
    constructor(){
        super({key: 'MainMenu', active: true});
    }
	
    preload(){
        this.load.image('background2', 'assets/sprites/Gameplay/NewBG.png');
		this.load.image('logo', 'assets/sprites/Start/Logo.png');
		this.load.image('header-bg-btn', 'assets/sprites/Gameplay/New Update/Header-Btn-Base.png');
		this.load.image('base-bg-btn2', 'assets/sprites/Start/Play-Btn-Base.png');
		this.load.image('playbutton', 'assets/sprites/Start/playbutton.png');
		this.load.image('share', 'assets/sprites/Start/share.png');
		this.load.image('sound_on', 'assets/sprites/Start/sound_on.png');
		this.load.image('sound_off', 'assets/sprites/Start/sound_off.png');
		this.load.image('more_game', 'assets/sprites/Start/more_game.png');
		this.load.image('leader_broad', 'assets/sprites/Start/leader_broad.png');
		this.load.image('white', 'assets/sprites/Start/White 1.png');
		
		this.load.audio('button_click', 'assets/sounds/ButtonClick.wav');

    }
	
	create ()
	{
		this.add.image(235, 384,'background2').setScale(0.4);
		
		this.add.nineslice(40, 100, 350/0.4, 420/0.4, 'logo', [650, 225, 100, 55]).setScale(0.4);
		//var logo = this.add.image(216, 300,'logo').setScale(0.4);
		//logo.scaleY = 0.7;
		
		
		this.add.image(216, 440,'base-bg-btn2').setScale(0.4);
		var playButton = this.add.image(216, 430,'playbutton').setScale(0.4);
		
		playButton.setInteractive();
		
		playButton.on('pointerdown', ()=> {
			this.sound.play('button_click');
			playScreen.initalize();
			playScreen.display();
			mainMenu.dispose();
		});
		
		
		this.add.image(85, 635,'white').setScale(0.4);
		this.add.image(85, 630,'share').setScale(0.39);
		
		this.add.image(85 * 2, 635,'white').setScale(0.4);
		this.add.image(85 * 2, 630,'more_game').setScale(0.39);
		
		this.add.image(85 * 3, 635,'white').setScale(0.4);
		this.add.image(85 * 3, 630,'leader_broad').setScale(0.39);
		
		this.add.image(85 * 4, 635,'white').setScale(0.4);
		var soundButton = this.add.image(85 * 4, 630,'sound_on').setScale(0.4);
		soundButton.setInteractive();
		soundButton.on('pointerdown', ()=> {
			isMute = !isMute;
			if(isMute)
			{
				this.sound.play('button_click');
				this.sound.mute = true;
				soundButton.setTexture('sound_off');
			}else{
				
				this.sound.mute = false;
				soundButton.setTexture('sound_on');
			}
		});
		
		
		this.scene.setVisible(false, 'Score');
		this.scene.setVisible(false, 'PlayScreen');
		this.scene.setVisible(false, 'Particle');
		this.scene.setVisible(false, 'NextLevel');

	}
	
	display()
	{
		this.scene.wake('MainMenu');
		this.scene.setVisible(true, 'MainMenu');
		this.scene.bringToTop('MainMenu');
	}
	
	dispose()
	{
		this.scene.setVisible(false, 'MainMenu');
		//this.scene.sleep('MainMenu');
	}
	
	update ()
	{
		
	}
	
}
