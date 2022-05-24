/*
 * Copyright (c) 2016-2022 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ClrButton, ClrButtonGroup, ClrPopoverToggleService } from '@clr/angular';
import { action } from '@storybook/addon-actions';
import { Parameters } from '@storybook/addons';
import { Story } from '@storybook/angular';
import { NgModuleMetadata } from '@storybook/angular/dist/ts3.9/client/preview/types';

import { setupStorybook } from '../../../../.storybook/helpers';

const defaultStory: Story = args => ({
  template: `
<clr-button-group>
  <clr-button
    [class]="class"
    [clrInMenu]="clrInMenu"
    [disabled]="disabled"
    (click)="click($event)">
    {{content}}
  </clr-button>
</clr-button-group>`,
  props: { ...args },
});

const defaultParameters: Parameters = {
  title: 'Button/Button',
  component: ClrButton,
  argTypes: {
    // inputs
    class: { defaultValue: 'btn' },
    clrInMenu: { defaultValue: false },
    disabled: { defaultValue: false, control: { type: 'boolean' } },
    // outputs
    click: { control: { disable: true } },
    // methods
    emitClick: { control: { disable: true }, table: { disable: true } },
    loadingStateChange: { control: { disable: true }, table: { disable: true } },
  },
  args: {
    // outputs
    click: action('click'),
    // story helpers
    content: 'Hello World!',
  },
};

const variants: Parameters[] = [
  {
    disabled: false,
  },
  {
    disabled: true,
  },
];

const metaData: Partial<NgModuleMetadata> = {
  providers: [ClrPopoverToggleService],
  declarations: [ClrButtonGroup, ClrButton],
};

setupStorybook(defaultStory, defaultParameters, variants, metaData);
