import { Link } from "react-router";

function Home() {
    return (
        <main>
            <h1>Home Page</h1>
            <Link to="/form">Click Here to go to the Payment Form</Link>
        </main>
    );
}

export default Home;