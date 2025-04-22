import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaUsers, FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// StatCard component for reusable stats
const StatCard = ({ title, value, icon: Icon, color = "#FF851B" }) => (
  <div
    className="bg-white rounded-2xl shadow p-5 flex items-center justify-between border border-gray-200"
    style={{ borderTop: `4px solid ${color}` }}
  >
    <div>
      <p className="text-lg text-gray-600">{title}</p>
      <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
    </div>
    <Icon size={30} color={color} />
  </div>
);

// ChartContainer for consistent chart styling
const ChartContainer = ({ title, children, isLoading = false }) => (
  <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
    <h2 className="text-xl font-semibold mb-4 text-[#FF851B]">{title}</h2>
    {isLoading ? (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading chart data...</p>
      </div>
    ) : (
      children
    )}
  </div>
);

export default function AnalyticPage() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all necessary data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch orders and users in parallel
        const [ordersResponse, usersResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_APP_API}/api/v1/order/all-orders`),
          axios.get(
            `${import.meta.env.VITE_APP_API}/api/v1/auth/get-all-users`
          ),
        ]);

        setOrders(ordersResponse.data?.orders || []);
        setUsers(usersResponse.data?.users || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load analytics data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate metrics
  const metrics = {
    totalUsers: users.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((total, order) => {
      const orderTotal = order.products.reduce((sum, product) => {
        return sum + (product.price); // or quantity
      }, 0);
      return total + orderTotal;
    }, 0),
  };
  
  // Process data for charts
  const getChartData = () => {
    // Line chart data - visitors (using users as dummy data)
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentMonth = new Date().getMonth();
    const lineLabels = months.slice(
      Math.max(0, currentMonth - 4),
      currentMonth + 1
    );

    // Simulate visitor growth
    const lineDataValues = lineLabels.map((_, i) => {
      const base = 100 * (i + 1);
      return base + Math.floor(Math.random() * 200);
    });

    // Bar chart data - daily revenue
    const dailyRevenue = orders.reduce((acc, order) => {
      const date = new Date(order.createdAt).toLocaleDateString();
      acc[date] = (acc[date] || 0) + order.totalAmount;
      return acc;
    }, {});

    const sortedDates = Object.keys(dailyRevenue).sort(
      (a, b) => new Date(a) - new Date(b)
    );
    const last7Dates = sortedDates.slice(-7); // Show last 7 days by default

    return {
      lineData: {
        labels: lineLabels,
        datasets: [
          {
            label: "Visitors",
            data: lineDataValues,
            borderColor: "#FF851B",
            backgroundColor: "rgba(255, 133, 27, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      barData: {
        labels: last7Dates,
        datasets: [
          {
            label: "Revenue ($)",
            data: last7Dates.map((date) => dailyRevenue[date]),
            backgroundColor: "rgba(255, 133, 27, 0.7)",
            borderColor: "#FF851B",
            borderWidth: 1,
          },
        ],
      },
    };
  };

  const { lineData, barData } = getChartData();

  if (error) {
    return (
      <div className="p-6 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#FF851B] text-white rounded hover:bg-[#E76F00]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-[#FF851B] mb-6">
        Analytics Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={metrics.totalUsers}
          icon={FaUsers}
        />
        <StatCard
          title="Total Orders"
          value={metrics.totalOrders}
          icon={FaShoppingCart}
        />
        <StatCard
          title="Total Revenue"
          value={`$${metrics.totalRevenue.toFixed(2)}` || 0}
          icon={FaMoneyBillWave}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Visitors Trend" isLoading={isLoading}>
          <Line
            data={lineData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
              },
            }}
          />
        </ChartContainer>

        <ChartContainer
          title="Recent Revenue"
          isLoading={isLoading || orders.length === 0}
        >
          {orders.length > 0 ? (
            <Bar
              data={barData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => `$${value}`,
                    },
                  },
                },
              }}
            />
          ) : (
            <p className="text-gray-500">No order data available</p>
          )}
        </ChartContainer>
      </div>
    </div>
  );
}
