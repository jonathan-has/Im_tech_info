import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { getStatsFormations } from '../../services/Graph/graphdash'; // Ajustez le chemin

export default function FormationGraph() {
  const [data, setData] = useState([]);
  const [chargement, setChargement] = useState(true);

  const chargerDonnees = async () => {
    const token = localStorage.getItem('token');
    const res = await getStatsFormations(token);

    if (res) {
      // Si la réponse est un objet contenant res.data, on prend res.data
      let tableauStats = [];
      
      if (Array.isArray(res)) {
        tableauStats = res;
      } else if (res.data && Array.isArray(res.data)) {
        tableauStats = res.data;
      } else if (res.data && res.data.data && Array.isArray(res.data.data)) {
        tableauStats = res.data.data;
      }

      setData(tableauStats);
    } else {
      setData([]);
    }

    setChargement(false);
  };

  useEffect(() => {
    chargerDonnees();
  }, []);

  let contenu = null;

  if (chargement) {
    contenu = (
      <div className="flex items-center justify-center h-full text-slate-500 font-medium">
        Chargement...
      </div>
    );
  } else if (!Array.isArray(data) || data.length === 0) {
    contenu = (
      <div className="flex items-center justify-center h-full text-slate-400 font-medium">
        Aucune donnée disponible.
      </div>
    );
  } else {
    contenu = (
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="mois" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="formations"
            stroke="#4F46E5"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 w-full h-80">
      <h2 className="font-bold text-lg mb-4 text-slate-800">
        Formations (12 derniers mois)
      </h2>
      {contenu}
    </div>
  );
}