import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { createSpace, fetchParkings, updateSpace } from "../api/api";
import "./../css/createParking.scss";

const SpaceForm = () => {
  const { state } = useLocation();
  const user = useSelector((state) => state.user);

  // Create a form object for storing values
  const [form, setForm] = useState({
    name: "",
    date: "",
    slot_start_time: "",
    slot_end_time: "",
    price: "",
    parking_id: "",
  });

  const [successMessage, setSuccessMessage] = useState();
  const [error, setError] = useState();

  const time = [
    "12:00am",
    "2:00am",
    "4:00am",
    "6:00am",
    "8:00am",
    "10:00am",
    "12:00pm",
    "2:00pm",
    "4:00pm",
    "6:00pm",
    "8:00pm",
    "10:00pm",
  ];

  // Handles form values upon change
  const handleFormChange = ({ key, value }) => {
    setForm({ ...form, [key]: value });
  };

  const handleCreateSpace = () => {
    setSuccessMessage();
    setError();

    const body = { ...form, user_id: user?._id };
    createSpace({ body, handleCreateSpaceSuccess, handleCreateSpaceFailure });
  };

  const handleCreateSpaceSuccess = (data) => {
    setSuccessMessage("Created successfully!");
  };

  const handleCreateSpaceFailure = (error) => {
    setError(error);
  };

  const [parkings, setParkings] = useState();

  useEffect(() => {
    // Space List API sets parkings state using setParkings passed as callback function
    fetchParkings({ user_id: user?._id, setParkings });
  }, []);

  // Edit space API
  const handleUpdateSpace = () => {
    setSuccessMessage();
    setError();

    const body = { ...form };
    updateSpace({
      id: state?.space?._id,
      body,
      handleUpdateSpaceSuccess,
      handleUpdateSpaceFailure,
    });
  };

  const handleUpdateSpaceSuccess = (data) => {
    setSuccessMessage("Updated successfully!");
  };

  const handleUpdateSpaceFailure = (error) => {
    setError(error);
  };

  const handleSubmit = () => {
    if (state?.space) {
      handleUpdateSpace();
    } else {
      handleCreateSpace();
    }
  };

  useEffect(() => {
    setForm({
      name: state?.space?.name,
      date: state?.space?.date,
      slot_start_time: state?.space?.slot_start_time,
      slot_end_time: state?.space?.slot_end_time,
      price: state?.space?.price,
      parking_id: state?.space?.parking_id,
    });
  }, [state]);

  return (
    <div className="container py-5">
      <div className="card create-parking-card p-5">
        <h3 className="mb-4">Create space</h3>
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form?.name}
            onChange={(e) =>
              handleFormChange({ key: "name", value: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={form?.date}
            onChange={(e) =>
              handleFormChange({ key: "date", value: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="slot_start_time" className="form-label">
            Slot start time
          </label>
          <select
            className="form-select"
            value={form?.slot_start_time}
            onChange={(e) =>
              handleFormChange({
                key: "slot_start_time",
                value: e.target.value,
              })
            }
          >
            <option value="">Slot start time</option>
            {time?.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="slot_end_time" className="form-label">
            Slot end time
          </label>
          <select
            className="form-select"
            value={form?.slot_end_time}
            onChange={(e) =>
              handleFormChange({ key: "slot_end_time", value: e.target.value })
            }
          >
            <option value="">Select</option>
            {time?.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="text"
            className="form-control"
            id="price"
            value={form?.price}
            onChange={(e) =>
              handleFormChange({ key: "price", value: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="parking" className="form-label">
            Parking
          </label>
          <select
            className="form-select"
            value={form?.parking_id}
            onChange={(e) =>
              handleFormChange({ key: "parking_id", value: e.target.value })
            }
          >
            <option value="">Select</option>
            {parkings?.map((item) => (
              <option value={item?._id}>{item?.name}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-4"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SpaceForm;
//
//
//
//
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { deleteSpace, fetchSpaces } from "../api/api";
// import { DeleteModal, SpaceCard } from "../components";
// import _ from "lodash"; // Import lodash for debouncing
// import "./../css/parking.scss";

// const SpaceForm = () => {
//   const user = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const [spaces, setSpaces] = useState([]);
//   const time = [
//     "12:00am",
//     "2:00am",
//     "4:00am",
//     "6:00am",
//     "8:00am",
//     "10:00am",
//     "12:00pm",
//     "2:00pm",
//     "4:00pm",
//     "6:00pm",
//     "8:00pm",
//     "10:00pm",
//   ];

//   const [searchForm, setSearchForm] = useState({
//     city: "",
//     price: "",
//     date: "",
//     time: "",
//     availability: false,
//   });

//   // Delete management states
//   const [selectedSpace, setSelectedSpace] = useState();
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   // Debounce the fetchSpaces function
//   const debouncedFetchSpaces = _.debounce(fetchSpaces, 500);

//   useEffect(() => {
//     // Fetch spaces with debounce
//     debouncedFetchSpaces({
//       user_id: user?._id,
//       parking_id: state?.parking?._id,
//       setSpaces,
//       ...searchForm,
//     });
//   }, [state, searchForm, user, debouncedFetchSpaces]);

//   const spaceCards = () => {
//     console.log("spaces", spaces); // Add this line
//     const filteredSpaces = spaces.filter((item) => {
//       const spaceCity = item?.parking_id?.city || ""; // Replace with your actual data structure
//       return spaceCity.toLowerCase().includes(searchForm.city.toLowerCase());
//     });

//     return filteredSpaces.map((item, index) => (
//       <div className="col-md-4" key={index}>
//         <SpaceCard
//           space={item}
//           onBooking={() => navigate("/bookingForm", { state: { space: item } })}
//           setSelectedSpace={setSelectedSpace}
//           setShowDeleteModal={setShowDeleteModal}
//         />
//       </div>
//     ));
//   };

//   const handleSearchForm = ({ key, value }) => {
//     setSearchForm({ ...searchForm, [key]: value });
//     console.log("searchForm", searchForm); // Add this line
//   };

//   const handleSearch = () => {
//     setSpaces([]);
//     // Fetch spaces with debounce
//     debouncedFetchSpaces({
//       user_id: user?._id,
//       parking_id: state?.parking?._id,
//       setSpaces,
//       ...searchForm,
//     });
//   };

//   const handleDeleteSpace = () => {
//     deleteSpace({
//       id: selectedSpace?._id,
//       handleDeleteSpaceSuccess,
//       handleDeleteSpaceFailure,
//     });
//   };

//   const handleDeleteSpaceSuccess = () => {
//     // Fetch spaces after successful deletion
//     debouncedFetchSpaces({
//       user_id: user?._id,
//       parking_id: state?.parking?._id,
//       setSpaces,
//       ...searchForm,
//     });
//     setShowDeleteModal(false);
//   };

//   const handleDeleteSpaceFailure = () => {
//     setShowDeleteModal(false);
//   };

//   return (
//     <div className="container">
//       <h1 className="mt-5">Search Results</h1>
//       <div className="card p-4 mt-5">
//         <div className="row g-3 d-flex align-items-center">
//           <div className="col-md-3">
//             <input
//               type="text"
//               placeholder="City"
//               className="form-control"
//               value={searchForm.city}
//               onChange={(e) =>
//                 handleSearchForm({ key: "city", value: e.target.value })
//               }
//             />
//           </div>
//           {/* ... (other search input fields) */}
//           <div className="col-md-3">
//             <button
//               type="submit"
//               className="form-control btn btn-primary"
//               onClick={handleSearch}
//             >
//               Search
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 fill="currentColor"
//                 className="bi bi-search ms-2"
//                 viewBox="0 0 16 16"
//               >
//                 <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       <h4 className="mt-5">Showing {spaces?.length || "0"} results</h4>

//       <div className="row mt-2 g-5">{spaceCards()}</div>

//       <DeleteModal
//         value={selectedSpace?.name}
//         showModal={showDeleteModal}
//         setShowModal={setShowDeleteModal}
//         onDeleteConfirm={handleDeleteSpace}
//       />
//     </div>
//   );
// };

// export default SpaceForm;
