import { MdAdd } from "react-icons/md";
import AddEdit from './AddEdit';
import Modal from "react-modal";
import Card from "./Card";
import { useState, useEffect } from "react";
import { getAllRestaurants, addRestaurant, getRestaurantById, deleteRestaurant, updateRestaurant } from '../services/restaurantService';
import EmptyCard from "./EmptyCard";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleEdit = (restaurantDetails) => {
    setOpenAddEditModal({ isShown: true, data: restaurantDetails, type: "edit" });
  }

  const handleUpdateRestaurant = async (restaurant) => {
    try {
      const updatedRestaurant = await updateRestaurant(restaurant);
      setRestaurants(restaurants.map(r => r._id === updatedRestaurant._id ? updatedRestaurant : r));
    } catch (error) {
      console.error('Error updating restaurant:', error);
    }
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getAllRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleSelectRestaurant = async (id) => {
    try {
      const data = await getRestaurantById(id);
      setSelectedRestaurant(data);
    } catch (error) {
      console.error('Error fetching restaurant by ID:', error);
    }
  };

  const handleAddRestaurant = async (restaurant) => {
    try {
      const newRestaurant = await addRestaurant(restaurant);
      setRestaurants([...restaurants, newRestaurant]);
    } catch (error) {
      console.error('Error adding restaurant:', error);
    }
  };

  const handleDeleteRestaurant = async (id) => {
    try {
      await deleteRestaurant(id);
      setRestaurants(restaurants.filter(r => r._id !== id));
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  const closeModal = () => {
    setOpenAddEditModal({ isShown: false, type: "add", data: null });
  };

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <>
      <div className="container mx-auto ">
        {restaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {restaurants.map((item) => (
              <Card
                key={item._id}
                Name={item.name}
                Address={item.address}
                Telephone={item.telephone}
                tags="#Meeting"        
                onEdit={() => handleEdit(item)}
                onDelete={() => { handleDeleteRestaurant(item._id) }}
              />
            ))}
          </div>
        ) : (
          <EmptyCard />
        )}
      </div>

      <button
        className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10'
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel="Add/Edit Modal"
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
<AddEdit
  type={openAddEditModal.type}
  data={openAddEditModal.data}
  onClose={closeModal}
  onSave={openAddEditModal.type === "edit" ? handleUpdateRestaurant : handleAddRestaurant}
/>

      </Modal>
    </>
  );
};

export default Home;
