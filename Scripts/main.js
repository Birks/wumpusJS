window.onload = function() {
    /* kdb init */
    KnowledgeBase.init(DIM);
    /* initialize map */
    Map.init(DIM);
    Map.tiles[3][1].hasBreeze = true;
    Map.tiles[2][0].hasStink = true;
    Map.tiles[1][1].hasGold = true;
    Map.tiles[1][1].hasGlimmer = true;

    /* create a new agent */
    var agent = new Agent(DIM - 1, 0);

    agent.moveTo(agent.currPos.x, agent.currPos.y + 1);
    Map.gatherAdjacentInfo(agent);

    agent.moveTo(agent.currPos.x, agent.currPos.y - 1);
    Map.gatherAdjacentInfo(agent);

    agent.moveTo(agent.currPos.x - 1, agent.currPos.y);
    Map.gatherAdjacentInfo(agent);

    agent.moveTo(agent.currPos.x, agent.currPos.y + 1);
    Map.gatherAdjacentInfo(agent);

    agent.moveTo(agent.currPos.x - 1, agent.currPos.y);
    Map.gatherAdjacentInfo(agent);
    //console.log("Agent's current position is x: " + agent.currPos.x + " y: " + agent.currPos.y);

    console.log(KnowledgeBase.sentences);
    console.log("The KDB:");
    console.log(KnowledgeBase.db);
    console.log("The map:");
    console.log(Map.tiles);
};
