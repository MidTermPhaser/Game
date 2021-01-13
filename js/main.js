var main ={
    preload: function(){
        game.load.image('sky','assets/sky.png');
        game.load.image('ground','assets/platform.png');
        //player
        game.load.spritesheet('dude','assets/dude.png',32,48)
        //star
        game.load.image('star','assets/star.png')
    },
    
    create: function(){
        //bg
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
        
        
        //star
        this.stars=game.add.group()
        this.stars.enableBody=true
        for(var i=0;i<12;i++){
            var star=this.stars.create(i*70,0,'star')
            star.body.gravity.y=20
            star.body.bounce.y=0.8+Math.random()*0.2
        }
        //score
        this.score=0
        this.scoreText=game.add.text(16,16,'分數:0',{fontSize:'24px',fill:'#000'})
     },
    
    update: function(){
       //playermov
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
        
        
        //star
        game.physics.arcade.collide(this.stars,this.platforms)
        game.physics.arcade.overlap(this.player,this.stars,this.collectStar,null,this)
    },
    collectStar: function(player,star){
        star.kill()
        this.score+=10
        this.scoreText.text='分數:'+this.score
    },
}

var game = new Phaser.Game(800,600, Phaser.AUTO, 'gameDiv');
game.state.add('main', main);
game.state.start('main');