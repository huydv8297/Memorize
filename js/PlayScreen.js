class PlayScreen extends Phaser.Scene{
    constructor() {
        super({ key: 'PlayScreen', active: false});
        this.current_level = 1;
        this.current_total_row_tiles = 2;
        this.current_total_col_tiles = 2;
        this.current_total_numbers = 2;
        this.current_number_question = 1;
        this.screen_width = 432;
        this.screen_height = 768;
        this.hearts = [];
        this.total_hearts = 3;
    }

    preload(){
        this.load.image('background', 'assets/sprites/Gameplay/NewBG.png');
        this.load.image('base-bg-btn', 'assets/sprites/Gameplay/New Update/Header-Btn-Base.png');
        this.load.image('shadow-bg-btn', 'assets/sprites/Gameplay/New Update/Exit-Btn-Shadow.png');
        this.load.image('exit-btn', 'assets/sprites/Gameplay/New Update/Exit-Btn.png');
        this.load.image('sound-btn', 'assets/sprites/Gameplay/New Update/Sound-Btn.png');
        this.load.image('header-base', 'assets/sprites/Gameplay/New Update/Header-base.png');
        this.load.image('white-heart', 'assets/sprites/Gameplay/New Update/White-Heart.png');
        this.load.image('heart', 'assets/sprites/Gameplay/New Update/Heart.png');
        this.load.image('time-white', 'assets/sprites/Gameplay/Time-white.png');
        this.load.image('time-left', 'assets/sprites/Gameplay/Time-left.png');

        this.load.image('tile-base', 'assets/sprites/Gameplay/New Update/Tile-Base.png');
        this.load.image('tile-cover', 'assets/sprites/Gameplay/New Update/Tile-Cover.png');
        this.load.image('blue-tile-base', 'assets/sprites/Gameplay/New Update/Blue-Tile-Base.png');
        this.load.image('blue-tile-cover', 'assets/sprites/Gameplay/New Update/Blue-Tile-Cover.png');
        this.load.image('red-tile-base', 'assets/sprites/Gameplay/New Update/Red-Tile-Base.png');
        this.load.image('red-tile-cover', 'assets/sprites/Gameplay/New Update/Red-Tile-Cover.png');
    }

    create ()
    {
        this.create_ui_header();
        this.create_board_game();
    }

    create_ui_header()
    {
        this.add.image(216, 384,'background').setScale(0.5);

        let header = this.physics.add.staticGroup();

        header.create(60, 60, 'base-bg-btn').setScale(0.395).refreshBody();
        header.create(60, 55, 'shadow-bg-btn').setScale(0.39).refreshBody();
        let exitButton = header.create(60, 50, 'exit-btn').setScale(0.39).refreshBody();
		exitButton.setInteractive();
		exitButton.on('pointerdown', ()=> {
			this.sound.play('button_click');
			this.scene.setVisible(true, 'MainMenu');
			this.scene.setVisible(false, 'PlayScreen');
			this.scene.switch('MainMenu');			
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
        header.create(372, 50, 'sound-btn').setScale(0.39).refreshBody();

        header.create(216, 100, 'time-white').setScale(0.395).refreshBody();
        var time_left = header.create(29, 94.5, 'time-left').setScale(0.395).refreshBody();
        time_left.setOrigin(0);
        time_left.scaleX = 0.5;
    }

    create_board_game()
    {
        //let tiles = [];
        let start_x = 0.5 * (this.screen_width - this.current_total_col_tiles * 88 + 88);
        let start_y = 200 + 0.5 * (this.screen_height - 300 - this.current_total_row_tiles * 81 + 81);
        let numbers = [];
        let have_numbers = []
        for(let i = 0; i < this.current_total_row_tiles * this.current_total_col_tiles; i++)
        {
            numbers.push(-1);
            have_numbers.push(false);
        }

        for(let i = 0; i < this.current_total_numbers; i++)
        {
            let min = 0; 
            let max = this.current_total_row_tiles * this.current_total_col_tiles;  
            let random = Math.floor(Math.random() * (+max - +min)) + +min; 

            while(have_numbers[random])
            {
                random = Math.floor(Math.random() * (+max - +min)) + +min; 
            }

            numbers[random] = i + 1;
            have_numbers[random] = true;
        }

        let index_tile = 0;
        let count_right_answer = 0;

        let tile_base_question = this.add.sprite(268, 151,'blue-tile-base').setScale(0.45);
        let tile_question = this.add.sprite(268, 151,'blue-tile-cover').setScale(0.45);

        tile_base_question.setVisible(false);
        tile_question.setVisible(false);

        let question_text = this.add.text(
            90,
            130,
            "Where is    " + this.current_number_question + "    ?",
            {
                font: "33px Arial",
                fill: "#fff",
                align: "center",
            }
        );

        question_text.setVisible(false);

        for(let col = 0; col < this.current_total_col_tiles; col++)
        {
            for(let row = 0; row < this.current_total_row_tiles; row++)
            {
                let tile_base = this.add.sprite(start_x + 88 * col, start_y + 2 + 81 * row,'tile-base').setScale(0.55);
                let tile = this.add.sprite(start_x + 88 * col, start_y + 81 * row,'tile-cover').setScale(0.55);

                let text_tile = '?';

                if(numbers[index_tile] != -1)
                {
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
                text_answer.setVisible(false);

                let delayInMilliseconds = 500;

                setTimeout(() => {
                    delayInMilliseconds = 3000;

                    tile.y += 4;
                    tile_base.setTexture('blue-tile-base');
                    tile.setTexture('blue-tile-cover');

                    text_answer.setVisible(true);
                    setTimeout(() => {
                        tile.y -= 4;
                        tile_base.setTexture('tile-base');
                        tile.setTexture('tile-cover');
                        text_answer.setVisible(false);
                    }, delayInMilliseconds);

                    tile.setInteractive();
                    tile.on('pointerdown', () => {
                        tile.y += 4;
                        
                        delayInMilliseconds = 400;
                        setTimeout(() => {
                            this.input.disable(tile);

                            tile.y -= 4;

                            if(text_tile == this.current_number_question)
                            {
                                tile_base.setTexture('blue-tile-base');
                                tile.setTexture('blue-tile-cover');
                                count_right_answer++;
                                if(count_right_answer == this.current_total_numbers)
                                {
                                    this.current_level++;
                                    this.current_number_question = 1;
                                    question_text.setText("        Done !");
                                    tile_base_question.setVisible(false);
                                    tile_question.setVisible(false);
                                }
                                else
                                {
                                    this.current_number_question++;
                                    question_text.setText("Where is    " + this.current_number_question + "    ?");
                                }
                            }
                            else
                            {
                                tile_base.setTexture('red-tile-base');
                                tile.setTexture('red-tile-cover');

                                this.total_hearts--;
                                this.hearts[this.total_hearts].setVisible(false);
                                if(this.total_hearts == 0)
                                {
                                    score.display(this.current_level - 1);                                
                                }
                            }

                            text_answer.setVisible(true);
                        }, delayInMilliseconds);
                    });
                }, delayInMilliseconds);
                
                //tiles.push(tile);
            }
        }

        setTimeout(() => {
            tile_base_question.setVisible(true);
            tile_question.setVisible(true);
            question_text.setVisible(true);
        }, 4000);
    }

    update ()
    {
        
    }
}