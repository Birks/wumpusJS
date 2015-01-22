var KnowledgeBase = {
    sentences: [],
    db: [],
    wumpusCoords: { x: -1, y: -1 },
    pitCoords: [],
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

    /* relouad our knowledge database */
    reload: function(){
        var i;

        if(this.wumpusIsAlive){
            for(i = 0; i < this.sentences.length; i++){
                this.cellMod(this.sentences[i].pos.x, this.sentences[i].pos.y, i);

                if(this.sentences[i].hasWumpus){
                    this.db[this.sentences[i].pos.x][this.sentences[i].pos.y].wumpusCount++;
                }
            }

            /* try to find the wumpus */
            for(i = 0; i < DIM; i++){
                for(var j = 0; j < DIM; j++){
                    if(this.db[i][j].wumpusCount >= 2) this.wumpusCoords = { x: i, y: j };
                    this.db[i][j].wumpusCount = 0;
                }
            }
        }


    },

    /* modify the cell
     * i j Map tile
     * k KB */
    cellMod: function(i, j, k){
        if(this.db[i][j].firstShot){
            this.db[i][j] = this.sentences[k];
            this.db[i][j].firstShot = false;
        }
        else {
            //this.db[i][j].hasBreeze = this.db[i][j].hasBreeze && this.sentences[k].hasBreeze;
            this.db[i][j].hasPit = this.db[i][j].hasPit && this.sentences[k].hasPit;
            //this.db[i][j].hasStink = this.db[i][j].hasStink && this.sentences[k].hasStink;
            this.db[i][j].hasWumpus = this.db[i][j].hasWumpus && this.sentences[k].hasWumpus;
        }
    }
};
