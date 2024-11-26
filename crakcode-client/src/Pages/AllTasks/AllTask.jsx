import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import CreateTask from "./CreateTask"; // Ensure this component exists and works

const AllTask = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(""); // For search
    const [currentPage, setCurrentPage] = useState(1); // For pagination
    const itemsPerPage = 12; // Items per page
    const [isEditing, setIsEditing] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [updatedData, setUpdatedData] = useState({ title: "", description: "" });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:5000/task");
                const result = await response.json();
                setData(result);
                setFilteredData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDeleteTask = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/task/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result.message); // Logs success message from the server

                // Update state to reflect deleted task in real-time
                setData((prevData) => prevData.filter((task) => task.id !== id));
                setFilteredData((prevData) => prevData.filter((task) => task.id !== id)); // For search results
            } else {
                console.error("Failed to delete task");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        const filtered = data.filter((item) =>
            item.title.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilteredData(filtered);
        setCurrentPage(1); // Reset to first page
    };

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPageData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const openEditModal = (task) => {
        setCurrentTask(task);
        setUpdatedData({ title: task.title, description: task.description });
        setIsEditing(true);
    };

    const handleUpdateChange = (e) => {
        setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
    };

    const handleUpdateTask = async () => {
        try {
            const response = await fetch(`http://localhost:5000/task/${currentTask.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                const updatedTask = await response.json();

                setData((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === updatedTask.id ? updatedTask : task
                    )
                );
                setFilteredData((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === updatedTask.id ? updatedTask : task
                    )
                );
                setIsEditing(false);

                // Show success message
                const successMessage = document.createElement('div');
                successMessage.textContent = 'Task updated successfully!';
                successMessage.style.position = 'fixed';
                successMessage.style.top = '70px';
                successMessage.style.right = '20px';
                successMessage.style.padding = '10px';
                successMessage.style.backgroundColor = 'green';
                successMessage.style.color = 'white';
                successMessage.style.borderRadius = '5px';
                successMessage.style.fontSize = '16px';
                successMessage.style.zIndex = '1000';

                document.body.appendChild(successMessage);

                // Remove the message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            } else {
                const errorResponse = await response.json();
                console.error('Failed to update task:', errorResponse.message);
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };




    return (
        <div className="max-w-[1200px] mx-auto py-12 px-5">
            <div className="pb-14">
                <div className="py-5 w-1/2 text-center mx-auto">
                    <h1 className="text-3xl font-bold text-center">All Tasks Here</h1>
                    <p>Effortless Task Management for Maximum Productivity and Success</p>
                </div>
                <div className="flex items-center justify-center">
                    <input
                        className="p-2 w-80 rounded-md text-base border border-black"
                        type="text"
                        placeholder="Find your task"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <CreateTask />
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {loading ? (
                    <p>Loading...</p>
                ) : currentPageData.length > 0 ? (
                    currentPageData.map((task) => (
                        <div
                            key={task.id}
                            className="relative p-3 border border-black rounded-md hover:border-red-500 group cursor-pointer"
                        >
                            <button
                                onClick={() => openEditModal(task)}
                                className="absolute top-2 right-11 p-[6px] bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <FaEdit className="text-[20px]" />
                            </button>

                            <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="absolute top-2 right-2 p-[6px] bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <MdDelete className="text-[20px]" />
                            </button>

                            <h1 className="text-lg font-bold">{task.title}</h1>
                            <p>{task.description}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-2 md:col-span-3">No tasks found.</p>
                )}
            </div>

            {isEditing && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
                        <input
                            type="text"
                            name="title"
                            value={updatedData.title}
                            onChange={handleUpdateChange}
                            className="w-full mb-4 p-2 border border-black rounded"
                            placeholder="Title"
                        />
                        <textarea
                            name="description"
                            value={updatedData.description}
                            onChange={handleUpdateChange}
                            className="w-full mb-4 p-2 border border-black rounded"
                            placeholder="Description"
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateTask}
                                className="px-4 py-2 bg-red-500 text-white rounded"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8 flex justify-end">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`mx-1 px-3 py-2 ${currentPage === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                        } font-medium rounded-md`}
                >
                    Previous
                </button>
                <button className="mx-1 px-4 py-2 bg-red-500 text-white font-medium rounded-md cursor-default">
                    {currentPage}
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`mx-1 px-3 py-2 ${currentPage === totalPages
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                        } font-medium rounded-md`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllTask;
