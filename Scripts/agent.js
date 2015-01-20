function Agent(x, y){
    this.currPos = {x: x, y: y};
    this.prevPos = {x: x, y: y};

    this.hasGold = false;

    /* move to the x y position */
    this.moveTo = function(x, y){
        this.prevPos = { x: this.currPos.x, y: this.currPos.y };
        this.currPos = { x: x, y: y };

        if(Map.tiles[this.currPos.x][this.currPos.y].hasBreeze) console.log("It is really breezy around here! " + " x: " + this.currPos.x + " y: " + this.currPos.y);
        if(Map.tiles[this.currPos.x][this.currPos.y].hasStink) console.log("This place reeks! " + " x: " + this.currPos.x + " y: " + this.currPos.y);
        if(Map.tiles[this.currPos.x][this.currPos.y].hasGlimmer) {
            console.log("Something is glimmering in the dark! " + " x: " + this.currPos.x + " y: " + this.currPos.y);
            this.pickUp();
        }
    };

    this.move = function(){

    };

    this.pickUp = function(){
        if(!Map.tiles[this.currPos.x][this.currPos.y].hasGold) {
            console.log("No gold could be found on the current cell.");
        }
        else {
            console.log("The agent picked up the gold.");
            this.hasGold = true;
            Map.tiles[this.currPos.x][this.currPos.y].hasGold = false;
            Map.tiles[this.currPos.x][this.currPos.y].hasGLimmer = false;
        }
    };
}
