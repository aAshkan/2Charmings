
var timeOfPlat = 150;
//var appear_time = timeOfPlat; // for the stealth platform
//var disapp_time = timeOfPlat;
var broken = false;

var platformType = "platformType";

game.stealth_platformEntity = me.ObjectEntity.extend({
 
    init: function(x, y, settings) { // a constructor
        // call the constructor
        this.parent(x, y, settings);
 		this.walkLeft = true;
 		this.startX = x;
 		this.endX = x + settings.width - settings.spritewidth;
 		//this.pos.x = x + settings.width - settings.spritewidth;
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(0, 0);
 		this.collidable = true; 
 		this.updateColRect(-1,0,-1,0);
 		this.type = platformType;
 		this.appear_time = timeOfPlat;
 		this.disapp_time = timeOfPlat;
    },
    
    
 update: function() { // control the duartion
    	
    	if ( !this.appear_time && !this.disapp_time ){
    		this.appear_time = timeOfPlat;
    		this.disapp_time = timeOfPlat;
    	}	
		if(this.appear_time){	
			this.myAlpha = 1.0;
			this.appear_time--;
			this.collidable = true;
			
		}	
		else if( this.disapp_time){
			this.myAlpha = 0.0;
			this.collidable = false;
			this.disapp_time--;
		}		
		
	},
	
	draw : function(context){
	   var local_alpha = context.globalAlpha; // save the previous value
	   context.globalAlpha = this.myAlpha; // semi transparency
	   this.parent(context);  			// parent draw function
	   context.globalAlpha = local_alpha; // restore previous value
	},
});


game.moving_platform1Entity = me.ObjectEntity.extend({ // horizontal
 
    init: function(x, y, settings) { // a constructor
        // call the constructor
        this.parent(x, y, settings);
 		this.walkLeft = true;
 		this.startX = x;
 		this.endX = x + settings.width - settings.spritewidth;
 		//this.pos.x = x + settings.width - settings.spritewidth;
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(1, 0);
        this.type = platformType;
 		this.collidable = true; 
 		 this.updateColRect(-1,0,-1,0);
 	//	this.type = me.game.ENEMY_OBJECT;
 		this.alwaysUpdate = true;// moving even out of scope
    },
 
    update: function() { 
 			
 		if(this.walkLeft && this.pos.x <=this.startX){
 			this.walkLeft = false;
 		}else if(!this.walkLeft && this.pos.x >= this.endX){
 			this.walkLeft = true;
 		}
 			
 		this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
 				
 		// check and update movement
 		this.updateMovement();
 		
 		// update animation if necessary
 		if(this.vel.x!=0 || this.vel.y!=0){
 			// update object animation
 			this.parent();
 			return true;
 		}
 		return false;
 	} 
});


game.moving_platform2Entity = me.ObjectEntity.extend({ // vertical
 
    init: function(x, y, settings) { // a constructor
        // call the constructor
        this.parent(x, y, settings);
        this.updateColRect(-1,0,-1,0);
 		this.walkLeft = true;
 		this.startY = y;
 		this.endY = y + settings.height - settings.spriteheight;
 		//this.pos.x = x + settings.width - settings.spritewidth;
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(0, 1);
 		this.collidable = true; 
 		this.type = platformType;
 	//	this.type = me.game.ENEMY_OBJECT;
 		this.alwaysUpdate = true;// moving even out of scope
 		
    },
 

    update: function() { 
    	if(this.walkLeft && this.pos.y <=this.startY){
 			this.walkLeft = false;
 		}
 		else if(!this.walkLeft && this.pos.y >= this.endY){
 			this.walkLeft = true;
 		}
 			
 		this.vel.y += (this.walkLeft) ? -this.maxVel.y * me.timer.tick : this.maxVel.y * me.timer.tick;
 		// check and update movement
 		this.updateMovement();
 		
 		// update animation if necessary
 		if(this.vel.x!=0 || this.vel.y!=0){
 			// update object animation
 			this.parent();
 			return true;
 		}
 		return false;
 	}
});



game.moving_platform3Entity = me.ObjectEntity.extend({ // faster horizontal
 
    init: function(x, y, settings) { // a constructor
        // call the constructor
        this.parent(x + settings.width - settings.spritewidth, y, settings);
 		this.walkLeft = false;
 		this.startX = x;
 		this.endX = x + settings.width - settings.spritewidth;
 		//this.pos.x = x + settings.width - settings.spritewidth;
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(1, 0);
        this.type = platformType;
 		this.collidable = true; 
 		 this.updateColRect(-1,0,-1,0);
 	//	this.type = me.game.ENEMY_OBJECT;
 		this.alwaysUpdate = true;// moving even out of scope
    },
 
    update: function() { 
 			
 		if(this.walkLeft && this.pos.x <=this.startX){
 			this.walkLeft = false;
 		}else if(!this.walkLeft && this.pos.x >= this.endX){
 			this.walkLeft = true;
 		}
 			
 		this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
 				
 		// check and update movement
 		this.updateMovement();
 		
 		// update animation if necessary
 		if(this.vel.x!=0 || this.vel.y!=0){
 			// update object animation
 			this.parent();
 			return true;
 		}
 		return false;
 	} 
});
 




game.moving_platform4Entity = me.ObjectEntity.extend({ // drop one
 
    init: function(x, y, settings) { // a constructor
        // call the constructor
        this.parent(x, y, settings);
 		//this.walkLeft = true;
 		this.startX = x;
 		this.startY = y;
 		//this.endX = x + settings.width - settings.spritewidth;
 		this.collidable = true; 
        this.setVelocity(0, 0);
 		
 	 	this.updateColRect(-1,0,-1,0);
 	 	this.keepStay 	= 30; // 
 	 	this.sleepTime 	= 0;
 	 	this.touched 	= false;
 	 	this.sleeping = false;
 	 
 	 	//this.oneRound = false;
 	 	this.type = platformType;
 	//	this.alwaysUpdate = true;// moving even out of scope
    },
 
    update: function() { 	
    	 		
 		var res = me.game.collide(this);
 	
 		if (res && res.y < -2.9 && res.obj.type == playerType){
 		//	console.log("weight res.obj.x: " + res.x + " y: " + res.y);
 			if (this.keepStay != 0)
 				this.touched = true; // player stands on it
 			this.setVelocity(0,16);
 		}
 		
 		//console.log ("this.keepStay: "+ this.keepStay);
 		if ( this.touched && this.keepStay) {
 			this.keepStay--; 
 		}
 		else if (this.touched && !this.keepStay){
 			this.vel.y +=  this.accel.y * me.timer.tick;
 			this.updateMovement();
 			if ( this.vel.y == 0){
 				this.touched = false;	
 				this.sleepTime = 45;
 				this.sleeping = true;
 				}		
 		}
 		
 	//	console.log("now keepStay" + this.keepStay + " touched: " + this.touched
 	//	+ " sleepTime: " + this.sleepTime + " vel.y" + this.vel.y); 		
 		else if ( !this.touched && this.sleeping ){ // sleep time
 			//console.log("ready?");	
 			if (this.sleepTime != 0 ){
 				this.sleepTime--;
 			}
 			else if (this.sleepTime == 0)
 			{
 				this.keepStay 	= 30; // 
 	 			this.sleeping = false;
 	 			this.setVelocity (0,0);
 	 			this.pos.x = this.startX;
 	 			this.pos.y = this.startY;
 			}
 			
 		}
 		// update animation if necessary
 		if(this.vel.x!=0 || this.vel.y!=0){
 			this.parent();
 			return true;
 		}
 		return false;
 	} ,
 	
});


game.bombEntity = me.ObjectEntity.extend({
 
    init: function(x, y, settings) { // a constructor
        // call the constructor
        this.parent(x, y, settings);
        this.updateColRect(-1,0,-1,0);
 		this.walkLeft = true;
 		this.startY = y;
 		this.endY = y + settings.height - settings.spriteheight;
 		//this.pos.x = x + settings.width - settings.spritewidth;
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(0, 2);
 		this.collidable = true; 
 		this.type = me.game.ENEMY_OBJECT;
 		this.alwaysUpdate = true;// moving even out of scope
 	
    },
 
    update: function() { 
 			
 		if(this.walkLeft && this.pos.y <=this.startY){ // walkleft ---> walkUp
 			this.walkLeft = false;
 		}
 		else if(!this.walkLeft && this.pos.y >= this.endY){ 
 			this.walkLeft = true;
 		}
 			
 		this.vel.y += (this.walkLeft) ? -this.maxVel.y * me.timer.tick : this.maxVel.y * me.timer.tick;
 		// check and update movement
 		this.updateMovement();
 		
 		// update animation if necessary
 		if(this.vel.x!=0 || this.vel.y!=0){
 			// update object animation
 			this.parent();
 			return true;
 		}
 		return false;
 	},
 	
 	
});


