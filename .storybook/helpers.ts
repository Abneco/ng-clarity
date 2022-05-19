/*
 * Copyright (c) 2016-2022 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Parameters, StoryFn } from '@storybook/addons';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { NgModuleMetadata, StoryFnAngularReturnType } from '@storybook/angular/dist/ts3.9/client/preview/types';
import { NgLetModule } from 'ng-let';

export function setupStorybook(
  defaultStory: StoryFn<StoryFnAngularReturnType>,
  defaultParameters: Parameters,
  variants: Parameters[],
  metadata: Partial<NgModuleMetadata> = {}
) {
  const storyApi = storiesOf(defaultParameters.title, module)
    .addParameters(defaultParameters)
    .addDecorator(
      moduleMetadata({
        imports: [NgLetModule, CommonModule, BrowserAnimationsModule, ...(metadata.imports || [])],
        declarations: metadata.declarations || [],
        providers: metadata.providers || [],
      })
    );

  storyApi.add('Default', defaultStory, defaultParameters);

  storyApi.add('Variants', variants.length ? combineStories(defaultStory, variants) : defaultStory, {
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
    previewTabs: { 'storybook/docs/panel': { hidden: true } },
  });
}

function combineStories(defaultStory: StoryFn<StoryFnAngularReturnType>, variants: Parameters[]) {
  return args => ({
    template: variants
      .map(args => {
        const containers = Object.keys(args).map(
          key =>
            `<ng-container *ngLet="${
              typeof args[key] === 'string' ? `'${args[key]}'` : JSON.stringify(args[key])
            }; let ${key}">`
        );
        const prefix = containers.join('');
        const suffix = containers.map(() => '</ng-container>').join('');
        return `${prefix}${defaultStory({} as any, {} as any).template}${suffix}`;
      })
      .join('<br>'),
    props: { ...args },
  });
}
