import React from 'react';
import {
  Radar, RadarChart, PolarGrid,
  PolarAngleAxis, ResponsiveContainer
} from 'recharts';

const DigimonStats = ({ digimon }) => {
  const { hp, ds, at, at_spd, ct, ht, de, ev } = digimon.stats || {};

  // --- 📈 Normalizasyon Mantığı ---
  // Statların grafik üzerinde dengeli durması için max değerler belirliyoruz
  const maxValues = { hp: 15000, ds: 5000, at: 5000, de: 2000, ht: 1000 };

  const chartData = [
    { subject: 'HP', value: (hp / maxValues.hp) * 100 },
    { subject: 'DS', value: (ds / maxValues.ds) * 100 },
    { subject: 'AT', value: (at / maxValues.at) * 100 },
    { subject: 'DE', value: (de / maxValues.de) * 100 },
    { subject: 'HT', value: (ht / maxValues.ht) * 100 },
  ];

  const statRows = [
    [ { label: 'HP', value: hp }, { label: 'DS', value: ds } ],
    [ { label: 'AT', value: at }, { label: 'AT_SPD', value: at_spd }, { label: 'DE', value: de } ],
    [ { label: 'CT', value: ct }, { label: 'HT', value: ht }, { label: 'EV', value: ev } ]
  ];

  return (
    <div className="p-4 rounded h-100" style={styles.container}>
      <h4 style={styles.title}>Stats</h4>
      <hr style={styles.hr} />

      {/* 🏛️ Stat Tablosu */}
      <div className="mb-4">
        {statRows.map((row, rIdx) => (
          <div key={rIdx} className="d-flex gap-2 mb-3">
            {row.map((stat, sIdx) => (
              <div key={sIdx} className="flex-fill">
                <label style={styles.label}>{stat.label}</label>
                <div style={styles.valueBox}>{stat.value ?? 0}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* 🕸️ Radar Chart */}
      <div style={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid stroke="#454d55" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#95a5a6', fontSize: 12 }} />
            <Radar
              name="Stats"
              dataKey="value"
              stroke="#f1c40f"
              fill="#f1c40f"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#1a1d21', border: '1px solid #2c3e50', color: '#fff' },
  title: { color: '#f1c40f', fontSize: '18px', fontWeight: 'bold' },
  hr: { borderColor: '#2d3436', margin: '10px 0 20px 0' },
  label: { fontSize: '11px', color: '#95a5a6', marginBottom: '4px', display: 'block' },
  valueBox: {
    backgroundColor: '#2d3436', padding: '10px', borderRadius: '6px',
    border: '1px solid #454d55', fontSize: '14px', fontWeight: 'bold'
  },
  chartWrapper: { marginTop: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '15px' }
};

export default DigimonStats;