function Agent(x, y) {
    this.currPos = {x: x, y: y};
    this.prevPos = {x: x, y: y};
    this.hasGold = false;
    this.ammo = 1;

    this.move = function () {
        /* variables */
        var nextStep;
        var rand;
        var shifted = 0;
        /* see if it can kill the wumpus */
        this.killWumpus();
        /* build the tree */
        KnowledgeBase.db[this.currPos.x][this.currPos.y].visited = true;
        SearchTree.openList = [];
        //SearchTree.openList.unshift({x: this.prevPos.x, y: this.prevPos.y});

        if (this.currPos.y + 1 < DIM && this.currPos.y + 1 != this.prevPos.y) {
            SearchTree.openList.unshift({x: this.currPos.x, y: this.currPos.y + 1});
            shifted++;
        }
        if (this.currPos.y - 1 >= 0 && this.currPos.y - 1 != this.prevPos.y) {
            SearchTree.openList.unshift({x: this.currPos.x, y: this.currPos.y - 1});
            shifted++;
        }
        if (this.currPos.x + 1 < DIM && this.currPos.x + 1 != this.prevPos.x) {
            SearchTree.openList.unshift({x: this.currPos.x + 1, y: this.currPos.y});
            shifted++;
        }
        if (this.currPos.x - 1 >= 0 && this.currPos.x - 1 != this.prevPos.x) {
            SearchTree.openList.unshift({x: this.currPos.x - 1, y: this.currPos.y});
            shifted++;
        }

        SearchTree.closedList.push({x: this.currPos.x, y: this.currPos.y});

        nextStep = { x: 0, y: 0, heuristics: 999 };
        var minHeurNum = 0;

        for(var i = 0; i < SearchTree.openList.length; i++){
            if(KnowledgeBase.db[SearchTree.openList[i].x][SearchTree.openList[i].y].heuristics < nextStep.heuristics){
                nextStep = { x: SearchTree.openList[i].x, y: SearchTree.openList[i].y, heuristics: KnowledgeBase.db[SearchTree.openList[i].x][SearchTree.openList[i].y].heuristics };
            }

            if(KnowledgeBase.db[SearchTree.openList[i].x][SearchTree.openList[i].y].heuristics == nextStep.heuristics) minHeurNum++;
        }

        if(minHeurNum > 0){
            /*rand = Math.floor(Math.random() * SearchTree.openList.length);
            if(rand == SearchTree.openList.length) rand--;
            nextStep = SearchTree.openList[rand];*/
            //nextStep = { x: this.prevPos.x, y: this.prevPos.y };
        }

        /*
        rand = Math.random();
        if (rand <= 0) {
            rand = Math.floor(Math.random() * shifted);
            nextStep = SearchTree.openList[rand];
            SearchTree.openList.splice(rand, 1);
        }
        else {
            do {
                nextStep = SearchTree.openList.shift();
            } while (!KnowledgeBase.db[nextStep.x][nextStep.y].isSafe());
        }
        */

        /* set agent positions */
        this.prevPos = { x: this.currPos.x, y: this.currPos.y };
        this.currPos = {x: nextStep.x, y: nextStep.y};

        console.log(" I am currently on x: " + this.currPos.x + " y: " + this.currPos.y);

        if (Map.tiles[this.currPos.x][this.currPos.y].hasBreeze) {
            console.log("It is really breezy around here! ");
            KnowledgeBase.db[this.currPos.x][this.currPos.y].hasBreeze = true;
        }
        if (Map.tiles[this.currPos.x][this.currPos.y].hasStink) {
            console.log("This place reeks!");
            KnowledgeBase.db[this.currPos.x][this.currPos.y].hasStink = true;
        }
        if (Map.tiles[this.currPos.x][this.currPos.y].hasGlimmer) {
            console.log("--------------------------------------");
            console.log("Something is glimmering in the dark!");
            this.pickUp();
        }

        /* let us make a statement that we've visited the given tile */
        KnowledgeBase.db[this.currPos.x][this.currPos.y].visited = true;
        this.gatherAdjacentInfo();
    };

    /* gather information from the current cell
     * and add new knowledge base entries based upon the
     * observations */
    this.gatherAdjacentInfo = function () {
        if(this.currPos.x + 1 < DIM && !KnowledgeBase.db[this.currPos.x + 1][this.currPos.y].visited){
            this.setAdjacentCell({ x: this.currPos.x + 1, y: this.currPos.y });
        }
        if(this.currPos.x - 1 >= 0 && !KnowledgeBase.db[this.currPos.x - 1][this.currPos.y].visited){
            this.setAdjacentCell({ x: this.currPos.x - 1, y: this.currPos.y });
        }
        if(this.currPos.y + 1 < DIM && !KnowledgeBase.db[this.currPos.x][this.currPos.y + 1].visited){
            this.setAdjacentCell({ x: this.currPos.x, y: this.currPos.y + 1 });
        }
        if(this.currPos.y - 1 >= 0 && !KnowledgeBase.db[this.currPos.x][this.currPos.y - 1].visited){
            this.setAdjacentCell({ x: this.currPos.x, y: this.currPos.y - 1 });
        }

        KnowledgeBase.reload();
    };

    /* set pit */
    this.setAdjacentCell = function (newPos) {
        var cell = new Cell(newPos.x, newPos.y);
        /* set pit or wumpus */
        if(Map.tiles[this.currPos.x][this.currPos.y].hasBreeze) cell.hasPit = true;
        if(Map.tiles[this.currPos.x][this.currPos.y].hasStink) cell.hasWumpus = true;
        /* keep breeze and stink */
        KnowledgeBase.add(cell);
    };

    this.killWumpus = function () {
        if (this.ammo < 0) {
            console.log("--------------------------------------");
            console.log("Oh noes!! I am out of ammo!");
            console.log("--------------------------------------");
            return 0;
        }

        if (KnowledgeBase.wumpusCoords.x != -1 && KnowledgeBase.wumpusCoords.y != -1) {
            if (this.currPos.x == KnowledgeBase.wumpusCoords.x || this.currPos.y == KnowledgeBase.wumpusCoords.y) {
                console.log("--------------------------------------");
                console.log("Well this one's ought to hurt! BUMM");

                new Audio('Sound/bow.mp3').play();


                /* if the agent is able to shoot down the wumpus
                 * meaning his coordinates are correct */
                /* do some cleanup */
                Map.tiles[KnowledgeBase.wumpusCoords.x][KnowledgeBase.wumpusCoords.y].hasWumpus = false;

                for (var i = 0; i < DIM; i++) {
                    for (var j = 0; j < DIM; j++) {
                    if (KnowledgeBase.db[i][j].hasWumpus) KnowledgeBase.db[i][j].hasWumpus = false;
                    }
                }

                Draw.drawX(document.getElementById("Canvas1"), KnowledgeBase.wumpusCoords.x, KnowledgeBase.wumpusCoords.y);
                KnowledgeBase.wumpusCoords.x = -1;
                KnowledgeBase.wumpusCoords.y = -1;
                KnowledgeBase.wumpusIsAlive = false;

                new Audio('Sound/scream.mp3').play();
                console.log("A loud scream can be heard! The Wumpus is dead!!");
                }
            console.log("--------------------------------------");
            this.ammo--;
        }
    };

    this.goBack = function () {
        var nextStep = SearchTree.closedList.pop();
        this.prevPos = {x: this.currPos.x, y: this.currPos.y};
        this.currPos = {x: nextStep.x, y: nextStep.y};

        console.log("I am currently at x: " + this.currPos.x + " y: " + this.currPos.y);
    };

    this.pickUp = function () {
        if (!Map.tiles[this.currPos.x][this.currPos.y].hasGold) {
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
