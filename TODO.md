[X] Inspector tab needs to be like:
    atoms.borderRadius.xl, and closer to JSON, copy/paste okay
    [ ] Need to rollup all tokens from group, frame

Apply Tokens | Inspect Layer Tokens | Inspect All Tokens

I need to apply tokens on a layer
I need to inspect and copy the layer tokens code
I need to view and edit the total tokens code

---
[ ] Change name, version, license etc.
    [ ] How is it displayed in the plugin?

[ ] Importing color styles needs to split between fill and border(?)

[ ] Bug? -- Font-family and font-size are not applied until weight is applied

[ ] Can we cascade changes down applied at frame level? E.g. I apply a font at the frame level, and it affects all text within the frame
    - Split this functionality into two separate interactors for "Import color styles", one for fill and one for stroke
    - Is it possible to capture the style update message automatically from Figma? If not, would it be good to have a separate "refresh" button?

[ ] Import typography styles
    - Should also split into line-height, font-size, etc. tokens (this behavior may already be in the plugin)

[ ] Import / export JSON:
    - Drop "Reset to Default / Clear / Save & Update" paradigm?
    - Parse file structure for supported properties and build the groups
    - Export new doc with changes, Save As dialog

[ ] Swap "clone" snippet function for Figma helper function

[ ] Bug -- Multi-selection doesn't show tokens in common between selection items.. problem with MergeTokens()?

==================================================================

[X] Change menu clicking behavior:
[X] If there are sub-options like in Spacing, left-click opens menu
[X] Left click opens a menu of properties
[X] Menu items should not open contextmenu
[X] No left-click menu if there is only one property to adjust
[X] Right click only opens "edit/delete" options
[X] Style menu (rounded corners, highlight color, etc.)
[?] Some options logic is broken, e.g. shouldn't be able to set both "All" and "Top Right" for "Border Radius" (May not be critical)
[X] Bug -- Tooltip isn't showing on :hover with menu-button
[X] Fix the deprecated spacing issue to meet new AutoLayout standard - Needs to change menu to say "Top, Bottom, ..." etc.

[?] Bug -- Depth example disappears from the Depth buttons when switching between Tokens/JSON/Inspector tabs

[X] Bug -- Stroke color/width isn't removed in styles pane when toggling token

[X] Import effect styles

[X] Bug -- Remove tokens from layer leaves drop-shadow effect in place

[\] Bug -- Both color and depth don't update JSON and tokens if you edit the corresponding Figma style. (This is in the original plugin as well.)

-   "Import color styles" will update the tokens/JSON. This now falls under the "Importing color styles" fill/border bug.

[X] Bug -- if you create styles from tokens and have applied tokens to a node, it doesn't then automatically connect those styles to the node as well. You have to disconnect the tokens and re-apply. (This is in original plugin as well.)

[X] Bug -- "Import colors" button creates a "Colors" group. Still based on original version of plugin??

-   Corrected, but created another bug since we now have to parse between Fill and Stroke. Current functionality only considers as Fill. How to create delineation?

[X] Change border button styling to show color as outline instead of fill

[X] "Create styles" option for Depth tokens
