class Score extends Phaser.Scene{
    constructor(){
        super({key: 'Score', active: false});
    }
	

	preload(){
	
		this.load.image('popup', 'assets/sprites/WatchVideo/Base.png', 260, 50, 180, 380);

		this.load.image('icon', 'assets/sprites/Level_complete/icon.png');
		this.load.image('main_menu', 'assets/sprites/Level_complete/main_menu.png');
		this.load.image('medal', 'assets/sprites/Level_complete/medal.png');
		this.load.image('next_level', 'assets/sprites/Level_complete/next_level.png');
		this.load.image('replay', 'assets/sprites/Level_complete/Replay.png');
		this.load.image('shadow', 'assets/sprites/Level_complete/Shadow.png');
		this.load.image('share1', 'assets/sprites/Level_complete/Share.png');
		
		
    }
	
	create ()
	{
		this.add.nineslice(60, 192, 300, 500, 'popup', [100, 50, 50, 50]);
	}

	
}