import Roact from "@rbxts/roact";
import { hooked, useBinding, useEffect, useState } from "@rbxts/roact-hooked";
import { UserInputService } from "@rbxts/services";
import Border from "components/Border";
import BrightSlider from "components/BrightSlider";
import Canvas from "components/Canvas";
import Fill from "components/Fill";
import Glow, { GlowRadius } from "components/Glow";
import Icon from "components/Icon";
import { useAppDispatch, useAppSelector } from "hooks/common/rodux-hooks";
import { useSpring } from "hooks/common/use-spring";
import { useTheme } from "hooks/use-theme";
import { clearHint, setHint } from "store/actions/dashboard.action";
import { setJobValue } from "store/actions/jobs.action";
import { removeShortcut, setShortcut } from "store/actions/options.action";
import { lerp } from "utils/number-util";
import { px, scale } from "utils/udim2";
import { runCommand } from "./command-runner";
import {
	COMMAND_EXPAND_HEIGHT,
	COMMAND_PADDING,
	COMMAND_ROW_HEIGHT,
	CommandEntry,
	entryHeight,
	shortcutId,
} from "./registry";

interface Props {
	entry: CommandEntry;
	offset: number;
	expanded: boolean;
	onExpand: () => void;
	bindTarget?: string;
	onBind: (id?: string) => void;
}

function CommandItem({ entry, offset, expanded, onExpand, bindTarget, onBind }: Props) {
	const dispatch = useAppDispatch();
	const buttonTheme = useTheme("options").config.configButton;
	const sliderTheme = useTheme("home").profile;

	const jobActive = useAppSelector((state) => (entry.job ? state.jobs[entry.job].active : false));
	const configActive = useAppSelector((state) => (entry.config ? state.options.config[entry.config] : false));
	const active = entry.kind === "config" ? configActive : entry.kind === "job" ? jobActive : false;

	const shortcut = useAppSelector((state) => state.options.shortcuts[shortcutId(entry.id)]);
	const shortcutEnum = Enum.KeyCode.GetEnumItems().find((item) => item.Value === shortcut);
	const binding = bindTarget === entry.id;

	const jobValue = useAppSelector((state) =>
		entry.value ? state.jobs[entry.value.job].value : 0,
	);
	const [value, setValue] = useBinding(jobValue);

	const [hovered, setHovered] = useState(false);
	const rowHeight = entryHeight(entry, expanded);

	const background = useSpring(
		active || binding
			? buttonTheme.accent
			: hovered
			? buttonTheme.backgroundHovered ?? buttonTheme.background.Lerp(buttonTheme.accent, 0.1)
			: buttonTheme.background,
		{},
	);
	const dropshadow = useSpring(
		active || binding
			? buttonTheme.accent
			: hovered
			? buttonTheme.backgroundHovered ?? buttonTheme.dropshadow.Lerp(buttonTheme.accent, 0.5)
			: buttonTheme.dropshadow,
		{},
	);
	const foreground = useSpring(
		(active || binding) && buttonTheme.foregroundAccent ? buttonTheme.foregroundAccent : buttonTheme.foreground,
		{},
	);

	useEffect(() => {
		if (bindTarget !== undefined || shortcut === undefined) {
			return;
		}
		const handle = UserInputService.InputBegan.Connect((input, gameProcessed) => {
			if (!gameProcessed && input.KeyCode.Value === shortcut) {
				runCommand(entry, dispatch, active);
			}
		});
		return () => handle.Disconnect();
	}, [bindTarget, shortcut, active]);

	useEffect(() => {
		if (!binding) {
			return;
		}
		const handle = UserInputService.InputBegan.Connect((input, gameProcessed) => {
			if (gameProcessed) {
				return;
			}
			if (input.UserInputType === Enum.UserInputType.MouseButton1) {
				onBind(undefined);
				return;
			}
			switch (input.KeyCode) {
				case Enum.KeyCode.Unknown:
					break;
				case Enum.KeyCode.Escape:
				case Enum.KeyCode.Backspace:
					dispatch(removeShortcut(shortcutId(entry.id)));
					onBind(undefined);
					break;
				case Enum.KeyCode.Return:
					onBind(undefined);
					break;
				default:
					dispatch(setShortcut(shortcutId(entry.id), input.KeyCode.Value));
					onBind(undefined);
					break;
			}
		});
		return () => handle.Disconnect();
	}, [binding]);

	const accent = entry.value ? sliderTheme.highlight[entry.value.job] : buttonTheme.accent;

	return (
		<Canvas size={px(278, rowHeight)} position={px(0, offset)} zIndex={math.floor(offset)}>
			<Glow
				radius={GlowRadius.Size70}
				color={dropshadow}
				size={new UDim2(1, 36, 1, 36)}
				position={px(-18, 5 - 18)}
				transparency={useSpring(
					active || binding
						? buttonTheme.glowTransparency
						: hovered
						? lerp(buttonTheme.dropshadowTransparency, buttonTheme.glowTransparency, 0.5)
						: buttonTheme.dropshadowTransparency,
					{},
				)}
			/>
			<Fill color={background} transparency={buttonTheme.backgroundTransparency} radius={8} />

			{entry.value !== undefined && (
				<textbutton
					Text=""
					AutoButtonColor={false}
					Size={px(28, COMMAND_ROW_HEIGHT)}
					Position={px(0, 0)}
					BackgroundTransparency={1}
					Event={{
						Activated: onExpand,
						MouseEnter: () => dispatch(setHint(entry.hint)),
						MouseLeave: () => dispatch(clearHint()),
					}}
				>
					<Icon
						id={expanded ? "caretDown" : "sliders"}
						color={foreground}
						size={18}
						position={px(6, 19)}
						anchor={new Vector2(0, 0.5)}
						transparency={0.2}
					/>
				</textbutton>
			)}

			<textlabel
				Text={entry.label}
				Font="GothamBold"
				TextSize={14}
				TextColor3={foreground}
				TextXAlignment="Left"
				TextYAlignment="Center"
				TextTransparency={useSpring(
					active || binding ? 0 : hovered ? buttonTheme.foregroundTransparency / 2 : buttonTheme.foregroundTransparency,
					{},
				)}
				Position={px(entry.value !== undefined ? 32 : 14, 0)}
				Size={new UDim2(1, entry.value !== undefined ? -120 : -98, 1, 0)}
				BackgroundTransparency={1}
				ClipsDescendants
			/>

			<textbutton
				Text=""
				AutoButtonColor={false}
				Size={px(72, COMMAND_ROW_HEIGHT - 8)}
				Position={px(198, 4)}
				BackgroundTransparency={1}
				Event={{
					Activated: () => onBind(entry.id),
					MouseEnter: () => {
						setHovered(true);
						dispatch(setHint("<font face='GothamBlack'>Set keybind</font> for this command"));
					},
					MouseLeave: () => {
						setHovered(false);
						dispatch(clearHint());
					},
				}}
			>
				<Icon
					id="keyboard"
					color={foreground}
					size={14}
					position={px(0, 21)}
					anchor={new Vector2(0, 0.5)}
					transparency={binding ? 0 : 0.35}
				/>
				<textlabel
					Text={binding ? "..." : shortcutEnum ? shortcutEnum.Name : "—"}
					Font="GothamBold"
					TextSize={12}
					TextColor3={foreground}
					TextXAlignment="Left"
					TextYAlignment="Center"
					TextTruncate="AtEnd"
					Position={px(18, 0)}
					Size={new UDim2(1, -18, 1, 0)}
					BackgroundTransparency={1}
				/>
			</textbutton>

			{buttonTheme.outlined && <Border color={foreground} transparency={0.8} radius={8} />}

			<textbutton
				Event={{
					Activated: () => runCommand(entry, dispatch, active),
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
				Size={new UDim2(1, -76, 1, 0)}
				Position={px(0, 0)}
				Transparency={1}
			/>

			{expanded && entry.value !== undefined && (
				<Canvas size={px(278, COMMAND_EXPAND_HEIGHT)} position={px(0, COMMAND_ROW_HEIGHT)}>
					<BrightSlider
						onValueChanged={setValue}
						onRelease={() => dispatch(setJobValue(entry.value!.job, math.round(value.getValue())))}
						min={entry.value.min}
						max={entry.value.max}
						initialValue={jobValue}
						size={px(278, 44)}
						position={px(0, 4)}
						radius={8}
						color={sliderTheme.slider.background}
						accentColor={accent}
						borderEnabled={sliderTheme.slider.outlined}
						borderColor={sliderTheme.slider.foreground}
						transparency={sliderTheme.slider.backgroundTransparency}
						indicatorTransparency={sliderTheme.slider.indicatorTransparency}
					>
						<textlabel
							Font="GothamBold"
							Text={value.map((v) => `${math.round(v)} ${entry.value!.units}`)}
							TextSize={13}
							TextColor3={sliderTheme.slider.foreground}
							TextXAlignment="Center"
							TextYAlignment="Center"
							TextTransparency={sliderTheme.slider.foregroundTransparency}
							Size={scale(1, 1)}
							BackgroundTransparency={1}
						/>
					</BrightSlider>
				</Canvas>
			)}
		</Canvas>
	);
}

export default hooked(CommandItem);
