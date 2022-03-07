# etools-filters

Reusable and customizable filters for any list

## Usage

- The component receives the collection of available filters from the parent app.

  Example:
  For a list of partners, the parent app will define a file under the following format.
  The collection of filters assigned to etools-filters is returned by getPartnerFilters() method.

```
export enum PartnerFilterKeys {
  search = 'search',
  partner_types = 'partner_types',
  cso_types = 'cso_types',
  risk_ratings = 'risk_ratings',
  sea_risk_ratings = 'sea_risk_ratings',
  psea_assessment_date_before = 'psea_assessment_date_before',
  psea_assessment_date_after = 'psea_assessment_date_after',
  hidden = 'hidden'
}

export const selectedValueTypeByFilterKey: AnyObject = {
  [PartnerFilterKeys.search]: 'string',
  [PartnerFilterKeys.partner_types]: 'Array',
  [PartnerFilterKeys.cso_types]: 'Array',
  [PartnerFilterKeys.risk_ratings]: 'Array',
  [PartnerFilterKeys.sea_risk_ratings]: 'Array',
  [PartnerFilterKeys.psea_assessment_date_before]: 'string',
  [PartnerFilterKeys.psea_assessment_date_after]: 'string',
  [PartnerFilterKeys.hidden]: 'boolean'
};

setselectedValueTypeByFilterKey(selectedValueTypeByFilterKey);

export function getPartnerFilters() {
  return [
    {
      filterName: getTranslation('GENERAL.SEARCH_RECORDS'),
      filterKey: PartnerFilterKeys.search,
      type: EtoolsFilterTypes.Search,
      selectedValue: '',
      selected: true
    },
    {
      filterName: getTranslation('PARTNER_TYPE'),
      filterKey: PartnerFilterKeys.partner_types,
      type: EtoolsFilterTypes.DropdownMulti,
      selectionOptions: [],
      selectedValue: [],
      selected: true,
      minWidth: '350px',
      hideSearch: true,
      disabled: false
    },
    {
      filterName: getTranslation('PSEA_ASSESSMENT_DATE_BEFORE'),
      filterKey: PartnerFilterKeys.psea_assessment_date_before,
      type: EtoolsFilterTypes.Date,
      selectedValue: '',
      path: 'selectedPseaDateBefore',
      selected: false,
      disabled: false
    },
    {
      filterName: getTranslation('SHOW_HIDDEN'),
      filterKey: PartnerFilterKeys.hidden,
      type: EtoolsFilterTypes.Toggle,
      selectedValue: false,
      selected: true
    }
  ];
}
```

- After a value is selected in a filter, the `filter-change` event if fired. The event detail contains all filters under the format [{'filterKey': 'selectedValues'}]
