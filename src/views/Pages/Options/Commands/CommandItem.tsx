import Roact from "@rbxts/roact";
import { pure, useState } from "@rbxts/roact-hooked";
import Border from "components/Border";
import Canvas from "components/Canvas";
import Fill from "components/Fill";
import Glow, { GlowRadius } from "components/Glow";
import { useAppDispatch, useAppSelector } from "hooks/common/rodux-hooks";
import { useSpring } from "hooks/common/use-spring";
import { useTheme } from "hooks/use-theme";
import { clearHint, setHint } from "store/actions/dashboard.action";
import { setJobActive } from "store/actions/jobs.action";
import { setConfig } from "store/actions/options.action";
import { lerp } from "utils/number-util";
import { runScriptFromUrl } from "utils/run-script";
import { px, scale } from "utils/udim2";
import { COMMAND_HEIGHT, COMMAND_PADDING, CommandEntry } from "./registry";

interface Props {
	entry: CommandEntry;
	index: number;
}

function CommandItem({ entry, index }: Props) {
	const dispatch = useAppDispatch();
	const buttonTheme = useTheme("options").config.configButton;

	const jobActive = useAppSelector((state) => (entry.job ? state.jobs[entry.job].active : false));
	const configActive = useAppSelector((state) => (entry.config ? state.options.config[entry.config] : false));
	const active = entry.kind === "config" ? configActive : entry.kind === "job" ? jobActive : false;

	const [hovered, setHovered] = useState(false);

	const background = useSpring(
		active
			? buttonTheme.accent
			: hovered
			? buttonTheme.backgroundHovered ?? buttonTheme.background.Lerp(buttonTheme.accent, 0.1)
			: buttonTheme.background,
		{},
	);
	const dropshadow = useSpring(
		active
			? buttonTheme.accent
			: hovered
			? buttonTheme.backgroundHovered ?? buttonTheme.dropshadow.Lerp(buttonTheme.accent, 0.5)
			: buttonTheme.dropshadow,
		{},
	);
	const foreground = useSpring(
		active && buttonTheme.foregroundAccent ? buttonTheme.foregroundAccent : buttonTheme.foreground,
		{},
	);

	const onActivate = () => {
		if (entry.kind === "job" && entry.job) {
			if (active && entry.canDeactivate) {
				dispatch(setJobActive(entry.job, false));
			} else if (!active) {
				dispatch(setJobActive(entry.job, true));
			}
		} else if (entry.kind === "config" && entry.config) {
			dispatch(setConfig(entry.config, !active));
		} else if (entry.kind === "script" && entry.url && entry.src) {
			runScriptFromUrl(entry.url, entry.src);
		}
	};

	return (
		<Canvas
			size={px(278, COMMAND_HEIGHT)}
			position={px(0, (COMMAND_PADDING + COMMAND_HEIGHT) * index)}
			zIndex={index}
		>
			<Glow
				radius={GlowRadius.Size70}
				color={dropshadow}
				size={new UDim2(1, 36, 1, 36)}
				position={px(-18, 5 - 18)}
				transparency={useSpring(
					active
						? buttonTheme.glowTransparency
						: hovered
						? lerp(buttonTheme.dropshadowTransparency, buttonTheme.glowTransparency, 0.5)
						: buttonTheme.dropshadowTransparency,
					{},
				)}
			/>
			<Fill color={background} transparency={buttonTheme.backgroundTransparency} radius={8} />
			<textlabel
				Text={entry.label}
				Font="GothamBold"
				TextSize={14}
				TextColor3={foreground}
				TextXAlignment="Left"
				TextYAlignment="Center"
				TextTransparency={useSpring(
					active ? 0 : hovered ? buttonTheme.foregroundTransparency / 2 : buttonTheme.foregroundTransparency,
					{},
				)}
				Position={px(14, 1)}
				Size={new UDim2(1, -14, 1, -1)}
				BackgroundTransparency={1}
				ClipsDescendants
			/>
			{buttonTheme.outlined && <Border color={foreground} transparency={0.8} radius={8} />}
			<textbutton
				Event={{
					Activated: onActivate,
					MouseEnter: () => {
						setHovered(true);
						dispatch(setHint(entry.hint));
					},
					MouseLeave: () => {
						setHovered(false);
						dispatch(clearHint());
					},
				}}
				Text=""
				Size={scale(1, 1)}
				Transparency={1}
			/>
		</Canvas>
	);
}

export default pure(CommandItem);
