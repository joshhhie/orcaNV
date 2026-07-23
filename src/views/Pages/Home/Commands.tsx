import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";
import { useTheme } from "hooks/use-theme";
import { DashboardPage } from "store/models/dashboard.model";
import { px } from "utils/udim2";
import Commands from "views/Pages/Options/Commands/Commands";

function HomeCommands() {
	const theme = useTheme("home").friendActivity;

	return (
		<Commands
			page={DashboardPage.Home}
			index={2}
			theme={theme}
			size={px(326, 648)}
			position={new UDim2(0, 374, 1, 0)}
			panelHeight={580}
		/>
	);
}

export default hooked(HomeCommands);
