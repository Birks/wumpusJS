var Draw = {

    /* draws the main map on the screen with the tiles */
    canvasdraw: function (canvas, wumpusImg, goldImg, pitImg, breezeImg, stenchImg, breezestenchImg, goldAndBreezeImg, goldAndStenchImg, allImg) {
        var ctx;
        if (canvas && canvas.getContext) {
            ctx = canvas.getContext("2d");
            if (ctx) {

                canvas.style.border = "2px solid #000";
                canvas.width=Game.width;
                canvas.height=Game.height;

                for (var i = 0; i < Map.rows; i++) {

                    for (var j = 0; j < Map.columns; j++) {
                        switch (Map.get(i, j)) {
                            case Type.WUMPUS:
                                ctx.drawImage(wumpusImg, j * Game.tileSize, i * Game.tileSize);
                                break;
                            case Type.GOLD:
                                ctx.drawImage(goldImg, j * Game.tileSize, i * Game.tileSize);
                                break;
                            case Type.PIT:
                                ctx.drawImage(pitImg, j * Game.tileSize, i * Game.tileSize);
                                break;
                            case Type.BREEZE:
                                ctx.drawImage(breezeImg, j * Game.tileSize, i * Game.tileSize);
                                break;
                            case Type.STENCH:
                                ctx.drawImage(stenchImg, j * Game.tileSize, i * Game.tileSize);
                                break;
                            case Type.BREEZEANDSTENCH:
                                ctx.drawImage(breezestenchImg, j * Game.tileSize, i * Game.tileSize);
                                break;
                            case Type.GOLDANDBREEZE:
                                ctx.drawImage(goldAndBreezeImg, j * Game.tileSize, i * Game.tileSize);
                                break;
                            case Type.GOLDANDSTENCH:
                                ctx.drawImage(goldAndStenchImg, j * Game.tileSize, i * Game.tileSize);
                                break;
                            case Type.ALL:
                                ctx.drawImage(allImg, j * Game.tileSize, i * Game.tileSize);
                                break;
                            default:
                                break;

                        }

                        /* vertical lines */
                        ctx.beginPath();
                        ctx.moveTo(j*Game.tileSize,0);
                        ctx.lineTo(j*Game.tileSize,Map.columns*Game.tileSize);
                        ctx.stroke();

                    }

                    /* horizontal lines */
                    ctx.beginPath();
                    ctx.moveTo(0,i*Game.tileSize);
                    ctx.lineTo(Map.rows*Game.tileSize,i*Game.tileSize);
                    ctx.stroke();
                }
            }
        }
    }

};