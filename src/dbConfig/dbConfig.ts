// import mongoose from 'mongoose';

// export async function connect() {
    
//     try {
//         await mongoose.connect(process.env.MONGO_URI!);
//         const connection = mongoose.connection;
//         connection.on('connected', () => {
//             console.log('Connected to DB');
//         });
//         connection.on('error', (error) => {
//             console.log('Error while connecting to DB', error);
//             process.exit(1);
//         });
//     } catch (error) {
//         console.error("Something went wrong while connecting to DB", error);
//         process.exit(1); 
//     }
// }


import mongoose from 'mongoose';

let isConnected = false; 

export async function connect() {
    if (isConnected) {
        return; // If already connected, do nothing
    }

    try {
        await mongoose.connect(process.env.MONGO_URI!);
        isConnected = true; // Mark as connected
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('Connected to DB');
        });
        connection.on('error', (error) => {
            console.error('Error while connecting to DB', error);
            process.exit(1);
        });
    } catch (error) {
        console.error("Something went wrong while connecting to DB", error);
        process.exit(1); 
    }
}
