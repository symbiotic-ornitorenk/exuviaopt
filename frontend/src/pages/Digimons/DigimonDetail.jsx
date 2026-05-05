import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import DigimonEvolutions from "../../components/Digimons/DigimonEvolutions.jsx";
import DigimonInfo from "../../components/Digimons/DigimonInfo.jsx";
import DigimonStats from "../../components/Digimons/DigimonStats.jsx";

const DigimonDetail = () => {
    const {id} = useParams();
    const [digimon, setDigimon] = useState(null);
    const [evoMap, setEvoMap] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        // Mevcut Digimon Verisini Getir[cite: 1]
        axios.get(`http://localhost:8000/api/digimons/${id}/`)
            .then(res => setDigimon(res.data))
            .catch(err => setError("Veri yüklenirken hata oluştu."));

        // Tüm Listeyi Getir ve Sözlük Oluştur[cite: 1]
        axios.get('http://localhost:8000/api/digimons/')
            .then(res => {
                const map = {};
                res.data.forEach(d => {
                    map[d.name] = d;
                });
                setEvoMap(map);
            });
    }, [id]);

    if (error) return <div className="text-danger p-5">{error}</div>;
    if (!digimon || Object.keys(evoMap).length === 0) return <div className="text-white p-5">Yükleniyor...</div>;

    return (
        <div className="container-fluid mt-4 text-white pb-5" style={{maxWidth: '1440px'}}>

            {/* 🏰 Üst Panel: Büzülme Korumalı ve Eşit Boylu Yapı */}
            <div className="row g-4 mb-4 d-flex align-items-stretch">

                {/* 🛡️ Sol Sütun: %33.3 Genişlik (col-md-4) */}
                <div className="col-md-4 d-flex" style={{flex: '0 0 33.3333%', maxWidth: '33.3333%'}}>
                    <div className="w-100 h-100">
                        <DigimonInfo digimon={digimon} className="h-100"/>
                    </div>
                </div>

                {/* 📊 Sağ Sütun: %66.6 Genişlik (col-md-8) */}
                <div className="col-md-8 d-flex" style={{flex: '0 0 66.6666%', maxWidth: '66.6666%'}}>
                    <div className="w-100 h-100">
                        <DigimonStats digimon={digimon} className="h-100"/>
                    </div>
                </div>
            </div>

            {/* Alt Kısım: Evrim Hattı */}
            <div className="row px-3 mt-3">
                <div className="col-12">
                    {digimon && Object.keys(evoMap).length > 0 && (
                        <DigimonEvolutions
                            activeDigimon={digimon}
                            evoMap={evoMap}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default DigimonDetail;