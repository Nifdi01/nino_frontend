import React, { useEffect, useState } from "react";
import { createKeyword } from "../../services/keywords";
import { toast } from "react-toastify";

const AddKeywordModal = ({ onClose, onCreate }) => {

    const [formData, setFormData] = useState({
        name:""
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]:value
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Keyword name is required.";

        return newErrors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const validationErrors = validate();
        if(Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            console.log(formData);
            const newKeyword = await createKeyword(formData);
            console.log("THE NEW KEYWORD: ", newKeyword); // Check if name is present
            onCreate(newKeyword);
            onClose();
        } catch(error){
            toast.error("Error saving keyword", error);
        } finally {
            setIsSubmitting(false);
        }
    }

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
                <h2 className="text-xl font-semibold mb-4">Add New Keyword</h2>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 text-sm font-medium text-gray-100">
                        Keyword Name
                    </label>
                    <input
                        name="name"
                        type="text"
                        onChange={handleChange}
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

export default AddKeywordModal;
