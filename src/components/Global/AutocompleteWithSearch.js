import { Autocomplete, TextField } from "@/components/Global";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";

export default function AutocompleteWithSearch(props) {
  let {
    canShow = true,
    value,
    inputValue,
    onInputChange,
    loading,
    placeholder,
    error,
    helperText,
    options,
    ...others
  } = props;
  const [formSearch, setFormSearch] = useState("");
  const [initialOptions, setInitialOptiions] = useState([]);
  const [freeSoloState, setFreeSoloState] = useState(true);

  useEffect(() => {
    if (isEmpty(value)) {
      setFormSearch("");
    }
  }, [value]);

  useEffect(() => {
    if (!loading) {
      if (options.length === 0) {
        setFreeSoloState(false);
        setInitialOptiions([]);
      } else {
        setInitialOptiions(options);
      }
    }
  }, [loading, options]);

  useEffect(() => {
    if (!!inputValue) {
      setFormSearch(inputValue);
    }
  }, [inputValue]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onInputChange(formSearch);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [formSearch]);

  const getPlaceholder = () => {
    if (loading) {
      return "...Loading";
    } else if (!value) {
      return placeholder;
    } else {
      return "";
    }
  };

  if (!canShow) {
    return <></>;
  }

  return (
    <Autocomplete
      freeSolo={freeSoloState}
      value={value}
      options={initialOptions}
      inputValue={formSearch}
      loadingOption={loading}
      onInputChange={(e, value) => {
        setFormSearch(value);
      }}
      renderInput={(params) => (
        <TextField
          placeholder={getPlaceholder()}
          error={error}
          helperText={helperText}
          {...params}
        />
      )}
      {...others}
    />
  );
}
