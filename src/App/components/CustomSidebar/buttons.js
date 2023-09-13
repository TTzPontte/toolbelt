import React from 'react';
import { Button } from 'pipestyle';
import '~pipestyle/assets/button.module.css';

const Buttons = () => {
    return (
        <div>
            <Button>Primary</Button>
            <Button theme="secondary">Primary</Button>
            <Button theme="outline">Outline</Button>
            <Button theme="borderless">Borderless</Button>
            <Button theme="icon" icon="i-star" />
            <Button theme="counter" iconLeft="i-attachments" counter={32}>Counter</Button>

            // Button with icons
            <Button size="xs" icon="i-star">XSmall</Button>
            <Button size="sm" icon="i-star" round>Small</Button>
            <Button size="md" theme="outline" iconRight="i-star">Medium</Button>

            // Button with colors
            <Button color="red">Button red</Button>
            <Button color="lime">Button lime</Button>
            <Button color="orange">Button orange</Button>
            <Button color="pink">Button pink</Button>
        </div>
    );
};

export default Buttons;