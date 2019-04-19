class Score extends Phaser.Scene{

    constructor(){
			super({key: 'Score', active: true});
			this.bestScore = 0;
			this.particleArray = ['blue','blueblur', 'green', 'greenblur', 'pink', 'pinkblur', 'yellow', 'yellowblur'];
			this.sprites = [];
			this.hasParticle = true;
			this.time2 = 0;
			this.titleText;
			this.icon;
			this.scoreValue = 0;
			this.bestValue;
			
    }
	
	preload(){
		this.load.image('popup', 'assets/sprites/WatchVideo/Base.png', 260, 50, 180, 380);
		this.load.image('background1', 'assets/sprites/Gameplay/NewBG.png');
		this.load.image('icon', 'assets/sprites/Level_complete/icon.png');
		this.load.image('main_menu', 'assets/sprites/Level_complete/main_menu.png');
		this.load.image('next_level', 'assets/sprites/Level_complete/next_level.png');
		this.load.image('replay', 'assets/sprites/Level_complete/Replay.png');
		this.load.image('shadow', 'assets/sprites/Level_complete/Shadow.png');
		this.load.image('share1', 'assets/sprites/Level_complete/Share.png');
		this.load.image('bg_board1', 'assets/sprites/bg-board.png');
		this.load.audio('gameover', 'assets/audios/GameOver.mp3');
		this.load.audio('best', 'assets/audios/sfx_best_1.mp3');
		this.load.audio('over', 'assets/audios/sfx_over_1.mp3');
		this.container = this.add.container();
		
   }
	
	create ()
	{
		this.add.nineslice(0, 0, 800, 800, 'bg_board1', [6, 6, 6, 6]);
		let popup = this.add.nineslice(60, 150, 300/0.4, 420/0.4, 'popup', [260, 50, 50, 50]).setScale(0.4);
		
		this.container.add(popup);
		
		var title = 'New Best!!!';
		this.icon = this.add.image(210, 350,'icon').setScale(0.4);
		
		this.container.add(this.icon);
		
		this.titleText = this.add.text(100, 180, title, {
			font: "45px Arial",
			fill: "#ffffff",
			align: "center"
		});
		
		this.container.add(this.titleText);
		
		//add button

		this.addButton('replay', 120 + 40, 490, 0.4, ()=>{
			score.disable(()=>{
				playScreen.replay();
				particle.dispose();
			});
			
		});
		
		/*
		this.addButton('share1', 120 + 90, 460, 0.4, ()=>{
			console.log('share1');
		});
		*/
		this.addButton('main_menu', 120  + 130, 490, 0.4, ()=>{
			score.disable(()=>{
				mainMenu.display();
				playScreen.dispose();
				particle.dispose();
			});
		});
		
		
		this.scoreValue = this.add.text(210, 350, 0, {
			font: "80px Arial",
			fill: "#FF8800",
			align: "center"
		});
		this.container.add(this.scoreValue);
		
		this.bestValue = this.add.text(215,420, 'Best ' + this.bestScore, {
            font: "25px Arial",
            fill: "#000000",
            align: "center"
        }).setOrigin(0.5);
		this.container.add(this.bestValue);
		this.scoreValue.setOrigin(0.5);
	}
	

	
	display(value)
	{
		this.container.setDepth(1);
		this.container.setY(-400);
		let temp = 0;
		var counter = 0;
		var containerTemp = this.container;
		var i = setInterval(function(){
			counter++;
			containerTemp.setY(-400 + counter * 8);
			if(counter === 60) {
				clearInterval(i);
			}
		}, 0.1);
		console.log('display score');
		this._display();
		
		this.sound.play('gameover');
		var title = 'New Best!!!';
		if(value <= this.bestScore)
		{
			title = 'Your Score';
			this.icon.setVisible(false);
			this.bestValue.setText('Best ' + this.bestScore);
			this.sound.play('best');
		}else{
			this.sound.play('over');
			this.icon.setVisible(true);
			this.bestScore = value;
			this.bestValue.setText('');
		}
		this.titleText.setText(title);
		//particles
		this.scoreValue.setText(value);

		particle.display();
	}
	
	addButton(key, positionX, positionY, scale, callback)
	{
		var shadow = this.add.image(positionX, positionY + 10, 'shadow').setScale(scale);
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
		this.scene.wake('Score');
		this.scene.setVisible(true, 'Score');
		this.scene.bringToTop('Score');
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
		console.log('dispose');
		
		this.scene.sleep('Score');
		this.scene.setVisible(false, 'Score');
		this.container.setY(-800);
		if(this.hasParticle)
		{
			this.time2 += 0.01;
			for (var i = 0; i < this.sprites.length; i++)
			{
				var sprite = this.sprites[i].s;
				
				sprite.y -= this.sprites[i].r;

				if (sprite.y < -256)
				{
					sprite.y = 150;
				}
			}
			
			if(this.time2 >= 1)
			{
				this.time2 = 0;
				this.hasParticle = false;
				for (var i = 0; i < this.sprites.length; i++)
				{
					var sprite = this.sprites[i].s;
					sprite.destroy();
				}
			}
		}
		
	}
}