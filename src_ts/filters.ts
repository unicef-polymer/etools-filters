import {AnyObject, RouteQueryParams} from '@unicef-polymer/etools-types';
import {EtoolsFilter, EtoolsFilterTypes} from './etools-filters';

export const isJsonStrMatch = (a: any, b: any) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

let selectedValueTypeByFilterKey: any;

export function setselectedValueTypeByFilterKey(val: any) {
  selectedValueTypeByFilterKey = val;
}

export const getSelectedFiltersFromUrlParams = (params: AnyObject) => {
  const selectedFilters: AnyObject = {};

  for (const filterKey in params) {
    if (params[filterKey]) {
      if (selectedValueTypeByFilterKey[filterKey] === 'Array' && !Array.isArray(params[filterKey])) {
        selectedFilters[filterKey] = params[filterKey].split(',');
      } else if (selectedValueTypeByFilterKey[filterKey] === 'boolean') {
        selectedFilters[filterKey] = params[filterKey] === 'true';
      } else {
        selectedFilters[filterKey] = params[filterKey];
      }
    }
  }
  return selectedFilters;
};

export const updateFiltersSelectedValues = (params: RouteQueryParams, filters: EtoolsFilter[]) => {
  const availableFilters = [...filters];

  if (!Object.keys(params).length) {
    clearSelectedValuesInFilters(filters);
  }

  const selectedFilters = getSelectedFiltersFromUrlParams(params);
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
};

export function clearSelectedValuesInFilters(filters: EtoolsFilter[]) {
  filters.forEach((f: EtoolsFilter) => {
    f.selectedValue = getFilterEmptyValue(f.type);
  });
}

export function getFilterEmptyValue(filterType: EtoolsFilterTypes) {
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

export const updateFilterSelectionOptions = (filters: EtoolsFilter[], fKey: string, options: AnyObject[]) => {
  const filter = filters.find((f: EtoolsFilter) => f.filterKey === fKey);
  if (filter && options) {
    if (!isJsonStrMatch(filter.selectionOptions, options)) {
      filter.selectionOptions = [...options];
    }
  }
};
