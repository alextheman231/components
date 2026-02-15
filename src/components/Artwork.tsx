import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface ContainerProps {
  containerLabel: string;
  chipLabels: string[];
}

function Container({ containerLabel, chipLabels }: ContainerProps) {
  return (
    <Card
      sx={{
        width: 320,
        height: 420,
        backgroundColor: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ color: "#f8fafc" }}>
          {containerLabel}
        </Typography>

        <Stack spacing={1}>
          {chipLabels.map((label) => {
            return (
              <Chip
                key={label}
                label={label}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.11)",
                  color: "rgba(255,255,255,0.88)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              />
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
}

function Connector() {
  return (
    <Box
      sx={{
        width: 120,
        height: 6,
        borderRadius: 3,
        background: "linear-gradient(90deg, #f43f5e, #a78bfa, #22d3ee)",
        boxShadow: "0 0 24px rgba(167,139,250,0.55)",
      }}
    />
  );
}

function Artwork() {
  return (
    <Card
      sx={{
        width: 1000,
        height: 1000,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 4,
        background:
          "radial-gradient(circle at 20% 10%, rgba(167,139,250,0.35) 0%, rgba(167,139,250,0.12) 35%, rgba(0,0,0,0) 55%), linear-gradient(135deg, #3a3380 0%, #1d2e5f 40%, #2d3f55 100%)",
        color: "white",
      }}
      elevation={0}
    >
      <CardHeader
        title="An Interface For You And I"
        sx={{
          color: "#f8fafc",
          textAlign: "center",
          "& .MuiCardHeader-title": {
            fontSize: 40,
            fontWeight: 600,
            letterSpacing: 2,
          },
        }}
      />

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

      <CardContent sx={{ flex: 1, display: "flex", alignItems: "center" }}>
        <Stack
          direction="row"
          spacing={4}
          sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}
        >
          <Container
            containerLabel="You"
            chipLabels={["state", "context", "input", "event", "focus", "value", "history"]}
          />
          <Connector />
          <Container
            containerLabel="I"
            chipLabels={["render", "effect", "response", "update", "history", "layout", "provider"]}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default Artwork;
