import Fastify from "fastify";
import 'dotenv/config'
import fastifyMysql from "@fastify/mysql";



const app = Fastify({
    logger: true,
});

app.register(fastifyMysql, {
    connectionString: process.env.DATABASE_URI,
    promise : true
});
app.get('/category/getall', async (req, res) => {
    try {
        await app.mysql.query('SELECT * FROM category')
        .then(result => res.status (200) .send(result[0]))
        .catch(error => res.status (400) .send({message: error.message}));
    } catch (error) {
        
        return res.status(500).send({message: error.message});
    }

});

app.get('/category/getbyid/:id', async (req, res) => {
      try {
    
        await app.mysql.query('SELECT * FROM category WHERE id =?', [id])
        .then(result => res.status (200) .send(result[0]))
           if(!result[0][0]) return res.status(404).send({message: 'Category not found'})
        .catch(error => res.status (400) .send({message: error.message}))
    } catch (error) {
        return res.status(500).send({message: error.message});
}});

app.get('/category/:category', async  (req, res) => {
    try {
        await app.mysql.query('INSERT INTO catagory(catagoryName,description) VALUES (??)', [req.body.catagoryName, req.body.description])
        .then(result => res.status (200) .send({message:'Catagory created successfully'}))
        .catch(error => res.status (400) .send({message: error.message}))
        
    } catch (error) {
        return res.status(500).send({message: error.message});
        
    }
})

app.get('/',(req,res)=>{
    return {message : 'Hello  fastify API'}
});

 try {
    const host = process.env.HOST;
    const port = process.env.PORT;
    await app.listen({port,host});
 }catch(error) {
    app.log.error(error);
    process.exit(1);

 }