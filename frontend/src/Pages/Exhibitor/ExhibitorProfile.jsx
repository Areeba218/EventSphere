
import { useState, useEffect } from "react";
import axios from "axios";

function ExhibitorProfile() {
    const [companyName, setCompanyName] = useState("");
    const [contactPerson, setContactPerson] = useState("");
    const [email, setEmail] = useState("tech@example.com");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");
    const [category, setCategory] = useState("");
    const [products, setProducts] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(false);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    // Load existing profile when the page opens
    useEffect(() => {
        const loadProfile = async () => {
            const normalizedEmail = email.trim().toLowerCase();

            if (!normalizedEmail) return;

            try {
                setLoadingProfile(true);

                const response = await axios.get(
                    `http://localhost:5000/api/exhibitor/profile/${encodeURIComponent(normalizedEmail)}`
                );

                const profile = response.data;

                setCompanyName(profile.companyName || "");
                setContactPerson(profile.contactPerson || "");
                setEmail(profile.email || normalizedEmail);
                setPhone(profile.phone || "");
                setWebsite(profile.website || "");
                setCategory(profile.category || "");
                setProducts(profile.products || "");
                setAddress(profile.address || "");
                setDescription(profile.description || "");
            } catch (error) {
                if (error.response?.status === 404) {
                    setMessage("No saved profile found. Please complete your profile.");
                    setMessageType("info");
                } else {
                    console.error(
                        "Profile loading error:",
                        error.response?.data || error.message
                    );

                    setMessage("Profile load nahi ho saki. Backend check karein.");
                    setMessageType("error");
                }
            } finally {
                setLoadingProfile(false);
            }
        };

        loadProfile();
    }, []);

    const saveProfile = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setMessageType("");

        try {
            const response = await axios.post(
                "http://localhost:5000/api/exhibitor/profile",
                {
                    companyName: companyName.trim(),
                    contactPerson: contactPerson.trim(),
                    email: email.trim().toLowerCase(),
                    phone: phone.trim(),
                    website: website.trim(),
                    category,
                    products: products.trim(),
                    address: address.trim(),
                    description: description.trim()
                }
            );

            setMessage(response.data.message || "Profile saved successfully.");
            setMessageType("success");

            // Use the saved values returned by the backend
            if (response.data.exhibitor) {
                const profile = response.data.exhibitor;

                setCompanyName(profile.companyName || "");
                setContactPerson(profile.contactPerson || "");
                setEmail(profile.email || "");
                setPhone(profile.phone || "");
                setWebsite(profile.website || "");
                setCategory(profile.category || "");
                setProducts(profile.products || "");
                setAddress(profile.address || "");
                setDescription(profile.description || "");
            }
        } catch (error) {
            console.error(
                "Profile saving error:",
                error.response?.data || error.message
            );

            setMessage(
                error.response?.data?.message ||
                "Profile save nahi ho saki. Backend check karein."
            );

            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-page">
            <h1>Exhibitor Profile</h1>
            <p>Manage your company information.</p>

            {message && (
                <p
                    role="status"
                    style={{
                        color:
                            messageType === "success"
                                ? "green"
                                : messageType === "error"
                                ? "red"
                                : "#555",
                        margin: "12px 0",
                        padding: "10px",
                        borderRadius: "5px"
                    }}
                >
                    {message}
                </p>
            )}

            {loadingProfile ? (
                <p>Loading profile...</p>
            ) : (
                <form onSubmit={saveProfile}>
                    <label>Company Name</label>
                    <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                    />

                    <label>Contact Person</label>
                    <input
                        type="text"
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Phone Number</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <label>Website</label>
                    <input
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />

                    <label>Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Company Category</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Education">Education</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Food & Beverages">Food &amp; Beverages</option>
                        <option value="Fashion & Clothing">Fashion &amp; Clothing</option>
                        <option value="Beauty & Cosmetics">Beauty &amp; Cosmetics</option>
                        <option value="Construction">Construction</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Other">Other</option>
                    </select>

                    <label>Products / Services</label>
                    <input
                        type="text"
                        value={products}
                        onChange={(e) => setProducts(e.target.value)}
                    />

                    <label>Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <label>Company Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Saving..." : "Save Profile"}
                    </button>
                </form>
            )}
        </div>
    );
}

export default ExhibitorProfile;
