// import { error } from 'console'
// import mongoose from 'mongoose'

// export async function connect(){
//     try {
//         mongoose.connect(process.env.MONGO_URI)
//         const connection = mongoose.connection()
//         connection.on('connected',()=>{
//             console.log('Connected to db')
//         })
//         connection.on('error',()=>{
//             console.log('Error while connecting to DB', error)
//             process.exit()
//         })
//     } catch (error) {
//         console.log("Something went wrong while conecting to db", console.error(error))
//     }
// }

import mongoose from 'mongoose';

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('Connected to DB');
        });
        connection.on('error', (error) => {
            console.log('Error while connecting to DB', error);
            process.exit(1);
        });
    } catch (error) {
        console.error("Something went wrong while connecting to DB", error);
        process.exit(1); // Ensure the process exits on error
    }
}
