import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { createSource } from "../../services/sources";
import { toast } from "react-toastify";


const AddSourceModal = ({ onClose, onCreate, platforms }) => {

    const [formData, setFormData] = useState({
        name: "",
        platform: 1,  // Initialize as empty string to select from the dropdown
        link: ""
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Source name is required.";
        if (!formData.link.trim()) {
            newErrors.link = "Link is required.";
        } else if (!/^https?:\/\/\S+$/.test(formData.link)) {
            newErrors.link = "Link must be a valid URL.";
        }
        if (!formData.platform) newErrors.platform = "Platform is required.";  // Add platform validation
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            console.log(formData);
            const newSource = await createSource(formData); // Send platform as id (not name)
            onCreate(newSource);
            onClose();
        } catch (error) {
            toast.error("Error saving source", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl font-semibold mb-4">Add New Source</h2>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 text-sm font-medium text-gray-100">
                        Source Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 bg-gray-800"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                    <label className="block mb-2 text-sm font-medium text-gray-100">
                        Platform
                    </label>
                    <div className="relative">
                        <select
                            name="platform"
                            value={formData.platform}
                            onChange={handleChange}
                            className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 bg-gray-800 text-gray-100 appearance-none"
                        >
                            <option value="">Select Platform</option>
                            {platforms.map((platform) => (
                                <option key={platform.id} value={platform.id}>{platform.name}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center mb-3 pr-4">
                            <ChevronDown className="text-gray-100" />
                        </div>
                    </div>

                    <label className="block mb-2 text-sm font-medium text-gray-100">
                        Link
                    </label>
                    <input
                        type="url"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 bg-gray-800"
                    />
                    {errors.link && <p className="text-red-500 text-sm">{errors.link}</p>}

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
