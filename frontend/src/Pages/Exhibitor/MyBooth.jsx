import { useState } from "react";

function MyBooth() {

    const [staff, setStaff] = useState([
        {
            name: "Ali Khan",
            designation: "Sales Manager"
        },
        {
            name: "Sara Ahmed",
            designation: "Marketing Executive"
        }
    ]);

    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");

    const addStaff = (e) => {
        e.preventDefault();

        if (name === "" || designation === "") {
            alert("Please enter staff details");
            return;
        }

        setStaff([
            ...staff,
            {
                name: name,
                designation: designation
            }
        ]);

        setName("");
        setDesignation("");
    };

    return (
        <div className="list-page">

            <h1>My Booth</h1>

            <div className="booth-details">

                <h2>Booth A12</h2>

                <p>Expo: Technology Expo 2026</p>
                <p>Location: Hall A</p>
                <p>Size: 10 x 10 ft</p>
                <p>Status: Reserved</p>

            </div>

            <div className="booth-details">

                <h2>Products / Services</h2>

                <p>Software Development</p>
                <p>Cloud Solutions</p>
                <p>AI Services</p>

            </div>

            <div className="booth-details">

                <h2>Booth Staff</h2>

                {staff.map((person, index) => (
                    <div className="staff" key={index}>
                        <strong>{person.name}</strong>
                        <p>{person.designation}</p>
                    </div>
                ))}

            </div>

            <div className="form-page">

                <h2>Add Staff Member</h2>

                <form onSubmit={addStaff}>

                    <label>Name</label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label>Designation</label>

                    <input
                        type="text"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                    />

                    <button type="submit">
                        Add Staff
                    </button>

                </form>

            </div>

        </div>
    );
}

export default MyBooth;