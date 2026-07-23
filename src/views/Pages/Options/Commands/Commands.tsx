import Roact from "@rbxts/roact";
import { hooked, useState } from "@rbxts/roact-hooked";
import Canvas from "components/Canvas";
import Card from "components/Card";
import Icon from "components/Icon";
import { useSpring } from "hooks/common/use-spring";
import { DashboardPage } from "store/models/dashboard.model";
import { ViewTheme } from "themes/theme.interface";
import { px } from "utils/udim2";
import CommandPanel from "./CommandPanel";

const HEADER_HEIGHT = 52;

interface Props {
	page: DashboardPage;
	index: number;
	theme: ViewTheme;
	size: UDim2;
	position: UDim2;
	panelHeight: number;
}

function Commands({ page, index, theme, size, position, panelHeight }: Props) {
	const [open, setOpen] = useState(true);
	const [hovered, setHovered] = useState(false);

	const cardSize = useSpring(open ? size : px(size.X.Offset, HEADER_HEIGHT), {});

	return (
		<Card index={index} page={page} theme={theme} size={cardSize} position={position}>
			<textbutton
				Text=""
				AutoButtonColor={false}
				Size={px(326, HEADER_HEIGHT)}
				BackgroundTransparency={1}
				Event={{
					Activated: () => setOpen(!open),
					MouseEnter: () => setHovered(true),
					MouseLeave: () => setHovered(false),
				}}
			>
				<textlabel
					Text="Commands"
					Font="GothamBlack"
					TextSize={20}
					TextColor3={theme.foreground}
					TextTransparency={useSpring(hovered ? 0 : 0.1, {})}
					TextXAlignment="Left"
					TextYAlignment="Center"
					Position={px(52, 0)}
					Size={new UDim2(1, -72, 1, 0)}
					BackgroundTransparency={1}
				/>
				<Icon
					id={open ? "caretDown" : "caretRight"}
					color={theme.foreground}
					size={22}
					position={px(24, 15)}
					transparency={useSpring(hovered ? 0.1 : 0.35, {})}
				/>
			</textbutton>

			<Canvas
				size={useSpring(open ? px(326, panelHeight) : px(326, 0), {})}
				position={px(0, HEADER_HEIGHT)}
				padding={{ left: 24, right: 24, top: 4 }}
				clipsDescendants
			>
				<CommandPanel theme={theme} height={panelHeight - 8} />
			</Canvas>
		</Card>
	);
}

export default hooked(Commands);
