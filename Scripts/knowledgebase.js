var KnowledgeBase = {
    sentences: [],
    db: [],

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
        for(var i = 0; i < KnowledgeBase.sentences.length; i++)
            this.cellMod(KnowledgeBase.sentences[i].pos.x, KnowledgeBase.sentences[i].pos.y, i);
    },

    /* modify the cell
     * i j Map tile
     * k KB */
    cellMod: function(i, j, k){
        if(this.db[i][j].firstShot){
            this.db[i][j] = KnowledgeBase.sentences[k];
            this.db[i][j].firstShot = false;
        }
        else {
            //this.db[i][j].hasBreeze = this.db[i][j].hasBreeze && KnowledgeBase.sentences[k].hasBreeze;
            this.db[i][j].hasPit = this.db[i][j].hasPit && KnowledgeBase.sentences[k].hasPit;
            //this.db[i][j].hasStink = this.db[i][j].hasStink && KnowledgeBase.sentences[k].hasStink;
            this.db[i][j].hasWumpus = this.db[i][j].hasWumpus && KnowledgeBase.sentences[k].hasWumpus;
        }
    }
};
