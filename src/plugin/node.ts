/* eslint-disable default-case */
import objectPath from 'object-path';
import {convertToFigmaColor, convertToFigmaShadow, stripVal} from './helpers';
import {fetchAllPluginData} from './pluginData';
import {setTextValuesOnTarget} from './styles';
import store from './store';
import * as pjs from '../../package.json';

export function updateNodes(nodes, tokens) {
    const returnedValues = nodes.map((node) => {
        const data = fetchAllPluginData(node);
        if (data) {
            const mappedValues = mapValuesToTokens(tokens, data);
            setValuesOnNode(node, mappedValues, data);
            store.successfulNodes.push(node);
            return data;
        }
    });

    return returnedValues[0];
}

export function mapValuesToTokens(object, values) {
    const array = Object.entries(values).map(([key, value]) => ({[key]: objectPath.get(object, value)}));
    array.map((item) => ({[item.key]: item.value}));
    return Object.assign({}, ...array);
}

export function setTokenData(tokens) {
    figma.root.setSharedPluginData('tokens', 'version', pjs.version);
    figma.root.setSharedPluginData('tokens', 'values', JSON.stringify(tokens));
}

export function getTokenData() {
    const values = figma.root.getSharedPluginData('tokens', 'values');
    const version = figma.root.getSharedPluginData('tokens', 'version');
    if (values) {
        const parsedValues = JSON.parse(values);
        return {values: parsedValues, version};
    }
}

export function goToNode(id) {
    const node = figma.getNodeById(id);
    if (node?.type === 'INSTANCE') {
        figma.currentPage.selection = [node];
        figma.viewport.scrollAndZoomIntoView([node]);
    }
}

export async function setValuesOnNode(node, values, data) {
    // BORDER RADIUS
    if (values.borderRadius) {
        if (typeof node.cornerRadius !== 'undefined') {
            node.cornerRadius = stripVal(values.borderRadius) || stripVal(values.borderRadiusTopLeft);
        }
    }
    if (values.borderRadiusTopLeft) {
        if (typeof node.topLeftRadius !== 'undefined') {
            node.topLeftRadius = stripVal(values.borderRadiusTopLeft);
        }
    }
    if (values.borderRadiusTopRight) {
        if (typeof node.topRightRadius !== 'undefined') {
            node.topRightRadius = stripVal(values.borderRadiusTopRight);
        }
    }
    if (values.borderRadiusBottomRight) {
        if (typeof node.bottomRightRadius !== 'undefined') {
            node.bottomRightRadius = stripVal(values.borderRadiusBottomRight);
        }
    }
    if (values.borderRadiusBottomLeft) {
        if (typeof node.bottomLeftRadius !== 'undefined') {
            node.bottomLeftRadius = stripVal(values.borderRadiusBottomLeft);
        }
    }

    // BORDER WIDTH
    if (values.borderWidth) {
        // Has to be larger than 0
        if (typeof node.strokeWeight !== 'undefined' && stripVal(values.borderWidth) >= 0) {
            node.strokeWeight = stripVal(values.borderWidth);
        }
    }

    // OPACITY
    if (values.opacity) {
        if (typeof node.opacity !== 'undefined') {
            let num;
            if (values.opacity.match(/(\d+%)/)) {
                num = values.opacity.match(/(\d+%)/)[0].slice(0, -1) / 100;
            } else {
                num = stripVal(values.opacity);
            }
            node.opacity = num;
        }
    }

    // SIZING: BOTH
    if (values.sizing) {
        if (typeof node.resize !== 'undefined') {
            node.resize(stripVal(values.sizing), stripVal(values.sizing));
        }
    }

    // SIZING: WIDTH
    if (values.width) {
        if (typeof node.resize !== 'undefined') {
            node.resize(stripVal(values.width), node.height);
        }
    }

    // SIZING: HEIGHT
    if (values.height) {
        if (typeof node.resize !== 'undefined') {
            node.resize(node.width, stripVal(values.height));
        }
    }

    // FILL
    if (values.fill && typeof values.fill === 'string') {
        if (typeof node.fills !== 'undefined') {
            const paints = figma.getLocalPaintStyles();
            const path = data.fill.split('.');
            const pathname = path.slice(1, path.length).join('/');
            const matchingStyles = paints.filter((n) => n.name === pathname);
            const {color, opacity} = convertToFigmaColor(values.fill);
            if (matchingStyles.length) {
                // matchingStyles[0].paints = [{color, opacity, type: 'SOLID'}];
                node.fillStyleId = matchingStyles[0].id;
            } else {
                node.fills = [{type: 'SOLID', color, opacity}];
            }
        }
    }

    // TYPOGRAPHY
    // Either set typography or individual values, if typography is present we prefer that.
    if (values.typography) {
        if (node.type === 'TEXT') {
            const styles = figma.getLocalTextStyles();
            const path = data.typography.split('.'); // extract to helper fn
            const pathname = path.slice(1, path.length).join('/');
            const matchingStyles = styles.filter((n) => n.name === pathname);

            if (matchingStyles.length) {
                node.textStyleId = matchingStyles[0].id;
            } else {
                setTextValuesOnTarget(node, values.typography);
            }
        }
    } else if (values.fontFamilies || values.fontWeights || values.lineHeights || values.fontSizes) {
        if (node.type === 'TEXT') {
            setTextValuesOnTarget(node, {
                fontFamily: values.fontFamilies,
                fontWeight: values.fontWeights,
                lineHeight: stripVal(values.lineHeights),
                fontSize: stripVal(values.fontSizes),
            });
        }
    }

    // STROKE
    if (values.stroke && typeof values.stroke === 'string') {
        if (typeof node.strokes !== 'undefined') {
            const paints = figma.getLocalPaintStyles();
            const path = data.stroke.split('.');
            const pathname = path.slice(1, path.length).join('/');
            const matchingStyles = paints.filter((n) => n.name === pathname);
            const {color, opacity} = convertToFigmaColor(values.stroke);

            if (matchingStyles.length) {
                // matchingStyles[0].paints = [{color, opacity, type: 'SOLID'}];
                node.strokeStyleId = matchingStyles[0].id;
            } else {
                node.strokes = [{type: 'SOLID', color, opacity}];
            }
        }
    }

    // SPACING

    // horizontalPadding and verticalPadding have been deprecated!
    // can be different with new autoLayout update

    if (values.spacing) {
        node.paddingLeft = stripVal(values.spacing);
        node.paddingRight = stripVal(values.spacing);
        node.paddingTop = stripVal(values.spacing);
        node.paddingBottom = stripVal(values.spacing);
        node.itemSpacing = stripVal(values.spacing);
    }
    if (values.paddingLeft) {
        if (typeof node.paddingLeft !== 'undefined') {
            node.paddingLeft = stripVal(values.paddingLeft);
        }
    }
    if (values.paddingRight) {
        if (typeof node.paddingRight !== 'undefined') {
            node.paddingRight = stripVal(values.paddingRight);
        }
    }
    if (values.paddingTop) {
        if (typeof node.paddingTop !== 'undefined') {
            node.paddingTop = stripVal(values.paddingTop);
        }
    }
    if (values.paddingBottom) {
        if (typeof node.paddingBottom !== 'undefined') {
            node.paddingBottom = stripVal(values.paddingBottom);
        }
    }
    if (values.itemSpacing) {
        if (typeof node.itemSpacing !== 'undefined') {
            node.itemSpacing = stripVal(values.itemSpacing);
        }
    }

    // DEPTH
    if (values.depth) {
        if (typeof node.effects !== 'undefined') {
            const effects = figma.getLocalEffectStyles();
            const path = data.depth.split('.');
            const pathname = path.slice(1, path.length).join('/');
            const matchingStyles = effects.filter((n) => n.name === pathname);
            const shadows = convertToFigmaShadow(values.depth);
            if (matchingStyles.length) {
                node.effectStyleId = matchingStyles[0].id;
            } else {
                // convertToFigmaShadow will return an array of effect objects
                node.effects = shadows;
            }
        }
    }
}

export async function removeValuesFromNode(node, prop) {
    // BORDER RADIUS
    switch (prop) {
        case 'borderRadius':
            if (typeof node.cornerRadius !== 'undefined') {
                node.cornerRadius = 0;
            }
            break;
        case 'borderRadiusTopLeft':
            if (typeof node.cornerRadius !== 'undefined') {
                node.topLeftRadius = 0;
            }
            break;
        case 'borderRadiusTopRight':
            if (typeof node.cornerRadius !== 'undefined') {
                node.topRightRadius = 0;
            }
            break;
        case 'borderRadiusBottomRight':
            if (typeof node.cornerRadius !== 'undefined') {
                node.bottomRightRadius = 0;
            }
            break;
        case 'borderRadiusBottomLeft':
            if (typeof node.cornerRadius !== 'undefined') {
                node.bottomLeftRadius = 0;
            }
            break;
        case 'borderWidth':
            if (typeof node.strokeWeight !== 'undefined') {
                node.strokeWeight = 0;
            }
            break;
        case 'opacity':
            if (typeof node.opacity !== 'undefined') {
                node.opacity = 1;
            }
            break;
        case 'fill':
            if (typeof node.fills !== 'undefined') {
                node.fills = [];
            }
            break;
        case 'stroke':
            if (typeof node.strokes !== 'undefined') {
                node.strokes = [];
            }
            break;
        case 'spacing':
            if (typeof node.paddingLeft !== 'undefined') {
                node.paddingLeft = 0;
                node.paddingRight = 0;
                node.paddingTop = 0;
                node.paddingBottom = 0;
                node.itemSpacing = 0;
            }
            break;
        case 'paddingLeft':
            if (typeof node.paddingLeft !== 'undefined') {
                node.paddingLeft = 0;
            }
            break;
        case 'paddingRight':
            if (typeof node.paddingRight !== 'undefined') {
                node.paddingRight = 0;
            }
            break;
        case 'paddingTop':
            if (typeof node.paddingTop !== 'undefined') {
                node.paddingTop = 0;
            }
            break;
        case 'paddingBottom':
            if (typeof node.paddingBottom !== 'undefined') {
                node.paddingBottom = 0;
            }
            break;
        case 'itemSpacing':
            if (typeof node.itemSpacing !== 'undefined') {
                node.itemSpacing = 0;
            }
            break;
        case 'depth':
            if (typeof node.effects !== 'undefined') {
                node.effects = [];
            }
    }
}
