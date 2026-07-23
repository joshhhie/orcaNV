import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";
import { IconId, getIcon } from "utils/icons";
import { BindingOrValue } from "utils/binding-util";
import { px } from "utils/udim2";

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
	return (
		<imagelabel
			Image={getIcon(id)}
			ImageColor3={color}
			ImageTransparency={transparency}
			Rotation={rotation}
			Size={px(size, size)}
			Position={position}
			AnchorPoint={anchor}
			BackgroundTransparency={1}
		/>
	);
}

export default pure(Icon);
