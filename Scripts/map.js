var Map = {
    rows: 0,
    columns: 0,
    tiles: [],
    tileSize: 0,

    init: function (tileSize) {
        this.tileSize = tileSize;

        this.rows = Math.floor(Game.width / tileSize);
        this.columns = Math.floor(Game.height / tileSize);

        /* initialize the tiles 2d array to empty */
        for (var i = 0; i < this.rows; i++) {
            this.tiles[i] = [];
            for (var j = 0; j < this.columns; j++)
                this.tiles[i][j] = Type.EMPTY;
        }

        /* adds the pits to the map */
        for (i = 0; i < this.rows; i++) {
            var m = Math.floor((Math.random() * this.rows));
            var n = Math.floor((Math.random() * this.columns));
            if (this.get(m, n) != Type.PIT && !(m == this.rows - 1 && n == 0 )) {
                this.set(Type.PIT, m, n);
            }
            else
                i--;
        }

        /* add the wumpus to the map */
        while (true) {
            m = Math.floor((Math.random() * this.rows));
            n = Math.floor((Math.random() * this.columns));
            if (this.get(m, n) == Type.EMPTY && !(m == this.rows - 1 && n == 0 )) {
                this.set(Type.WUMPUS, m, n);
                break;
            }
        }

        /* add gold to the map */
        while (true) {
            m = Math.floor((Math.random() * this.rows));
            n = Math.floor((Math.random() * this.columns));
            if (this.get(m, n) == Type.EMPTY && !(m == this.rows - 1 && n == 0 )) {
                this.set(Type.GOLD, m, n);
                break;
            }
        }

        /* add stench around the wumpus */
        for (i = 0; i < this.rows; i++) {
            for (j = 0; j < this.columns; j++) {
                if (this.get(i, j) == Type.WUMPUS) {
                    if (i > 0)
                        this.addstench(i - 1, j);
                    if (j > 0)
                        this.addstench(i, j - 1);
                    if (i < this.rows - 1)
                        this.addstench(i + 1, j);
                    if (j < this.columns - 1)
                        this.addstench(i, j + 1);
                }
            }
        }

        /* add breeze around the pit */
        for (i = 0; i < this.rows; i++) {
            for (j = 0; j < this.columns; j++) {
                if (this.get(i, j) == Type.PIT) {
                    if (i > 0)
                        this.addbreeze(i - 1, j);
                    if (j > 0)
                        this.addbreeze(i, j - 1);
                    if (i < this.rows - 1)
                        this.addbreeze(i + 1, j);
                    if (j < this.columns - 1)
                        this.addbreeze(i, j + 1);
                }
            }
        }


    },


    /* adds stench tile to the given tile */
    addstench: function (x, y) {
        switch (this.get(x, y)) {
            case Type.EMPTY:
                this.set(Type.STENCH, x, y);
                break;
            case Type.BREEZE:
                this.set(Type.BREEZEANDSTENCH, x, y);
                break;
            case Type.GOLD:
                this.set(Type.GOLDANDSTENCH, x, y);
                break;
            case Type.GOLDANDBREEZE:
                this.set(Type.ALL, x, y);
                break;
            default:
                break;

        }
    },

    /* adds breeze tile to the given tile */
    addbreeze: function (x, y) {
        switch (this.get(x, y)) {
            case Type.EMPTY:
                this.set(Type.BREEZE, x, y);
                break;
            case Type.STENCH:
                this.set(Type.BREEZEANDSTENCH, x, y);
                break;
            case Type.GOLD:
                this.set(Type.GOLDANDBREEZE, x, y);
                break;
            case Type.GOLDANDSTENCH:
                this.set(Type.ALL, x, y);
                break;
            default:
                break;

        }
    },

    /* x and y are the indices of the 2d array tiles
     * getters and setters */
    set: function (type, x, y) {
        this.tiles[x][y] = type;
    },
    get: function (x, y) {
        return this.tiles[x][y];
    }
};
