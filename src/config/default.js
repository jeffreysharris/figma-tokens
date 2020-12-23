/* eslint-disable import/prefer-default-export */
const white = '#ffffff';
const sectionCardGrey = '#FAF9F8';
const lightestGrey = '#f3f2f1';
const lighterGrey = '#edebe9';
const lightGrey = '#c8c6c4';
const grey = '#a19f9d';
const darkGrey = '#605e5c';
const black = '#323130';

const primaryLight = '#c7e0f4';
const primary = '#0078d4';
const primaryShade = '#106ebe';
const primaryDark = '#0059ae';

const red = '#a80000';
const brightRed = '#C8281F';

const excelGreen = '#107c41';

export function defaultJSON() {
    return {
        spacing: {
            padding: {
                xl: '16px',
                lg: '12px',
                md: '8px',
                sm: '6px',
                xs: '4px',
            },
            margin: {
                jumbo: '64px',
                xxl: '48px',
                xl: '36px',
                lg: '24px',
                md: '16px',
                sm: '8px',
                xs: '2px',
            },
        },
        sizing: {
            xs: 4,
            sm: 8,
            md: 16,
            lg: 32,
            xl: 96,
        },
        borderRadius: {
            standard: '1px',
            interactive: '2px',
            card: '3px',
        },
        borderWidth: {
            standard: '1px',
        },
        fill: {
            fontColors: {
                standard: black,
                subtle: darkGrey,
                disabled: grey,
                inverted: white,
                /** interactive text rest state */
                primary,
                /** interactive text :hover state */
                primaryShade,
                /** interactive text :active state */
                primaryDark,
                /** for message bars */
                messageBarError: red,
                /** for everything else */
                error: brightRed,
            },
            iconColors: {
                standard: black,
                inverted: white,
                /** disabled icon on the standard background */
                disabledOnWhite: lighterGrey,
                /** disabled icon on the secondary (gray) background */
                disabledOnGray: lightGrey,
                /** disabled icon on the black background */
                disabledOnBlack: grey,
                /** info MessageBar icon */
                primary: primaryDark,
                /** success MessageBar iconL */
                success: '#107c10',
                /** warning MessageBar icon */
                warning: '#d06809',
                /** error MessageBar icon */
                error: red,
                /** Excel icon */
                excel: excelGreen,
            },
            backGroundColors: {
                /** standard page and surface background */
                standard: white,
                /** light gray background, e.g. detail pane */
                secondary: lightestGrey,
                /** light grey background, e.g :hover state */
                tertiary: lighterGrey,
                /** light grey background, should only be used for sectionCards with a grey background (e.g. lifecycle actions on the ExpDetails page) */
                sectionCard: sectionCardGrey,
                /** blue background for primary buttons, teaching callouts, etc. */
                primary,
                /** blue background :hover state (blue elements are usually interactive) */
                primaryShade,
                /**  blue background :active state */
                primaryDark,
                black,
                /** info MessageBar background */
                info: primaryLight,
                /** success MessageBar background */
                success: '#dff6dd',
                /** warning MessageBar background */
                warning: '#fff4ce',
                /** error MessageBar background */
                error: '#fde7e9',
                /** used for table Group By field :hover, rare! */
                primaryLightFill: 'rgba(199, 224, 22, 0.2)',
            },
            chartCategoryColors: {
                catOne: '#69afe5',
                catTwo: '#3b606d',
                catThree: '#d84685',
                catFour: '#7164dd',
                catFive: '#ffb444',
                catSix: '#f6765f',
                catSeven: '#7bd1a1',
                catEight: '#4d8a05',
            },
            chartPassFailColors: {
                fail: '#c8281f',
                risk: '#e08a00',
                pass: '#2aa05b',
                riskText: '#cd7e00',
            },
            textPassFailColors: {
                risk: '#cd7e00',
            },
        },
        stroke: {
            cardRest: lightGrey,
            cardDisabled: lighterGrey,
            cardHover: darkGrey,
            cardActive: primary,
            inputRest: grey,
            /** disabled border for inputs */
            inputDisabled: lightGrey,
            inputHover: black,
            inputActive: primary,
            primary,
            primaryLight,
            standard: lightGrey, // [DEVIATION: added this]
            error: red,
            /** :hover for interactive/primary color elements */
            primaryHover: primaryShade,
            /** :active for interactive/primary color elements */
            primaryActive: primaryDark,
        },
        opacity: {
            low: '10%',
            md: '50%',
            high: '90%',
        },
        fontFamilies: {
            heading: 'Segoe UI',
            body: 'Segoe UI',
        },
        lineHeights: {
            /** callout numbers only */
            jumbo: '52px',
            /** page titles */
            title: '32px',
            /** section headers and subheaders */
            header: '28px',
            /** standard text, default size */
            standard: '22px',
            /** labels, inputs, meta data */
            secondary: '20px',
            /** tooltips */
            tooltip: '16px',
        },
        fontWeights: {
            headingRegular: 'Regular',
            headingBold: 'Bold',
            bodyRegular: 'Regular',
            bodyBold: 'Bold',
        },
        fontSizes: {
            standard: '14px',
            input: '14px',
            header: '17px',
            xxl: '28px',
        },
        typography: {
            data: {
                fontFamily: '$fontFamilies.body',
                fontWeight: '$fontWeights.bodyRegular',
                fontSize: '$fontSizes.standard',
                lineHeight: '$lineHeights.secondary',
            },
        },
        depth: {
            /** e.g. dropdowns and tooltips */
            mid: '0px 1.2px 3.6px rgba(0, 0, 0, 0.108), 0px 6.4px 14.4px rgba(0, 0, 0, 0.132)',
            /** blocking modal elements like config panel and dialogs */
            high: '0px 4.8px 14.4px rgba(0, 0, 0, 0.18), 0px 25.6px 57.6px rgba(0, 0, 0, 0.22)',
        },
    };
}
