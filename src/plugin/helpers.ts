/* eslint-disable no-param-reassign */
import {webRGBToFigmaRGB, hexToFigmaRGB} from '@figma-plugin/helpers';

interface RGBA {
    r: number;
    g: number;
    b: number;
    a?: number;
}

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach((key) => {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, {[key]: {}});
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, {[key]: source[key]});
            }
        });
    }

    return mergeDeep(target, ...sources);
}

export function convertLineHeightToFigma(inputValue) {
    let lineHeight;
    const value = inputValue.toString();
    const numbers = /^\d+(\.\d+)?$/;
    if (value.match(numbers)) {
        lineHeight = {
            unit: 'PIXELS',
            value: Number(value),
        };
    } else if (value.trim().slice(-1) === '%' && value.trim().slice(0, -1).match(numbers)) {
        lineHeight = {
            unit: 'PERCENT',
            value: Number(value.slice(0, -1)),
        };
    } else {
        lineHeight = {
            unit: 'AUTO',
        };
    }
    return lineHeight;
}

export function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
}

export function convertToFigmaColor(input) {
    let color;
    let opacity;
    if (input.startsWith('rgb')) {
        const rgbValues = input.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
        const {r, g, b, a = 1} = webRGBToFigmaRGB(rgbValues);
        color = {r, g, b};
        opacity = Number(a);
    } else {
        const {r, g, b, a = 1}: RGBA = hexToFigmaRGB(input);
        color = {r, g, b};
        opacity = Number(a);
    }
    return {
        color,
        opacity,
    };
}

export function convertToFigmaShadow(input) {
    /*
    FIGMA FORMAT:
    Expects an array of objects, e.g.

    [
        {
            blendMode: "NORMAL",
            color: {r: 0, g: 0, b: 0, a: 0.25},
            offset: {x: 0, y: 4},
            radius: 4,
            spread: 0,
            type: "DROP_SHADOW",
            visible: true,
        },
        {...}
    ]

    vs.

    CSS BOX-SHADOW:
    offset-x | offset-y | blur-radius | spread-radius | color

    Must have 2:4 length values
    if only 2 given, assume offset-x, offset-y
    if third, assume blur
    if fourth, assume spread

    Can have multiple box-shadows if comma separated, e.g.
    box-shadow: 3px 3px red, -1em 0 0.4em olive;
    */

    let result: (string | object | boolean)[] = [];

    // only supporting drop shadows for now
    const blendMode = 'NORMAL';
    const type = 'DROP_SHADOW';
    const visible = true;

    // split the input to get each box-shadow value (comma separated) in an array
    const arrayOfShadows = input.split(/((?<=\))|(?<=#[A-z]{3,}))\s?,\s?/gi).filter((i: string) => i);

    // split each shadow array on spaces, assume css box-shadow formatting
    arrayOfShadows.forEach((shadow) => {
        const vals = shadow.split(/(?<!,)\s/gi);
        // assume last value must be color per CSS spec
        // reuse the color conversion function AMAP...
        const convertedColor = convertToFigmaColor(vals[vals.length - 1]);
        const color = {
            r: convertedColor.color.r,
            g: convertedColor.color.g,
            b: convertedColor.color.b,
            a: convertedColor.opacity,
        };

        const offset = {
            x: Number(vals[0].replace(/[^-\d]/g, '')),
            y: Number(vals[1].replace(/[^-\d]/g, '')),
        };
        const radius = vals[2] ? Number(vals[2].replace(/[^-\d]/g, '')) : 0;
        const spread = vals[3] ? Number(vals[3].replace(/[^-\d]/g, '')) : 0;
        // must be in this form to set drop-shadow effect in Figma
        result.push({
            blendMode,
            color,
            offset,
            radius,
            spread,
            type,
            visible,
        });
    });

    return result;
}
