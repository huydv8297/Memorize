class MainMenu extends Phaser.Scene{
    constructor(){
        super({key: 'MainMenu', active: true});
    }
	
    preload(){
        this.load.image('background2', 'assets/sprites/Gameplay/NewBG.png');
		this.load.image('logo', 'assets/sprites/Start/Logo.png');
		this.load.image('base-bg-btn2', 'assets/sprites/Start/Play-Btn-Base.png');
		this.load.image('playbutton', 'assets/sprites/Start/playbutton.png');
		this.load.image('share', 'assets/sprites/Start/share.png');
		this.load.image('sound_on', 'assets/sprites/Start/sound_on.png');
		this.load.image('sound_off', 'assets/sprites/Start/sound_off.png');
		this.load.image('more_game', 'assets/sprites/Start/more_game.png');
		this.load.image('leader_broad', 'assets/sprites/Start/leader_broad.png');
		
		this.load.audio('button_click', 'assets/sounds/ButtonClick.wav');

    }
	
	create ()
	{
		this.add.image(235, 384,'background2').setScale(0.4);
		var logo = this.add.image(216, 300,'logo').setScale(0.4);
		logo.scaleY = 0.7;
		this.add.image(216, 500,'base-bg-btn2').setScale(0.3);
		var playButton = this.add.image(216, 495,'playbutton').setScale(0.3);
		
		playButton.setInteractive();
		
		playButton.on('pointerdown', ()=> {
			this.sound.play('button_click');
			this.scene.setVisible(true, 'PlayScreen');
			this.scene.setVisible(false, 'MainMenu');
			this.scene.switch('PlayScreen');
		});
		

		
		this.add.image(85, 650,'share').setScale(0.4);
		this.add.image(85 * 2, 650,'more_game').setScale(0.4);
		this.add.image(85 * 3, 650,'leader_broad').setScale(0.4);
		this.add.image(85 * 4, 650,'sound_on').setScale(0.4);
		
		this.scene.setVisible(false, 'Score');
		this.scene.setVisible(false, 'PlayScreen');

	}

	update ()
	{
		
	}
}
