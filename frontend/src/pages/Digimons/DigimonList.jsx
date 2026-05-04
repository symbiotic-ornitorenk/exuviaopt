import {useState, useEffect} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux'; // Redux bağlantısı
import DigimonCard from "../../components/Digimons/DigimonCard.jsx";
import AddDigimonModal from "../../components/Digimons/AddDigimonModal.jsx";
import UpdateDigimonModal from "../../components/Digimons/UpdateDigimonModal.jsx";

const DigimonList = () => {
    // Redux'tan Navbar'daki arama terimini çekiyoruz
    const {searchTerm} = useSelector((state) => state.digimons);

    const [digimons, setDigimons] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedDigimonId, setSelectedDigimonId] = useState(null);

    // API'den Digimonları getiren fonksiyon
    const fetchDigimons = (search = "") => {
        // Backend arama desteği için query parametresi ekliyoruz
        const url = search
            ? `http://127.0.0.1:8000/api/digimons/?search=${search}`
            : 'http://127.0.0.1:8000/api/digimons/';

        axios.get(url)
            .then(res => setDigimons(res.data))
            .catch(err => console.error("Veri çekme hatası:", err));
    };

    // searchTerm her değiştiğinde API isteği atılır
    useEffect(() => {
        fetchDigimons(searchTerm);
    }, [searchTerm]);

    const handleDelete = async (id, name) => {
        if (window.confirm(`${name} silinecek, emin misin?`)) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/digimons/${id}/`);
                fetchDigimons(searchTerm);
            } catch (err) {
                console.error("Silme hatası:", err);
            }
        }
    };

    const handleEdit = (id) => {
        setSelectedDigimonId(id);
        setShowUpdateModal(true);
    };

    // GÖSTERİM MANTIĞI:
    // Arama yapılıyorsa filtremiz devre dışı kalır (tüm formlar görünür),
    // arama yoksa sadece Rookie'leri listeleriz.
    const displayedDigimons = searchTerm
        ? digimons
        : digimons.filter(d => d.form === "Rookie");

    return (
        <div className="container-fluid px-5 py-4"
             style={{backgroundColor: '#1a1d21', minHeight: 'calc(100vh - 65px)', overflowX: 'hidden'}}>

            {/* Üst Başlık ve Ekleme Butonu */}
            <div
                className="d-flex justify-content-between align-items-center p-2 mb-3 bg-dark rounded border border-secondary shadow-sm">
                <div>
                    <h2 className="text-white fw-light">
                        {searchTerm ? `Search Results for: "${searchTerm}"` : "Digimon Archive"}
                    </h2>
                    <small className="text-muted">
                        Total items: {displayedDigimons.length}
                    </small>
                </div>
                <button className="btn btn-info text-white fw-bold px-4 shadow-sm" onClick={() => setShowModal(true)}>
                    + Add New Digimon
                </button>
            </div>

            {/* Kart Listesi */}
            <div
                className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-4 mx-0">
                {displayedDigimons.map((digi) => (
                    // Burada 'col' sınıfı, row-cols sayesinde genişliğini otomatik alır
                    <div className="col" key={digi.id}>
                        <DigimonCard
                            digi={digi}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </div>
                ))}
            </div>

            {/* Modallar */}
            <AddDigimonModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                refreshList={() => fetchDigimons(searchTerm)}
            />

            <UpdateDigimonModal
                show={showUpdateModal}
                digimonId={selectedDigimonId}
                handleClose={() => {
                    setShowUpdateModal(false);
                    setSelectedDigimonId(null);
                }}
                refreshList={() => fetchDigimons(searchTerm)}
            />
        </div>
    );
};

export default DigimonList;