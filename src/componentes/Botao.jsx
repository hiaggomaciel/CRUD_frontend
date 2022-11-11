import Button from "@mui/material/Button";

function Botao({ children, onClick }) {
  return (
    <Button
      style={{ backgroundColor: "#6278f7", padding: "10px 20px" }}
      variant="contained"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default Botao;
