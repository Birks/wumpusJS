window.onload = function() {
    /* init */
    KnowledgeBase.init(DIM);
    Map.init(DIM);
    var agent = new Agent(DIM - 1, 0);

    /* initialize map */
   /* Map.tiles[0][0].hasStink = true;
    Map.tiles[1][0].hasWumpus = true;
    Map.tiles[2][0].hasStink = true;
    Map.tiles[1][1].hasBreeze = true;
    Map.tiles[1][1].hasStink = true;
    Map.tiles[1][1].hasGold = true;
    Map.tiles[1][1].hasGlimmer = true;
    Map.tiles[1][3].hasBreeze = true;
    Map.tiles[2][1].hasPit = true;
    Map.tiles[2][2].hasBreeze = true;
    Map.tiles[2][3].hasPit = true;
    Map.tiles[3][0].hasPit = true;
    Map.tiles[3][1].hasBreeze = true;
    Map.tiles[3][3].hasBreeze = true;*/

    Map.tiles[0][0].hasStink = true;
    Map.tiles[1][0].hasWumpus = true;
    Map.tiles[2][0].hasStink = true;
    Map.tiles[1][1].hasStink = true;
    Map.tiles[3][1].hasBreeze = true;
    Map.tiles[2][2].hasBreeze = true;
    Map.tiles[3][2].hasPit = true;
    Map.tiles[1][3].hasGold = true;
    Map.tiles[1][3].hasGlimmer = true;
    Map.tiles[3][3].hasBreeze = true;



    /* create a new agent */
    while(!agent.hasGold) {
        agent.move();
        Map.gatherAdjacentInfo(agent);
    }

    console.log(KnowledgeBase.db);
};
