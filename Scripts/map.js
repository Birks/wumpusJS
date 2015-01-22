var Map = {
    tiles: [],
    dim: 0,
    wumpusCoords: { x: -1, y: -1 },

    init: function (dim){
        this.dim = dim;

        /* generate an empty map */
        for(var i = 0; i < this.dim; i++){
            this.tiles[i] = [];

            for(var j = 0; j < this.dim; j++){
                this.tiles[i][j] = new Cell(i, j);
            }
        }
    },

    isOutofBounds: function(x, y){
        return !!(x >= this.dim || x < 0 || y >= this.dim || y < 0);
    },

    /* gather information from the current cell
    * and add new knowledge base entries based upon the
    * observations */
    gatherAdjacentInfo: function(agent){
        if(this.tiles[agent.currPos.x][agent.currPos.y].hasBreeze || this.tiles[agent.currPos.x][agent.currPos.y].hasStink
            || this.tiles[agent.currPos.x][agent.currPos.y].hasGlimmer){
            var cell;
            /* if the position is not out of bounds
             * if not, create an entry */
            if(!this.isOutofBounds(agent.currPos.x, agent.currPos.y + 1) && agent.currPos.y + 1 != agent.prevPos.y) {
                cell = new Cell(agent.currPos.x, agent.currPos.y + 1);
                this.setAdjacentCell(cell, { x: agent.currPos.x, y: agent.currPos.y });
            }
            /* second */
            if(!this.isOutofBounds(agent.currPos.x, agent.currPos.y - 1) && agent.currPos.y - 1 != agent.prevPos.y) {
                cell = new Cell(agent.currPos.x, agent.currPos.y - 1);
                this.setAdjacentCell(cell, { x: agent.currPos.x, y: agent.currPos.y });
            }
            /* third */
            if(!this.isOutofBounds(agent.currPos.x + 1, agent.currPos.y) && agent.currPos.x + 1 != agent.prevPos.x) {
                cell = new Cell(agent.currPos.x + 1, agent.currPos.y );
                this.setAdjacentCell(cell, { x: agent.currPos.x, y: agent.currPos.y });
            }
            /* fourth */
            if(!this.isOutofBounds(agent.currPos.x - 1, agent.currPos.y) && agent.currPos.x - 1 != agent.prevPos.x) {
                cell = new Cell(agent.currPos.x - 1, agent.currPos.y );
                this.setAdjacentCell(cell, { x: agent.currPos.x, y: agent.currPos.y });
            }
        }

        KnowledgeBase.reload();
    },

    /* set pit */
    setAdjacentCell: function(cell, pos){
        if(this.tiles[pos.x][pos.y].hasBreeze) cell.hasPit = true;
        else cell.hasPit = false;

        if(this.tiles[pos.x][pos.y].hasStink) cell.hasWumpus = true;
        else cell.hasWumpus = false;

        KnowledgeBase.add(cell);
    }
};
