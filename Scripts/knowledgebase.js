var KnowledgeBase = {
    sentences: [],

    /* index { x: value, y: value }
     * cell is a Cell type object */
    add: function(cell){
        this.sentences.push(cell);
    },

    /* receives the cell where the agent is standing
    * refresh the adjacent cell's parameters with this */
    setParameters: function(agent){
        /* TODO !!! */
    }

};
