import {Router} from 'express';

const route = Router();


route.get ('/', async (req, res) => {

    const conn = await connection();
    const result = await conn.collection('tournament').find({}).toArray();

    console.log(result);
    res.send(result);
})

route.post('/', async (req, res) => {

    const conn = await connection();
    const result = await conn.collection('tournament').insertOne(req.body);
    res.send(result);

})

route.post("/many", async (req, res) => {

    const conn = await connection();
    const result = await conn.collection('tournament').insertMany(req.body);
    res.send(result);

})

route.get("/filter", async (req, res) => {

    const conn = await connection();
    const result = await conn.collection('tournament')
    .find({
        // "$and": [
        //     {"status": "scheduled"},
        //     {"$or": [
        //         {"awards.first": {$gte: 10000}},
        //         {"name": {"$regex": "dota", $options: "i"}}
        //     ]}
        // ]
        "sponsors": {$size: 2}
    }).toArray();
    res.send(result);
//lte = $lte (<), gte = $gte (>), lt = $lt (<=), gt = $gt (>=), exists = $exists, regex = $regex, in = $in, nin = $nin

})

route.post("/equipo", async (req, res) => {
    const conn = await connection();
    const result = await conn.collection('equipo').insertMany(req.body);
    res.send(result);
})

route.get("/withteam", async (req, res) => {

    const conn = await connection();
    const result = await conn.collection('tournament').aggregate([
        {
            "$lookup": {
                "from": 'equipo',
                "localField": 'equipo',
                "foreignField": 'equipo_id',
                "as": 'team'
            }
        },

    ]).toArray();
    res.send(result);
})

export default route;