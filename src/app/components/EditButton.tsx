import {Menu, MenuList, MenuButton, MenuItem} from '@reach/menu-button';
import * as React from 'react';
/* eslint-disable react/jsx-props-no-spreading */
type MenuProps = {
    properties: Array<Record<string, any>>;
    onClick: (givenProperties: any, isActive?: boolean) => void;
    showValue: boolean;
    name: string;
};

const EditButton = React.forwardRef<HTMLDivElement, MenuProps>((props, forwardedRef) => {
    const visibleProperties = props.properties.filter((p) => p.label);
    return (
        <div className="w-full h-full" ref={forwardedRef} {...props}>
            <Menu>
                <MenuButton className="button-text">{props.name}</MenuButton>
                <MenuList>
                    {visibleProperties.map((property) => {
                        return (
                            <MenuItem
                                onContextMenu={(e) => {
                                    e.stopPropagation();
                                }}
                                onSelect={() => props.onClick}
                            >
                                {props.showValue && property.label}
                            </MenuItem>
                        );
                    })}
                </MenuList>
            </Menu>
        </div>
    );
});

export default EditButton;
