import { useEffect, useState } from "react";
import apiurl from "../../apiurl/apiurl";
import fetchData from "../../utils/fetchData";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

export default function DonationDetails() {
  const { memberID } = useParams();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `${apiurl.mainUrl}/subscription/member/${memberID}`;
    const fetchDataFromApi = async () => {
      setLoading(true);
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const result = await fetchData(url, config);
        if (result?.success === true) {
          setDonations(result?.data);
        }
        if (result?.success === false) {
          toast.error(result?.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDataFromApi();
  }, [memberID]);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-4">
        Loading donation details...
      </div>
    );
  }

  if (!donations || donations.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No donation details available.
      </div>
    );
  }

  return (
    <div className="mx-4 my-6">
      <h2 className="text-xl font-bold text-center mb-6">Donation Details</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-4 py-2">Index</th>
              <th className="border px-4 py-2">Member ID</th>
              <th className="border px-4 py-2">Full Name</th>
              <th className="border px-4 py-2">Deposit Date</th>
              <th className="border px-4 py-2">Deposit Month</th>
              <th className="border px-4 py-2">Deposit Year</th>
              <th className="border px-4 py-2">Monthly Fee</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Updated By</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, index) => (
              <tr key={donation._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2">{donation.member.memberID}</td>
                <td className="border px-4 py-2">{donation.member.fullName}</td>
                <td className="border px-4 py-2">
                  {new Date(donation.depositeDate).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">{donation.depositeMonth}</td>
                <td className="border px-4 py-2">{donation.depositeYear}</td>
                <td className="border px-4 py-2">${donation.monthlyFee}</td>
                <td
                  className={`border px-4 py-2 text-center ${
                    donation.status === "paid"
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }`}
                >
                  {donation.status.charAt(0).toUpperCase() +
                    donation.status.slice(1)}
                </td>
                <td className="border px-4 py-2">
                  {donation.updatedBy.username}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
