/*
 * Copyright (c) 2016-2022 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ClrAlert, ClrAlertItem, ClrCommonStringsService } from '@clr/angular';
import { action } from '@storybook/addon-actions';
import { Parameters } from '@storybook/addons';
import { Story } from '@storybook/angular';
import { NgModuleMetadata } from '@storybook/angular/dist/ts3.9/client/preview/types';

import { setupStorybook } from '../../../../../.storybook/helpers';
import { ALERT_TYPES } from './utils/alert-types';

const commonStringsService = new ClrCommonStringsService();

const defaultStory: Story = args => ({
  template: ` 
<clr-alert
  [clrAlertAppLevel]="clrAlertAppLevel"
  [clrAlertClosable]="clrAlertClosable"
  [clrAlertClosed]="clrAlertClosed"
  [clrAlertIcon]="clrAlertIcon"
  [clrAlertSizeSmall]="clrAlertSizeSmall"
  [clrAlertType]="clrAlertType"
  [clrCloseButtonAriaLabel]="clrCloseButtonAriaLabel"
  (clrAlertClosedChange)="clrAlertClosedChange($event)">
    <clr-alert-item *ngFor="let _ of createArray(itemCount); let i = index">
      <span class="alert-text">{{content}} {{i + 1}}</span>
    </clr-alert-item>
  </clr-alert>`,
  props: { ...args },
});

const defaultParameters: Parameters = {
  title: 'Alert/Alert',
  component: ClrAlert,
  argTypes: {
    // inputs
    clrAlertClosed: { defaultValue: false },
    clrAlertIcon: { defaultValue: '' },
    clrAlertType: { defaultValue: 'info', control: { type: 'radio', options: ALERT_TYPES } },
    clrCloseButtonAriaLabel: { defaultValue: commonStringsService.keys.alertCloseButtonAriaLabel },
    // outputs
    clrAlertClosedChange: { control: { disable: true } },
    // methods
    close: { control: { disable: true } },
    open: { control: { disable: true } },
    // story helpers
    createArray: { control: { disable: true }, table: { disable: true } },
  },
  args: {
    // outputs
    clrAlertClosedChange: action('clrAlertClosedChange'),
    // story helpers
    createArray: n => new Array(n),
    itemCount: 3,
    content: 'Hello World!',
  },
};

const variants: Parameters[] = [
  ...ALERT_TYPES.map(alertType => ({
    clrAlertType: alertType,
  })),
  ...ALERT_TYPES.map(alertType => ({
    clrAlertType: alertType,
    clrAlertAppLevel: true,
  })),
  ...ALERT_TYPES.map(alertType => ({
    clrAlertType: alertType,
    clrAlertSizeSmall: true,
  })),
  ...ALERT_TYPES.map(alertType => ({
    clrAlertType: alertType,
    clrAlertAppLevel: true,
    clrAlertSizeSmall: true,
  })),
];

const metaData: Partial<NgModuleMetadata> = {
  declarations: [ClrAlertItem],
};

setupStorybook(defaultStory, defaultParameters, variants, metaData);
