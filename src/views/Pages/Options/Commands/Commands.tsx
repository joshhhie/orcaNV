import Roact from "@rbxts/roact";
import { hooked, useMemo, useState } from "@rbxts/roact-hooked";
import Canvas from "components/Canvas";
import Card from "components/Card";
import TabSection from "components/TabSection";
import { useTheme } from "hooks/use-theme";
import { DashboardPage } from "store/models/dashboard.model";
import { arrayToMap } from "utils/array-util";
import { px, scale } from "utils/udim2";
import CommandItem from "./CommandItem";
import { COMMAND_SECTIONS, sectionContentHeight, sectionTotalHeight } from "./registry";

function Commands() {
	const theme = useTheme("options").config;

	const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
		const initial: Record<string, boolean> = {};
		for (const section of COMMAND_SECTIONS) {
			initial[section.id] = section.defaultOpen ?? false;
		}
		return initial;
	});

	const canvasHeight = useMemo(() => {
		let total = 0;
		for (const section of COMMAND_SECTIONS) {
			total += sectionTotalHeight(section, openSections[section.id] ?? false);
		}
		return math.max(total, 348);
	}, [openSections]);

	const toggleSection = (id: string) => {
		setOpenSections((current) => ({ ...current, [id]: !current[id] }));
	};

	return (
		<Card index={0} page={DashboardPage.Options} theme={theme} size={px(326, 416)} position={new UDim2(0, 0, 1, 0)}>
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
			<Canvas size={px(326, 348)} position={px(0, 68)} padding={{ left: 24, right: 24, top: 4 }} clipsDescendants>
				<scrollingframe
					Size={scale(1, 1)}
					CanvasSize={px(0, canvasHeight)}
					BackgroundTransparency={1}
					BorderSizePixel={0}
					ScrollBarImageTransparency={1}
					ScrollBarThickness={0}
					ClipsDescendants={false}
				>
					<uilistlayout
						SortOrder="LayoutOrder"
						FillDirection="Vertical"
						HorizontalAlignment="Left"
						VerticalAlignment="Top"
						Padding={new UDim(0, 4)}
					/>
					{arrayToMap(COMMAND_SECTIONS, (section, index) => [
						section.id,
						<TabSection
							title={section.title}
							open={openSections[section.id] ?? false}
							onToggle={() => toggleSection(section.id)}
							contentHeight={sectionContentHeight(section.entries.size())}
							theme={theme}
							layoutOrder={index}
						>
							{arrayToMap(section.entries, (entry, entryIndex) => [
								entry.id,
								<CommandItem entry={entry} index={entryIndex} />,
							])}
						</TabSection>,
					])}
				</scrollingframe>
			</Canvas>
		</Card>
	);
}

export default hooked(Commands);
