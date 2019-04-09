class Particle extends Phaser.Scene{
	particleArray = ['blue', 'green','yellow',  'pink','blueblur', 'pinkblur', 'greenblur', 'yellowblur'];
	sprites = [];
	hasParticle = true;
	time2 = 0;
	constructor(){
        super({key: 'Particle', active: true});
    }
	
	preload(){	
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
	
	display()
	{
		
		this.addRandomParticles('blue', 50);
		this.addRandomParticles('pink', 200);
		this.addRandomParticles('yellow', 200);
		this.addRandomParticles('green', 150);
		this.scene.setVisible(true, 'Particle');
		this.scene.bringToTop('Particle');
	}
	
	addRandomParticles(frame, offset)
	{
		
		//  Create the particles
		var particles = this.add.particles(frame);

		particles.createEmitter({
			//frame: [ 'red', 'green', 'blue' ],
			x: 100 + offset,
			y: -10,
			speed: 120,
			gravityY: 0,
			lifespan: 5000,
			scaleStart: 0.3,
			scale: 0.2,
			frequency: 1,
			blendMode: 'NORMAL',
		});
		
		this.time.delayedCall(5000, function() {
			particles.destroy();
		});
		/*
		for (var i = 0; i < 100; i++)
		{
			var x = Phaser.Math.Between(100, 300);
			var y = Phaser.Math.Between(200, 250);

			var image = this.add.image(x, y, this.particleArray[Math.floor(Math.random() * 4)]).setScale(0.4);
			image.setScale(0.18);
			this.sprites.push({ s: image, r: 1 + Math.random() * 6 });
		}
		*/
	}
	
	dispose()
	{
		this.scene.setVisible(false, 'Particle');
		//this.scene.sleep('Particle');
	}
	
	update()
	{
		
		/*
		if(this.hasParticle)
		{
			this.time2 += 0.01;
			console.log(this.time2);
			for (var i = 0; i < this.sprites.length; i++)
			{
				var sprite = this.sprites[i].s;
				
				sprite.y -= this.sprites[i].r;
				if(sprite.x > 210)
				{
					sprite.x += this.sprites[i].r;
				}else{
					sprite.x -= this.sprites[i].r;
				}

				if (sprite.y < -256)
				{
					sprite.y = 150;
				}
				
				if(sprite.x > 500 || sprite.x < -10){
					sprite.x = Phaser.Math.Between(100, 300);
				}
				
				
			}
			
			if(this.time2 >= 10)
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
		
		*/
	}
	
	
}