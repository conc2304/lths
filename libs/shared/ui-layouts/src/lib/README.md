# MUI Customization Guidelines

## zIndex
Several MUI components utilize z-index, employing a default z-index scale in MUI that has been designed to properly layer drawers, modals, snackbars, tooltips, and more.

The z-index values start at an arbitrary number, high and specific enough to ideally avoid conflicts:

| Component  |  zIndex Value |
| ------------ | ------------ |
| mobile stepper  | 1000  |
| fab | 1050  |
| speed dial |  1050 |
| app bar  | 1100  |
| drawer | 1200  |
| modal  | 1300  |
| snackbar  | 1400  |
| tooltip  | 1500  |

These values can always be customized. You will find them in the theme under the zIndex key of the theme. Customization of individual values is discouraged; should you change one, you likely need to change them all.