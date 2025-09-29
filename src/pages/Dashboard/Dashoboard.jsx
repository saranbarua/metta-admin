import RoleWiseUser from "./Charts/RoleWiseUser";

export default function Dashoboard() {
  return (
    <>
      <div className="grid lg:grid-flow-col gap-3  bg-gray-50 lg:p-6 rounded-lg">
        <div className="flex-1 bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <svg
                className="w-8 h-8 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c.827 0 1.5.673 1.5 1.5s-.673 1.5-1.5 1.5-1.5-.673-1.5-1.5S11.173 8 12 8zm-4 5c1.333 0 2.667 0 4 0 1.333 0 2.667 0 4 0M4 12v4m16-4v4m-6-5c.928-.073 1.864.073 2.75.39"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-500">Total Members</p>
              <p className="text-2xl font-bold text-blue-600">1000</p>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <svg
                className="w-8 h-8 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2h-5l-4 4-4-4H5a2 2 0 01-2-2V3z"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-500">Total Subscriptions</p>
              <p className="text-2xl font-bold text-blue-600">546</p>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <svg
                className="w-8 h-8 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 11l7-7m0 0l7 7M5 11v10a2 2 0 002 2h10a2 2 0 002-2V11M7 11V9m10 2V9m-5 5V9"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-500">Subscriptions Activated Member</p>
              <p className="text-2xl font-bold text-blue-600">10</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-flow-col gap-3 bg-gray-50 p-6 rounded-lg">
        {/* <!-- Report Section --> */}
        <div className="flex-1 bg-white rounded-lg shadow p-6">
          <div className="flex justify-center items-center ">
            <RoleWiseUser />
          </div>
        </div>
      </div>
    </>
  );
}
