import {AnyObject, RouteQueryParams} from '@unicef-polymer/etools-types';
import {EtoolsFilter, EtoolsFilterTypes} from './etools-filters';

/**
 * Implementation of ./filters.ts logic in class form
 */
export class FiltersHelper {
  constructor(private selectedValueTypeByFilterKey: any) {}

  setselectedValueTypeByFilterKey(selectedValueTypeByFilterKey: any) {
    this.selectedValueTypeByFilterKey = selectedValueTypeByFilterKey;
  }

  getSelectedFiltersFromUrlParams(params: AnyObject) {
    const selectedFilters: AnyObject = {};

    for (const filterKey in params) {
      if (params[filterKey]) {
        if (this.selectedValueTypeByFilterKey[filterKey] === 'Array') {
          selectedFilters[filterKey] = params[filterKey].split(',');
        } else if (this.selectedValueTypeByFilterKey[filterKey] === 'boolean') {
          selectedFilters[filterKey] = params[filterKey] === 'true';
        } else {
          selectedFilters[filterKey] = params[filterKey];
        }
      }
    }
    return selectedFilters;
  }

  updateFiltersSelectedValues(params: RouteQueryParams, filters: EtoolsFilter[]) {
    const availableFilters = [...filters];

    if (!Object.keys(params).length) {
      this.clearSelectedValuesInFilters(filters);
    }

    const selectedFilters = this.getSelectedFiltersFromUrlParams(params);
    for (const fKey in selectedFilters) {
      if (fKey) {
        const selectedValue = selectedFilters[fKey];
        if (selectedValue) {
          const filter = availableFilters.find((f: EtoolsFilter) => f.filterKey === fKey);
          if (filter) {
            filter.selectedValue = selectedValue instanceof Array ? [...selectedValue] : selectedValue;

            filter.selected = true;
          }
        }
      }
    }

    return availableFilters;
  }

  clearSelectedValuesInFilters(filters: EtoolsFilter[]) {
    filters.forEach((f: EtoolsFilter) => {
      f.selectedValue = this.getFilterEmptyValue(f.type);
    });
  }

  getFilterEmptyValue(filterType: EtoolsFilterTypes) {
    switch (filterType) {
      case EtoolsFilterTypes.Search:
        return '';
      case EtoolsFilterTypes.Toggle:
        return false;
      case EtoolsFilterTypes.Date:
      case EtoolsFilterTypes.Dropdown:
        return null;
      case EtoolsFilterTypes.DropdownMulti:
        return [];
    }
  }

  updateFilterSelectionOptions(filters: EtoolsFilter[], fKey: string, options: AnyObject[]) {
    const filter = filters.find((f: EtoolsFilter) => f.filterKey === fKey);
    if (filter && options) {
      if (!FiltersHelper.isJsonStrMatch(filter.selectionOptions, options)) {
        filter.selectionOptions = [...options];
      }
    }
  }

  static isJsonStrMatch(a: any, b: any) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
}
