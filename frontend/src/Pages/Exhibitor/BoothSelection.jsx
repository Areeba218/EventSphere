import { useState } from "react";

function BoothSelection() {

    const [selectedBooth, setSelectedBooth] = useState("");

    const booths = [
        {
            number: "A1",
            size: "10 x 10 ft",
            location: "Hall A",
            price: "Rs. 50,000",
            status: "Available"
        },
        {
            number: "A2",
            size: "10 x 10 ft",
            location: "Hall A",
            price: "Rs. 50,000",
            status: "Available"
        },
        {
            number: "A3",
            size: "10 x 20 ft",
            location: "Hall A",
            price: "Rs. 80,000",
            status: "Booked"
        },
        {
            number: "A4",
            size: "10 x 10 ft",
            location: "Hall A",
            price: "Rs. 50,000",
            status: "Available"
        }
    ];

    const selectBooth = (number) => {
        setSelectedBooth(number);
        alert("Booth " + number + " selected");
    };

    return (
        <div className="list-page">

            <h1>Booth Selection</h1>

            <p>Select an available booth for your expo.</p>

            <div className="booth-list">

                {booths.map((booth) => (

                    <div className="booth-card" key={booth.number}>

                        <h2>Booth {booth.number}</h2>

                        <p>Size: {booth.size}</p>
                        <p>Location: {booth.location}</p>
                        <p>Price: {booth.price}</p>

                        <p>
                            Status: {booth.status}
                        </p>

                        {booth.status === "Available" ? (

                            <button
                                onClick={() => selectBooth(booth.number)}
                            >
                                Select Booth
                            </button>

                        ) : (

                            <button disabled>
                                Unavailable
                            </button>

                        )}

                    </div>

                ))}

            </div>

            {selectedBooth && (
                <p className="selected-booth">
                    Selected Booth: {selectedBooth}
                </p>
            )}

        </div>
    );
}

export default BoothSelection;