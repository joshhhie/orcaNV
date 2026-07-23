import Roact from "@rbxts/roact";
import { pure, useState } from "@rbxts/roact-hooked";
import Canvas from "components/Canvas";
import Icon from "components/Icon";
import { useSpring } from "hooks/common/use-spring";
import { ViewTheme } from "themes/theme.interface";
import { px } from "utils/udim2";

export const TAB_HEADER_HEIGHT = 48;

interface Props extends Roact.PropsWithChildren {
	title: string;
	open: boolean;
	onToggle: () => void;
	contentHeight: number;
	theme: ViewTheme;
	layoutOrder: number;
}

function TabSection({ title, open, onToggle, contentHeight, theme, layoutOrder, [Roact.Children]: children }: Props) {
	const [hovered, setHovered] = useState(false);
	const totalHeight = TAB_HEADER_HEIGHT + (open ? contentHeight : 0);

	return (
		<frame
			Size={useSpring(px(278, totalHeight), {})}
			BackgroundTransparency={1}
			BorderSizePixel={0}
			LayoutOrder={layoutOrder}
		>
			<textbutton
				Text=""
				AutoButtonColor={false}
				Size={px(278, TAB_HEADER_HEIGHT)}
				BackgroundTransparency={1}
				Event={{
					Activated: onToggle,
					MouseEnter: () => setHovered(true),
					MouseLeave: () => setHovered(false),
				}}
			>
				<textlabel
					Text={title}
					Font="GothamBold"
					TextSize={15}
					TextColor3={theme.foreground}
					TextTransparency={useSpring(hovered ? 0 : 0.2, {})}
					TextXAlignment="Left"
					TextYAlignment="Center"
					Size={new UDim2(1, -36, 1, 0)}
					Position={px(28, 0)}
					BackgroundTransparency={1}
				/>
				<Icon
					id={open ? "caretDown" : "caretRight"}
					color={theme.foreground}
					size={20}
					position={px(4, 14)}
					transparency={useSpring(hovered ? 0.15 : 0.4, {})}
				/>
			</textbutton>

			<Canvas
				size={useSpring(open ? px(278, contentHeight) : px(278, 0), {})}
				position={px(0, TAB_HEADER_HEIGHT)}
				clipsDescendants
			>
				{children}
			</Canvas>
		</frame>
	);
}

export default pure(TabSection);
