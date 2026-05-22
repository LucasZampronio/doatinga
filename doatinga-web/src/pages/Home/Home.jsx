import React, { useState, useEffect } from 'react';
import Header from "../../components/common/Header/Header.jsx";
import Footer from "../../components/common/Footer/Footer.jsx";
import MapContainer from "../../components/map/MapContainer.jsx";
import InstitutionSidebar from "../../components/map/InstitutionSidebar.jsx";
import api from '../../services/api';
import './Home.css';

function Home() {
    const [institutions, setInstitutions] = useState([]);
    const [selectedInst, setSelectedInst] = useState(null);

    useEffect(() => {
        async function fetchInstitutions() {
            try {
                const response = await api.get('/institutions');
                setInstitutions(response.data.data);
            } catch (error) {
                console.error('Erro ao buscar instituições:', error);
            }
        }
        fetchInstitutions();
    }, []);

    return (
        <div className="home-page">
            <Header />
            <main className="home-content">
                <div className="map-sidebar-layout">
                    <div className="map-section">
                        <MapContainer 
                            institutions={institutions} 
                            selectedInstitution={selectedInst}
                        />
                    </div>
                    <InstitutionSidebar 
                        institutions={institutions} 
                        onSelect={setSelectedInst}
                    />
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Home;
