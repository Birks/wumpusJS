function Agent(x, y){
    this.currPos = {x: x, y: y};
    this.prevPos = {x: x, y: y};
    this.orientation = Orientation.RIGHT;
    this.brave = false;
    this.hasGold = false;
    this.noPosMod = 0;

    this.move = function(){
        /* variables */
        var nextStep;
        var shifted = 0;
        /* build the tree */
        SearchTree.openList.unshift({ x: this.prevPos.x, y: this.prevPos.y });

        if(this.currPos.y + 1 < DIM && this.currPos.y + 1 != this.prevPos.y) {
            SearchTree.openList.unshift({ x: this.currPos.x, y: this.currPos.y + 1 });
            shifted++;
        }
        if(this.currPos.y - 1 >= 0 && this.currPos.y - 1 != this.prevPos.y) {
            SearchTree.openList.unshift({ x: this.currPos.x, y: this.currPos.y - 1 });
            shifted++;
        }
        if(this.currPos.x + 1 < DIM && this.currPos.x + 1 != this.prevPos.x) {
            SearchTree.openList.unshift({ x: this.currPos.x + 1, y: this.currPos.y });
            shifted++;
        }
        if(this.currPos.x - 1 >= 0 && this.currPos.x - 1 != this.prevPos.x) {
            SearchTree.openList.unshift({ x: this.currPos.x - 1, y: this.currPos.y });
            shifted++;
        }

        SearchTree.closedList.push({ x: this.currPos.x, y: this.currPos.y });

        if(!this.brave) {
            do {
                nextStep = SearchTree.openList.shift();
                //console.log(nextStep.x + " : " + nextStep.y + " is " + KnowledgeBase.db[nextStep.x][nextStep.y].isSafe());
            } while(!KnowledgeBase.db[nextStep.x][nextStep.y].isSafe());
        }
        else {
            var rand = Math.floor(Math.random() * shifted);
            nextStep = SearchTree.openList[rand];
        }

       // SearchTree.openList = [];
        this.prevPos = { x: this.currPos.x, y: this.currPos.y };
        this.currPos = { x: nextStep.x, y: nextStep.y };

        console.log(" I am currently on x: " + this.currPos.x + " y: " + this.currPos.y);

        if(Map.tiles[this.currPos.x][this.currPos.y].hasBreeze) {
            console.log("It is really breezy around here! ");
            KnowledgeBase.db[this.currPos.x][this.currPos.y].hasBreeze = true;
        }
        if(Map.tiles[this.currPos.x][this.currPos.y].hasStink) {
            console.log("This place reeks!");
            KnowledgeBase.db[this.currPos.x][this.currPos.y].hasBreeze = true;
        }
        if(Map.tiles[this.currPos.x][this.currPos.y].hasGlimmer) {
            console.log("Something is glimmering in the dark!");
            this.pickUp();
        }
    };

    this.goBack = function(){
        var nextStep = SearchTree.closedList.pop();
        this.prevPos = { x: this.currPos.x, y: this.currPos.y };
        this.currPos = { x: nextStep.x, y: nextStep.y };

        console.log("I am currently at x: " + this.currPos.x + " y: " + this.currPos.y);
    };

    this.pickUp = function(){
        if(!Map.tiles[this.currPos.x][this.currPos.y].hasGold) {
            console.log("No gold could be found on the current cell.");
        }
        else {
            console.log("--------------------------------");
            console.log("Picked up the gold. My precious!");
            this.hasGold = true;
            Map.tiles[this.currPos.x][this.currPos.y].hasGold = false;
            Map.tiles[this.currPos.x][this.currPos.y].hasGlimmer = false;
        }
    };
}
