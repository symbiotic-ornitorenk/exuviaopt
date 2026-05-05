import {ATTRIBUTE_COLORS, ELEMENT_COLORS, DEFAULT_COLOR} from '../../constants/DigimonConstants';
import {Link} from "react-router-dom";


const DigimonCard = ({digi, index, getElementColor, onEdit, onDelete}) => {

    const attrColor = ATTRIBUTE_COLORS[digi.attribute] || DEFAULT_COLOR;
    const elemColor = ELEMENT_COLORS[digi.element] || DEFAULT_COLOR;

    return (
        <div className="card h-100 border-0 shadow-sm text-center"
             style={{
                 width: '100%',     // Sabit bir px değeri varsa kaldır, %100 yap
                 minWidth: '180px', // Kartın aşırı ince olmasını engellemek için alt sınır
                 borderRadius: '15px',
                 overflow: 'hidden'
             }}>

            {/* Element Arka Planı */}
            <div style={{
                backgroundColor: elemColor,
                height: '160px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                padding: '10px'
            }}>
                {/* Link artık en dışta, görsel olsa da olmasa da çalışacak */}
                <Link
                    to={`/digimon/${digi.id}`}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        textDecoration: 'none'
                    }}
                >
                    {digi.image ? (
                        <img
                            src={digi.image}
                            alt={digi.name}
                            className="hover:opacity-90 transition-opacity cursor-pointer"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain'
                            }}
                        />
                    ) : (
                        /* Görsel yoksa ismini bir fallback olarak gösteriyoruz */
                        <span className="text-white fw-bold text-center px-2">
                {digi.name}
            </span>
                    )}
                </Link>
            </div>

            <div className="card-body text-center p-2 bg-white">
                <h6 className="mb-2 fw-bold text-dark text-truncate" style={{fontSize: '0.9rem'}}>{digi.name}</h6>

                <div className="d-flex flex-column gap-1 mb-2">
                    {/* Attribute Badge */}
                    <div style={{
                        backgroundColor: `${attrColor}20`,
                        color: attrColor,
                        border: `1.5px solid ${attrColor}`,
                        fontSize: '0.75rem', borderRadius: '4px', fontWeight: 'bold'
                    }} className="py-1">
                        {digi.attribute.toUpperCase()}
                    </div>

                    {/* Element Badge */}
                    <div style={{
                        backgroundColor: elemColor,
                        color: '#fff',
                        fontSize: '0.75rem', borderRadius: '4px', fontWeight: 'bold'
                    }} className="py-1">
                        {digi.element.toUpperCase()}
                    </div>
                </div>

                <div className="py-1 border rounded bg-success shadow-sm">
                    <small className="fw-bold" style={{fontSize: '0.85rem', color: '#fff',}}>{digi.form}</small>
                </div>
            </div>

            <div className="d-flex border-top mt-auto">
                <button className="btn btn-warning btn-sm w-100 rounded-0 border-end fw-bold"
                        style={{fontSize: '0.75rem', padding: '8px 0'}} onClick={() => onEdit(digi.id)}>Edit
                </button>
                <button className="btn btn-danger btn-sm w-100 rounded-0 fw-bold"
                        style={{fontSize: '0.75rem', padding: '8px 0'}}
                        onClick={() => onDelete(digi.id, digi.name)}>Delete
                </button>
            </div>
        </div>
    );
};

export default DigimonCard;