-----------------
--- Immediate ---

[X] Bug -- Account for decimals in depth

[X] Bug -- Border radius, spacing, sizing doesn't work with strings e.g. 'px'

[X] Publish for team

----------------
--- Up Next? ---

[ ] Applying Styles in Figma should also apply relevant tokens

[ ] Deleting a token from library should remove from nodes as well

[ ] Re-sizeable panel height?

[ ] Refresh vs. Import styles
    - Refresh should ignore styles that aren't currently tokens, only update current tokens

[ ] Bug? -- Font-family and font-size are not applied until weight is applied

    - Split this functionality into two separate interactors for "Import color styles", one for fill and one for stroke
    - Is it possible to capture the style update message automatically from Figma? If not, would it be good to have a separate "refresh" button?

[ ] Import typography styles
    - Should also split into line-height, font-size, etc. tokens

[ ] Import / export JSON instead of just copy/paste?:
    - Drop "Reset to Default / Clear / Save & Update" paradigm?
    - Parse file structure for supported properties and build the groups
    - Export new doc with changes, Save As dialog

[ ] Swap "clone" snippet function for Figma helper function

---------------
--- Future? ---

Recursively deal with children?? Not sure about value vs. the effort, perf cost, and edge cases...
[ ] Need to rollup all tokens from group, frame
[ ] Bug -- Multi-selection doesn't show tokens in common between selection items.. problem with MergeTokens()?
[ ] Can we cascade changes down applied at frame level? E.g. I apply a font at the frame level, and it affects all text within the frame

==================================================================

[X] Put MC styles in here

[X] Inspector tab needs to be like:
    atoms.borderRadius.xl, and closer to JSON, copy/paste okay
    Apply Tokens | Inspect Layer Tokens | Inspect All Tokens

[X] Ensure property names in JSON work with JSX/JSS

[X] Change name, version, license etc.

[X] Importing color styles needs to split between fill and border(?)
    - Figma doesn't differentiate PaintStyle between fill and stroke. Solution is to dupe each Figma style as both fill and stroke?

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
