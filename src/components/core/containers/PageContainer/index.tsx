import { Breadcrumbs, type BreadcrumbItem } from "@/components/common/Breadcrumb"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import type { FC, PropsWithChildren } from "react"

interface PageContainerProps extends PropsWithChildren { 
    title: string
    breadcrumbItems: BreadcrumbItem[]
}

export const PageContainer:FC<PageContainerProps> = ({title,breadcrumbItems,children})=>{

    return <Grid
      container
      flexDirection="column"
      sx={{
        px: { xs: 3, md: 8 },
        py: { xs: 4, md: 6 },
        bgcolor: "background.default",
      }}
    >
      <Grid sx={{ py: 1 }}>
        <Breadcrumbs items={breadcrumbItems} />
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, mt: 2, color: "#1a1a1a" }}
        >
            {title}
        </Typography>
        {children}
        </Grid>
        </Grid>
}