import TextField from "@/components/Global/TextField";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Autocomplete,
  Box,
  Chip,
  CircularProgress,
  ListItem,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMemo } from "react";

const StyledAutoComplete = styled(Autocomplete, {
  shouldForwardProp: (prop) => prop !== "paddingright",
})(({ height, bgcolor }) => ({
  ".MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
    paddingTop: 0,
    paddingBottom: 0,
    height,
    ...(!!bgcolor && { background: bgcolor }),
  },
}));

export default function CustomAutocomplete(props) {
  const {
    loading,
    loadingSize,
    loadingOption = false,
    value,
    options = [],
    children,
    emptyLabel,
    customLabel,
    widthChip,
    height,
    valueKey,
    placeholder,
    helperText,
    error,
    ...otherProps
  } = props;

  const getPlaceholder = () => {
    if (loadingOption) {
      return "...Loading";
    } else if (!value) {
      return placeholder;
    } else {
      return "";
    }
  };

  const renderInput =
    otherProps.renderInput ??
    ((params) => (
      <TextField
        {...params}
        placeholder={getPlaceholder()}
        error={!!error}
        helperText={helperText}
      />
    ));

  const renderOption =
    otherProps.renderOption ??
    ((props, option, obj) =>
      !!option.description ? (
        <Box component="li" {...props}>
          <Box>
            <Typography fontWeight={600}>{option.label}</Typography>
            <Typography variant="body2" color="text.secondary">
              {option.description}
            </Typography>
          </Box>
        </Box>
      ) : (
        <ListItem component="li" {...props} key={obj.index}>
          {option.label}
        </ListItem>
      ));

  const currentOptions = useMemo(() => {
    let result = options.map((o) =>
      typeof o.getAutocompleteJson === "function" ? o.getAutocompleteJson() : o,
    );

    if (customLabel) {
      result = result.map((o) => ({
        ...o,
        label: o[customLabel],
      }));
    }

    if (emptyLabel) {
      result = [{ id: null, label: emptyLabel }, ...result];
    }

    return result;
  }, [options, customLabel, emptyLabel]);

  const currentValue = useMemo(() => {
    if (otherProps.multiple) {
      const optionMap = new Map();

      currentOptions.forEach((o) => {
        optionMap.set(o[valueKey] || o.id || o.value, o);
      });

      return (value || []).map((v) => optionMap.get(v)).filter(Boolean);
    }
    return (
      currentOptions.find((o) => (o[valueKey] || o.id || o.value) === value) ||
      null
    );
  }, [currentOptions, value, valueKey, otherProps.multiple]);

  if (loading) {
    return <CircularProgress size={loadingSize || 36} />;
  }

  return (
    <StyledAutoComplete
      {...otherProps}
      value={currentValue}
      options={currentOptions}
      loading={loadingOption}
      renderInput={renderInput}
      renderOption={renderOption}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : (option?.label ?? "")
      }
      noOptionsText={otherProps.noOptionsText || "No options"}
      forcePopupIcon={!currentValue}
      fullWidth
      clearIcon={<CancelIcon sx={{ fontSize: 16, mr: 0.5 }} />}
      renderValue={(tagValue, getTagProps) =>
        otherProps.multiple
          ? tagValue.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={index}
                size="small"
                sx={{ width: widthChip || "auto" }}
                label={option.label}
              />
            ))
          : (tagValue?.label ?? "")
      }
      paddingright={otherProps.freeSolo ? "39px" : "20px"}
      height={height}
    >
      {children}
    </StyledAutoComplete>
  );
}
