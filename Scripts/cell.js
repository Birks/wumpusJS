function Cell(x, y){
    this.pos = { x: x, y: y };
    this.firstWumpusGuess = true;
    this.firstPitGuess = true;
    this.hasBreeze = false;
    this.hasStink = false;
    this.hasPit = false;
    this.hasWumpus = false;
    this.hasGold = false;
    this.hasGlimmer = false;
    this.visited = false;
    this.wumpusCount = 0;

    this.isSafe = function(){
        if(!this.hasPit && !this.hasWumpus) return true;
        else return false;
    }
}
