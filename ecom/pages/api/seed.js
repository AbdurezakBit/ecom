
import db from "../../utils/db"
import Users from "../../models/Users"
import data from "../../utils/data"



const handler = async(req,res)=>{
    await db.connect();
    await Users.deleteMany()
    await Users.insertMany(data.users)
    await db.disconnect()
    res.send({message: 'seeded successfully'})
}
export default handler