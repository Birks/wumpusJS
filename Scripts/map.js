var Map = {
    rows: 0,
    columns: 0,
    tiles: [],
    tileSize: 0,

    init: function(tileSize){
        this.tileSize = tileSize;

        this.rows = Math.floor(Game.width / tileSize);
        this.columns = Math.floor(Game.height / tileSize);

        /* initialize the tiles 2d array to empty */
        for(var i = 0; i < this.rows; i++){
            this.tiles[i] = [];
            for(var j = 0; j < this.columns; j++)
                this.tiles[i][j] = Type.EMPTY;
        }
    },

    /* x and y are the indices of the 2d array tiles
    * getters and setters */
    set: function(type, x, y){ this.tiles[x][y] = type; },
    get: function(x, y){ return this.tiles[x][y]; }
};
