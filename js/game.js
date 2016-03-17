/* game namespace */
var game = {
 
	// game data
    data : {
        score : 0,				// coins count
        s : "COINS: ",			// coin text
        s_max: "/50",
        blocks : 0,				// block count
        b : "BLOCKS: ",			// block text
        b_max: "/4",
        control_boy : false,	// if player = boy
        control_girl : true,	// if player = girl
        health : 3,
        d:"DASH",
        givenTime: 30,
        dashing_time : 30,
    },
     
    // Run on page load.
    "onload" : function () {
 
        // Initialize the video.
        if (!me.video.init("screen", 800, 600, true, 'auto')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
         
        // add "#debug" to the URL to enable the debug Panel
        if (document.location.hash === "#debug") {
            window.onReady(function () {
                me.plugin.register.defer(debugPanel, "debug");
            });
        }
 
        // Initialize the audio.
        me.audio.init("mp3,ogg");
        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);      
        // Load the resources.
        me.loader.preload(game.resources);
        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },
 
 
 
    // Run on game resources loaded.
    /* ---
 
   callback when everything is loaded
     
   ---  */
     
	"loaded" : function ()
	{
		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());
		me.state.set(me.state.END, new game.EndScreen());
		
		//////////////// Entity Pool ///////////////////////
		// characters
 		me.entityPool.add("girl", 	game.girlEntity); 
        me.entityPool.add("boy", 	game.boyEntity);
        me.entityPool.add("weapon",	game.weaponEntity); 
        // collectables  
        me.entityPool.add("coins",	game.coinsEntity);
        me.entityPool.add("coins3", game.coins3Entity);
        me.entityPool.add("block", 	game.blockEntity);
        // enemies
        me.entityPool.add("enemy1",	game.enemy1Entity);
        me.entityPool.add("enemy1B",game.enemy1BEntity);
        me.entityPool.add("enemy1C",game.enemy1CEntity);
        me.entityPool.add("enemy2", game.enemy2Entity);
        me.entityPool.add("enemy2B", game.enemy2BEntity);
        me.entityPool.add("enemy2C", game.enemy2CEntity);
        me.entityPool.add("enemy2S", game.enemy2SEntity);
        me.entityPool.add("enemy2SB", game.enemy2SBEntity);
        me.entityPool.add("enemy2SC", game.enemy2SCEntity);
       //	me.entityPool.add("enemy2Cir", game.enemy2CirEntity);

		me.entityPool.add("bomb",game.bombEntity);
		
        // platform entities
 		me.entityPool.add("stealth_platform",game.stealth_platformEntity);
 		me.entityPool.add("moving_platform1",game.moving_platform1Entity); // horizontally moving
 		me.entityPool.add("moving_platform2",game.moving_platform2Entity); // vertically moving
 		me.entityPool.add("moving_platform3",game.moving_platform3Entity);
 		me.entityPool.add("moving_platform4",game.moving_platform4Entity);
 		
 		
 		
 		//me.entityPool.add("moving_platform5",game.moving_platform5Entity);
		me.entityPool.add("droppable",game.droppableEntity);
		me.entityPool.add("breakable",game.breakableEntity);
 		// puzzle entities
        me.entityPool.add("station",game.stationEntity);
        me.entityPool.add("puzzleBlocks",	game.puzzleBlocksEntity);
		//me.entityPool.add("puzzleBlocks2",	game.puzzleBlocks2Entity);
		//me.entityPool.add("puzzleBlocks3",	game.puzzleBlocks3Entity);
 		me.entityPool.add("puzzleBlocks4",	game.puzzleBlocks4Entity);
 	//	me.entityPool.add("puzzleBlocks5",	game.puzzleBlocks5Entity);
 	//	me.entityPool.add("puzzleBlocks6",	game.puzzleBlocks6Entity);
        // other entities
    //  me.entityPool.add("claw", game.clawEntity);
		
          
		////////// Button Layout ///////////
		me.input.bindKey(me.input.KEY.LEFT,  "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.UP,     "jump", true);
		me.input.bindKey(32,     "jump", true); // space
		me.input.bindKey(me.input.KEY.X,     "attack");
		me.input.bindKey(me.input.KEY.S,     "switchB");
		me.input.bindKey(me.input.KEY.A,     "switchG");
		me.input.bindKey(me.input.KEY.Z,     "dash");
		me.input.bindKey(49,     "one");
	//	me.input.bindKey(50,     "two");
		me.input.bindKey(51,     "three"); 
		me.input.bindKey(52,     "four");
		
		me.debug.renderHitBox = true;
      
		//start the game
   		
   		me.state.change(me.state.MENU);
   		//me.state.change(me.state.PLAY);
	}
};