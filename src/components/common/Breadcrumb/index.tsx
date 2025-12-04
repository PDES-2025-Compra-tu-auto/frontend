import {
  Breadcrumbs as MUIBreadcrumbs,
  type BreadcrumbsProps,
  Link,
  Typography,
} from "@mui/material";
import type { FC } from "react";

export type BreadcrumbItem = {
  label: string;
  onClick?: () => void;
  enabled?: boolean;
};

type CustomBreadcrumbsProps = {
  items: BreadcrumbItem[];
} & BreadcrumbsProps;

const Breadcrumbs: FC<CustomBreadcrumbsProps> = ({
  items,
  ...breadcrumbsProps
}) => {
  return (
    <MUIBreadcrumbs separator=">" {...breadcrumbsProps}>
      {items.map((item, index) =>
        item.enabled ? (
          <Typography key={index} color="text.primary" fontSize={'0.9rem'}>
            {item.label}
          </Typography>
        ) : (
          <Link
            key={index}
            underline="hover"
            color="inherit"
            fontSize={'0.9rem'}
            onClick={item.onClick}
            sx={{ cursor: item.onClick ? "pointer" : "default" }}
          >
            {item.label}
          </Link>
        )
      )}
    </MUIBreadcrumbs>
  );
};

export { Breadcrumbs };
