export default calculateCarbon = (material, volume) => {
  const materials = Object.keys(db);
  const dbMaterial = db[materials.find((dbMaterial) => material === dbMaterial)];
  if (!dbMaterial) {
    return 0;
  } else {
    return dbMaterial.density * volume * dbMaterial.kgCO2e;
  }
};

const db = {
  Aluminium: {
    density: 2700,
    kgCO2e: 9.16,
  },
  Concrete: {
    density: 2400,
    kgCO2e: 0.12,
  },
  Steel: {
    density: 7800,
    kgCO2e: 1.46,
  },
  Timber: {
    density: 650,
    kgCO2e: 0.72,
  },
};
