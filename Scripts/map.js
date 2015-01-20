var Map = {
    tiles: [],
    dim: 0,

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
        if(Map.tiles[agent.currPos.x][agent.currPos.y].hasBreeze){
            /* if the position is not out of bounds
             * if not, create an entry */
            if(!Map.isOutofBounds(agent.currPos.x, agent.currPos.y + 1) && agent.currPos.y + 1 != agent.prevPos.y)
                this.setAdjacentCellPit(JSON.parse(JSON.stringify(Map.tiles[agent.currPos.x][agent.currPos.y + 1])), { x: agent.currPos.x, y: agent.currPos.y + 1});

            if(!Map.isOutofBounds(agent.currPos.x, agent.currPos.y - 1) && agent.currPos.y - 1 != agent.prevPos.y)
                this.setAdjacentCellPit(JSON.parse(JSON.stringify(Map.tiles[agent.currPos.x][agent.currPos.y - 1])), { x: agent.currPos.x, y: agent.currPos.y - 1});

            if(!Map.isOutofBounds(agent.currPos.x + 1, agent.currPos.y) && agent.currPos.x + 1 != agent.prevPos.x)
                this.setAdjacentCellPit(JSON.parse(JSON.stringify(Map.tiles[agent.currPos.x + 1][agent.currPos.y])), { x: agent.currPos.x + 1, y: agent.currPos.y});

            if(!Map.isOutofBounds(agent.currPos.x - 1, agent.currPos.y) && agent.currPos.x - 1 != agent.prevPos.x)
                this.setAdjacentCellPit(JSON.parse(JSON.stringify(Map.tiles[agent.currPos.x - 1][agent.currPos.y])), { x: agent.currPos.x - 1, y: agent.currPos.y});
        }

        if(Map.tiles[agent.currPos.x][agent.currPos.y].hasStink){
            /* if the position is not out of bounds
             * if not, create an entry */
            if(!Map.isOutofBounds(agent.currPos.x, agent.currPos.y + 1) && agent.currPos.y + 1 != agent.prevPos.y)
                this.setAdjacentCellWumpus(JSON.parse(JSON.stringify(Map.tiles[agent.currPos.x][agent.currPos.y + 1])), { x: agent.currPos.x, y: agent.currPos.y + 1});

            if(!Map.isOutofBounds(agent.currPos.x, agent.currPos.y - 1) && agent.currPos.y - 1 != agent.prevPos.y)
                this.setAdjacentCellWumpus(JSON.parse(JSON.stringify(Map.tiles[agent.currPos.x][agent.currPos.y - 1])), { x: agent.currPos.x, y: agent.currPos.y - 1});

            if(!Map.isOutofBounds(agent.currPos.x + 1, agent.currPos.y) && agent.currPos.x + 1 != agent.prevPos.x)
                this.setAdjacentCellWumpus(JSON.parse(JSON.stringify(Map.tiles[agent.currPos.x + 1][agent.currPos.y])), { x: agent.currPos.x + 1, y: agent.currPos.y});

            if(!Map.isOutofBounds(agent.currPos.x - 1, agent.currPos.y) && agent.currPos.x - 1 != agent.prevPos.x)
                this.setAdjacentCellWumpus(JSON.parse(JSON.stringify(Map.tiles[agent.currPos.x - 1][agent.currPos.y])), { x: agent.currPos.x - 1, y: agent.currPos.y});
        }

        this.reload();
    },

    /* set pit */
    setAdjacentCellPit: function(cell, pos){
        cell.hasPit = true;
        cell.pos = pos;
        cell.isSafe = false;

        KnowledgeBase.add(cell);
    },

    /* set wumpus */
    setAdjacentCellWumpus: function(cell, pos){
        cell.hasWumpus = true;
        cell.pos = pos;
        cell.isSafe = false;

        KnowledgeBase.add(cell);
    },

    /* rearrange information about the adjacent cells */
    reload: function(){
        for(var i = 0; i < KnowledgeBase.sentences.length; i++){
            this.cellMod(KnowledgeBase.sentences[i].pos.x, KnowledgeBase.sentences[i].pos.y, i);
        }
    },

    /* modify the cell
     * i j Map tile
     * k KB */
    cellMod: function(i, j, k){
        if(Map.tiles[i][j].firstShot){
            Map.tiles[i][j] = KnowledgeBase.sentences[k];
            Map.tiles[i][j].firstShot = false;
        }
        else {
            Map.tiles[i][j].isSafe = Map.tiles[i][j].isSafe && KnowledgeBase.sentences[k].isSafe;
            Map.tiles[i][j].hasBreeze = Map.tiles[i][j].hasBreeze && KnowledgeBase.sentences[k].hasBreeze;
            Map.tiles[i][j].hasPit = Map.tiles[i][j].hasPit && KnowledgeBase.sentences[k].hasPit;
            Map.tiles[i][j].hasStink = Map.tiles[i][j].hasStink && KnowledgeBase.sentences[k].hasStink;
            Map.tiles[i][j].hasGold = Map.tiles[i][j].hasGold && KnowledgeBase.sentences[k].hasGold;
            Map.tiles[i][j].hasGlimmer = Map.tiles[i][j].hasGlimmer && KnowledgeBase.sentences[k].hasGlimmer;
            Map.tiles[i][j].hasWumpus = Map.tiles[i][j].hasWumpus && KnowledgeBase.sentences[k].hasWumpus;
        }
    }
};
