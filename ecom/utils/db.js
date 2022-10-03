const mongoose = require('mongoose')
const connection = {}

async function connect(){
    if(connection.isConnect){
        console.log('already connected');
        return
    }
    if(mongoose.connections.length > 0){
        connection.isConnect = mongoose.connections[0].readyState;
        if(connection.isConnect === 1){
            console.log('use previous connection');
            return
        }
        await mongoose.disconnect();
    }
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log('new connection');
    connection.isConnect = db.connections[0].readyState

   
}
async function disconnect(){
    if(connection.isConnect){
        if(process.env.NODE_ENV === 'production'){
            await mongoose.disconnect()
            connection.isConnected = false
        }
    }
}

const db = {connect, disconnect}
export default db