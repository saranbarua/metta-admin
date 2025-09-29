import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJs.register(ArcElement, Tooltip, Legend);
export default function RoleWiseUser() {
  const data = {
    labels: ["All admin", "Admin", "Moderator"],
    datasets: [
      {
        // label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className="mx-auto">
      <Doughnut data={data} className="p-10" />
    </div>
  );
}
