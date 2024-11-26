import { useState, useEffect } from "react";

const CreateTask = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ title: "", description: "" });

    // Fetch tasks from the backend
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch("http://localhost:5000/task");
                const tasks = await response.json();
                setData(tasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, []);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const newTask = { ...formData, id: Date.now() };
        console.log(newTask);

        try {
            const response = await fetch("http://localhost:5000/task", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask),
            });

            if (response.ok) {
                const savedTask = await response.json();
                setData([...data, savedTask]);
                setFormData({ title: "", description: "" });
                setShowModal(false);

                // Show success message
                setShowSuccessMessage(true);
                setTimeout(() => {
                    setShowSuccessMessage(false); // Hide after 2 seconds
                }, 2000);
            }
        } catch (error) {
            console.error("Error saving task:", error);
        }
    };


    return (
        <div className="pl-2">
            {/* Form Component */}
            {showSuccessMessage && (
                <div className="fixed top-16 right-4 bg-green-500 text-white p-4 rounded shadow-md">
                    Task added successfully!
                </div>
            )}
            {/* Button */}
            <div className="flex justify-between items-center py-6">
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-indigo-600 text-white py-[10px] px-3 text-base font-semibold rounded-md cursor-pointer"
                >
                    Create Task +
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 duration-75 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-md w-96 p-6 relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
                        >
                            ✖
                        </button>
                        <form onSubmit={handleFormSubmit}>
                            <div>
                                <label className="block text-lg font-medium">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Task Title"
                                    value={formData.title}
                                    onChange={handleFormChange}
                                    className="w-full p-2 border rounded-md border-gray-700"
                                    required
                                />
                            </div>
                            <div className="mt-2">
                                <label className="block text-lg font-medium">Description</label>
                                <textarea
                                    name="description"
                                    placeholder="Task Description"
                                    value={formData.description}
                                    onChange={handleFormChange}
                                    className="w-full p-2 border rounded-md border-gray-700"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-green-500 w-full text-lg font-semibold text-white px-4 py-2 mt-4 rounded-md hover:bg-green-600"
                            >
                                Save Task
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateTask;
