import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import { useAuth } from "@/context/AuthContext/useAuth";
import { useCtaQuery } from "@/hooks/useCtaQuery";
import { profileCTA } from "@/services/domain/user";
import { CARDS_PROFILE } from "./constants";
import CardProfile from "./containers/CardProfile";

const Dashboard = () => {
  const { userProfile } = useAuth();
  const { data, isLoading } = useCtaQuery(profileCTA);
  return (
    <Grid
      container
      sx={{
        px: { xs: 3, md: 8 },
        py: { xs: 4, md: 6 },
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 600, mt: 2, color: "#1a1a1a" }}
      >
        Bienvenido, {userProfile?.fullname}
      </Typography>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2} sx={{ mt: 5}}>
          {data?.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ mb: 2 }} key={item.id}>
              <CardProfile
                title={item.title}
                description={item.description}
                icon={CARDS_PROFILE[item.id].icon}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
};
export default Dashboard;
