var KnowledgeBase = {
    sentences: [],
    db: [],
    wumpusCoords: { x: -1, y: -1 },
    wumpusIsAlive: true,

    /* initialize an empty db */
    init: function(dim){
        for(var i = 0; i < dim; i++){
            this.db[i] = [];

            for(var j = 0; j < dim; j++){
                this.db[i][j] = new Cell(i, j);
            }
        }
    },

    /* index { x: value, y: value }
     * cell is a Cell type object */
    add: function(cell){
        this.sentences.push(cell);
    },

    /* reload our knowledge database */
    reload: function(){
        var i;

        for(i = 0; i < this.sentences.length; i++){
            if(this.wumpusIsAlive) this.cellMod(this.sentences[i].pos.x, this.sentences[i].pos.y, i, Type.WUMPUS);
            this.cellMod(this.sentences[i].pos.x, this.sentences[i].pos.y, i, Type.PIT);

            /* wumpus */
            if(this.wumpusIsAlive && this.sentences[i].hasWumpus){
                this.db[this.sentences[i].pos.x][this.sentences[i].pos.y].wumpusCount++;
            }
            /* breeze */
            if(this.sentences[i].hasPit){
                this.db[this.sentences[i].pos.x][this.sentences[i].pos.y].pitCount++;
            }
        }

        /* try to find the wumpus */
        for(i = 0; i < DIM; i++){
            for(var j = 0; j < DIM; j++){
                /* wumpus */
                if(this.wumpusIsAlive && this.db[i][j].wumpusCount >= 2) this.wumpusCoords = { x: i, y: j };

                /* init heuristics */
                this.db[i][j].heuristics = 0;
                /* if something has been already visited, it cannot contain a wumpus nor a pit */
                if(this.db[i][j].hasWumpus && this.db[i][j].visited) this.db[i][j].hasWumpus = false;
                if(this.db[i][j].hasPit && this.db[i][j].visited) this.db[i][j].hasPit = false;
                /* calculate the heuristics */
                if(this.db[i][j].hasPit) this.db[i][j].heuristics += 10 * this.db[i][j].pitCount;
                if(this.db[i][j].hasWumpus) this.db[i][j].heuristics += 10 * this.db[i][j].wumpusCount;
                if(!this.db[i][j].hasPit && !this.db[i][j].hasWumpus && !this.db[i][j].visited) this.db[i][j].heuristics -= 5;
                /* initialize to zero */
                this.db[i][j].wumpusCount = 0;
                this.db[i][j].pitCount = 0;
            }
        }
    },

    /* modify the cell
     * i j Map tile
     * k KB */
    cellMod: function(i, j, k, type){
        switch(type){
            case Type.WUMPUS:
                if(this.db[i][j].firstWumpusGuess){
                    this.db[i][j].hasWumpus = this.sentences[k].hasWumpus;
                    this.db[i][j].firstWumpusGuess = false;
                }
                else this.db[i][j].hasWumpus = this.db[i][j].hasWumpus && this.sentences[k].hasWumpus;
                break;

            case Type.PIT:
                if(this.db[i][j].firstPitGuess){
                    this.db[i][j].hasPit = this.sentences[k].hasPit;
                    this.db[i][j].firstPitGuess = false;
                }
                this.db[i][j].hasPit = this.db[i][j].hasPit && this.sentences[k].hasPit;
                break;
        }
    }
};
