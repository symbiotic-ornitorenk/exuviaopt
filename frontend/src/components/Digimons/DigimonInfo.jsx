import React from 'react';

const DigimonInfo = ({digimon}) => {
    // --- 🎨 Dinamik Stil Yardımcıları ---

    const getAttrStyle = (attr) => {
        const colors = {"Vaccine": "#2ecc71", "Data": "#3498db", "Virus": "#e74c3c", "UN": "#2c3e50"};
        const color = colors[attr] || "#95a5a6";
        return {color, bg: `${color}15`, border: `1px solid ${color}44`};
    };

    const getRankStyle = (rank) => {
        let color = "#95a5a6";
        if (['A', 'A+'].includes(rank)) color = '#2ecc71';
        else if (['S', 'S+'].includes(rank)) color = '#3498db';
        else if (['SS', 'SS+'].includes(rank)) color = '#9b59b6';
        else if (['SSS', 'SSS+'].includes(rank)) color = '#f1c40f';
        else if (rank === 'U') color = '#e74c3c';
        return {color, bg: `${color}15`, border: `1px solid ${color}44`};
    };

    const getClassStyle = (dClass) => {
        const colors = {'AA': '#ff4d4d', 'SK': '#26de81', 'TA': '#a5b1c2', 'SUP': '#8854d0'};
        const color = colors[dClass] || "#95a5a6";
        return {color, bg: `${color}15`, border: `1px solid ${color}44`};
    };

    const getFormStyle = (form) => {
        const colors = {
            'Rookie': '#d1d8e0', 'Rookie X': '#d1d8e0',
            'Champion': '#45aaf2', 'Champion X': '#45aaf2',
            'Ultimate': '#a55eea', 'Ultimate X': '#a55eea',
            'Mega': '#eb3b5a', 'Mega X': '#eb3b5a',
            'Burst Mode': '#fa8231', 'Burst Mode X': '#fa8231',
            'Jogress': '#fd9644', 'Jogress X': '#fd9644',
            'Hybrid': '#20bf6b', 'Variant': '#2bcbba', 'Armor': '#4b7bec'
        };
        const color = colors[form] || '#ffffff';
        // X-Antibody formları için ufak bir görsel fark (kesikli border)
        const isX = form?.includes('X');
        return {
            color,
            bg: `${color}15`,
            border: `${isX ? '1px dashed' : '1px solid'} ${color}66`
        };
    };

    const familyConfig = {
        "Dark Area": {short: "DA", color: "#4b134f"}, "Deep Savers": {short: "DS", color: "#1e3799"},
        "Dragon's Roar": {short: "DR", color: "#b71540"}, "Jungle Troopers": {short: "JT", color: "#079992"},
        "Metal Empire": {short: "ME", color: "#3c6382"}, "Nature Spirits": {short: "NSP", color: "#38ada9"},
        "Nightmare Soldiers": {short: "NSO", color: "#0a3d62"}, "Unknown": {short: "UN", color: "#000000"},
        "Virus Busters": {short: "VB", color: "#e67e22"}, "Wind Guardians": {short: "WG", color: "#82ccdd"}
    };

    const attrS = getAttrStyle(digimon.attribute);
    const rankS = getRankStyle(digimon.rank);
    const classS = getClassStyle(digimon.digi_class);
    const formS = getFormStyle(digimon.form);

    return (
        <div className="col-md-4" style={styles.card}>
            {/* İsim ve Yıldız */}
            <div style={styles.header}>
                <h2 style={styles.nameText}>{digimon.name}</h2>
                <span style={digimon.is_reborn === "True" ? styles.activeStar : styles.passiveStar}>
          {digimon.is_reborn === "True" ? "★" : "☆"}
        </span>
            </div>

            {/* Görsel */}
            <div style={styles.imgWrapper}>
                <img src={digimon.image} alt={digimon.name} style={styles.img}/>
            </div>

            <div style={styles.infoStack}>
                {/* Satır 1: Attribute & Element */}
                <div style={styles.row}>
                    <div style={styles.fieldBox}>
                        <span style={styles.label}>Attribute</span>
                        <span style={{
                            ...styles.badge,
                            color: attrS.color,
                            backgroundColor: attrS.bg,
                            border: attrS.border
                        }}>
              {digimon.attribute}
            </span>
                    </div>
                    <div style={styles.fieldBox}>
                        <span style={styles.label}>Element</span>
                        <span style={styles.badge}>{digimon.element}</span>
                    </div>
                </div>

                {/* Satır 2: Families */}
                <div style={styles.familySection}>
                    <span style={styles.label}>Families</span>
                    <div style={styles.familyGrid}>
                        {digimon.families?.map((f, i) => (
                            <span key={i} title={f}
                                  style={{...styles.fBadge, backgroundColor: familyConfig[f]?.color || "#57606f"}}>
                {familyConfig[f]?.short || f}
              </span>
                        ))}
                    </div>
                </div>

                {/* Satır 3: Form, Rank, Class */}
                <div style={styles.row}>
                    <div style={styles.fieldBox}>
                        <span style={styles.label}>Form</span>
                        <span style={{
                            ...styles.badge,
                            color: formS.color,
                            backgroundColor: formS.bg,
                            border: formS.border
                        }}>
              {digimon.form}
            </span>
                    </div>
                    <div style={styles.fieldBox}>
                        <span style={styles.label}>Rank</span>
                        <span style={{
                            ...styles.badge,
                            color: rankS.color,
                            backgroundColor: rankS.bg,
                            border: rankS.border
                        }}>
              {digimon.rank || "None"}
            </span>
                    </div>
                    <div style={styles.fieldBox}>
                        <span style={styles.label}>Class</span>
                        <span style={{
                            ...styles.badge,
                            color: classS.color,
                            backgroundColor: classS.bg,
                            border: classS.border
                        }}>
              {digimon.digi_class || "None"}
            </span>
                    </div>
                </div>

                {/* Satır 4: Hatch & Size */}
                <div style={styles.row}>
                    <div style={styles.fieldBox}>
                        <span style={styles.label}>Hatch</span>
                        <span style={styles.valueText}>{digimon.hatch}/5</span>
                    </div>
                    <div style={styles.fieldBox}>
                        <span style={styles.label}>Size</span>
                        <span style={styles.valueText}>{digimon.size}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    card: {
        backgroundColor: '#1a1d21',
        borderRadius: '15px',
        padding: '20px',
        border: '1px solid #2c3e50',
        color: '#fff',
        // 🛡️ Büzülmeyi önleyen kritik satırlar:
        minWidth: '320px',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    header: {display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '15px'},
    nameText: {fontSize: '22px', fontWeight: 'bold', textTransform: 'uppercase', margin: 0},
    activeStar: {color: '#f1c40f', fontSize: '24px', textShadow: '0 0 10px rgba(241, 196, 15, 0.5)'},
    passiveStar: {color: '#454d55', fontSize: '24px'},
    imgWrapper: {height: '220px', display: 'flex', justifyContent: 'center', marginBottom: '20px'},
    img: {maxHeight: '100%', maxWidth: '100%', objectFit: 'contain'},
    infoStack: {display: 'flex', flexDirection: 'column', gap: '10px'},
    row: {display: 'flex', gap: '10px', justifyContent: 'space-between'},
    fieldBox: {
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '8px', border: '1px solid #2d3436', borderRadius: '10px', backgroundColor: '#1e2124'
    },
    label: {fontSize: '10px', color: '#95a5a6', textTransform: 'uppercase', marginBottom: '5px', letterSpacing: '0.5px'},
    badge: {padding: '3px 8px', borderRadius: '5px', fontSize: '12px', fontWeight: 'bold', textAlign: 'center'},
    valueText: {fontSize: '13px', fontWeight: 'bold'},
    familySection: {
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '10px', border: '1px solid #2d3436', borderRadius: '10px', backgroundColor: '#1e2124'
    },
    familyGrid: {display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '5px'},
    fBadge: {padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', color: '#fff'}
};

export default DigimonInfo;