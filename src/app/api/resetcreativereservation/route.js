import { connectMongoDB } from '../../../../lib/mongodb';
import Creativeroomreservation from '../../../../models/creativeroomreservation';
import Creativeroomreservationhistory from '../../../../models/creativeroomreservationhistory';

const dayMap = {
    "Sunday": 0,
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6
};

const resetOldReservations = async () => {
    try {
        await connectMongoDB();

        const today = new Date();
        const currentDayNumber = today.getDay();

        const pastReservations = await Creativeroomreservation.find({
            day: { $in: Object.keys(dayMap).filter(day => dayMap[day] < currentDayNumber) }
        });

        if (pastReservations.length > 0) {
            const historyEntries = pastReservations.map(reservation => ({
                roomname: reservation.roomname,
                username: reservation.username,
                date: today,
                time: reservation.time
            }));

            await Creativeroomreservationhistory.insertMany(historyEntries);
            console.log(`${historyEntries.length} past reservations moved to history successfully.`);
        }

        await Creativeroomreservation.deleteMany({
            day: { $in: Object.keys(dayMap).filter(day => dayMap[day] < currentDayNumber) }
        });

        console.log("Past reservations cleared successfully.");
    } catch (error) {
        console.error("Error resetting past reservations: ", error);
    }
};

export default resetOldReservations;
