import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";
import Canvas from "components/Canvas";
import { useScale } from "hooks/use-scale";
import { scale } from "utils/udim2";
import HomeCommands from "./Commands";
import Profile from "./Profile";
import Title from "./Title";

function Home() {
	const scaleFactor = useScale();

	return (
		<Canvas position={scale(0, 1)} anchor={new Vector2(0, 1)}>
			<uiscale Scale={scaleFactor} />
			<Title />
			<HomeCommands />
			<Profile />
		</Canvas>
	);
}

export default pure(Home);
