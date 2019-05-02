class NextLevel extends Phaser.Scene{
	
    constructor(){
        super({key: 'NextLevel', active: true});
		this.bestScore = 0;
		this.isInit = false;
		this.container;
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
		this.load.image('bg_board2', 'assets/sprites/bg-board.png');
		this.load.audio('win', 'assets/audios/sfx_win_1.mp3');
		
		this.container = this.add.container();
   }
   
	
	create ()
	{
		
	}
	
	initialize(){
		
		//this.add.nineslice(0, 0, 800, 800, 'bg_board2', [6, 6, 6, 6]);
		
		let popup = this.add.nineslice(60, 150, 300/0.4, 370/0.4, 'popup1', [260, 50, 50, 50]).setScale(0.4);
		
		let icon = this.add.image(210, 320,'medal').setScale(0.4);
		let textComplete = this.add.text(216, 200, 'Level Complete', {
			font: 70 /ratio + "px Arial",
			fill: "#ffffff",
			align: "center"
		}).setOrigin(0.5);
		
		this.container.add(popup);
		this.container.add(icon);
		this.container.add(textComplete);
		//add button
		this.addButton('main_menu1', 120 + 50, 440, 0.4, ()=>{
			nextLevel.disable(()=>{
				mainMenu.display();
				playScreen.dispose();
				particle.dispose();
			});
		});
		/*
		this.addButton('share2', 120 + 90, 440, 0.4, ()=>{
			
		});
		*/
		this.addButton('next_level1', 120  + 140, 440, 0.4, ()=>{
			nextLevel.disable(()=>{
				playScreen.nextlevel();
			});
		});
		
		
		
		this.isInit = true;
		this.container.setY(-400);
	}
	
	display()
	{
		
		this.sound.play('win');
		if(!this.isInit)
			this.initialize();
		this._display();
		//this.add.image(235, 384,'background1').setScale(0.4);
	}
	
	addButton(key, positionX, positionY, scale, callback)
	{
		var shadow = this.add.image(positionX, positionY + 10, 'shadow1').setScale(scale);
		var button = this.add.image(positionX, positionY, key).setScale(scale);
		this.container.add(shadow);
		this.container.add(button);
		button.setInteractive();
		button.on('pointerdown', ()=>{
			button.y += 4;
			setTimeout(() => {
				button.y -= 4;
				this.sound.play('button_click');
				callback();
			}, 400);
		});
	}
	
	_display()
	{
		
		this.scene.wake('NextLevel');
		this.scene.setVisible(true, 'NextLevel');
		this.scene.bringToTop('NextLevel');
		
		this.container.setDepth(1);
		this.container.setY(-400);
		let temp = 0;
		var counter = 0;
		var containerTemp = this.container;
		var i = setInterval(function(){
			counter++;
			containerTemp.setY(-400 + counter * 10);
			if(counter === 48) {
				clearInterval(i);
			}
		}, 1);
	}
	
	disable(callback)
	{
		let temp = 0;
		var counter = 0;
		let instance = this;
		var containerTemp = this.container;
		var sceneTemp = this.scene;
		var i = setInterval(function(){
			counter++;
			containerTemp.setY(80 - counter * 8);
			if(counter === 60) {
				callback();
				instance.dispose();
				clearInterval(i);
			}
		}, 0.1);
	}
	
	dispose()
	{
		this.scene.setVisible(false, 'NextLevel');
		this.scene.sleep('NextLevel');
	}
}