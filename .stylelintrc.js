/*
 * :Date: 2022-02-22 15:35:04
 * :LastEditTime: 2022-02-22 16:20:38
 * :Description: created by GY
 * :LastEditors: gy
 */
module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    'indentation': 2,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ],
    'number-leading-zero': 'never',
    'no-descending-specificity': null,
    'font-family-no-missing-generic-family-keyword': null,
    'selector-type-no-unknown': null,
    'at-rule-no-unknown': null,
    'no-duplicate-selectors': null,
    'no-empty-source': null,
    'selector-pseudo-class-no-unknown': [true, {
      ignorePseudoClasses: ['global']
    }]
  }
}