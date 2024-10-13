import DayColumn from './Daycolumn';
import React from 'react';

const Timetable = ({ schedule }) => {
    const hours = [
        '08:00 - 09:00',
        '09:00 - 10:00',
        '10:00 - 11:00',
        '11:00 - 12:00',
        '12:00 - 13:00',
        '13:00 - 14:00',
        '14:00 - 15:00',
        '15:00 - 16:00',
        '16:00 - 17:00',
    ];
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <div className="w-full overflow-x-auto">
          <div className="min-w-max">
            <div className="grid grid-rows-8 border border-black">
              <div className="grid grid-cols-10 border border-black">
                <div></div>
                {hours.map((hour, index) => (
                  <div key={index} className="font-bold text-center border border-black">{hour}</div>
                ))}
              </div>
    
              {daysOfWeek.map((day, dayIndex) => {
                const daySchedule = schedule.find((d) => d.day === day);
    
                return (
                  <div key={dayIndex} className="grid grid-cols-10 border border-black">
                    <div className="font-bold text-center">{day}</div>
    
                    {hours.map((hour, hourIndex) => {
                      const reservationInTimeSlot = daySchedule?.reservation?.find(
                        (reservation) =>
                            reservation.startTime <= hourIndex && reservation.endTime > hourIndex
                      );
    
                      return (
                        <div key={hourIndex} className="text-center border border-black">
                          {reservationInTimeSlot ? (
                            <div className={`bg-red-600 p-1`}>
                              <p className="font-bold">{reservationInTimeSlot.name}</p>
                              <p>{reservationInTimeSlot.time}</p>
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    };

export default Timetable;
