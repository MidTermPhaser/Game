var main ={
    preload: function(){
        game.load.image('sky','assets/sky.png');
        game.load.image('ground','assets/platform.png');
        //player
        game.load.spritesheet('dude','assets/dude.png',32,48)
    },
    
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.image(0, 0, 'sky');
  
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
  
        var ground = this.platforms.create(0, game.world.height-64, 'ground');
        ground.scale.setTo(2, 2);
  
        this.platforms.create(400, 400, 'ground');
        this.platforms.create(-150, 250, 'ground');
  
        this.platforms.setAll('body.immovable', true);
        
        //player
        this.player = game.add.sprite(32,game.world.height.height-150,'dude')
        game.physics.arcade.enable(this.player)
        this.player.body.bounce.y = 0.2
        this.player.body.gravity.y = 300
        this.player.body.collideWorldBounds = true
        this.player.body.setSize(20,32,5,16)
        
        this.player.animations.add('left',[0,1,2,3],10,true)
        this.player.animations.add('right',[5,6,7,8],10,true)
        
        this.cursors = game.input.keyboard.createCursorKeys()
     },
    
    update: function(){
       game.physics.arcade.collide(this.player,this.platforms)
        
        this.player.body.velocity.x = 0
        if(this.cursors.left.isDown){
            this.player.body.velocity.x = -150
            this.player.animations.play('left')
        }
        else if (this.cursors.right.isDown){
            this.player.body.velocity.x = 150
            this.player.animations.play('right')
        }
        else {
            this.player.animations.stop()
            this.player.frame = 4
        }
        
        if(this.cursors.up.isDown && this.player.body.touching.down){
            this.player.body.velocity.y = -350
        }
    },
}

var game = new Phaser.Game(800,600, Phaser.AUTO, 'gameDiv');
game.state.add('main', main);
game.state.start('main');