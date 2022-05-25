/*
 * Copyright (c) 2016-2022 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ClrCheckbox, ClrCheckboxContainer, ClrCheckboxWrapper, ClrLabel } from '@clr/angular';
import { Parameters } from '@storybook/addons';
import { Story } from '@storybook/angular';
import { NgModuleMetadata } from '@storybook/angular/dist/ts3.9/client/preview/types';

import { setupStorybook } from '../../../../../.storybook/helpers';

const defaultStory: Story = args => ({
  template: `
<clr-checkbox-container [clrInline]="clrInline">
  <clr-checkbox-wrapper *ngFor="let _ of createArray(checkboxCount); let i = index">
    <input type="checkbox" clrCheckbox [checked]="checked" />
    <label>{{content}} {{i + 1}}</label>
  </clr-checkbox-wrapper>
</clr-checkbox-container>`,
  props: { ...args },
});

const defaultParameters: Parameters = {
  title: 'Checkbox/Checkbox',
  component: ClrCheckboxContainer,
  argTypes: {
    // inputs
    clrInline: { defaultValue: false, control: { type: 'boolean' } },
    // methods
    addGrid: { control: { disable: true }, table: { disable: true } },
    controlClass: { control: { disable: true }, table: { disable: true } },
    // story helpers
    createArray: { control: { disable: true }, table: { disable: true } },
    checkboxCount: { control: { type: 'number', min: 1, max: 100 } },
  },
  args: {
    // story helpers
    createArray: n => new Array(n),
    checkboxCount: 4,
    content: 'Option',
    checked: false,
  },
};

const variants: Parameters[] = [
  {
    clrInline: false,
    checked: false,
  },
  {
    clrInline: false,
    checked: true,
  },
  {
    clrInline: true,
    checked: false,
  },
  {
    clrInline: true,
    checked: true,
  },
];

const metaData: Partial<NgModuleMetadata> = {
  declarations: [ClrCheckboxContainer, ClrCheckboxWrapper, ClrCheckbox, ClrLabel],
};

setupStorybook(defaultStory, defaultParameters, variants, metaData);
