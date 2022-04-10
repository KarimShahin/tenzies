import "./Dice.css";

export default function Dice({ dice, holdDice }) {
	const { value, id, isHeld } = dice;
	const dotElement = Array(value)
		.fill(".")
		.map((dot, index) => (
			<span className="dot" key={index}>
				&bull;
			</span>
		));
	console.log(value);
	return (
		<>
			<div onClick={(event) => holdDice(event, id)} className={`dice ${isHeld ? "held" : ""}`}>
				{dotElement}
			</div>
		</>
	);
}
