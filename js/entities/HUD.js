

//HUD container and child items
//////////////////////////////////////////////////////////////////////////////////////////
game.HUD = game.HUD || {};

// contatiner 
//////////////////////////////////////////////////////////////////////////////////////////
game.HUD.Container = me.ObjectContainer.extend({

	init: function() {
		// call the constructor
		this.parent();
		// persistent across level change
		this.isPersistent = true;
		// non collidable
		this.collidable = false;
		// make sure our object is always draw first
		this.z = Infinity;
		// give a name
		this.name = "HUD";
		// add our child score object at the top left corner
		this.addChild(new game.HUD.ScoreItem(100, 2.5));
		this.addChild(new game.HUD.BlocksItem(100, 2.5));
		this.addChild(new game.HUD.HealthItem(245, 2.5));
		this.addChild(new game.HUD.DashItem(798, 50));
		this.addChild(new game.HUD.SwitchIcon(650, 538));
		
		//this.addChild(new game.HUD.BlocksItem(100, 2.5));
		
	}
});

// coin count & display
//////////////////////////////////////////////////////////////////////////////////////////
game.HUD.ScoreItem = me.Renderable.extend({	
	
	init: function(x, y) { /* constructor */
		this.parent(new me.Vector2d(x, y), 10, 10); 
		this.font = new me.BitmapFont("font", 32);			// create a font
		this.font.set("right");
		this.floating = true;
	},

	update : function () {
		// update the score
		// return true if the score has been updated
		//if (this.score !== game.data.score) {	
		//	this.score = game.data.score;
			if(game.data.score >= 50){
				game.data.score = 50;
			if(game.data.health < 3){
				game.data.health++;	
				game.data.score = 0;
			}
		//}
		//	return true;
		}
	//	return false;
	},

	// draw the display
	draw : function (context) {
		
		
		this.font.draw(context, game.data.score, this.pos.x + 165, this.pos.y);			// value
		this.font.draw(context, game.data.s, this.pos.x + 100, this.pos.y);				// text
		this.font.draw(context, game.data.s_max, this.pos.x + 260, this.pos.y);
		
	}
});

// block count & display
//////////////////////////////////////////////////////////////////////////////////////////
game.HUD.BlocksItem = me.Renderable.extend({	
	
	init: function(x, y) { /* constructor */
		this.parent(new me.Vector2d(x, y), 10, 10); 
		this.font = new me.BitmapFont("font", 32);			// create a font
		this.font.set("right");
		this.score = -1;
		this.floating = true;
	//	this.EggIcon = me.loader.getImage("enemy1");
	},

	update : function () {
		// update the block count
		// return true if the score has been updated
		if (this.score !== game.data.blocks) {	
			this.score = game.data.blocks;
			return true;
		}
		return false;
	},

	// draw the display
	draw : function (context) {
		
		if ( game.data.blocks > 4)
			game.data.blocks = 4;
		this.font.draw(context, game.data.blocks, this.pos.x + 165, this.pos.y + 50);	// value
		this.font.draw(context, game.data.b, this.pos.x + 130, this.pos.y + 50);		// text
		this.font.draw(context, game.data.b_max, this.pos.x + 225, this.pos.y + 50);		// text
		
	}

});

game.HUD.HealthItem = me.Renderable.extend(//me.HUD_Item.extend(
{	
	init:function(x, y)
	{
		this.parent(new me.Vector2d(x, y), 10, 10); 
		this.font = new me.BitmapFont("font", 32);			// create a font
		this.font.set("right");
		this.floating = true;
		this.HeartIcon = me.loader.getImage("heart");
		
	},

	draw : function (context)
	{
		var heart = game.data.health;
		for ( var i = 1; i <= heart; i++){
			context.drawImage(this.HeartIcon, this.pos.x - 300 + i*60, this.pos.y + 85);	
		}
	}
});

game.HUD.DashItem = me.Renderable.extend(//me.HUD_Item.extend(
{	
	init:function(x, y)
	{
		this.parent(new me.Vector2d(x, y), 10, 10); 
		this.font = new me.BitmapFont("font", 32);			// create a font
		this.font.set("right");
		this.floating = true;
		this.timeIcon = me.loader.getImage("dashBar");
		this.readyIcon = me.loader.getImage("dashBarReady");
		
	},

	draw : function (context)
	{
		if ( game.data.control_boy == true)
		{	
			var time = game.data.dashing_time;
			this.font.draw(context, game.data.d, this.pos.x, this.pos.y - 50);		// text
			for ( var i = 1; i <= time; i++){
				//
				if ( i == game.data.givenTime)
					context.drawImage(this.readyIcon, this.pos.x - i*10, this.pos.y);	
				else
					context.drawImage(this.timeIcon, this.pos.x - i*10, this.pos.y);
			}
		}
		//console.log(this.value, this.pos.x +x, this.pos.y+y);
	//	this.font.draw (context, this.value, this.pos.x + x + this.EggIcon.width, this.pos.y + y - 2);
	}
});

game.HUD.SwitchIcon = me.Renderable.extend({
	
	init:function(x,y){
		this.parent(new me.Vector2d(x, y), 10, 10); 
		this.switch_pcs = me.loader.getImage("switch_pcs");
		this.switch_pce = me.loader.getImage("switch_pce");
		this.floating = true;
	},
		
	draw: function(context)
	{
		if(game.data.control_boy){
			var character = me.game.getEntityByName("boy")[0];
			if ( character.vel.x == 0 && character.vel.y == 0 && !stand)
			context.drawImage(this.switch_pcs, this.pos.x, this.pos.y);
		//	console.log("boy");
		} else if(game.data.control_girl){
			var character = me.game.getEntityByName("girl")[0];
			if ( character.vel.x == 0 && character.vel.y == 0 && !stand)
			context.drawImage(this.switch_pce, this.pos.x, this.pos.y);
			//console.log("girl");
		}
	}
});