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
   }
	
	create ()
	{
		this.add.nineslice(60, 120, 300/0.4, 420/0.4, 'popup', [260, 50, 50, 50]).setScale(0.4);
		
		var title = 'New Best!!!';
		this.icon = this.add.image(210, 320,'icon').setScale(0.4);
		
		
		
		this.titleText = this.add.text(100, 150, title, {
			font: "45px Arial",
			fill: "#ffffff",
			align: "center"
		});

		//add button
		this.addButton('replay', 120, 460, 0.4, ()=>{
			score.dispose();
			playScreen.replay();
			particle.dispose();
		});
		this.addButton('share1', 120 + 90, 460, 0.4, ()=>{
			
		});
		this.addButton('main_menu', 120  + 180, 460, 0.4, ()=>{

			mainMenu.display();
			playScreen.dispose();
			score.dispose();
			particle.dispose();
		});
		
		this.scoreValue = this.add.text(210, 320, 0, {
			font: "80px Arial",
			fill: "#FF8800",
			align: "center"
		});
		
		this.bestValue = this.add.text(215,390, 'Best ' + this.bestScore, {
            font: "25px Arial",
            fill: "#000000",
            align: "center"
        }).setOrigin(0.5);
		
		this.scoreValue.setOrigin(0.5);
	}
	
	display(value)
	{
		this._display();
		//this.add.image(235, 384,'background1').setScale(0.4);
		var title = 'New Best!!!';
		if(value <= this.bestScore)
		{
			title = 'Your Score';
			this.icon.setVisible(false);
			this.bestValue.setText('Best ' + this.bestScore);
		}else{
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
		this.add.image(positionX, positionY + 10, 'shadow').setScale(scale);
		var button = this.add.image(positionX, positionY, key).setScale(scale);
		button.setInteractive();
		button.on('pointerdown', callback);
	}
	
	_display()
	{
		this.scene.wake('Score');
		this.scene.setVisible(true, 'Score');
		this.scene.bringToTop('Score');
	}
	
	dispose()
	{
		
		this.scene.setVisible(false, 'Score');
		this.scene.sleep('Score');
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