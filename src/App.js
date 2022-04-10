import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Dice from "./components/Dice/Dice";

function App() {
	const [diceArray, setDiceArray] = useState(() => allNewDice());
	const [tenzies, setTenzies] = useState(false);

	useEffect(() => {
		if (
			diceArray.every((dice) => dice.isHeld === true) &&
			diceArray.every((dice) => dice.value === diceArray[0].value)
		)
			setTenzies(true);
	}, [diceArray]);

	function allNewDice() {
		const diceArray = [];
		for (let i = 0; i < 10; i++) {
			const random = Math.ceil(Math.random() * 6);
			diceArray.push({
				value: random,
				isHeld: false,
				id: i,
			});
		}
		return diceArray;
	}

	function rollDice() {
		setDiceArray((prevArray) =>
			prevArray.map((dice) => {
				return dice.isHeld ? dice : { ...dice, value: Math.ceil(Math.random() * 6) };
			})
		);
	}

	function resetDice() {
		setDiceArray(allNewDice());
		setTenzies(false);
	}

	function holdDice(id) {
		setDiceArray((prevArray) => {
			return prevArray.map((dice) => {
				if (dice.id === id) {
					return {
						...dice,
						isHeld: !dice.isHeld,
					};
				} else return dice;
			});
		});
	}

	return (
		<>
			<div className="wrapper">
				<div className="container">
					<div className="internal-wrapper">
						<h1 className="header">Tenzies</h1>
						{tenzies ? (
							<h2>You Won! Wohooo 🥳🎉</h2>
						) : (
							<p className="text">
								Roll until all dice are the same. Click each die to freeze it at its current value
								between rolls.
							</p>
						)}
					</div>
					<div className="dice-container">
						{diceArray.map((dice) => (
							<Dice key={dice.id} dice={{ ...dice }} holdDice={() => holdDice(dice.id)} />
						))}
					</div>
					<button onClick={tenzies ? resetDice : rollDice} className="btn">
						{tenzies ? "New Game" : "Roll"}
					</button>
				</div>
			</div>
		</>
	);
}

export default App;
