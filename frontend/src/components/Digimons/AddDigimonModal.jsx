import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Select from 'react-select';

const AddDigimonModal = ({show, handleClose, refreshList}) => {
    const [options, setOptions] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const initialState = {
        name: '', attribute: 'Data', element: 'Fire', form: 'Rookie',
        hatch: '5', rank: 'None', digi_class: 'None', size: '140%', is_reborn: 'False',
        hp: 0, ds: 0, at: 0, at_spd: 1.0, ct: 0, ht: 0, de: 0, ev: 0
    };

    const [formData, setFormData] = useState(initialState);
    const [selectedFamilies, setSelectedFamilies] = useState([]);
    const [selectedEvoFrom, setSelectedEvoFrom] = useState([]);
    const [selectedEvoTo, setSelectedEvoTo] = useState([]);

    const choices = {
        attribute: ['Data', 'Vaccine', 'Virus', 'Unknown', 'None'],
        element: ['Fire', 'Light', 'Steel', 'Wind', 'Ice', 'Neutral', 'Thunder', 'Wood', 'Land', 'Pitch Black', 'Water'],
        form: ['Rookie', 'Rookie X', 'Champion', 'Champion X', 'Ultimate', 'Ultimate X', 'Mega', 'Mega X', 'Burst Mode', 'Burst Mode X', 'Jogress', 'Jogress X', 'Armor', 'Hybrid', 'Variant'],
        family: ['Dark Area', 'Deep Savers', "Dragon's Roar", 'Jungle Troopers', 'Metal Empire', 'Nature Spirits', 'Nightmare Soldiers', 'Unknown', 'Virus Busters', 'Wind Guardians'],
        rank: ['A', 'A+', 'S', 'S+', 'SS', 'SS+', 'SSS', 'SSS+', 'U','None'],
        class: ['AA', 'SK', 'TA', 'SUP', 'None']
    };

    // AddDigimonModal.jsx içindeki useEffect bloğu
    useEffect(() => {
        if (show) {
            // Modal her açıldığında state'i SIFIRLA
            setFormData(initialState);
            setImagePreview(null);
            setImageFile(null);
            setSelectedFamilies([]);
            setSelectedEvoFrom([]);
            setSelectedEvoTo([]);

            axios.get('http://127.0.0.1:8000/api/digimons/').then(res => {
                setOptions(res.data.map(d => ({value: d.name, label: d.name})));
            });
        }
    }, [show]); // show değiştiğinde (modal açıldığında) çalışır

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        // Temel alanları ekle
        Object.keys(formData).forEach(key => {
            if (!['hp', 'ds', 'at', 'at_spd', 'ct', 'ht', 'de', 'ev'].includes(key)) {
                data.append(key, formData[key]);
            }
        });

        if (imageFile) data.append('image', imageFile);
        data.append('families', JSON.stringify(selectedFamilies.map(f => f.value)));
        data.append('evo_from', JSON.stringify(selectedEvoFrom.map(e => e.value)));
        data.append('evo_to', JSON.stringify(selectedEvoTo.map(e => e.value)));

        const statsObj = {
            hp: parseInt(formData.hp) || 0,
            ds: parseInt(formData.ds) || 0,
            at: parseInt(formData.at) || 0,
            at_spd: parseFloat(formData.at_spd) || 1,
            ct: `${formData.ct || 0}%`,
            ht: parseInt(formData.ht) || 0,
            de: parseInt(formData.de) || 0,
            ev: `${formData.ev || 0}%`
        };
        data.append('stats', JSON.stringify(statsObj));

        try {
            await axios.post("http://127.0.0.1:8000/api/digimons/", data);
            handleClose();
            refreshList();
            setFormData(initialState);
            setImagePreview(null);
        } catch (err) {
            console.error("Hata:", err.response?.data);
        }
    };

    if (!show) return null;

    return (
        <div className="modal d-block" style={{backgroundColor: 'rgba(0,0,0,0.9)'}}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content bg-dark text-white border-secondary shadow-lg">
                    <div className="modal-header border-secondary">
                        <h5 className="modal-title fw-bold">Add New Digimon</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={handleClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body" style={{maxHeight: '80vh', overflowY: 'auto'}}>
                            <div className="text-center mb-3">
                                <div className="d-inline-block border border-secondary rounded p-1 bg-black"
                                     style={{width: '120px', height: '120px'}}>
                                    {imagePreview ? <img src={imagePreview} className="w-100 h-100 object-fit-contain"
                                                         alt="preview"/> : <div
                                        className="h-100 d-flex align-items-center justify-content-center text-muted small">No
                                        Image</div>}
                                </div>
                                <input type="file"
                                       className="form-control form-control-sm w-50 mx-auto mt-2 bg-secondary border-0 text-white"
                                       onChange={handleImageChange}/>
                            </div>

                            <div className="row g-2">
                                <div className="col-md-6"><label className="small opacity-75">Name</label>
                                    <input type="text"
                                           className="form-control form-control-sm bg-secondary text-white border-0"
                                           onChange={e => setFormData({...formData, name: e.target.value})} required/>
                                </div>
                                <div className="col-md-3"><label className="small opacity-75">Attribute</label>
                                    <select className="form-select form-select-sm bg-secondary text-white border-0"
                                            value={formData.attribute}
                                            onChange={e => setFormData({...formData, attribute: e.target.value})}>
                                        {choices.attribute.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="col-md-3"><label className="small opacity-75">Element</label>
                                    <select className="form-select form-select-sm bg-secondary text-white border-0"
                                            value={formData.element}
                                            onChange={e => setFormData({...formData, element: e.target.value})}>
                                        {choices.element.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="col-md-4"><label className="small opacity-75">Rank</label>
                                    <select className="form-select form-select-sm bg-secondary text-white border-0"
                                            value={formData.rank}
                                            onChange={e => setFormData({...formData, rank: e.target.value})}>
                                        {choices.rank.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="col-md-4"><label className="small opacity-75">Form</label>
                                    <select className="form-select form-select-sm bg-secondary text-white border-0"
                                            value={formData.form}
                                            onChange={e => setFormData({...formData, form: e.target.value})}>
                                        {choices.form.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="col-md-4"><label className="small opacity-75">Class</label>
                                    <select className="form-select form-select-sm bg-secondary text-white border-0"
                                            value={formData.digi_class}
                                            onChange={e => setFormData({...formData, digi_class: e.target.value})}>
                                        {choices.class.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>

                                <div className="col-12"><label className="small opacity-75">Families</label>
                                    <Select isMulti options={choices.family.map(f => ({value: f, label: f}))}
                                            onChange={setSelectedFamilies} className="text-dark"/>
                                </div>
                                <div className="col-md-6"><label className="small opacity-75">Evolved From</label>
                                    <Select isMulti options={options} onChange={setSelectedEvoFrom}
                                            className="text-dark"/>
                                </div>
                                <div className="col-md-6"><label className="small opacity-75">Evolved To</label>
                                    <Select isMulti options={options} onChange={setSelectedEvoTo}
                                            className="text-dark"/>
                                </div>

                                <div className="col-12 mt-3"><h6
                                    className="text-info border-bottom border-secondary pb-1">Stats</h6></div>
                                {['hp', 'ds', 'at', 'at_spd', 'ct', 'ht', 'de', 'ev'].map(stat => (
                                    <div key={stat} className="col-md-3 col-6">
                                        <label className="small text-uppercase opacity-50">{stat}</label>
                                        <input type="number" step="0.01"
                                               className="form-control form-control-sm bg-secondary text-white border-0"
                                               onChange={e => setFormData({...formData, [stat]: e.target.value})}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer border-secondary">
                            <button type="button" className="btn btn-sm btn-outline-light"
                                    onClick={handleClose}>Cancel
                            </button>
                            <button type="submit" className="btn btn-sm btn-info text-white px-4">Save Digimon</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddDigimonModal;