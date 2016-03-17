//game resources
game.resources = [
    /**
     * Graphics.
     */
    // our level tileset
    {name: "area01_level_tiles", type:"image", src: "data/img/map/area01_level_tiles.png"},
    {name: "station_new", type: "image", src: "data/img/sprite/station.png"},
    {name: "station_new", type: "image", src: "data/img/sprite/station_new.png"},
    {name: "floor_solid", type: "image", src: "data/img/sprite/floor_solid.png"},
    {name: "floor", type: "image", src: "data/img/sprite/floor.png"},
    {name: "level_floor", type: "image", src: "data/img/sprite/level_floor.png"},
    {name: "clouds", type: "image", src: "data/img/map/clouds.png"},
    {name: "tutorial_pce", type: "image", src: "data/img/map/tutorial_pce.png"},
    {name: "tutorial_pcs_build", type: "image", src: "data/img/map/tutorial_pcs_build.png"},
    {name: "tutorial_pcs", type: "image", src: "data/img/map/tutorial_pcs.png"},
    {name: "cloud_heart", type: "image", src: "data/img/map/cloud_heart.png"},
    // the main player spritesheet
    
    // characters
    {name: "boy", type:"image", src: "data/img/sprite/boy.png"},
    {name: "girl", type:"image", src: "data/img/sprite/girl.png"},
    // collectables
    {name: "coins", type:"image", src: "data/img/sprite/coins.png"},
    {name: "coins3", type: "image", src: "data/img/sprite/coins3.png"},
    {name: "block", type: "image", src: "data/img/sprite/block.png"},
    // enemies
    {name: "enemy1", type:"image", src: "data/img/sprite/enemy1.png"},
    {name: "enemy1B", type:"image", src: "data/img/sprite/enemy1.png"},
    {name: "enemy1C", type:"image", src: "data/img/sprite/enemy1.png"},
    {name: "enemy2", type: "image", src: "data/img/sprite/enemy2.png"},
    {name: "enemy2B", type: "image", src: "data/img/sprite/enemy2.png"},
    {name: "enemy2C", type: "image", src: "data/img/sprite/enemy2.png"},
    {name: "enemy2S", type: "image", src: "data/img/sprite/enemy2.png"},
    {name: "enemy2SB", type: "image", src: "data/img/sprite/enemy2.png"},
    {name: "enemy2SC", type: "image", src: "data/img/sprite/enemy2.png"},
    {name: "enemy2Cir", type: "image", src: "data/img/sprite/enemy2.png"},
    {name: "bomb", type: "image", src: "data/img/sprite/bomb.png"},
    // puzzleBlocks
    {name: "puzzleBlocks", type: "image", src: "data/img/sprite/puzzleBlocks.png"},
    //{name: "puzzleBlocks2", type: "image", src: "data/img/sprite/puzzleBlocks2.png"},
    //{name: "puzzleBlocks3", type: "image", src: "data/img/sprite/puzzleBlocks3.png"},
    //{name: "puzzleBlocks4", type: "image", src: "data/img/sprite/puzzleBlocks4.png"},   
    // platforms 
    {name: "stealth_platform", type: "image", src: "data/img/sprite/stealth_platform.png"},
    {name: "moving_platform", type: "image", src: "data/img/sprite/moving_platform.png"},
    {name: "moving_platform2", type: "image", src: "data/img/sprite/moving_platform2.png"},
    {name: "moving_platform4", type: "image", src: "data/img/sprite/moving_platform4.png"},
    // other entities
    {name: "weapon", type: "image", src: "data/img/sprite/weapon.png"},
    {name: "station", type: "image", src: "data/img/sprite/station.png"},
    {name: "claw", type: "image", src: "data/img/sprite/claw.png"},
    // HUD
    {name: "font", type: "image", src: "data/img/font/32x32_font.png"},
    {name: "heart", type: "image", src: "data/img/sprite/heart.png"},
    {name: "breakable", type: "image", src: "data/img/sprite/breakable.png"},
    {name: "droppable", type: "image", src: "data/img/sprite/droppable.png"},
    {name: "switch", type: "image", src: "data/img/sprite/switch.png"},
    {name: "switch_pcs", type: "image", src: "data/img/sprite/switch_pcs.png"},
    {name: "switch_pce", type: "image", src: "data/img/sprite/switch_pce.png"},
    {name: "dashBar", type: "image", src: "data/img/sprite/dashBar.png"}, 
    {name: "dashBarReady", type: "image", src: "data/img/sprite/dashBarReady.png"}, 
    {name: "title", type: "image", src: "data/img/sprite/title.png"},
    {name: "end", type: "image", src: "data/img/sprite/end.png"},
    //
   
   	// Audio 
    {name: "theme_song", type: "audio", src: "data/bgm/", channel : 1},
    {name: "open_song", type: "audio", src: "data/bgm/", channel : 1},
    {name: "end_song", type: "audio", src: "data/bgm/", channel : 1},
     
    // background
    {name: "area01", type: "tmx", src: "data/map/Level1.tmx"}
];