const {Router} = require('express');
const router = new Router();
const _ = require('underscore');
const movies = require('../movies.json');

router.get('/', (req,res) => {
    res.json(movies);
});

router.post('/',(req,res)=>{
    console.log(req.body);
    const id = movies.length +1;
    const { title, year, director} = req.body;
    const newMovie = {id, ...req.body};
    if ( title && year && director ){
        movies.push(newMovie);
        res.json({"message":"Movie Added"});
    }else{
        res.json({"message":"Error"});
    }
});
router.delete('/:id',function(req,res){
    const {id} = req.params;
    if(id){
        _.each(movies,(movie,i)=>{
            if(movie,id == id){
                movies.splicer(i,1);
            }
        });
    }
});
router.put('/:id',function(req,res){
    const {id} = req.params;
    const { title, year, director} = req.body;
    if(id && title && year && director){
        _.each(movies,(movie,i)=>{
            if(movie.id == id){
                movie.title = title;
                movie.year = year;
                movie.director = director;
            }
        })
    }else{
        res.json({'error':"Error in the update"})
    }
})
module.exports = router;