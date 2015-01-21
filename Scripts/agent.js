function Agent(x, y){
    this.currPos = {x: x, y: y};
    this.prevPos = {x: x, y: y};
    this.orientation = Orientation.RIGHT;
    this.brave = false;
    this.hasGold = false;
    this.noPosMod = 0;
    this.ammo = 1;

    this.move = function(){
        /* variables */
        var nextStep;
        var shifted = 0;
        /* see if it can kill the wumpus */
        this.killWumpus();
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
            SearchTree.openList = [];
        }

        if(!KnowledgeBase.db[this.currPos.x][this.currPos.y].visited) this.brave = false;

       // SearchTree.openList = [];
        this.prevPos = { x: this.currPos.x, y: this.currPos.y };
        this.currPos = { x: nextStep.x, y: nextStep.y };

        console.log(" I am currently on x: " + this.currPos.x + " y: " + this.currPos.y);

        if(Map.tiles[this.currPos.x][this.currPos.y].hasBreeze && !KnowledgeBase.db[this.currPos.x][this.currPos.y].visited){
            console.log("It is really breezy around here! ");
            KnowledgeBase.db[this.currPos.x][this.currPos.y].hasBreeze = true;
        }
        if(Map.tiles[this.currPos.x][this.currPos.y].hasStink && !KnowledgeBase.db[this.currPos.x][this.currPos.y].visited){
            console.log("This place reeks!");
            KnowledgeBase.db[this.currPos.x][this.currPos.y].hasBreeze = true;
        }
        if(Map.tiles[this.currPos.x][this.currPos.y].hasGlimmer){
            console.log("--------------------------------------");
            console.log("Something is glimmering in the dark!");
            this.pickUp();
        }

        /* let us make a statement that we've visited the given tile */
        KnowledgeBase.db[nextStep.x][nextStep.y].visited = true;
    };

    this.killWumpus = function(){
        if(KnowledgeBase.wumpusCoords.x != -1 && KnowledgeBase.wumpusCoords.y != -1){
            if(this.currPos.x == KnowledgeBase.wumpusCoords.x || this.currPos.y == KnowledgeBase.wumpusCoords.y){
                console.log("--------------------------------------");
                console.log("Well this one's ought to hurt! BUMM");
                console.log("A loud scream can be heard! The Wumpus is dead!!");
                console.log("--------------------------------------");

                /* do some cleanup */
                Map.tiles[KnowledgeBase.wumpusCoords.x][KnowledgeBase.wumpusCoords.y].hasWumpus = false;

                for(var i = 0; i < DIM; i++){
                    for(var j = 0; j < DIM; j++){
                        if(KnowledgeBase.db[i][j].hasWumpus) KnowledgeBase.db[i][j].hasWumpus = false;
                    }
                }

                KnowledgeBase.wumpusCoords.x = -1;
                KnowledgeBase.wumpusCoords.y = -1;
                KnowledgeBase.wumpusIsAlive = false;
            }
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
            console.log("Picked up the gold. My precious!");
            console.log("--------------------------------------");
            this.hasGold = true;
            Map.tiles[this.currPos.x][this.currPos.y].hasGold = false;
            Map.tiles[this.currPos.x][this.currPos.y].hasGlimmer = false;
        }
    };
}
