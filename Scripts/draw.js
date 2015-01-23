var Draw = {

    /* image initalization */
    init: function () {
        wumpusImg = new Image();
        wumpusImg.src = "Images/wumpus.png";
        goldImg = new Image();
        goldImg.src = "Images/gold.png";
        pitImg = new Image();
        pitImg.src = "Images/pit.png";
        breezeImg = new Image();
        breezeImg.src = "Images/breeze.png";
        stinkImg = new Image();
        stinkImg.src = "Images/stink.png";
        breezestinkImg = new Image();
        breezestinkImg.src = "Images/breezeandstink.png";
        goldAndBreezeImg = new Image();
        goldAndBreezeImg.src = "Images/breezeandgold.png";
        goldAndstinkImg = new Image();
        goldAndstinkImg.src = "Images/stinkandgold.png";
        allImg = new Image();
        allImg.src = "Images/breezestinkgold.png";
        player = new Image();
        player.src = "Images/start.png";
    },

    /* draws the main map on the screen with the tiles */
    canvasdraw: function (canvas) {
        var ctx;
        if (canvas && canvas.getContext) {
            ctx = canvas.getContext("2d");
            if (ctx) {

                canvas.style.border = "2px solid #000";
                canvas.width = Game.width;
                canvas.height = Game.height;

                /* draw player */
                ctx.drawImage(player, 0, Game.width - Game.tileSize);

                /* draw tiles */
                for (var i = 0; i < DIM; i++) {
                    for (var j = 0; j < DIM; j++) {
                        if (Map.tiles[i][j].hasWumpus) {
                            ctx.drawImage(wumpusImg, j * Game.tileSize, i * Game.tileSize);
                        }
                        if (Map.tiles[i][j].hasGlimmer) {
                            ctx.drawImage(goldImg, j * Game.tileSize, i * Game.tileSize);
                        }
                        if (Map.tiles[i][j].hasPit) {
                            ctx.drawImage(pitImg, j * Game.tileSize, i * Game.tileSize);
                        }
                        if (Map.tiles[i][j].hasBreeze) {
                            ctx.drawImage(breezeImg, j * Game.tileSize, i * Game.tileSize);
                        }
                        if (Map.tiles[i][j].hasStink) {
                            ctx.drawImage(stinkImg, j * Game.tileSize, i * Game.tileSize);
                        }
                        if (Map.tiles[i][j].hasStink && Map.tiles[i][j].hasBreeze) {
                            ctx.drawImage(breezestinkImg, j * Game.tileSize, i * Game.tileSize);
                        }
                        if (Map.tiles[i][j].hasStink && Map.tiles[i][j].hasGlimmer) {
                            ctx.drawImage(goldAndstinkImg, j * Game.tileSize, i * Game.tileSize);
                        }
                        if (Map.tiles[i][j].hasBreeze && Map.tiles[i][j].hasGlimmer) {
                            ctx.drawImage(goldAndBreezeImg, j * Game.tileSize, i * Game.tileSize);
                        }
                        if (Map.tiles[i][j].hasStink && Map.tiles[i][j].hasBreeze && Map.tiles[i][j].hasGlimmer) {
                            ctx.drawImage(allImg, j * Game.tileSize, i * Game.tileSize);
                        }


                        /* vertical lines */
                        ctx.beginPath();
                        ctx.moveTo(j * Game.tileSize, 0);
                        ctx.lineTo(j * Game.tileSize, DIM * Game.tileSize);
                        ctx.stroke();


                        /* horizontal lines */
                        ctx.beginPath();
                        ctx.moveTo(0, i * Game.tileSize);
                        ctx.lineTo(DIM * Game.tileSize, i * Game.tileSize);
                        ctx.stroke();
                    }
                }

            }
        }
    },

    drawmove: function(canvas, x,y) {
        var ctx;
        if (canvas && canvas.getContext) {
            ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.globalAlpha = 0.2;
                ctx.fillRect(y*Game.tileSize,x*Game.tileSize, Game.tileSize, Game.tileSize);

            }
        }
    }

};