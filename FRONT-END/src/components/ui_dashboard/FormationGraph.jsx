import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { mois: "Jan", formations: 2 },
  { mois: "Fév", formations: 7 },
  { mois: "Mar", formations: 3 },
  { mois: "Avr", formations: 6 },
  { mois: "Mai", formations: 4 },
  { mois: "Juin", formations: 4 },
  { mois: "Juil", formations: 7 },
  { mois: "Août", formations: 10 },
  { mois: "Sep", formations: 4 },
  { mois: "Oct", formations: 5 },
  { mois: "Nov", formations: 8 },
  { mois: "Déc", formations: 12 },
];

export default function FormationGraph() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 w-full h-87.5">
      <h2 className="font-bold text-lg mb-4">
        Formations (12 derniers mois)
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="mois" />

          <YAxis />

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
    </div>
  );
}