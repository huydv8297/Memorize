class PlayScreen extends Phaser.Scene {

    constructor() {
        super({ key: 'PlayScreen', active: true });
        this.current_level = 1;
        this.current_total_row_tiles = 2;
        this.current_total_col_tiles = 2;
        this.current_total_numbers = 2;
        this.current_number_question = 1;
        this.screen_width = 432;
        this.screen_height = 768;

        this.hearts = [];
        this.total_hearts = 3;

        this.time_left_max = 10.0;
        this.time_left = this.time_left_max;
        this.time_left_ui;
        this.isPlay = false;
        this.isDie = false;
        this.levelText;
        this.level_group;

    }


    preload() {
        this.load.image('background', 'assets/sprites/Gameplay/NewBG.png');
        this.load.image('base-bg-btn', 'assets/sprites/Gameplay/New Update/Header-Btn-Base.png');
        this.load.image('shadow-bg-btn', 'assets/sprites/Gameplay/New Update/Exit-Btn-Shadow.png');
        this.load.image('exit-btn', 'assets/sprites/Gameplay/New Update/Exit-Btn.png');
        this.load.image('sound-btn', 'assets/sprites/Gameplay/New Update/Sound-Btn.png');
        this.load.image('sound-off-btn', 'assets/sprites/Gameplay/New Update/Sound-Off-Btn.png');
        this.load.image('header-base', 'assets/sprites/Gameplay/New Update/Header-base.png');
        this.load.image('white-heart', 'assets/sprites/Gameplay/New Update/Die-Heart.png');
        this.load.image('heart', 'assets/sprites/Gameplay/New Update/Heart.png');
        this.load.image('time-white', 'assets/sprites/Gameplay/Time-white.png');
        this.load.image('time-left', 'assets/sprites/Gameplay/Time-left.png');

        this.load.image('tile-base', 'assets/sprites/Gameplay/New Update/Tile-Base.png');
        this.load.image('tile-cover', 'assets/sprites/Gameplay/New Update/Tile-Cover.png');
        this.load.image('blue-tile-base', 'assets/sprites/Gameplay/New Update/Blue-Tile-Base.png');
        this.load.image('blue-tile-cover', 'assets/sprites/Gameplay/New Update/Blue-Tile-Cover.png');
        this.load.image('red-tile-base', 'assets/sprites/Gameplay/New Update/Red-Tile-Base.png');
        this.load.image('red-tile-cover', 'assets/sprites/Gameplay/New Update/Red-Tile-Cover.png');
		this.load.image('bg_board', 'assets/sprites/bg-board.png');

        this.load.audio('button_click', 'assets/sounds/ButtonClick.wav');
        this.load.audio('wrong_click', 'assets/audios/False/WrongClick.wav');
        this.load.audio('true_click', 'assets/audios/Right/TrueClick.mp3');
		
		this.load.audio('end', 'assets/audios/sfx_end_congrats.mp3');

    }

	initialize(){
		this.level_group = this.add.group();
		this.current_level = 1;
        this.current_total_row_tiles = 2;
        this.current_total_col_tiles = 2;
        this.current_total_numbers = 2;
        this.current_number_question = 1;
        this.screen_width = 432;
        this.screen_height = 768;

        this.hearts = [];
        this.total_hearts = 3;
        this.isPlay = false;
        this.isDie = false;
        this.time_left_max = 10.0;
        this.time_left = this.time_left_max;
        this.time_left_ui;
        this.timedEvent;
        this.create_ui_header();
        this.create_board_game();
        console.log('initialize');
    }

    replay() {
        this.initialize();
        this.display();
    }

    create() {
        
    }

    create_ui_header() {
        this.add.image(216, 384, 'background').setScale(0.5);
		
		this.add.nineslice(20, 15, 400, 120, 'bg_board', [6, 6, 6, 6]);
		
        let header = this.physics.add.staticGroup();

        header.create(60, 60, 'base-bg-btn').setScale(0.395).refreshBody();
        header.create(60, 55, 'shadow-bg-btn').setScale(0.39).refreshBody();
        let exitButton = header.create(60, 50, 'exit-btn').setScale(0.39).refreshBody();
        exitButton.setInteractive();
        exitButton.on('pointerdown', () => {
			exitButton.y += 4;
            setTimeout(() => {
                exitButton.y -= 4;
				this.sound.play('button_click');
				mainMenu.display();
				playScreen.dispose();
			}, 400);
        });

        header.create(216, 57, 'header-base').setScale(0.42).refreshBody();
        this.hearts.push(header.create(250, 57, 'heart').setScale(0.45).refreshBody());
        this.hearts.push(header.create(280, 57, 'heart').setScale(0.45).refreshBody());
        this.hearts.push(header.create(310, 57, 'heart').setScale(0.45).refreshBody());

        this.levelText = this.add.text(
            122,
            42,
            "Level " + this.current_level,
            {
                font: "25px Arial",
                fill: "#68707c",
                align: "center",
                //fontFamily: 'SourceSansPro-Regular',
            }
        );

        header.create(372, 60, 'base-bg-btn').setScale(0.395).refreshBody();
        header.create(372, 55, 'shadow-bg-btn').setScale(0.39).refreshBody();
        var soundButton;
        if (isMute) {
            soundButton = header.create(372, 50, 'sound-off-btn').setScale(0.39).refreshBody();
        } else {
            soundButton = header.create(372, 50, 'sound-btn').setScale(0.39).refreshBody();
        }


        soundButton.setInteractive();
        soundButton.on('pointerdown', () => {
			soundButton.y += 4;
            isMute = !isMute;
            if (isMute) {
                this.sound.play('button_click');
                this.sound.mute = true;
                soundButton.setTexture('sound-off-btn');
            } else {

                this.sound.mute = false;
                soundButton.setTexture('sound-btn');
            }
			
			setTimeout(() => {
                soundButton.y -= 4;
				this.sound.play('button_click');
			}, 400);
        });

        let time_ui = header.create(30, 100, 'time-white').setScale(0.395).refreshBody();
        time_ui.setOrigin(0);
        this.time_left_ui = header.create(30, 101, 'time-left').setScale(0.395).refreshBody();
        this.time_left_ui.setOrigin(0);

    }

    display() {

        this.scene.wake('PlayScreen');
        this.scene.setVisible(true, 'PlayScreen');
        this.scene.switch('PlaySceen');
        this.scene.bringToTop('PlayScreen');
        //var timedEvent = this.time.delayedCall(this.current_total_numbers * 200 + 1000, () => {
        //    this.isPlay = true;
       // }, [], this);
    }

    dispose() {
        this.isPlay = false;
        this.scene.setVisible(false, 'PlayScreen');
        this.scene.sleep('PlayScreen');
    }

    create_board_game() {
        //let tiles = [];
        let start_x = 0.5 * (this.screen_width - this.current_total_col_tiles * 88 + 88);
        let start_y = 200 + 0.5 * (this.screen_height - 300 - this.current_total_row_tiles * 81 + 81);
		
		let bg_board = this.add.nineslice(start_x - 50 , start_y - 50, this.current_total_col_tiles * 88 + 15, this.current_total_row_tiles * 81 + 15, 'bg_board', [6, 6, 6, 6]);
		this.level_group.add(bg_board);
		
        let numbers = [];
        let have_numbers = []
        for (let i = 0; i < this.current_total_row_tiles * this.current_total_col_tiles; i++) {
            numbers.push(-1);
            have_numbers.push(false);
        }

        for (let i = 0; i < this.current_total_numbers; i++) {
            let min = 0;
            let max = this.current_total_row_tiles * this.current_total_col_tiles;
            let random = Math.floor(Math.random() * (+max - +min)) + +min;

            while (have_numbers[random]) {
                random = Math.floor(Math.random() * (+max - +min)) + +min;
            }

            numbers[random] = i + 1;
            have_numbers[random] = true;
        }

        let index_tile = 0;
        let count_right_answer = 0;

        let tile_base_question = this.add.sprite(268, 175, 'blue-tile-base').setScale(0.45);
        let tile_question = this.add.sprite(268, 175, 'blue-tile-cover').setScale(0.45);

        this.level_group.add(tile_base_question);
        this.level_group.add(tile_question);

        tile_base_question.setVisible(false);
        tile_question.setVisible(false);

        let question_text = this.add.text(
            90,
            150,
            "Where is    " + this.current_number_question + "    ?",
            {
                font: "33px Arial",
                fill: "#fff",
                align: "center",
            }
        );

        this.level_group.add(question_text);

        question_text.setVisible(false);

        for (let col = 0; col < this.current_total_col_tiles; col++) {
            for (let row = 0; row < this.current_total_row_tiles; row++) {
                let tile_base = this.add.sprite(start_x + 88 * col, start_y + 2 + 81 * row, 'tile-base').setScale(0.55);
                let tile = this.add.sprite(start_x + 88 * col, start_y + 81 * row, 'tile-cover').setScale(0.55);
				//let buttonContainer = this.add.container(200, 200);
				//buttonContainer.add(tile_base);
				//buttonContainer.add(tile);
				//buttonContainer.setDepth(1);
				//buttonContainer.setPosition(tile_base.position);
				
				//this.initTile(tile, tile_base, 0.55, 40);
				
				
				let temp = 0;
				let counter = 0;
				let i = setInterval(function(){
					let scaleTemp = 0.55 * (counter/10);
					
					//buttonContainer.setScale(scaleTemp);
					counter++;
					tile_base.setScale(scaleTemp);
					tile.setScale(scaleTemp);
					if(counter === 10) {
						clearInterval(i);
					}
				}, 50);
				
				//this.level_group.add(buttonContainer);
                this.level_group.add(tile_base);
                this.level_group.add(tile);

                let text_tile = '?';

                if (numbers[index_tile] != -1) {
                    text_tile = numbers[index_tile];
                }
                index_tile++;

                let text_answer = this.add.text(
                    tile.x - 8,
                    tile.y - 15,
                    text_tile,
                    {
                        font: "25px Arial",
                        fill: "#fff",
                        align: "center",
                    }
                );
				//buttonContainer.add(text_answer);
                this.level_group.add(text_answer);

                text_answer.setVisible(false);

                let delayInMilliseconds = 500;
                tile.disableInteractive();
                setTimeout(() => {
                    delayInMilliseconds = this.current_total_numbers * 400 + 2000;
                    tile.y += 4;
                    tile_base.setTexture('blue-tile-base');
                    tile.setTexture('blue-tile-cover');

                    text_answer.setVisible(true);
                    setTimeout(() => {
                        tile.y -= 4;
                        tile_base.setTexture('tile-base');
                        tile.setTexture('tile-cover');
                        text_answer.setVisible(false);
                        tile.setInteractive();
						this.isPlay = true;
                        tile.on('pointerdown', () => {
                            tile.y += 4;
							
                            delayInMilliseconds = 400;
                            setTimeout(() => {
                                tile.y -= 4;

                                if (text_tile == this.current_number_question) {
                                    this.input.disable(tile);
                                    tile_base.setTexture('blue-tile-base');
                                    tile.setTexture('blue-tile-cover');
                                    count_right_answer++;
                                    this.sound.play('true_click');
                                    if (count_right_answer == this.current_total_numbers) {
                                        this.isPlay = false;
										let count = this.level_group.getLength();
										this.cleanLevel(count - 1, ()=>{
											nextLevel.display();
										});
                                      //  nextLevel.display();
										this.sound.play('over');
                                        this.current_number_question = 1;
                                        question_text.setText("        Done !");
                                        tile_base_question.setVisible(false);
                                        tile_question.setVisible(false);
                                    }
                                    else {
                                        this.current_number_question++;
                                        question_text.setText("Where is    " + this.current_number_question + "    ?");
                                    }
                                    text_answer.setVisible(true);
                                }
                                else {
                                    this.sound.play('wrong_click');
                                    tile_base.setTexture('red-tile-base');
                                    tile.setTexture('red-tile-cover');
                                    text_answer.setVisible(true);

                                    setTimeout(() => {
                                        tile_base.setTexture('tile-base');
                                        tile.setTexture('tile-cover');
                                        text_answer.setVisible(false);
                                    }, 400);

                                    this.total_hearts--;
                                    //this.hearts[this.total_hearts].setVisible(false);
                                    if(this.total_hearts >= 0)
										this.hearts[this.total_hearts].setTexture('white-heart');
                                    if (this.total_hearts == 0) {
										let count = this.level_group.getLength();
										this.isPlay = false;
										this.cleanLevel(count - 1, ()=>{
											score.display(this.current_level - 1);
										});
                                    }
                                }

                            }, delayInMilliseconds);
                        });

                    }, delayInMilliseconds);
                }, delayInMilliseconds);

                //tiles.push(tile);
            }
        }

        setTimeout(() => {
            tile_base_question.setVisible(true);
            tile_question.setVisible(true);
            question_text.setVisible(true);
        }, this.current_total_numbers * 200 + 1000);
    }

    update (time, delta)
    {
		if(!this.isPlay)
			return;
        if(this.time_left > 0)
		{
			this.time_left -= delta/1000;
			this.time_left_ui.scaleX = 0.395 * this.time_left/this.time_left_max;
		}else if(this.total_hearts > 0){
			let count = this.level_group.getLength();
			this.cleanLevel(count - 1, ()=>{
				score.display(this.current_level - 1);
			});
			this.isPlay = false;
		}
		
		if(this.isDie)
		{
			if(this.total_hearts > 0)
				this.die();
		}
    }
	
	die()
	{
		
		this.total_hearts--;
		console.log(this.total_hearts);
		this.hearts[this.total_hearts].setVisible(false);
		if(this.total_hearts == 0)
		{
			let count = this.level_group.getLength();
			this.cleanLevel(count - 1, ()=>{
				score.display(this.current_level - 1);
			});
		}
		else{
			this.time_left = this.time_left_max;
		}
		
		this.isDie = false;
	}
	
	nextlevel(){
		if(this.current_total_numbers < 24)
		{
			this.current_total_numbers++;
			this.current_level++;
		}
			
		this.time_left = this.time_left_max;
		
		if(this.current_total_numbers >= this.current_total_row_tiles * this.current_total_col_tiles - 1)
		{
			if(this.current_total_col_tiles == this.current_total_row_tiles)
				this.current_total_row_tiles++;
			else
				
				this.current_total_col_tiles++;
		}
		

		this.levelText.setText("Level " + this.current_level);
		
		this.level_group.clear(true, true);
        this.create_board_game();
        this.display();
    }
	
	cleanLevel(id, callback){
		if(id < 0)
		{	callback();
			this.time_left_ui.scaleX = 0.395;
			return; 
		}
			
		let array = this.level_group.getChildren();
		let groupTemp = this.level_group;
		let temp = 0;
		var counter = 0;
		var i = setInterval(function(){
			array[id].setOrigin(0.5);
			array[id].setScale(0.4 * (1 - counter/10));
			counter++;
			if(counter === 10) {
				array[id].removeInteractive();
				array[id].setVisible(false);
				//groupTemp.remove(array[id], true, true);
				clearInterval(i);
			}
		}, 10);
		
		setTimeout(() =>{
			this.cleanLevel(id - 1, callback);
		}, 20);
	}
	
	
	initTile(tile, tile_base, scale, timeout)
	{
		let scaleTemp = 0;
		let counter = 0;
		while(true){
			counter++;
			setTimeout(()=>{
				scaleTemp = counter * (scale /10);
				title.setScale(scaleTemp);
				tile_base.setScale(scaleTemp);
				if(counter === 10) {
					return;
				}
			}, timeout);
		}
	}
}