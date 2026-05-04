import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Select from 'react-select';

const AddDigimonModal = ({show, handleClose, refreshList}) => {
    const [options, setOptions] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const [formData, setFormData] = useState({
        name: '', attribute: 'Data', element: 'Fire', form: 'Rookie',
        hatch: '3', rank: 'D', digi_class: 'SK', size: '100%', is_reborn: 'False',
        hp: 0, ds: 0, at: 0, at_spd: 1.0, ct: 0, ht: 0, de: 0, ev: 0
    });

    const [selectedFamilies, setSelectedFamilies] = useState([]);
    const [selectedEvoFrom, setSelectedEvoFrom] = useState([]);
    const [selectedEvoTo, setSelectedEvoTo] = useState([]);

    // Sabit Seçenek Verileri[cite: 4, 5]
    const attributeChoices = [
        {value: 'Data', label: 'Data'}, {value: 'Vaccine', label: 'Vaccine'},
        {value: 'Virus', label: 'Virus'}, {value: 'Unknown', label: 'Unknown'},
        {value: 'None', label: 'None'}
    ];

    const elementChoices = [
        {value: 'Fire', label: 'Fire'}, {value: 'Light', label: 'Light'},
        {value: 'Steel', label: 'Steel'}, {value: 'Wind', label: 'Wind'},
        {value: 'Ice', label: 'Ice'}, {value: 'Neutral', label: 'Neutral'},
        {value: 'Thunder', label: 'Thunder'}, {value: 'Wood', label: 'Wood'},
        {value: 'Land', label: 'Land'}, {value: 'Pitch Black', label: 'Pitch Black'},
        {value: 'Water', label: 'Water'}
    ];

    const formChoices = [
        {value: 'Rookie', label: 'Rookie'}, {value: 'Rookie X', label: 'Rookie X'},
        {value: 'Champion', label: 'Champion'}, {value: 'Champion X', label: 'Champion X'},
        {value: 'Ultimate', label: 'Ultimate'}, {value: 'Ultimate X', label: 'Ultimate X'},
        {value: 'Mega', label: 'Mega'}, {value: 'Mega X', label: 'Mega X'},
        {value: 'Burst Mode', label: 'Burst Mode'}, {value: 'Burst Mode X', label: 'Burst Mode X'},
        {value: 'Jogress', label: 'Jogress'}, {value: 'Jogress X', label: 'Jogress X'},
        {value: 'Armor', label: 'Armor'}, {value: 'Hybrid', label: 'Hybrid'},
        {value: 'Variant', label: 'Variant'}
    ];

    const familyChoices = [
        {value: 'Dark Area', label: 'Dark Area'}, {value: 'Deep Savers', label: 'Deep Savers'},
        {value: "Dragon's Roar", label: "Dragon's Roar"}, {value: 'Jungle Troopers', label: 'Jungle Troopers'},
        {value: 'Metal Empire', label: 'Metal Empire'}, {value: 'Nature Spirits', label: 'Nature Spirits'},
        {value: 'Nightmare Soldiers', label: 'Nightmare Soldiers'}, {value: 'Unknown', label: 'Unknown'},
        {value: 'Virus Busters', label: 'Virus Busters'}, {value: 'Wind Guardians', label: 'Wind Guardians'}
    ];

    const rankChoices = [
        {value: 'A', label: 'A'}, {value: 'A+', label: 'A+'}, {value: 'S', label: 'S'},
        {value: 'S+', label: 'S+'}, {value: 'SS', label: 'SS'}, {value: 'SS+', label: 'SS+'},
        {value: 'SSS', label: 'SSS'}, {value: 'SSS+', label: 'SSS+'}, {value: 'U', label: 'U'},
        {value: 'None', label: 'None'},
    ];

    const classChoices = [
        {value: 'AA', label: 'AA'}, {value: 'SK', label: 'SK'},
        {value: 'TA', label: 'TA'}, {value: 'SUP', label: 'SUP'},
        {value: 'None', label: 'None'},
    ];

    useEffect(() => {
        if (show) {
            axios.get('http://127.0.0.1:8000/api/digimons/').then(res => {
                setOptions(res.data.map(d => ({value: d.name, label: d.name})));
            });
        }
    }, [show]);

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

        // Temel String alanlar
        data.append('name', formData.name);
        data.append('attribute', formData.attribute);
        data.append('element', formData.element);
        data.append('form', formData.form);
        data.append('rank', formData.rank);
        data.append('digi_class', formData.digi_class);
        data.append('hatch', formData.hatch);
        data.append('size', formData.size);
        data.append('is_reborn', formData.is_reborn);

        if (imageFile) data.append('image', imageFile);

        const familiesData = selectedFamilies?.length > 0 ? selectedFamilies.map(f => f.value) : [];
        const evoFromData = selectedEvoFrom?.length > 0 ? selectedEvoFrom.map(e => e.value) : [];
        const evoToData = selectedEvoTo?.length > 0 ? selectedEvoTo.map(e => e.value) : [];

        data.append('families', JSON.stringify(familiesData));
        data.append('evo_from', JSON.stringify(evoFromData));
        data.append('evo_to', JSON.stringify(evoToData));

        const statsObj = {
            hp: parseInt(formData.hp) || 0,
            ds: parseInt(formData.ds) || 0,
            at: parseInt(formData.at) || 0,
            at_spd: parseFloat(formData.at_spd) || 0,
            ct: `${formData.ct || 0}%`,
            ht: parseInt(formData.ht) || 0,
            de: parseInt(formData.de) || 0,
            ev: `${formData.ev || 0}%`
        };
        data.append('stats', JSON.stringify(statsObj));

        console.log("Gönderilen Data:", Object.fromEntries(data.entries()));

        try {
            const res = await axios.post("http://127.0.0.1:8000/api/digimons/", data);

            if (res.status === 201) {
                console.log("Kayıt başarılı!");

                // 1. Modalı kapat (List'ten gelen doğru prop ismi handleClose)
                handleClose();

                // 2. Listeyi yenile (List'ten gelen doğru prop ismi refreshList)
                if (refreshList) {
                    refreshList();
                }

                // 3. Formu temizle
                // Not: initialState değişkenin tanımlı değilse manuel temizleyebilirsin
                setImagePreview(null);
                setImageFile(null);
            }
        } catch (err) {
            console.error("Hata detayı:", err.response?.data);
        }
    };

    if (!show) return null;

    return (
        <div className="modal d-block" style={{backgroundColor: 'rgba(0,0,0,0.85)'}}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content bg-dark text-white border-secondary shadow-lg">
                    <div className="modal-header border-secondary">
                        <h5 className="modal-title fw-light">Add New Digimon</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={handleClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body" style={{maxHeight: '75vh', overflowY: 'auto'}}>

                            {/* Image Upload & Preview Section */}
                            <div className="text-center mb-4">
                                <div
                                    className="d-inline-block position-relative border border-secondary rounded-3 bg-dark p-1"
                                    style={{width: '160px', height: '160px', overflow: 'hidden'}}>
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview"
                                             style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                                    ) : (
                                        <div
                                            className="h-100 d-flex align-items-center justify-content-center text-muted small">No
                                            Image</div>
                                    )}
                                </div>
                                <div className="mt-2">
                                    <input type="file" accept="image/*"
                                           className="form-control form-control-sm bg-secondary text-white border-0 w-50 mx-auto"
                                           onChange={handleImageChange}/>
                                </div>
                            </div>

                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label small">Name</label>
                                    <input type="text" className="form-control bg-secondary text-white border-0"
                                           onChange={e => setFormData({...formData, name: e.target.value})} required/>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label small">Attribute</label>
                                    <select className="form-select bg-secondary text-white border-0"
                                            onChange={e => setFormData({...formData, attribute: e.target.value})}>
                                        {attributeChoices.map(c => <option key={c.value}
                                                                           value={c.value}>{c.label}</option>)}
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label small">Element</label>
                                    <select className="form-select bg-secondary text-white border-0"
                                            onChange={e => setFormData({...formData, element: e.target.value})}>
                                        {elementChoices.map(c => <option key={c.value}
                                                                         value={c.value}>{c.label}</option>)}
                                    </select>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label small">Form</label>
                                    <select className="form-select bg-secondary text-white border-0"
                                            onChange={e => setFormData({...formData, form: e.target.value})}>
                                        {formChoices.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label small">Rank</label>
                                    <select className="form-select bg-secondary text-white border-0"
                                            onChange={e => setFormData({...formData, rank: e.target.value})}>
                                        {rankChoices.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label small">Class</label>
                                    <select className="form-select bg-secondary text-white border-0"
                                            onChange={e => setFormData({...formData, digi_class: e.target.value})}>
                                        {classChoices.map(c => <option key={c.value}
                                                                       value={c.value}>{c.label}</option>)}
                                    </select>
                                </div>

                                <div className="col-12">
                                    <label className="form-label small">Families (Multi-Select)</label>
                                    <Select isMulti options={familyChoices} onChange={setSelectedFamilies}
                                            className="text-dark"/>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label small">Evolved From</label>
                                    <Select isMulti options={options} onChange={setSelectedEvoFrom}
                                            className="text-dark"/>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small">Evolved To</label>
                                    <Select isMulti options={options} onChange={setSelectedEvoTo}
                                            className="text-dark"/>
                                </div>

                                <hr className="my-4 border-secondary opacity-25"/>
                                <h6 className="text-info fw-bold">Stat Values</h6>
                                {['hp', 'ds', 'at', 'at_spd', 'ct', 'ht', 'de', 'ev'].map(stat => (
                                    <div key={stat} className="col-md-3 col-6">
                                        <label className="small text-uppercase opacity-75">{stat}</label>
                                        <input type="number" step="0.01"
                                               className="form-control form-control-sm bg-secondary text-white border-0"
                                               onChange={e => setFormData({...formData, [stat]: e.target.value})}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer border-secondary">
                            <button type="button" className="btn btn-outline-light px-4" onClick={handleClose}>Cancel
                            </button>
                            <button type="submit" className="btn btn-info text-white fw-bold px-4">Save Digimon</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddDigimonModal;