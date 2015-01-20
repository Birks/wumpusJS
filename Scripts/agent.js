function Agent(x, y){
    this.currPos = {x: x, y: y};
    this.prevPos = {x: x, y: y};

    this.hasGold = false;

    /* move to the x y position */
    this.moveTo = function(x, y){
        this.prevPos = this.currPos;
        this.currPos = { x: x, y: y };
    };

    this.pickUp = function(cell){
        if(!cell.hasGold) {
            console.log("No gold could be found on the current cell.");
        }
        else {
            this.hasGold = true;
            cell.hasGold = false;
        }
    };
}
