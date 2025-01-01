import { User } from "lucide-react";
import SettingSection from "./SettingSection";

const Profile = () => {
	const firstName = localStorage.getItem("userFirstName");
	const lastName = localStorage.getItem("userLastName");
	const email = localStorage.getItem("userEmail");
	const company = localStorage.getItem("userCompany");
	const role = localStorage.getItem("userRole");
	return (
		<SettingSection icon={User} title={"Profile"}>
			<div className='flex flex-col sm:flex-row items-center mb-6'>
				<img
					src='src\assets\images\avatar.svg'
					alt='Profile'
					className='rounded-full w-20 h-20 object-cover mr-4 bg-gray-300'
				/>

				<div>
					<h3 className='text-l font-semibold text-gray-100'>{firstName} {lastName} from <a href="/users" class="text-blue-600 dark:text-blue-500 hover:text-lg transition-all">{company}</a></h3>
					<p className='text-gray-400'>{email}</p>
					<p className='text-gray-400'><span className="font-semibold text-gray-300 capitalize">{role}</span></p>
				</div>
			</div>

			{/* <button className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto'>
				Edit Profile
			</button> */}
		</SettingSection>
	);
};
export default Profile;