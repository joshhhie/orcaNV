import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";
import Canvas from "components/Canvas";
import Card from "components/Card";
import { DashboardPage } from "store/models/dashboard.model";
import { ViewTheme } from "themes/theme.interface";
import { px } from "utils/udim2";
import CommandPanel from "./CommandPanel";

interface Props {
	page: DashboardPage;
	index: number;
	theme: ViewTheme;
	size: UDim2;
	position: UDim2;
	panelHeight: number;
}

function Commands({ page, index, theme, size, position, panelHeight }: Props) {
	return (
		<Card index={index} page={page} theme={theme} size={size} position={position}>
			<textlabel
				Text="Commands"
				Font="GothamBlack"
				TextSize={20}
				TextColor3={theme.foreground}
				TextXAlignment="Left"
				TextYAlignment="Top"
				Position={px(24, 24)}
				BackgroundTransparency={1}
			/>
			<Canvas size={px(326, panelHeight)} position={px(0, 68)} padding={{ left: 24, right: 24, top: 4 }} clipsDescendants>
				<CommandPanel theme={theme} height={panelHeight} />
			</Canvas>
		</Card>
	);
}

export default pure(Commands);
