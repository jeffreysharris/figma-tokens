/* eslint-disable import/prefer-default-export */
export function defaultJSON() {
    return {
        spacing: {
            xs: 4,
            sm: 8,
            md: 16,
            lg: 32,
            xl: 96,
        },
        sizing: {
            xs: 4,
            sm: 8,
            md: 16,
            lg: 32,
            xl: 96,
        },
        borderRadius: {
            sm: 4,
            lg: 8,
            xl: 16,
        },
        borderWidth: {
            none: 0,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 8,
        },
        fill: {
            gray: {
                '100': '#f7fafc',
                '200': '#edf2f7',
                '300': '#e2e8f0',
            },
            red: {
                '100': '#fff5f5',
                '200': '#fed7d7',
                '300': '#feb2b2',
            },
        },
        stroke: {
            test: {
                red: '#a80000',
                gray: '#ddd',
            },
        },
        opacity: {
            low: '10%',
            md: '50%',
            high: '90%',
        },
        fontFamilies: {
            heading: 'Inter',
            body: 'Roboto',
        },
        lineHeights: {
            heading: '110%',
            body: '140%',
        },
        fontWeights: {
            headingRegular: 'Regular',
            headingBold: 'Bold',
            bodyRegular: 'Regular',
            bodyBold: 'Bold',
        },
        fontSizes: {
            h1: 28,
            h2: 24,
            h3: 22,
            h4: 20,
            h5: 18,
            h6: 16,
            body: 16,
        },
        typography: {
            'H1/Bold': {
                fontFamily: '$fontFamilies.heading',
                fontWeight: '$fontWeights.headingBold',
                lineHeight: '$lineHeights.heading',
                fontSize: '$fontSizes.h1',
            },
            'H1/Regular': {
                fontFamily: '$fontFamilies.heading',
                fontWeight: '$fontWeights.headingRegular',
                lineHeight: '$lineHeights.heading',
                fontSize: '$fontSizes.h1',
            },
            'H2/Bold': {
                fontFamily: '$fontFamilies.heading',
                fontWeight: '$fontWeights.hedingBold',
                lineHeight: '$lineHeights.heading',
                fontSize: '$fontSizes.h2',
            },
            Body: {
                fontFamily: '$fontFamilies.body',
                fontWeight: '$fontWeights.bodyRegular',
                lineHeight: '$lineHeights.heading',
                fontSize: '$fontSizes.body',
            },
        },
        depth: {
            default: '12px 12px 2px 1px rgba(0, 0, 255, .2)',
        },
    };
}

// export function defaultDecisions() {
//     return {
//         colors: {
//             primary: '$colors.blue',
//             danger: '$colors.red',
//         },
//     };
// }
