import Roact from "@rbxts/roact";
import { hooked, useMemo, useState } from "@rbxts/roact-hooked";
import Border from "components/Border";
import Fill from "components/Fill";
import Icon from "components/Icon";
import TabSection from "components/TabSection";
import { ViewTheme } from "themes/theme.interface";
import { arrayToMap } from "utils/array-util";
import { px, scale } from "utils/udim2";
import CommandItem from "./CommandItem";
import {
	COMMAND_PADDING,
	COMMAND_SEARCH_HEIGHT,
	COMMAND_SECTIONS,
	entryHeight,
	filterSections,
	sectionContentHeight,
	sectionTotalHeight,
} from "./registry";

interface Props {
	theme: ViewTheme;
	height: number;
}

function CommandPanel({ theme, height }: Props) {
	const [query, setQuery] = useState("");
	const [bindTarget, setBindTarget] = useState<string | undefined>(undefined);
	const [expandedEntries, setExpandedEntries] = useState<Record<string, boolean>>({});
	const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
		const initial: Record<string, boolean> = {};
		for (const section of COMMAND_SECTIONS) {
			initial[section.id] = section.defaultOpen ?? false;
		}
		return initial;
	});

	const sections = useMemo(() => filterSections(COMMAND_SECTIONS, query), [query]);

	const canvasHeight = useMemo(() => {
		let total = COMMAND_SEARCH_HEIGHT + 8;
		for (const section of sections) {
			total += sectionTotalHeight(section, openSections[section.id] ?? false, expandedEntries);
		}
		return math.max(total, height);
	}, [sections, openSections, expandedEntries, height]);

	const toggleSection = (id: string) => {
		setOpenSections((current) => ({ ...current, [id]: !current[id] }));
	};

	const toggleExpanded = (id: string) => {
		setExpandedEntries((current) => ({ ...current, [id]: !current[id] }));
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

			<frame Size={px(278, COMMAND_SEARCH_HEIGHT)} BackgroundTransparency={1} BorderSizePixel={0} LayoutOrder={0}>
				<Fill color={theme.background} transparency={0.35} radius={8} />
				{theme.outlined && <Border color={theme.foreground} transparency={0.85} radius={8} />}
				<Icon
					id="magnifyingGlass"
					color={theme.foreground}
					size={18}
					position={px(12, 13)}
					transparency={0.35}
				/>
				<textbox
					Text={query}
					PlaceholderText="Search commands..."
					PlaceholderColor3={theme.foreground}
					TextColor3={theme.foreground}
					Font="GothamBold"
					TextSize={14}
					TextXAlignment="Left"
					TextTransparency={0.15}
					ClearTextOnFocus={false}
					Size={new UDim2(1, -44, 1, 0)}
					Position={px(36, 0)}
					BackgroundTransparency={1}
					Change={{
						Text: (rbx) => setQuery(rbx.Text),
					}}
				/>
			</frame>

			{arrayToMap(sections, (section, sectionIndex) => {
				const open = openSections[section.id] ?? false;
				let offset = COMMAND_PADDING;
				const items = arrayToMap(section.entries, (entry) => {
					const expanded = expandedEntries[entry.id] ?? false;
					const y = offset;
					offset += entryHeight(entry, expanded) + COMMAND_PADDING;
					return [
						entry.id,
						<CommandItem
							entry={entry}
							offset={y}
							expanded={expanded}
							onExpand={() => toggleExpanded(entry.id)}
							bindTarget={bindTarget}
							onBind={setBindTarget}
						/>,
					];
				});
				return [
					section.id,
					<TabSection
						title={section.title}
						open={open}
						onToggle={() => toggleSection(section.id)}
						contentHeight={sectionContentHeight(section.entries, expandedEntries)}
						theme={theme}
						layoutOrder={sectionIndex + 1}
					>
						{items}
					</TabSection>,
				];
			})}
		</scrollingframe>
	);
}

export default hooked(CommandPanel);
