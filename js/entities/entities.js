var stand =false;
var solidType = "solidType";
// Station Enity
//////////////////////////////////////////////////////////////////////////////////////////
game.stationEntity = me.ObjectEntity.extend({	// the build UI
   
    init: function(x, y, settings) {
        this.parent(x, y, settings);
		this.updateColRect(-1, 0, -1, 0);
        this.collidable = true;		
		this.myAlpha = 0;
    },
	
    update: function() {
    	
    	var res = me.game.collide(this);
		if(res && ( res.obj.name == "girl" )){
			this.myAlpha = 0.0;
			station_on = true;
			//console.log("on");
		}	
		else{
			this.myAlpha = 0.0;
			station_on = false;
		}		
	},
		
	draw : function(context){
	   var local_alpha = context.globalAlpha; // save the previous value
	   context.globalAlpha = this.myAlpha; // semi transparency
	   this.parent(context);  // parent draw function
	   context.globalAlpha = local_alpha; // restore previous value
	}
});

// Weapon Enity
//////////////////////////////////////////////////////////////////////////////////////////
game.weaponEntity = me.ObjectEntity.extend({
	
	init: function(x, y, settings) {	
	  	this.collidable = false; 
	  	var character =  me.game.getEntityByName("boy")[0]; 
       	this.parent(character.pos.x-10, character.pos.y, settings);
 		this.updateColRect(-1,0, 0, 30); 							// collision box (red)
 		//   updateColRect(x, w, y, h) 
        this.setVelocity(3, 15);  									
        this.alwaysUpdate = true;
        this.attacking = false;										// variable to determine if attacking or not
    },
 
	update: function() {
		
		var character =  me.game.getEntityByName("boy")[0]; 
		this.pos.y = character.pos.y + 30;
		this.pos.x = character.pos.x + 30;
		this.collidable = false; 
	
 		if (game.data.control_boy == true){
 			if (me.input.isKeyPressed('attack') && face == "right"){
 				this.attacking = true;
 				this.pos.x = character.pos.x + 70; // hardcode
 				this.collidable = true; 
 			}else if (me.input.isKeyPressed('attack') && face == "left"){
 				this.attacking = true;
 				this.pos.x = character.pos.x-10 ; // hardcode
 				this.collidable = true; 
 			}
 		}
 			
 		if  (this.collidable)
 			var res = me.game.collide(this); // collide(this) checks if the object collides with some objects
									     // but which object will not be returned. Can check it with other codes				
	
 		// check and update movement
 		this.updateMovement();
 		
 		// update animation if necessary
 		if(this.vel.x!=0 || this.vel.y!=0 || this.attacking){
 			// update object animation
 			this.parent();
 			return true;
 		}
 		return false;
 	},
});

//
//////////////////////////////////////////////////////////////////////////////////////////
game.breakableEntity = me.ObjectEntity.extend({
 
    init: function(x, y, settings) { // a constructor
        this.parent(x, y, settings);
        this.setVelocity(0, 0);
 		this.collidable = true; 
 		this.updateColRect(-1,0,-1,0);
 	//	this.key = settings.id;
 	//	this.broken = false;
 	//	this.type = "123";
    },
 
    onCollision: function(res, obj){
    	if ( (obj.name == "weapon" && obj.attacking || obj.type == puzzleBlocksType)  ) /* break the block to rebuild */{
				me.game.remove(this);
				//this.broken = true;	
				broken = true;
				this.collidable = false;
				this.updateColRect(0,0,0,0);
			}
    }
});


//////////////////////////////////////////////////////////////////////////////////////////
game.droppableEntity = me.ObjectEntity.extend({
 
    init: function(x, y, settings) { // a constructor
        // call the constructor
        this.parent(x, y, settings);
 		//this.pos.x = x + settings.width - settings.spritewidth;
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(0, 0);
 		this.collidable = true; 
 		this.updateColRect(-1,0,-1,0);
 		this.key = settings.id;
 		
 		//   updateColRect(x, w, y, h)
    },
 
     update: function(){
	//	var breakable  = me.game.getEntityByProp("id", this.key);
		//var breakable = me.game.getEntityByName("breakable")[0];
		//var key = settings.key;
		//console.log ( "breakable.key:" + breakable.settings.id + " this key:" + this.key);
		
    	//if (breakable.broken ){
    	if ( broken){
    		this.setVelocity(0, 4);
    		this.vel.y +=  this.accel.y * me.timer.tick;
    		this.updateMovement();
    	}
    	
    	if ( this.vel.y == 0){
    		this.setVelocity(0, 0);
    		broken = false;
    	}
    	
    	var res = me.game.collide(this);
    	
    	if (res){	
    	//	console.log("drop res.x: " + res.x + " y: " + res.y );
    		if ( (res.obj.name == "breakable")  ) /*break the block to rebuild */{
    			this.setVelocity(0, 0);
    			broken = false;
    		}
    	}
    	
    },
    
});




/*##### BROKEN #####*/
// Claw station
//////////////////////////////////////////////////////////////////////////////////////////
/*
game.clawEntity = me.ObjectEntity.extend({	
   
    init: function(x, y, settings) { 
        this.parent(x, y, settings);
        this.startY = y;							// start pos.y
        this.endY = y + 50;							// end position for animation
		this.updateColRect(40, 130, 5, 148);		// collision box (red)
		//   updateColRect(x, w, y, h)
        this.collidable = false;					// So as not to cause issue w/ MelonJS where 3 entities collide @ once
        this.setVelocity(0, 0);						// speed
        this.claw_on = false;						// if claw station is turn on
        this.claw_moving = true;					// if claw is moving or not
        this.transporting = false;					// if claw is transporting to other claw station
        this.moving_puzzleBlock = false;			// if moving the puzzleBlock
        this.gravity = 0;
    	
    },
	
    update: function() {
		this.updateMovement();
		
    	var res = me.game.collide(this);
		var boy = me.game.getEntityByName("boy")[0];
    	var girl = me.game.getEntityByName("girl")[0];
    	
    	// if claw is moving and reaches bottom, stop and call move up function
		if(this.claw_moving && (this.pos.y == this.endY)){
			this.claw_moving = false;
			this.setVelocity(0,0);
			this.moveClawUP();
		}
		// if claw is moving and reaches it's original position stop
		if(this.claw_moving && (this.pos.y == this.startY)){
			this.claw_moving = false;
			this.setVelocity(0, 0);
		}
    	// check if player is in range turn claw_on on if in range
		if((this.distanceTo(girl) || this.distanceTo(boy)) < 100){
			this.claw_on = true;
		}else{
			this.claw_on = false;
		}
    	// activate the claw when claw is on and collding with puzzleBlock type
    	if(this.claw_on && me.input.isKeyPressed('attack') && !this.claw_moving && res.obj.type == "me.game.puzzleBlock"){
    		console.log("activate");
    		this.moveClawDown();
    	}
	},
	
	// function that animates claw moving down
	moveClawDown: function(){
		this.claw_moving = true;
		this.setVelocity(0, 1);
		this.vel.y += this.accel.y * me.timer.tick;

	},
	
	// function that animates claw moving up
	moveClawUP: function(){
		this.claw_moving = true;
		this.moving_puzzleBlock = true;
		this.setVelocity(0, 1);
		this.vel.y -= this.accel.y * me.timer.tick;
		var res = me.game.collide(this);
		for(var i; i< 100; i++){
			console.log("res " + me.game.getEntityByName(res)[0]);
		}
		if(res.obj.type == "me.game.puzzleBlock"){
			res.obj.vel.y += this.accel.y * me.timer.tick;
			res.obj.updateMovement();
		}
		// have to move the puzzleBlock too
	},
	
	// function that will transport puzzleBlock to other claw station 
	transportPuzzlePieze: function(){
		
	},
});

*/