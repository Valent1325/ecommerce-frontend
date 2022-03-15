import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircleIcon from '@mui/icons-material/Circle';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { formats } from "../../utils/formats";

import { Filter } from "../../types/Filter";

import "./styles.css";

type FiltersProps = {
  filters: Filter[],
  filter: Record<string, string>;
  onChange: (value: Record<string, string>) => void;
};

export const Filters = (props: FiltersProps): JSX.Element => {
  const { filters, filter, onChange } = props;

  const handleFilterChange =
    (filterName: string, filterValue: string) => (event: any) => {
      onChange({
        ...filter,
        [filterName]: filter[filterName]
          ? event.target.checked
            ? `${filter[filterName]},${filterValue}`
            : filter[filterName]
                ?.split(",")
                ?.filter((value: string) => value !== filterValue)
                ?.join(",")
          : filterValue,
      });
    };

  return (
    <>
      {filters.map((filter, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{formats.propertyName(filter.name)}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <FormGroup
              style={{
                flexDirection: filter.name === "color" ? "row" : "column",
                justifyContent: filter.name === "color" ? "space-between" : "flex-start"
              }}
            >
              {filter.values.map((value, index) => (
                <FormControlLabel
                  key={index}
                  label={filter.name === "color" ? "" : value}
                  style={{
                    marginLeft: filter.name === "color" ? 0 : -11,
                    marginRight: filter.name === "color" ? 0 : 16
                  }}
                  control={
                    filter.name === "color" ? (
                      <Checkbox
                        onChange={handleFilterChange(filter.name, value)}
                        icon={<CircleIcon />}
                        checkedIcon={<CheckCircleIcon />}
                        style={{ color: value, padding: 0, boxShadow: "inset 0px 0px 2px rgba(0, 0, 0, .5)" }}
                      />
                    ) : (
                      <Checkbox
                        size="small"
                        onChange={handleFilterChange(filter.name, value)}
                      />
                    )
                  }
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};
