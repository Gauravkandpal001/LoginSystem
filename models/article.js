let mongoose=require('mongoose');

//Article schema
let articleSchema= mongoose.Schema({
    title:{
        type:String,
        requested:true
    },
    author:{
        type:String,
        requested:true
    },
    body:{
        type:String,
        requested:true
    }
});

let Article =module.exports=mongoose.model('Article',articleSchema);
