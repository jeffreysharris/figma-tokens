/* eslint-disable no-param-reassign */
import {figmaRGBToHex, clone} from '@figma-plugin/helpers';
import Dot from 'dot-object';
import {convertLineHeightToFigma, convertToFigmaColor, convertToFigmaShadow} from './helpers';
import {notifyStyleValues} from './notifiers';

const dot = new Dot('/');

interface TextStyle {
    familyName: string;
    fontWeight: string;
    fontSize: number;
    lineHeight: string | number;
}

const updateColorStyles = (colorTokens, shouldCreate = false) => {
    const cols = dot.dot(colorTokens);
    const paints = figma.getLocalPaintStyles();
    Object.entries(cols).map(([key, value]) => {
        const matchingStyle = paints.filter((n) => n.name === key);
        if (typeof value === 'string') {
            const {color, opacity} = convertToFigmaColor(value);
            if (matchingStyle.length) {
                matchingStyle[0].paints = [{color, opacity, type: 'SOLID'}];
            } else if (shouldCreate) {
                const newStyle = figma.createPaintStyle();
                newStyle.paints = [{color, opacity, type: 'SOLID'}];
                newStyle.name = key;
            }
        }
    });
};

const updateEffectStyles = (depthTokens, shouldCreate = false) => {
    const cols = dot.dot(depthTokens);
    const effects = figma.getLocalEffectStyles();
    Object.entries(cols).map(([key, value]) => {
        const matchingStyle = effects.filter((n) => n.name === key);
        if (typeof value === 'string') {
            const shadows = convertToFigmaShadow(value);
            console.log(shadows);
            if (matchingStyle.length) {
                let fx = clone(matchingStyle[0].effects);
                fx = shadows;
                matchingStyle[0].effects = fx;
            } else if (shouldCreate) {
                const newStyle = figma.createEffectStyle();
                let fx = clone(newStyle.effects);
                fx = shadows;
                newStyle.effects = fx;
                newStyle.name = key;
            }
        }
    });
};

export const setTextValuesOnTarget = async (target, values) => {
    const {fontFamily, fontWeight, fontSize, lineHeight} = values;
    const family = fontFamily || target.fontName.family;
    const style = fontWeight || target.fontName.style;
    await figma.loadFontAsync({family, style});

    if (fontFamily && fontWeight) {
        target.fontName = {
            family,
            style,
        };
    }

    if (fontSize) {
        target.fontSize = Number(fontSize);
    }
    if (lineHeight) {
        target.lineHeight = convertLineHeightToFigma(lineHeight);
    }
};

const updateTextStyles = (textTokens, shouldCreate = false) => {
    const cols = dot.dot(textTokens);
    // Iterate over textTokens to create objects that match figma styles
    // e.g. H1/Bold ...
    const tokenObj = Object.entries(cols).reduce((acc, [key, val]) => {
        // Split token object by `/`
        let parrentKey: string | string[] = key.split('/');

        // Store current key for future reference, e.g. fontFamily, lineHeight and remove it from key
        const curKey = parrentKey.pop();

        // Merge object again, now that we have the parent reference
        parrentKey = parrentKey.join('/');
        acc[parrentKey] = acc[parrentKey] || {};
        Object.assign(acc[parrentKey], {[curKey]: val});
        return acc;
    }, {});

    const textStyles = figma.getLocalTextStyles();

    Object.entries(tokenObj).map(([key, value]: [string, TextStyle]): void => {
        const matchingStyle = textStyles.filter((n) => n.name === key);

        if (matchingStyle.length) {
            setTextValuesOnTarget(matchingStyle[0], value);
        } else if (shouldCreate) {
            const style = figma.createTextStyle();
            style.name = key;
            setTextValuesOnTarget(style, value);
        }
    });
};

export function updateStyles(tokens, shouldCreate = false): void {
    if (!tokens.fill && !tokens.stroke && !tokens.typography && !tokens.depth) return;
    if (tokens.fill || tokens.stroke) {
        const combinedColorTokens = Object.assign(tokens.fill, tokens.stroke);
        updateColorStyles(combinedColorTokens, shouldCreate);
    }
    if (tokens.typography) {
        updateTextStyles(tokens.typography, shouldCreate);
    }
    if (tokens.depth) {
        updateEffectStyles(tokens.depth, shouldCreate);
    }
}

export function pullStyles(styleTypes): void {
    let fill;
    // let typography;
    if (styleTypes.colorStyles) {
        fill = figma
            .getLocalPaintStyles()
            .filter((style) => style.paints.length === 1 && style.paints[0].type === 'SOLID')
            .map((style) => {
                const paint = style.paints[0];
                if (paint.type === 'SOLID') {
                    const {r, g, b} = paint.color;
                    const a = paint.opacity;
                    return [style.name, figmaRGBToHex({r, g, b, a})];
                }
                return null;
            });
    }
    // Not used yet, but this is where we fetch text styles and should bring those into values that can be used by our tokens
    // if (styleTypes.textStyles) {
    //     typography = figma.getLocalTextStyles();
    // }
    notifyStyleValues({fill});
}
