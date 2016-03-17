/*----------------------
 
    A title screen
 
  ----------------------*/
 
game.TitleScreen = me.ScreenObject.extend({
    // constructor
    init: function() {
        this.parent(true);
 
        // title screen image
        this.title = null;
 
        this.font = null;
        this.scrollerfont = null;
        this.scrollertween = null;
 
        this.scroller = "PRESS ENTER TO PLAY       ";
        this.scrollerpos = 600;
    },
 
    // reset function
    onResetEvent: function() {
    	
    	me.audio.playTrack("open_song");
        if (this.title == null) {
            // init stuff if not yet done
            this.title = me.loader.getImage("title");
            // font to display the menu items
            this.font = new me.BitmapFont("font", 32);
 
            // set the scroller
            this.scrollerfont = new me.BitmapFont("font", 32);
        }
 
        // reset to default value
        this.scrollerpos = 640;
 
        // a tween to animate the arrow
    //    this.scrollertween = new me.Tween(this).to({
      //      scrollerpos: -2200
       // }, 10000).onComplete(this.scrollover.bind(this)).start();
 
        // enable the keyboard
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
 
        // play something
      //  me.audio.play("keys");
    },
 
    // some callback for the tween objects
   
 
    // update function
    update: function()
	{
        // enter pressed ?
        if (me.input.isKeyPressed('enter'))
		{
            me.state.change(me.state.PLAY);
        }
        return true;
    },
 
    // draw function
    draw: function(context) {
        context.drawImage(this.title, 0, 0);       
       // this.scrollerfont.draw(context, this.scroller, this.scrollerpos, 440);
    },
 
    // destroy function
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
	
		// stop the current audio track
		me.audio.stopTrack();
 
        //just in case
      //  this.scrollertween.stop();
    }
});