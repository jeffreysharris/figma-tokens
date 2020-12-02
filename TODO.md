[ ] Bug -- if you create styles from tokens and have applied tokens to a node, it doesn't then automatically connect those styles to the node as well. You have to disconnect the tokens and re-apply. (This is in original plugin as well.)

[ ] Bug -- Both color and depth don't update JSON and tokens if you edit the corresponding Figma style. (This is in the original plugin as well.)

[ ] Bug -- Remove tokens from layer leaves drop-shadow effect in place

[ ] Importing color styles needs to split between fill and border(?)

[ ] Fix the deprecated spacing issue to meet new AutoLayout standard

[ ] Change menu clicking behavior:
- If there are sub-options like in Spacing, left-click opens menu
- Right click opens "edit/delete" options

[ ] Import effect styles

[ ] Import typography styles

[ ] Import / export JSON:
- Drop "Reset to Default / Clear / Save & Update" paradigm?
- Parse file structure for supported properties and build the groups
- Export new doc with changes, Save As dialog

---

[X] Bug -- "Import colors" button creates a "Colors" group. Still based on original version of plugin??
- Corrected, but created another bug since we now have to parse between Fill and Stroke. Current functionality only considers as Fill. How to create delineation?

[X] Change border button styling to show color as outline instead of fill

[X] "Create styles" option for Depth tokens