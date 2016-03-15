var posX, posY;
//var posX2, posY2;
//var posX3, posY3;
var posX4, posY4; // should be able to replaced with setting co-ordinate
//var pair_2_3  = false;
//var pair_5_6  = false;
var puzzleBlocksType = "puzzleBlocksType";

game.puzzleBlocksEntity = me.ObjectEntity.extend({
	
	init: function(x, y, settings) {
        this.parent(x, y, settings);
		this.updateColRect(-1, 0, -1, 0);
        this.collidable = false;		
        this.setVelocity(3, 0); 
        this.myAlpha = 0; 
     //  	this.type = "me.game.puzzleBlock";			// of puzzleBlock type
        this.claw = false;							// if claw is colliding with it
        posX = this.pos.x;
        posY = this.pos.y;
        this.claw = false;							// if claw is colliding with it
        this.type = puzzleBlocksType;
        this.count = false;
    },
    
    update: function(){
   
    	if ( game.data.blocks >= 2 && me.input.isKeyPressed('one') 
			&& station_on == true ) {
    		this.collidable = true;
    		this.myAlpha = 1;
    		this.setVelocity(3, 8); 
    		console.log ("creaetd");
    		if ( !this.count){
    			this.count = true;
    			if (game.data.blocks == 4)
    				game.data.blocks = 2;
    			else if (game.data.blocks == 3)
    				game.data.blocks = 1;
    			else if (game.data.blocks = 2)
    				game.data.blocks = 0;
    		}
    	}
  
  		if ( this.pos.y + 50> me.game.currentLevel.rows * me.game.currentLevel.tileheight){
  			this.myAlpha = 0;
    		this.collidable = false;
    		this.setVelocity(3, 0); 
    		this.pos.x = posX; this.pos.y = posY;
    		this.count = false;
    			
    		if ( game.data.blocks == 0)
    			game.data.blocks = 2;			
    		else if ( game.data.blocks == 1)
    			game.data.blocks = 3;
    		else if ( game.data.blocks == 2)
    			game.data.blocks = 4;
    		else if ( game.data.blocks >= 3)
    			game.data.blocks = 4;			
    	}			
    	
  
    	var res = me.game.collide(this);
    	
    	if (res){	
    		
    		//if ( res.obj.name == "breakable"){ // staty one another object
    	//		this.setVelocity(3, 0); 
    	//	}
    	  //  else 
    	  if (res.x != 0 && res.y == 0 && (res.obj.name == "girl" || res.obj.name == "boy" )){	
    			this.vel.x = res.obj.vel.x; // being pushed
    		}
    		else if ( res.obj.name == "weapon" || res.obj.name == "station") {// break the block to rebuild
    			
    				this.myAlpha = 0;  // disappear
    				this.collidable = false; // cannot be collided
    				this.setVelocity(3, 0);  // do not fall ( if falls, it will be out of scope and never be rebuilt again)
    				this.pos.x = posX; this.pos.y = posY;
    			
    				if ( game.data.blocks == 0)
    					game.data.blocks = 2;
    				else if ( game.data.blocks == 1)
    					game.data.blocks = 3;
    				else if ( game.data.blocks == 2)
    					game.data.blocks = 4;
    						
    				}
   	
    		if ((res.x < 0 && me.input.keyStatus('left'))||
    		res.x > 0 && me.input.keyStatus('right')){// <0 character is on the left
    													    // and press left
    			this.vel.x = 0;	
    		}
    	}
    	
    	if ( !puzzle_pushing ) // if pushing is false
    		this.vel.x = 0;
    	
    	this.updateMovement();
    },
    
    draw : function(context){
	   var local_alpha = context.globalAlpha; // save the previous value
	   context.globalAlpha = this.myAlpha; // semi transparency
	   this.parent(context);  // parent draw function
	   context.globalAlpha = local_alpha; // restore previous value
	},
	
});



game.puzzleBlocks4Entity = me.ObjectEntity.extend({
	
	init: function(x, y, settings) {
        this.parent(x, y, settings);
		this.updateColRect(-1, 0, -1, 0);
        this.collidable = false;		
        this.setVelocity(3, 0); 
        this.myAlpha = 0; 
     //  	this.type = "me.game.puzzleBlock";			// of puzzleBlock type
        this.claw = false;							// if claw is colliding with it
        posX4 = this.pos.x;
        posY4 = this.pos.y;
        this.claw = false;							// if claw is colliding with it
        this.type = puzzleBlocksType;
    },
    
    update: function(){

    	if (game.data.blocks >= 4 && me.input.isKeyPressed('four') 
			&& station_on == true){
    			this.collidable = true;
    			this.myAlpha = 1;
    			this.setVelocity(3, 8); 
    			game.data.blocks = 0;
    	}
    	
    	if ( this.pos.y + 50> me.game.currentLevel.rows * me.game.currentLevel.tileheight)
    	{
    		{
    			game.data.blocks = 4;
    					this.myAlpha = 0;
    					this.collidable = false;
    					this.setVelocity(3, 0); 
    					this.pos.x = posX4; this.pos.y = posY4;
    				
    					
    			
    				}
    	}
    			
    	var res = me.game.collide(this);
    	
    	
    	if (res){	
    		if (res.x != 0 && !res.y && (res.obj.name == "girl" || res.obj.name == "boy" ))		
    			this.vel.x = res.obj.vel.x;
    		else if ( res.obj.name == "weapon" || res.obj.name == "station") // break the block to rebuild
    				{
    					this.myAlpha = 0;
    					this.collidable = false;
    					this.setVelocity(3, 0); 
    					this.pos.x = posX4; this.pos.y = posY4;
    				
    					game.data.blocks = 4;
    			
    				}
    	//	else if ( res.obj.name == "breakable"){
    	//		this.setVelocity(3, 0); 
    	//	}
   	
    		if ((res.x < 0 && me.input.keyStatus('left'))||
    		res.x > 0 && me.input.keyStatus('right')){// <0 character is on the left
    													    // and press left
    			this.vel.x = 0;	
    		}
    	}
    	
    	if ( !puzzle_pushing ) // if pushing is false
    	
    		this.vel.x = 0;
    	
    	this.updateMovement();
    },
    
    draw : function(context){
	   var local_alpha = context.globalAlpha; // save the previous value
	   context.globalAlpha = this.myAlpha; // semi transparency
	   this.parent(context);  // parent draw function
	   context.globalAlpha = local_alpha; // restore previous value
	}

});


///////////////////////////unused codes /////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////
/*
game.puzzleBlocks2Entity = me.ObjectEntity.extend({
	
	init: function(x, y, settings) {
        this.parent(x, y, settings);
		this.updateColRect(-1, 0, -1, 0);
        this.collidable = false;		
        this.setVelocity(3, 0); 
        this.myAlpha = 0;
        posX2 = this.pos.x;
        posY2 = this.pos.y;
        this.claw = false;							// if claw is colliding with it
    },
    
    update: function(){
    	
    	if (pair_2_3)	{
    		var pB3 = me.game.getEntityByName("puzzleBlocks3")[0];
    		this.vel.x = pB3.vel.x;
    		this.vel.y = pB3.vel.y;
    	}
    	
    	if (game.data.blocks >=3 && me.input.isKeyPressed('two')  
			&& station_on == true){
    			this.collidable = true;
    			this.myAlpha = 1;
    			this.setVelocity(3, 8); 
    			if ( game.data.blocks == 3)
    				game.data.blocks = 0;
    			else // block == 4
    				game.data.blocks = 1;
    			pair_2_3 = true;		
    	}
    			
    	var res = me.game.collide(this);
    	
     /*   if (res){	
    		if (res.x > 0 && res.y == 0 && (res.obj.name == "girl"  ) || 
    			(res.obj.name == "boy"  ))// block on its left side
    			this.vel.x = res.obj.vel.x; // being pushed
    		else if ( res.obj.name == "weapon"){ // break the block to rebuild
    			
    					this.myAlpha = 0;
    					this.collidable = false;
    					this.setVelocity(3, 0); 
    					this.pos.x = posX2; this.pos.y = posY2;
    					
    					if (game.data.blocks == 1 ){
    						game.data.blocks = 4  ;
    					}
    					else if (game.data.blocks == 0){
    						game.data.blocks = 3;
    					}
    		}
   	
    		if ((res.x < 0 && me.input.keyStatus('left'))||
    		res.x > 0 && me.input.keyStatus('right')){// <0 character is on the left
    													    // and press left
    			this.vel.x = 0;	
    		}
    	}//*/
    
    	/*
    	
    	if ( !puzzle_pushing  ) // if pushing is false
    	
    		this.vel.x = 0;
    	//if (block2_on)
    		//console.log(this.vel.x);
    	this.updateMovement();
    },
    
    draw : function(context){
	   var local_alpha = context.globalAlpha; // save the previous value
	   context.globalAlpha = this.myAlpha; // semi transparency
	   this.parent(context);  // parent draw function
	   context.globalAlpha = local_alpha; // restore previous value
	}

});


game.puzzleBlocks3Entity = me.ObjectEntity.extend({
	
	init: function(x, y, settings) {
        this.parent(x, y, settings);
		this.updateColRect(1, 25, -1, 0);
        this.collidable = false;		
        this.setVelocity(3, 0); 
        this.myAlpha = 0; 
       	this.type = "me.game.puzzleBlock";			// of puzzleBlock type
        this.claw = false;							// if claw is colliding with it
        posX3 = this.pos.x;
        posY3 = this.pos.y;
        this.claw = false;							// if claw is colliding with it
    },
    
    update: function(){
    	if (pair_2_3)
    	{
    		var pB2 = me.game.getEntityByName("puzzleBlocks2")[0];
    		this.vel.x = pB2.vel.x;
    		this.vel.y = pB2.vel.y;
    	}
    	
    	
    	if (pair_2_3) { // puzzleBlock2 and pB3 need to be shown up at the same time
    			this.collidable = true;
    			this.myAlpha = 1;
    			this.setVelocity(3, 8); 	
    	}
    			
    	var res = me.game.collide(this);
    	
        if (res){	
    		if (res.x < 0 && res.y == 0 && (res.obj.name == "girl"  ||res.obj.name == "boy"))// block on its left side
    			this.vel.x = res.obj.vel.x;
    		else if ( res.obj.name == "weapon") // break the block to rebuild
    				{
    					this.myAlpha = 0;
    					this.collidable = false;
    					this.setVelocity(3, 0); 
    					this.pos.x = posX3; this.pos.y = posY3;
    				
    				}
   	
    		if ((res.x < 0 && me.input.keyStatus('left'))||
    		res.x > 0 && me.input.keyStatus('right')){// <0 character is on the left
    													    // and press left
    			this.vel.x = 0;	
    		}
    	}
    	
    	if ( !puzzle_pushing  ) // if pushing is false
    		this.vel.x = 0;
    		
    	this.updateMovement();
    },
    
    draw : function(context){
	   var local_alpha = context.globalAlpha; // save the previous value
	   context.globalAlpha = this.myAlpha; // semi transparency
	   this.parent(context);  // parent draw function
	   context.globalAlpha = local_alpha; // restore previous value
	}

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////

game.puzzleBlocks5Entity = me.ObjectEntity.extend({
	
	init: function(x, y, settings) {
        this.parent(x, y, settings);
		this.updateColRect(0, 24, -1, 0);
        this.collidable = false;		
        this.setVelocity(3, 0); 
        this.myAlpha = 0; 
       	this.type = "me.game.puzzleBlock";			// of puzzleBlock type
        this.claw = false;							// if claw is colliding with it
        posX2 = this.pos.x;
        posY2 = this.pos.y;
        this.claw = false;							// if claw is colliding with it
    },
    
    update: function(){
    //	console.log("update");
    	if (pair_5_6  )	{
    		var pB6 = me.game.getEntityByName("puzzleBlocks6")[0];
    		this.vel.x = pB6.vel.x;
    		this.vel.y = pB6.vel.y;
    	}
    	
    	
    	if (game.data.blocks >=3 && me.input.isKeyPressed('three')  
			&& station_on == true){
		//		console.log("appear");
    			this.collidable = true;
    			this.myAlpha = 1;
    			this.setVelocity(3, 8); 
    			if ( game.data.blocks == 3)
    				game.data.blocks = 0;
    			else // block == 4
    				game.data.blocks = 1;
    			pair_5_6 = true;
    			
    	}
    			
    	var res = me.game.collide(this);
   
    
    	if ( !puzzle_pushing  ) // if pushing is false
    	
    		this.vel.x = 0;
    	this.updateMovement();
    },
    
    draw : function(context){
	   var local_alpha = context.globalAlpha; // save the previous value
	   context.globalAlpha = this.myAlpha; // semi transparency
	   this.parent(context);  // parent draw function
	   context.globalAlpha = local_alpha; // restore previous value
	}

});


game.puzzleBlocks6Entity = me.ObjectEntity.extend({
	
	init: function(x, y, settings) {
        this.parent(x, y, settings);
		this.updateColRect(1, 25, -1, 0);
        this.collidable = false;		
        this.setVelocity(3, 0); 
        this.myAlpha = 0; 
       	this.type = "me.game.puzzleBlock";			// of puzzleBlock type
        this.claw = false;							// if claw is colliding with it
        posX3 = this.pos.x;
        posY3 = this.pos.y;
        this.claw = false;							// if claw is colliding with it
    },
    
    update: function(){
    	if (pair_5_6){
    		var pB5 = me.game.getEntityByName("puzzleBlocks5")[0];
    		this.vel.x = pB5.vel.x;
    		this.vel.y = pB5.vel.y;
    	}
    	
    	if (pair_5_6) { // puzzleBlock2 and pB3 need to be shown up at the same time
    			this.collidable = true;
    			this.myAlpha = 1;
    			this.setVelocity(3, 8); 	
    	}
    			
    	var res = me.game.collide(this);
    	
        if (res){	
    		if (res.x > 0 && res.y == 0 && (res.obj.name == "girl"  ||res.obj.name == "boy"))// block on its left side
    			this.vel.x = res.obj.vel.x;
    		else if ( res.obj.name == "weapon" ) // break the block to rebuild
    				{
    					this.myAlpha = 0;
    					this.collidable = false;
    					this.setVelocity(3, 0); 
    					this.pos.x = posX3; this.pos.y = posY3;
    				
    				}
   	
    		if ((res.x < 0 && me.input.keyStatus('left'))||
    		res.x > 0 && me.input.keyStatus('right')){// <0 character is on the left
    													    // and press left
    			this.vel.x = 0;	
    		}
    	}
    	
    	
    	if ( !puzzle_pushing  ) // if pushing is false
    		this.vel.x = 0;
    		
    	this.updateMovement();
    },
    
    draw : function(context){
	   var local_alpha = context.globalAlpha; // save the previous value
	   context.globalAlpha = this.myAlpha; // semi transparency
	   this.parent(context);  // parent draw function
	   context.globalAlpha = local_alpha; // restore previous value
	}
});

*/