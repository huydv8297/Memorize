class Score extends Phaser.Scene{
	
    constructor(){
		super({key: 'Score', active: true});
		this.bestScore = 70;
		this.particleArray = ['blue','blueblur', 'green', 'greenblur', 'pink', 'pinkblur', 'yellow', 'yellowblur'];
		this.sprites = [];
		this.hasParticle = true;
		this.time2 = 0;
    }
	
	preload(){
		this.load.image('popup', 'assets/sprites/WatchVideo/Base.png', 260, 50, 180, 380);
		this.load.image('background', 'assets/sprites/Gameplay/NewBG.png');
		this.load.image('icon', 'assets/sprites/Level_complete/icon.png');
		this.load.image('main_menu', 'assets/sprites/Level_complete/main_menu.png');
		this.load.image('medal', 'assets/sprites/Level_complete/medal.png');
		this.load.image('next_level', 'assets/sprites/Level_complete/next_level.png');
		this.load.image('replay', 'assets/sprites/Level_complete/Replay.png');
		this.load.image('shadow', 'assets/sprites/Level_complete/Shadow.png');
		this.load.image('share1', 'assets/sprites/Level_complete/Share.png');
		
		
		this.load.image('blue', 'assets/sprites/WinPopup/Blue.png');
		this.load.image('blueblur', 'assets/sprites/WinPopup/BlueBlur.png');
		this.load.image('green', 'assets/sprites/WinPopup/Green.png');
		this.load.image('greenblur', 'assets/sprites/WinPopup/GreenBlur.png');
		this.load.image('pink', 'assets/sprites/WinPopup/Pink.png');
		this.load.image('pinkblur', 'assets/sprites/WinPopup/PinkBlur.png');
		this.load.image('yellow', 'assets/sprites/WinPopup/Yellow.png');
		this.load.image('yellowblur', 'assets/sprites/WinPopup/YellowBlur.png');
		
   }
	
	create ()
	{
		
	}
	
	display(value)
	{
		this.add.image(235, 384,'background').setScale(0.4);
		
		//particles
		this.addRandomParticles();
		
		this.add.nineslice(60, 120, 300/0.4, 420/0.4, 'popup', [260, 50, 50, 50]).setScale(0.4);
		
		var title = 'New Best!!!';
		var icon = this.add.image(210, 320,'icon').setScale(0.4);
		
		if(value <= this.bestScore)
		{
			title = 'Your Score';
			icon.setVisible(false);
			
			this.add.text(215,390, 'Best ' + this.bestScore, {
			font: "25px Arial",
			fill: "#000000",
			align: "center"
		}).setOrigin(0.5);
		}
		
		this.add.text(100, 150, title, {
			font: "45px Arial",
			fill: "#ffffff",
			align: "center"
		});

		//add button
		this.addButton('replay', 120, 460, 0.4, ()=>{
			
		});
		this.addButton('share1', 120 + 90, 460, 0.4, ()=>{
			
		});
		this.addButton('main_menu', 120  + 180, 460, 0.4, ()=>{
			this.scene.wake('MainMenu');
			this.scene.setVisible(true, 'MainMenu');
			this.scene.setVisible(false, 'Score');
			this.scene.bringToTop('MainMenu');
		});
		
		var numb = this.add.text(215, 320, value, {
			font: "80px Arial",
			fill: "#FF8800",
			align: "center"
		});
		
		numb.setOrigin(0.5);
		this.scene.setVisible(true, 'Score');
		this.scene.setVisible(false, 'MainMenu');
		this.scene.sleep('MainMenu');
		this.scene.bringToTop('Score');
	}
	
	addButton(key, positionX, positionY, scale, callback)
	{
		this.add.image(positionX, positionY + 10, 'shadow').setScale(scale);
		var button = this.add.image(positionX, positionY, key).setScale(scale);
		button.setInteractive();
		button.on('pointerdown', callback);
	}
	
	addRandomParticles()
	{
		
		//  Create the particles
		
		for (var i = 0; i < 300; i++)
		{
			var x = Phaser.Math.Between(-64, 800);
			var y = Phaser.Math.Between(-64, 300);

			var image = this.add.image(x, y, this.particleArray[Math.floor(Math.random() * 8)]).setScale(0.4);

			this.sprites.push({ s: image, r: 2 + Math.random() * 6 });
		}
	}
	
	update()
	{
		
		if(this.hasParticle)
		{
			this.time2 += 0.01;
			console.log(this.time2);
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