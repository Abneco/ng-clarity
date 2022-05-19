/*
 * Copyright (c) 2016-2022 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import '@cds/core/icon/register.js';
import docs from './../documentation.json';
import styles from './../dist/clr-ui/clr-ui.css';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { loadCoreIconSet, loadEssentialIconSet } from '@cds/core/icon';

const privateModifier = 121;

addStyles(styles);
loadIcons();
addDocs(docs);

export const parameters = {
  docs: { inlineStories: true },
  chromatic: { disableSnapshot: true },
};

function addStyles(styles) {
  const style = document.createElement('style');
  style.textContent = `${styles}`;
  window.document.head.append(style);
}

function loadIcons() {
  loadCoreIconSet();
  loadEssentialIconSet();
}

function addDocs(docs) {
  removeProperties(docs);
  removePrivateMethods(docs);
  removeAngularLifeCycleMethods(docs);
  setCompodocJson(docs);
}

function removeProperties(docs) {
  docs.components.forEach(component => {
    delete component.propertiesClass;
  });
}

function removePrivateMethods(docs) {
  docs.components.forEach(component => {
    component.methodsClass = component.methodsClass.filter(
      method => method.modifierKind?.includes(privateModifier) !== true
    );
  });
}

function removeAngularLifeCycleMethods(docs) {
  docs.components.forEach(component => {
    component.methodsClass = component.methodsClass.filter(method => method.name.startsWith('ng') === false);
  });
}
