function Cell(x, y){
    this.pos = { x: x, y: y };
    this.firstShot = true;
    this.hasBreeze = false;
    this.hasStink = false;
    this.hasPit = false;
    this.hasWumpus = false;
    this.hasGold = false;
    this.hasGlimmer = false;
    this.visited = false;
    this.wumpusCount = 0;
    this.pitCount = 0;

    this.isSafe = function(){
        if(!this.hasPit && !this.hasWumpus && !this.hasStink && !this.hasBreeze) return true;
        else return false;
    }
}
