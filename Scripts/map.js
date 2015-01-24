var Map = {
    tiles: [],
    dim: 0,
    wumpusCoords: {x: -1, y: -1},

    init: function (dim) {
        this.dim = dim;

        /* generate an empty map */
        for (var i = 0; i < this.dim; i++) {
            this.tiles[i] = [];

            for (var j = 0; j < this.dim; j++) {
                this.tiles[i][j] = new Cell(i, j);
            }
        }
    },

    isOutofBounds: function (x, y) {
        return !!(x >= this.dim || x < 0 || y >= this.dim || y < 0);
    },

    /* gather information from the current cell
     * and add new knowledge base entries based upon the
     * observations */
    gatherAdjacentInfo: function (agent) {
        if (this.tiles[agent.currPos.x][agent.currPos.y].hasBreeze || this.tiles[agent.currPos.x][agent.currPos.y].hasStink
            || this.tiles[agent.currPos.x][agent.currPos.y].hasGlimmer) {
            var cell;
            /* if the position is not out of bounds
             * if not, create an entry */
            if (!this.isOutofBounds(agent.currPos.x, agent.currPos.y + 1) && agent.currPos.y + 1 != agent.prevPos.y) {
                cell = new Cell(agent.currPos.x, agent.currPos.y + 1);
                this.setAdjacentCell(cell, {x: agent.currPos.x, y: agent.currPos.y});
            }
            /* second */
            if (!this.isOutofBounds(agent.currPos.x, agent.currPos.y - 1) && agent.currPos.y - 1 != agent.prevPos.y) {
                cell = new Cell(agent.currPos.x, agent.currPos.y - 1);
                this.setAdjacentCell(cell, {x: agent.currPos.x, y: agent.currPos.y});
            }
            /* third */
            if (!this.isOutofBounds(agent.currPos.x + 1, agent.currPos.y) && agent.currPos.x + 1 != agent.prevPos.x) {
                cell = new Cell(agent.currPos.x + 1, agent.currPos.y);
                this.setAdjacentCell(cell, {x: agent.currPos.x, y: agent.currPos.y});
            }
            /* fourth */
            if (!this.isOutofBounds(agent.currPos.x - 1, agent.currPos.y) && agent.currPos.x - 1 != agent.prevPos.x) {
                cell = new Cell(agent.currPos.x - 1, agent.currPos.y);
                this.setAdjacentCell(cell, {x: agent.currPos.x, y: agent.currPos.y});
            }
        }

        KnowledgeBase.reload();
    },

    /* set pit */
    setAdjacentCell: function (cell, pos) {
        if (this.tiles[pos.x][pos.y].hasBreeze) cell.hasPit = true;
        else cell.hasPit = false;

        if (this.tiles[pos.x][pos.y].hasStink) cell.hasWumpus = true;
        else cell.hasWumpus = false;

        KnowledgeBase.add(cell);
    },


    /* generating a custom level */
    generate: function () {
        var i, j, m, n;

        /* adds the pits to the map */
        for (i = 0; i < DIM / 2 - 1; i++) {
            m = Math.floor((Math.random() * DIM));
            n = Math.floor((Math.random() * DIM));
            if (this.tiles[m][n].hasPit == false && !(m == DIM - 1 && n == 0 )) {
                this.tiles[m][n].hasPit = true;
            }
            else
                i--;
        }

        /* add the wumpus to the map */
        while (true) {
            m = Math.floor((Math.random() * DIM));
            n = Math.floor((Math.random() * DIM));
            if (this.tiles[m][n].hasWumpus == false && !this.tiles[m][n].hasPit && !(m == DIM - 1 && n == 0 )) {
                this.tiles[m][n].hasWumpus = true;
                break;
            }
        }

        /* add glimmer to the map */
        while (true) {
            m = Math.floor((Math.random() * DIM));
            n = Math.floor((Math.random() * DIM));
            if (this.tiles[m][n].hasGlimmer == false && !this.tiles[m][n].hasPit && !this.tiles[m][n].hasWumpus && !(m == DIM - 1 && n == 0 )) {
                this.tiles[m][n].hasGlimmer = true;
                break;
            }
        }

        /* add breeze around the pit */
        for (i = 0; i < DIM; i++) {
            for (j = 0; j < DIM; j++) {
                if (this.tiles[i][j].hasPit) {
                    if (i > 0 && !this.tiles[i - 1][j].hasPit && !this.tiles[i - 1][j].hasWumpus)
                        this.tiles[i - 1][j].hasBreeze = true;
                    if (j > 0 && !this.tiles[i][j - 1].hasPit && !this.tiles[i][j - 1].hasWumpus)
                        this.tiles[i][j - 1].hasBreeze = true;
                    if (i < DIM - 1 && !this.tiles[i + 1][j].hasPit &&  !this.tiles[i + 1][j].hasWumpus)
                        this.tiles[i + 1][j].hasBreeze = true;
                    if (j < DIM - 1 && !this.tiles[i][j + 1].hasPit && !this.tiles[i][j + 1].hasWumpus)
                        this.tiles[i][j + 1].hasBreeze = true;
                }

            }
        }

        /* add stink around the pit */
        for (i = 0; i < DIM; i++) {
            for (j = 0; j < DIM; j++) {
                if (this.tiles[i][j].hasWumpus) {
                    if (i > 0 && !this.tiles[i - 1][j].hasPit)
                        this.tiles[i - 1][j].hasStink = true;
                    if (j > 0 && !this.tiles[i][j - 1].hasPit)
                        this.tiles[i][j - 1].hasStink = true;
                    if (i < DIM - 1 && !this.tiles[i + 1][j].hasPit)
                        this.tiles[i + 1][j].hasStink = true;
                    if (j < DIM - 1 && !this.tiles[i][j + 1].hasPit)
                        this.tiles[i][j + 1].hasStink = true;
                }

            }
        }


    },


    /* returns  a tile */
    get: function (x, y) {
        return this.tiles[x][y];
    }


};
