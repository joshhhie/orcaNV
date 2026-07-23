import Roact from "@rbxts/roact";
import { hooked, useMemo, useState } from "@rbxts/roact-hooked";
import TabSection from "components/TabSection";
import { ViewTheme } from "themes/theme.interface";
import { arrayToMap } from "utils/array-util";
import { px, scale } from "utils/udim2";
import CommandItem from "./CommandItem";
import { COMMAND_SECTIONS, sectionContentHeight, sectionTotalHeight } from "./registry";

interface Props {
	theme: ViewTheme;
	height: number;
}

function CommandPanel({ theme, height }: Props) {
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
		return math.max(total, height);
	}, [openSections, height]);

	const toggleSection = (id: string) => {
		setOpenSections((current) => ({ ...current, [id]: !current[id] }));
	};

	return (
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
	);
}

export default hooked(CommandPanel);
