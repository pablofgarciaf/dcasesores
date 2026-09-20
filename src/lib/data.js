// ============================================================
// TASAS POR DEFECTO — Fuente: Google Sheets del cliente
// Estructura: { [ASEGURADORA]: [{ producto, ciudad, vehiculo, desde, hasta, tasa, rc }] }
// ============================================================

export const defaultTasas = {
  ALIANZA: [
    { producto: 'TODORIESGO', ciudad: 'QUITO', vehiculo: 'LIVIANO', desde: 0, hasta: 10000, tasa: 3.5, rc: 200 },
    { producto: 'TODORIESGO', ciudad: 'QUITO', vehiculo: 'LIVIANO', desde: 10001, hasta: 20000, tasa: 3.2, rc: 300 },
    { producto: 'TODORIESGO', ciudad: 'QUITO', vehiculo: 'LIVIANO', desde: 20001, hasta: 30000, tasa: 3.0, rc: 400 },
    { producto: 'TODORIESGO', ciudad: 'GUAYAQUIL', vehiculo: 'LIVIANO', desde: 0, hasta: 10000, tasa: 3.8, rc: 200 },
    { producto: 'TODORIESGO', ciudad: 'GUAYAQUIL', vehiculo: 'LIVIANO', desde: 10001, hasta: 20000, tasa: 3.5, rc: 300 },
    { producto: 'TERCEROS', ciudad: 'QUITO', vehiculo: 'LIVIANO', desde: 0, hasta: 99999, tasa: 1.5, rc: 150 },
    { producto: 'TERCEROS', ciudad: 'GUAYAQUIL', vehiculo: 'LIVIANO', desde: 0, hasta: 99999, tasa: 1.7, rc: 150 },
  ],
  LATINA: [
    { producto: 'TODORIESGO', ciudad: 'QUITO', vehiculo: 'LIVIANO', desde: 0, hasta: 10000, tasa: 3.3, rc: 180 },
    { producto: 'TODORIESGO', ciudad: 'QUITO', vehiculo: 'LIVIANO', desde: 10001, hasta: 25000, tasa: 3.0, rc: 280 },
    { producto: 'TODORIESGO', ciudad: 'QUITO', vehiculo: 'SUV', desde: 0, hasta: 30000, tasa: 3.6, rc: 350 },
    { producto: 'TODORIESGO', ciudad: 'GUAYAQUIL', vehiculo: 'LIVIANO', desde: 0, hasta: 15000, tasa: 3.6, rc: 200 },
    { producto: 'TERCEROS', ciudad: 'QUITO', vehiculo: 'LIVIANO', desde: 0, hasta: 99999, tasa: 1.4, rc: 140 },
  ],
  HISPANA: [
    { producto: 'TODORIESGO', ciudad: 'QUITO', vehiculo: 'LIVIANO', desde: 0, hasta: 8000, tasa: 3.8, rc: 200 },
    { producto: 'TODORIESGO', ciudad: 'QUITO', vehiculo: 'LIVIANO', desde: 8001, hasta: 15000, tasa: 3.5, rc: 300 },
    { producto: 'TODORIESGO', ciudad: 'QUITO', vehiculo: 'LIVIANO', desde: 15001, hasta: 30000, tasa: 3.2, rc: 400 },
    { producto: 'TODORIESGO', ciudad: 'GUAYAQUIL', vehiculo: 'LIVIANO', desde: 0, hasta: 15000, tasa: 4.0, rc: 220 },
    { producto: 'TERCEROS', ciudad: 'NACIONAL', vehiculo: 'LIVIANO', desde: 0, hasta: 99999, tasa: 1.6, rc: 160 },
  ],
  VAZ: [
    { producto: 'TODORIESGO', ciudad: 'QUITO', vehiculo: 'LIVIANO', desde: 0, hasta: 12000, tasa: 3.4, rc: 190 },
    { producto: 'TODORIESGO', ciudad: 'QUITO', vehiculo: 'LIVIANO', desde: 12001, hasta: 25000, tasa: 3.1, rc: 290 },
    { producto: 'TODORIESGO', ciudad: 'GUAYAQUIL', vehiculo: 'LIVIANO', desde: 0, hasta: 12000, tasa: 3.7, rc: 210 },
    { producto: 'TERCEROS', ciudad: 'NACIONAL', vehiculo: 'LIVIANO', desde: 0, hasta: 99999, tasa: 1.5, rc: 145 },
  ],
  PRIVILEGIO: [
    { producto: 'TODORIESGO', ciudad: 'QUITO', vehiculo: 'LIVIANO', desde: 0, hasta: 10000, tasa: 3.2, rc: 175 },
    { producto: 'TODORIESGO', ciudad: 'QUITO', vehiculo: 'LIVIANO', desde: 10001, hasta: 20000, tasa: 2.9, rc: 275 },
    { producto: 'TODORIESGO', ciudad: 'QUITO', vehiculo: 'LIVIANO', desde: 20001, hasta: 40000, tasa: 2.7, rc: 375 },
    { producto: 'TODORIESGO', ciudad: 'QUITO', vehiculo: 'SUV', desde: 0, hasta: 40000, tasa: 3.1, rc: 350 },
    { producto: 'TODORIESGO', ciudad: 'GUAYAQUIL', vehiculo: 'LIVIANO', desde: 0, hasta: 20000, tasa: 3.5, rc: 200 },
    { producto: 'TERCEROS', ciudad: 'NACIONAL', vehiculo: 'LIVIANO', desde: 0, hasta: 99999, tasa: 1.3, rc: 130 },
  ],
  MAPFRE: [
    { producto: 'TODORIESGO', ciudad: 'QUITO', vehiculo: 'LIVIANO', desde: 0, hasta: 15000, tasa: 3.6, rc: 350 },
    { producto: 'TODORIESGO', ciudad: 'QUITO', vehiculo: 'LIVIANO', desde: 15001, hasta: 30000, tasa: 3.3, rc: 400 },
    { producto: 'TODORIESGO', ciudad: 'GUAYAQUIL', vehiculo: 'LIVIANO', desde: 0, hasta: 20000, tasa: 3.8, rc: 350 },
  ],
  ZURICH: [
    { producto: 'TODORIESGO', ciudad: 'QUITO', vehiculo: 'LIVIANO', desde: 0, hasta: 15000, tasa: 3.7, rc: 400 },
    { producto: 'TODORIESGO', ciudad: 'QUITO', vehiculo: 'LIVIANO', desde: 15001, hasta: 30000, tasa: 3.4, rc: 450 },
    { producto: 'TODORIESGO', ciudad: 'GUAYAQUIL', vehiculo: 'LIVIANO', desde: 0, hasta: 20000, tasa: 3.9, rc: 400 },
  ],
  ATLANTIDA: [
    { producto: 'TODORIESGO', ciudad: 'QUITO', vehiculo: 'LIVIANO', desde: 0, hasta: 15000, tasa: 3.8, rc: 250 },
    { producto: 'TODORIESGO', ciudad: 'QUITO', vehiculo: 'LIVIANO', desde: 15001, hasta: 30000, tasa: 3.5, rc: 300 },
    { producto: 'TODORIESGO', ciudad: 'GUAYAQUIL', vehiculo: 'LIVIANO', desde: 0, hasta: 20000, tasa: 3.9, rc: 250 },
  ],
  SWEADEN: [
    { producto: 'TODORIESGO', ciudad: 'QUITO', vehiculo: 'LIVIANO', desde: 0, hasta: 15000, tasa: 3.75, rc: 300 },
    { producto: 'TODORIESGO', ciudad: 'QUITO', vehiculo: 'LIVIANO', desde: 15001, hasta: 30000, tasa: 3.45, rc: 350 },
  ],
  BMI: [
    { producto: 'TODORIESGO', ciudad: 'QUITO', vehiculo: 'LIVIANO', desde: 0, hasta: 15000, tasa: 3.9, rc: 400 },
    { producto: 'TODORIESGO', ciudad: 'QUITO', vehiculo: 'LIVIANO', desde: 15001, hasta: 30000, tasa: 3.5, rc: 500 },
  ],
};
