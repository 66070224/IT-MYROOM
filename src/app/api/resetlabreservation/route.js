import { connectMongoDB } from '../../../../lib/mongodb';
import Labroomreservation from '../../../../models/labroomreservation';
import Labroomreservationhistory from '../../../../models/labroomreservationhistory';

const resetOldLabReservations = async () => {
    try {
        await connectMongoDB();

        const today = new Date();

        const currentReservations = await Labroomreservation.find();

        if (currentReservations.length > 0) {
            const historyEntries = currentReservations.map(reservation => ({
                roomname: reservation.roomname,
                username: reservation.username,
                date: reservation.date,
                time: reservation.time
            }));

            await Labroomreservationhistory.insertMany(historyEntries);
            console.log(`${historyEntries.length} lab reservations moved to history successfully.`);
        }

        await Labroomreservation.deleteMany({});
        console.log("Current lab reservations cleared successfully.");
    } catch (error) {
        console.error("Error resetting lab reservations: ", error);
    }
};

export default resetOldLabReservations;