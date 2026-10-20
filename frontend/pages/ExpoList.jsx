import ExpoCard from "../components/ExpoCard";
import "./ExpoList.css";


const expos = [
  {
    id: 1,
    name: "Technology Expo",
    date: "20 November",
    location: "Karachi",
    description: "Explore new technology."
  },
  {
    id: 2,
    name: "Business Expo",
    date: "5 December",
    location: "Lahore",
    description: "Discover new businesses."
  },
  {
    id: 3,
    name: "Art Expo",
    date: "10 December",
    location: "Islamabad",
    description: "Explore art and creativity."
  },
  {
    id: 4,
    name: "Education Expo",
    date: "15 December",
    location: "Karachi",
    description: "Discover courses and learning opportunities."
  },
  {
    id: 5,
    name: "Food Expo",
    date: "20 December",
    location: "Lahore",
    description: "Explore delicious foods and local cuisines."
  },
  {
    id: 6,
    name: "Fashion Expo",
    date: "25 December",
    location: "Islamabad",
    description: "Discover fashion, designs, and new trends."
  }
];


function ExpoList() {
  return (
    <div>
      <h1>Upcoming Expos</h1>

      <div className="expo-list">
        {expos.map((expo) => (
          <ExpoCard key={expo.id} expo={expo} />
        ))}
      </div>
    </div>
  );
}

export default ExpoList;
