import { Grid, Card, Box } from "@mui/material";

export default function CenterCard({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Box sx={{ minHeight: "100vh", width: "100%", backgroundColor: "#e6f4ff" }}>
      {" "}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: "100vh",
        }}
      >
        {" "}
        <Grid item xs={8}>
          <Card sx={{ p: 5 }}>{children}</Card>
        </Grid>
      </Grid>
    </Box>
  );
}
