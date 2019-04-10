class Particle extends Phaser.Scene{
	
	constructor(){
        super({key: 'Particle', active: true});
		particleArray = ['blue', 'green','yellow',  'pink','blueblur', 'pinkblur', 'greenblur', 'yellowblur'];
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
	}
	
	dispose()
	{
		this.scene.setVisible(false, 'Particle');
		//this.scene.sleep('Particle');
	}
	

	
}