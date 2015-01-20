window.onload = function() {
    /* initialize map */
    Map.init(DIM);

    /* create a new agent */
    var agent = new Agent(DIM - 1, 0);

    agent.moveTo(agent.currPos.x, agent.currPos.y + 1);
    console.log("Agent's current position is x: " + agent.currPos.x + " y: " + agent.currPos.y);

    Map.tiles[agent.currPos.x][agent.currPos.y].hasBreeze = true;
    Map.gatherAdjacentInfo(agent);

    /* TODO STINK*/

    console.log(KnowledgeBase.sentences);
    console.log("The map:");
    console.log(Map.tiles);
};
