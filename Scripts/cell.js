function Cell(x, y){
    this.pos = { x: x, y: y };
    this.firstShot = true;
    this.hasBreeze = false;
    this.hasStink = false;
    this.hasPit = false;
    this.hasWumpus = false;
    this.hasGold = false;
    this.hasGlimmer = false;
}

Cell.prototype.isSafe = function(){
    if(!this.hasPit && !this.WUMPUS) return true;
    if(this.hasPit || this.hasWumpus) return false;
};
