import Roact from "@rbxts/roact";
import { pure, useState } from "@rbxts/roact-hooked";
import Canvas from "components/Canvas";
import { useSpring } from "hooks/common/use-spring";
import { ViewTheme } from "themes/theme.interface";
import { px, scale } from "utils/udim2";

export const TAB_HEADER_HEIGHT = 44;
export const TAB_SECTION_PADDING = 8;

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
	const chevron = useSpring(open ? 0 : -90, {});

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
					TextSize={14}
					TextColor3={theme.foreground}
					TextTransparency={useSpring(hovered ? 0 : 0.25, {})}
					TextXAlignment="Left"
					TextYAlignment="Center"
					Size={new UDim2(1, -28, 1, 0)}
					Position={px(0, 0)}
					BackgroundTransparency={1}
				/>
				<imagelabel
					Image="rbxassetid://8992244380"
					ImageColor3={theme.foreground}
					ImageTransparency={useSpring(hovered ? 0.25 : 0.5, {})}
					Rotation={chevron}
					Size={px(12, 12)}
					Position={new UDim2(1, -16, 0.5, 0)}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
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
