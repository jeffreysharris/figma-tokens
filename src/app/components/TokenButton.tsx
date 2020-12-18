import * as React from 'react';
// import {Menu, MenuList, MenuButton, MenuItem} from '@reach/menu-button';
// import {showMenu} from 'react-contextmenu';
import Tooltip from './Tooltip';
import MoreButton from './MoreButton';
import EditButton from './EditButton';
import {useTokenState, useTokenDispatch} from '../store/TokenContext';
import Icon from './Icon';
import {lightOrDark, colorByHashCode} from './utils';

const TokenButton = ({type, property, name, path, token, editMode, showForm}) => {
    const {colorMode, displayType, selectionValues, tokenData, disabled} = useTokenState();
    const {setNodeData, setShowOptions, setLoading, deleteToken} = useTokenDispatch();
    const realTokenValue = tokenData.getAliasValue(token);
    const displayValue = realTokenValue || token;
    let style;
    let showValue = true;
    let showEditButton = false;
    let properties = [type];
    const buttonClass = [];

    const handleEditClick = () => {
        setShowOptions(property);
        showForm({name, token, path});
    };

    const handleDeleteClick = () => {
        deleteToken({parent: 'options', path, name});
    };

    function setPluginValue(value) {
        setLoading(true);
        setNodeData(value);
    }

    if (colorMode) {
        style = {
            '--bgColor': colorByHashCode(name.toString()),
            backgroundColor: 'hsl(var(--bgColor))',
        };
    }
    switch (type) {
        case 'borderRadius':
            style = {...style, borderRadius: `${displayValue}px`};
            properties = [
                {
                    label: 'All',
                    name: 'borderRadius',
                    clear: [
                        'borderRadiusTopLeft',
                        'borderRadiusTopRight',
                        'borderRadiusBottomRight',
                        'borderRadiusBottomLeft',
                    ],
                },
                {label: 'Top Left', name: 'borderRadiusTopLeft'},
                {label: 'Top Right', name: 'borderRadiusTopRight'},
                {label: 'Bottom Right', name: 'borderRadiusBottomRight'},
                {label: 'Bottom Left', name: 'borderRadiusBottomLeft'},
            ];
            break;
        case 'opacity':
            style = {
                ...style,
                backgroundColor: `rgba(0,0,0, ${Number(displayValue.slice(0, displayValue.length - 1)) / 100})`,
            };
            break;
        case 'spacing':
            properties = [
                {
                    label: 'All',
                    icon: 'Spacing',
                    name: 'spacing',
                    clear: ['paddingLeft', 'paddingRight', 'verticalPadding', 'itemSpacing'],
                },
                {label: 'Left', name: 'paddingLeft', icon: 'LeftPadding'},
                {label: 'Right', name: 'paddingRight', icon: 'RightPadding'},
                {label: 'Vertical', name: 'verticalPadding', icon: 'VerticalPadding'},
                {label: 'Gap', name: 'itemSpacing', icon: 'Gap'},
            ];
            break;
        case 'sizing':
            properties = [
                {
                    label: 'All',
                    name: 'sizing',
                    clear: ['width', 'height'],
                },
                {label: 'Width', name: 'width'},
                {label: 'Height', name: 'height'},
            ];
            break;
        case 'fill':
            showValue = false;
            properties = [
                {
                    label: 'Fill',
                    name: 'fill',
                },
            ];
            style = {
                '--backgroundColor': displayValue,
                '--borderColor': lightOrDark(displayValue) === 'light' ? '#f5f5f5' : 'white',
            };
            buttonClass.push('button-property-color');
            if (displayType === 'LIST') {
                buttonClass.push('button-property-color-listing');
                showValue = true;
                if (!editMode) showEditButton = true;
            }
            break;
        case 'stroke':
            showValue = false;
            properties = [
                {
                    label: 'Stroke',
                    name: 'stroke',
                },
            ];
            style = {
                '--backgroundColor': '#fff',
                '--borderColor': displayValue,
            };
            buttonClass.push('button-property-color button-property-color-stroke');
            if (displayType === 'LIST') {
                buttonClass.push('button-property-color-listing');
                showValue = true;
                if (!editMode) showEditButton = true;
            }
            break;
        case 'depth':
            properties = [
                {
                    label: 'Depth',
                    name: 'depth',
                },
            ];
            style = {
                boxShadow: displayValue,
            };
            break;
        default:
            break;
    }

    const active = selectionValues[type] === [path, name].join('.');
    const semiActive = properties.some((prop) => selectionValues[prop.name] === [path, name].join('.'));

    if (editMode) {
        buttonClass.push('button-edit');
    }
    if (active) {
        buttonClass.push('button-active');
    } else if (semiActive) {
        buttonClass.push('button-semi-active');
    }

    const onClick = (givenProperties, isActive = active) => {
        const propsToSet = Array.isArray(givenProperties) ? givenProperties : new Array(givenProperties);
        if (editMode) {
            showForm({name, token, path});
        } else {
            const tokenValue = [path, name].join('.');
            let value = isActive ? 'delete' : tokenValue;
            if (propsToSet[0].clear && !active) {
                value = 'delete';
                propsToSet[0].forcedValue = tokenValue;
            }
            const newProps = {
                [propsToSet[0].name || propsToSet[0]]: propsToSet[0].forcedValue || value,
            };
            if (propsToSet[0].clear) propsToSet[0].clear.map((item) => Object.assign(newProps, {[item]: 'delete'}));
            setPluginValue(newProps);
        }
    };

    let button;

    if (properties.length > 1) {
        button = (
            <EditButton
                properties={properties}
                onClick={onClick}
                showValue={showValue}
                name={name}
                path={path}
                value={name}
            />
        );
    } else {
        button = (
            <button
                className="w-full h-full"
                disabled={editMode ? false : disabled}
                type="button"
                onClick={() => onClick(properties[0])}
            >
                <div className="button-text">{showValue && <span>{name}</span>}</div>
                {editMode && <div className="button-edit-overlay">Edit</div>}
            </button>
        );
    }

    return (
        <div
            className={`relative mb-1 mr-1 flex button button-property ${buttonClass.join(' ')} ${
                disabled && 'button-disabled'
            } `}
            style={style}
        >
            <MoreButton
                // properties={properties}
                // onClick={onClick}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
                value={name}
                path={path}
            >
                <Tooltip
                    label={`${name}: ${JSON.stringify(token, null, 2)}${realTokenValue ? `: ${realTokenValue}` : ''}`}
                >
                    {button}
                </Tooltip>
            </MoreButton>
            {showEditButton && (
                <Tooltip label="Edit Token">
                    <button
                        className="ml-auto button button-ghost button-property-edit"
                        type="button"
                        onClick={handleEditClick}
                    >
                        <Icon name="edit" />
                    </button>
                </Tooltip>
            )}
        </div>
    );
};

export default TokenButton;
