var main ={
    preload: function(){
        game.load.image('sky','assets/sky.png')
        game.load.image('ground','assets/platform.png')
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
     },
    
    update: function(){
    
    },
}

var game = new Phaser.Game( 800,600, Phaser.AUTO, 'gameDiv');
game.state.add('main', main);
game.state.start('main');