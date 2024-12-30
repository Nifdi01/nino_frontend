import React, { useEffect } from "react";

const AddSourceModal = ({ onClose }) => {

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl font-semibold mb-4">Add New Source</h2>
                <form>
                    <label className="block mb-2 text-sm font-medium text-gray-100">
                        Source Name
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 bg-gray-800"
                    />
                    <label className="block mb-2 text-sm font-medium text-gray-100">
                        Platform
                    </label>
                    <select
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 bg-gray-800 text-gray-100"
                    >
                        <option value="website">Website</option>
                        <option value="telegram">Telegram</option>
                        <option value="facebook">Facebook</option>
                        <option value="instagram">Instagram</option>
                        <option value="twitter">Twitter</option>
                    </select>
                    <label className="block mb-2 text-sm font-medium text-gray-100">
                        Link
                    </label>
                    <input
                        type="url"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 bg-gray-800"
                    />
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="text-gray-200 hover:text-gray-100 mr-4"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSourceModal;
