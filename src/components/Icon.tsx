import Roact from "@rbxts/roact";
import { hooked, useEffect, useState } from "@rbxts/roact-hooked";
import { IconId, getIcon } from "utils/icons";
import { BindingOrValue } from "utils/binding-util";
import { px } from "utils/udim2";

const FALLBACK: Record<IconId, string> = {
	caretDown: "v",
	caretRight: ">",
	caretUp: "^",
	magnifyingGlass: "?",
	keyboard: "K",
	gear: "*",
	sliders: "=",
	dotsThree: ":",
};

interface Props {
	id: IconId;
	color: BindingOrValue<Color3>;
	size?: number;
	position?: UDim2;
	anchor?: Vector2;
	transparency?: BindingOrValue<number>;
	rotation?: BindingOrValue<number>;
}

function Icon({
	id,
	color,
	size = 20,
	position = px(0, 0),
	anchor,
	transparency = 0,
	rotation = 0,
}: Props) {
	const [image, setImage] = useState(() => getIcon(id));

	useEffect(() => {
		const asset = getIcon(id);
		if (asset !== "" && asset !== image) {
			setImage(asset);
		}
	}, [id]);

	if (image !== "") {
		return (
			<imagelabel
				Image={image}
				ImageColor3={color}
				ImageTransparency={transparency}
				Rotation={rotation}
				Size={px(size, size)}
				Position={position}
				AnchorPoint={anchor}
				BackgroundTransparency={1}
				ScaleType="Fit"
			/>
		);
	}

	return (
		<textlabel
			Text={FALLBACK[id]}
			Font="GothamBold"
			TextSize={size - 4}
			TextColor3={color}
			TextTransparency={transparency}
			Rotation={rotation}
			Size={px(size, size)}
			Position={position}
			AnchorPoint={anchor}
			TextXAlignment="Center"
			TextYAlignment="Center"
			BackgroundTransparency={1}
		/>
	);
}

export default hooked(Icon);
