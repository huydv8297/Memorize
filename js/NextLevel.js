class NextLevel extends Phaser.Scene{
	
    constructor(){
        super({key: 'NextLevel', active: true});
		this.bestScore = 0;
    }
	
	preload(){
		this.load.image('popup1', 'assets/sprites/WatchVideo/Base.png', 260, 50, 180, 380);
		this.load.image('icon1', 'assets/sprites/Level_complete/icon.png');
		this.load.image('main_menu1', 'assets/sprites/Level_complete/main_menu.png');
		this.load.image('medal', 'assets/sprites/Level_complete/medal.png');
		this.load.image('next_level1', 'assets/sprites/Level_complete/next_level.png');
		this.load.image('replay1', 'assets/sprites/Level_complete/Replay.png');
		this.load.image('shadow1', 'assets/sprites/Level_complete/Shadow.png');
		this.load.image('share2', 'assets/sprites/Level_complete/Share.png');
   }
	
	create ()
	{
		this.add.nineslice(60, 120, 300/0.4, 420/0.4, 'popup1', [260, 50, 50, 50]).setScale(0.4);
		
		var icon = this.add.image(210, 320,'medal').setScale(0.4);
		this.add.text(100, 150, 'Level Complete', {
			font: "30px Arial",
			fill: "#ffffff",
			align: "center"
		});

		//add button
		this.addButton('main_menu1', 120, 460, 0.4, ()=>{
			mainMenu.display();
			playScreen.dispose();
			particle.dispose();
			nextLevel.dispose();
		});
		this.addButton('share2', 120 + 90, 460, 0.4, ()=>{
			
		});
		this.addButton('next_level1', 120  + 180, 460, 0.4, ()=>{
			playScreen.nextlevel();
			nextLevel.dispose();
		});
	}
	
	display()
	{
		this._display();
		//this.add.image(235, 384,'background1').setScale(0.4);
		
		

	}
	
	addButton(key, positionX, positionY, scale, callback)
	{
		this.add.image(positionX, positionY + 10, 'shadow1').setScale(scale);
		var button = this.add.image(positionX, positionY, key).setScale(scale);
		button.setInteractive();
		button.on('pointerdown', callback);
	}
	
	_display()
	{
		this.scene.wake('NextLevel');
		this.scene.setVisible(true, 'NextLevel');
		this.scene.bringToTop('NextLevel');
	}
	
	dispose()
	{
		this.scene.setVisible(false, 'NextLevel');
		//this.scene.sleep('NextLevel');
	}
}