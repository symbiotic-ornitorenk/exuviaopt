import React from 'react';
import { Link } from 'react-router-dom';

const DigimonEvolutions = ({ activeDigimon, evoMap }) => {
  if (!activeDigimon || !evoMap) return null;

  const getDigimon = (name) => {
    const key = Object.keys(evoMap).find(k => k.toLowerCase() === name.toLowerCase());
    return key ? evoMap[key] : null;
  };

  const getLevels = (names, dir, levels = []) => {
    if (!names || names.length === 0) return levels;
    const currentLevelNodes = names.map(name => getDigimon(name)).filter(Boolean);
    const nextNames = currentLevelNodes.flatMap(d => (dir === 'past' ? d.evo_from : d.evo_to) || []);
    const newLevels = dir === 'past' ? [currentLevelNodes, ...levels] : [...levels, currentLevelNodes];
    return getLevels(nextNames, dir, newLevels);
  };

  const pastLevels = getLevels(activeDigimon.evo_from, 'past');
  const futureLevels = getLevels(activeDigimon.evo_to, 'future');
  const allLevels = [...pastLevels, [activeDigimon], ...futureLevels];

  return (
    <div style={styles.outerContainer}>
      {/* 🧬 BAŞLIK BÖLÜMÜ */}
      <div style={styles.headerContainer}>
        <span style={styles.dnaIcon}>🧬</span>
        <h2 style={styles.headerTitle}>Evolution Line</h2>
        <span style={styles.dnaIcon}>🧬</span>
      </div>

      <div style={styles.scrollContainer}>
        <style>{`
          .digimon-node {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            cursor: pointer;
            text-decoration: none;
          }
          .digimon-node:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
          }
          .digimon-node:active {
            transform: scale(0.95);
          }
        `}</style>

        <div style={styles.treeWrapper}>
          {allLevels.map((levelNodes, colIndex) => (
            <React.Fragment key={colIndex}>
              <div style={styles.column}>
                {levelNodes.map((d, nodeIndex) => {
                  const isActive = d.id === activeDigimon.id;
                  return (
                    <Link
                      key={nodeIndex}
                      to={`/digimon/${d.id}`}
                      className="digimon-node"
                      style={isActive ? styles.activeNode : styles.node}
                    >
                      <div style={styles.imageContainer}>
                        <img src={d.image} alt={d.name} style={styles.img} />
                      </div>
                      <p style={styles.name}>{d.name}</p>
                    </Link>
                  );
                })}
              </div>

              {colIndex < allLevels.length - 1 && (
                <div style={styles.arrowContainer}>
                  <span style={styles.arrowText}>{`=>`}</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  outerContainer: {
    backgroundColor: '#0f1418',
    padding: '20px',
    borderRadius: '20px',
    margin: '10px 0',
    border: '1px solid #2c3e50'
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '20px'
  },
  headerTitle: {
    color: '#3498db',
    fontSize: '22px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    margin: 0,
    textShadow: '0 0 10px rgba(52, 152, 219, 0.4)'
  },
  dnaIcon: { fontSize: '24px' },

  // 📉 Yüksekliği optimize edilmiş alan
  scrollContainer: {
    overflowX: 'auto',
    padding: '10px 0',
    display: 'flex',
    justifyContent: 'center'
  },

  treeWrapper: { display: 'flex', alignItems: 'center', gap: '10px' },
  column: { display: 'flex', flexDirection: 'column', gap: '15px', justifyContent: 'center' },

  node: {
    width: '110px', height: '145px', background: '#1e272e', borderRadius: '12px',
    border: '2px solid #3d3d3d', display: 'flex', flexDirection: 'column', padding: '8px', boxSizing: 'border-box'
  },

  activeNode: {
    width: '130px', height: '175px', background: '#1e272e', borderRadius: '15px',
    border: '3px solid #3498db', display: 'flex', flexDirection: 'column', padding: '10px',
    boxSizing: 'border-box', boxShadow: '0 0 20px rgba(52, 152, 219, 0.3)', zIndex: 10
  },

  imageContainer: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  img: { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' },
  name: { fontSize: '10px', color: '#fff', textAlign: 'center', marginTop: '5px', fontWeight: '600', textDecoration: 'none' },

  arrowContainer: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '35px' },
  arrowText: { fontSize: '18px', color: '#3498db', fontWeight: 'bold' }
};

export default DigimonEvolutions;