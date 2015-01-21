window.onload = function() {
    /* init */
    KnowledgeBase.init(DIM);
    Map.init(DIM);
    /* variables */
    var steps = 0;
    var agent = new Agent(DIM - 1, 0);

    /* initialize map */
    /*Map.tiles[0][0].hasStink = true;
    Map.tiles[1][0].hasWumpus = true;
    Map.tiles[2][0].hasStink = true;
    Map.tiles[1][1].hasBreeze = true;
    Map.tiles[1][1].hasStink = true;
    Map.tiles[1][1].hasGold = true;
    Map.tiles[1][1].hasGlimmer = true;
    Map.tiles[1][3].hasBreeze = true;
    Map.tiles[2][2].hasBreeze = true;
    Map.tiles[2][3].hasPit = true;
    Map.tiles[3][1].hasBreeze = true;
    Map.tiles[3][3].hasBreeze = true;*/

    /*Map.tiles[0][0].hasStink = true;
    Map.tiles[1][0].hasWumpus = true;
    Map.tiles[2][0].hasStink = true;
    Map.tiles[1][1].hasStink = true;
    Map.tiles[3][1].hasBreeze = true;
    Map.tiles[2][2].hasBreeze = true;
    Map.tiles[3][2].hasPit = true;
    Map.tiles[1][3].hasGold = true;
    Map.tiles[1][3].hasGlimmer = true;
    Map.tiles[3][3].hasBreeze = true;*/

    Map.tiles[2][0].hasStink = true;
    Map.tiles[1][1].hasStink = true;
    Map.tiles[2][1].hasWumpus = true;
    Map.tiles[3][1].hasStink = true;
    Map.tiles[2][2].hasStink = true;
    Map.tiles[1][2].hasBreeze = true;
    Map.tiles[0][3].hasStink = true;
    Map.tiles[1][3].hasPit = true;
    Map.tiles[2][3].hasBreeze = true;
    Map.tiles[3][3].hasGold = true;
    Map.tiles[3][3].hasGlimmer = true;

    /* create a new agent */
    while(!agent.hasGold) {
        if(steps > MAX_STEPS) {
            console.log("--------------------------------");
            console.log("I couldn't find the gold :(");
            break;
        }

        if(agent.currPos.x == agent.prevPos.x && agent.currPos.y == agent.prevPos.y) agent.noPosMod++;
        else agent.noPosMod = 0;

        if(agent.noPosMod >= 2) agent.brave = true;

        /* move */
        agent.move();
        Map.gatherAdjacentInfo(agent);

        /* see if the agent is still alive */
        if(Map.tiles[agent.currPos.x][agent.currPos.y].hasPit) {
            console.log("--------------------------------");
            console.log("Aaaahhhh!");
            break;
        }

        if(Map.tiles[agent.currPos.x][agent.currPos.y].hasWumpus) {
            console.log("--------------------------------");
            console.log("Noo! The agent has been eaten by the Wumpus!");
            break;
        }
        /*-----------------------------------*/

        steps++;
    }
};
