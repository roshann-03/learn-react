import { useState, useEffect, useCallback } from "react";


function App() {
	const [length, setLength] = useState(8);
	const [useLetters, setUseLetters] = useState(true);
	const [useNumbers, setUseNumbers] = useState(true);
	const [useSpecialCharacters, setUseSpecialCharacters] = useState(true);
	const [password, setPassword] = useState("");
	const [copied, setCopied] = useState("copy");
	const generatePassword = useCallback(() => {
		let pass = "";
		let str = "";
		let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		let numbers = "1234567890";
		let specialCharacters = "@#&+()/₹*$?";

		if (useLetters) str += letters;
		if (useNumbers) str += numbers;
		if (useSpecialCharacters) str += specialCharacters;

		for (let i = 0; i < length; i++) {
			const char = Math.floor(Math.random() * str.length);
			pass += str.charAt(char);
		}

		setPassword(pass);
	}, [length, useLetters, useNumbers, useSpecialCharacters]);

	const copyPassword = () => {
		if (copied != "Copied" && password.length)
			window.navigator.clipboard.writeText(password);
		if (password.length) setCopied("Copied");
	};

	useEffect(() => {
		generatePassword();
		setCopied("copy");
	}, [
		length,
		useLetters,
		useNumbers,
		useSpecialCharacters,
		generatePassword
	]);

	return (
		<div className="flex text-gray-800 flex-col items-center justify-center h-screen">
			<div id="flashBox"></div>
			<div className="bg-white rounded-lg shadow-md p-8">
				<div className="flex justify-center mb-8">
					<h1 className="text-xl font-bold">Password Generator</h1>
				</div>
				<div className="flex justify-between mb-4">
					<input
						type="text"
						value={password}
						className="w-full outline-none text-center bg-gray-600 text-white rounded-md"
						readOnly={true}
					/>

					<button
						onClick={copyPassword}
						className="transition bg-blue-500 mx-1 text-white px-4 py-2 rounded-md hover:bg-blue-700">
						{copied}
					</button>
				</div>
				<div>
					<div className="mb-4">
						<label
							htmlFor="passwordLength"
							className="block text-sm font-medium mb-2">
							Password Length : {length}
						</label>
						<input
							type="range"
							id="passwordLength"
							className="w-full rounded-md focus:ring-inset focus:ring-blue-500 focus:outline-none"
							min="6"
							max="32"
							value={length}
							onChange={e => setLength(e.target.value)}
						/>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center mr-4">
							<input
								type="checkbox"
								id="useLetters"
								className="w-4 h-4 mr-2 focus:ring-inset focus:ring-blue-500"
								defaultChecked={useLetters}
								onChange={() => {
									setUseLetters(prev => !prev);
								}}
							/>
							<label htmlFor="useLetters" className="text-sm">
								Use letters
							</label>
						</div>
						<div className="flex items-center mr-4">
							<input
								type="checkbox"
								id="useNumbers"
								className="w-4 h-4 mr-2 focus:ring-inset focus:ring-blue-500"
								checked={useNumbers}
								onChange={() => {
									setUseNumbers(prev => !prev);
								}}
							/>
							<label htmlFor="useNumbers" className="text-sm">
								Use numbers
							</label>
						</div>
						<div className="flex items-center mr-4">
							<input
								type="checkbox"
								id="useSpecialCharacters"
								className="w-4 h-4 mr-2 focus:ring-inset focus:ring-blue-500"
								checked={useSpecialCharacters}
								onChange={() => {
									setUseSpecialCharacters(prev => !prev);
								}}
							/>
							<label
								htmlFor="useSpecialCharacters"
								className="text-sm">
								Use special characters
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
