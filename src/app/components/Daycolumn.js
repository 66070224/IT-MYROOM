const Daycolumn = ({ day }) => {
    return (
      <div className="flex flex-col border border-gray-300 rounded-md">
        {day.reservations.map((reservation, index) => (
          <div
            key={index}
            className={`p-4 text-center ${reservation.color}`}
            style={{ gridRow: `span ${reservation.endTime - reservation.startTime}` }}
          >
            <p className="font-bold">{reservation.name}</p>
            <p>{reservation.time}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default Daycolumn;
  