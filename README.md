<h1 align="center">:whale2: Orca</h1>
<div align="center">A free and open-source Roblox script hub</div>
<br>
<div align="center">
	<a href="https://github.com/joshhhie/orcaNV/actions"><img src="https://github.com/richie0866/orca/actions/workflows/eslint.yaml/badge.svg" alt="ESLint Status" /></a>
	<a href="https://github.com/joshhhie/orcaNV/releases/latest"><img src="https://img.shields.io/github/v/release/richie0866/orca?include_prereleases" alt="Latest Release" /></a>
</div>
<div>&nbsp;</div>

## :whale2: Introduction

**Orca** is a **general-purpose** Roblox script hub designed to make convenient tasks **easy** and **satisfying**.

Use many different **action cards** on the [**Home**](https://github.com/joshhhie/orcaNV#house-home) and [**Apps**](https://github.com/joshhhie/orcaNV#iphone-apps) page, browse tabbed **Commands** on [**Options**](https://github.com/joshhhie/orcaNV#gear-options), or check out featured scripts on the [**Scripts**](https://github.com/joshhhie/orcaNV#newspaper-scripts) page.

Press `K` to open or close Orca. For the best experience, a 1080p monitor or above is recommended!

&nbsp;

## :rocket: Quick start

When run with auto-execution, Orca will start minimized by default.

### :pushpin: Latest release

Runs the latest release build of Orca from **joshhhie/orcaNV**.

```lua
loadstring(
  game:HttpGetAsync("https://raw.githubusercontent.com/joshhhie/orcaNV/master/public/latest.lua")
)()
```

### :construction: Upstream (richie0866/orca)

Original upstream build.

```lua
loadstring(
  game:HttpGetAsync("https://raw.githubusercontent.com/richie0866/orca/master/public/latest.lua")
)()
```

### :construction: Nightly snapshot

Runs a snapshot of new updates we have not published yet. You will get new features earlier, but they may be unstable.

```lua
loadstring(
  game:HttpGetAsync("https://raw.githubusercontent.com/joshhhie/orcaNV/master/public/snapshot.lua")
)()
```

&nbsp;

## :books: Navigation

### :house: Home

The **Home** page has a handful of intuitive information and action cards.

- :blush: **Profile** - You, and some actions that modify your character.

  - :radio_button: **Sliders** - Flight, walk speed, and jump height
  - :radio_button: **Buttons** - Refresh, ghost, godmode, or freecam

- :desktop_computer: **Server** - Your server, and options to rejoin or server hop. Tap again to cancel.

- :video_game: **Friend Activity** - A list of games your friends are playing.

### :iphone: Apps

The **Apps** page acts as a hub for general and miscellaneous features.

- :hugs: **Players** - A selection of players and some actions you can perform on them.

  - :radio_button: **Goto** - Moves your character to theirs. Tap again to cancel.
  - :radio_button: **Hide** - Hides their character locally until disabled. Persists between players.
  - :radio_button: **Kill** - Uses a tool with a handle to "bind" to their character and teleport to the void.
  - :radio_button: **Spectate** - Toggles a third-person view of their character. Disables when they respawn or the subject changes.

### :newspaper: Scripts

The **Scripts** page is a collection of community-favorites and showcases you should try.

**Showcases (default cards):**

- :books: **Vape V4** - Bedwars-focused client with tabbed modules

```lua
loadstring(game:HttpGet("https://raw.githubusercontent.com/joshhhie/vapeNV/main/NewMainScript.lua", true))()
```

- :whale2: **Orca** - This script hub

```lua
loadstring(game:HttpGetAsync("https://raw.githubusercontent.com/joshhhie/orcaNV/master/public/latest.lua"))()
```

**Community scripts:**

- :shield: **CMD-X** - https://github.com/CMD-X
- :shield: **Infinite Yield** - https://github.com/EdgeIY
- :mag_right: **Dex Explorer** - https://github.com/LorekeeperZinnia
- :mag_right: **Unnamed ESP** - https://github.com/ic3w0lf22
- :books: **EvoV2** - https://projectevo.xyz

### :gear: Options

The **Options** page lets you configure theming, shortcuts, and commands.

- :keyboard: **Commands** - Tabbed, collapsible sections (animated with Flipper springs) listing actions you can run:

  - **Character** - Refresh, ghost, godmode, freecam, flight, walk speed, jump height
  - **Server** - Rejoin or switch server
  - **Scripts** - One-tap loadstring for Vape V4, Orca, Infinite Yield, CMD-X
  - **Settings** - Acrylic background blur toggle

  Tap a section header to collapse or expand it. Add more entries in `src/views/Pages/Options/Commands/registry.ts`.

- :keyboard: **Shortcuts** - Keybind configuration

- :art: **Themes** - Set theme

&nbsp;

## :sparkling_heart: Support

- :white_check_mark: ScriptWare
- :white_check_mark: Synapse X
- :white_check_mark: Krnl
