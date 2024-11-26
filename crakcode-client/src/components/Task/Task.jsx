import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Task = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(""); // For search
    const [currentPage, setCurrentPage] = useState(1); // For pagination
    const itemsPerPage = 9; // Items per page
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

    // Handle search
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        const filtered = data.filter((item) =>
            item.title.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilteredData(filtered);
        setCurrentPage(1); // Reset to first page
    };

    // Pagination calculations
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

    const Spinner = () => (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="w-12 h-12 border-4 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );




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
            {/* Header */}
            <div className="md:flex justify-between items-center py-14">
                <div className="">
                    <h1 className="text-3xl font-bold md:text-left text-center">Recent Tasks</h1>
                    <p className="md:text-left text-center">Effortless Task Management for Maximum Productivity and Success</p>
                </div>
                <div className="flex items-center gap-3 pl-5">
                    <input
                        className="p-2 rounded-md text-base border border-black"
                        type="text"
                        placeholder="Find your task"
                        value={searchTerm}
                        onChange={handleSearch} // Search handler
                    />
                    <div className="relative inline-block">
                        <Link
                            to="/all-task"
                            className="bg-indigo-600 text-white py-[10px] px-3 text-base font-bold rounded-md cursor-pointer"
                        >
                            View All
                        </Link>
                    </div>
                </div>
            </div>

            {/* Tasks */}
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

            {/* Pagination */}
            {/* <div className="mt-8">
                <div className="flex justify-end">
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
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`mx-1 px-3 py-2 ${currentPage === index + 1
                                    ? "bg-red-500 text-white"
                                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                                } font-medium rounded-md`}
                        >
                            {index + 1}
                        </button>
                    ))}
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
            </div> */}
            <div className="mt-8">
                <div className="flex justify-end">
                    {/* Previous Button */}
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

                    {/* Current Page Button */}
                    <button
                        className="mx-1 px-4 py-2 bg-red-500 text-white font-medium rounded-md cursor-default"
                    >
                        {currentPage}
                    </button>

                    {/* Next Button */}
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


        </div>
    );
};

export default Task;
