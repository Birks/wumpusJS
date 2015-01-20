function Cell(x, y){
    this.pos = { x: x, y: y };
    this.isSafe = true;
    this.firstShot = true;
    this.hasBreeze = false;
    this.hasStink = false;
    this.hasPit = false;
    this.hasWumpus = false;
    this.hasGold = false;
    this.hasGlimmer = false;
}
