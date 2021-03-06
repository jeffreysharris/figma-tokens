import {Menu, MenuList, MenuButton, MenuItem} from '@reach/menu-button';
import '@reach/menu-button/styles.css';
import * as React from 'react';
import Icon from './Icon';
import {useTokenState} from '../store/TokenContext';
type MenuProps = {
    properties: Array<Record<string, any>>;
    clickHandler: (givenProperties: any, isActive?: boolean) => void;
    showValue: boolean;
    name: string;
    path: string;
    value: string;
};

const EditButton = React.forwardRef<HTMLDivElement, MenuProps>((props, forwardedRef) => {
    const {selectionValues} = useTokenState();
    const visibleProperties = props.properties.filter((p) => p.label);
    return (
        <div className="w-full h-full" ref={forwardedRef} {...props}>
            <Menu>
                <MenuButton className="button-text">{props.showValue && props.name}</MenuButton>
                <MenuList className="reach-menu-list">
                    {visibleProperties.map((property) => {
                        const isActive = selectionValues[property.name] === `${props.path}.${props.value}`;
                        return (
                            <MenuItem
                                key={property.label}
                                onContextMenu={(e) => {
                                    e.stopPropagation();
                                }}
                                onSelect={() => props.clickHandler([property.name], isActive)}
                            >
                                <div className="flex items-center">
                                    {property.icon && (
                                        <div className="mr-2">
                                            <Icon name={property.icon} />
                                        </div>
                                    )}
                                    {isActive && '✔'}
                                    {property.label}
                                </div>
                            </MenuItem>
                        );
                    })}
                </MenuList>
            </Menu>
        </div>
    );
});

export default EditButton;
