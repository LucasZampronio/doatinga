import Footer from "../../components/common/Footer/Footer.jsx";
import Header from "../../components/common/Header/Header.jsx";
import MapContainer from "../../components/map/MapContainer.jsx";




function Home(){

    return(
        <main>
            <Header/>
            <div>
                <MapContainer/>
            </div>
            <Footer/>
        </main>
    )
}

export default Home;