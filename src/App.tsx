import { useState, useEffect, ChangeEvent, JSX } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Tabs,
  Tab,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface User {
  name: string;
  email: string;
  phone: string;
}

function App(): JSX.Element {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [users, setUsers] = useState<User[]>(() => {
    const stored = localStorage.getItem("users");
    return stored ? JSON.parse(stored) : [];
  });

  const [form, setForm] = useState<User>({ name: "", email: "", phone: "" });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.name && form.email && form.phone) {
      setUsers([...users, form]);
      setForm({ name: "", email: "", phone: "" });
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Cadastro de Usuários
      </Typography>

      <Tabs value={tabIndex} onChange={(e, val) => setTabIndex(val)}>
        <Tab label="Cadastrar" />
        <Tab label="Usuários Cadastrados" />
      </Tabs>

      <Box hidden={tabIndex !== 0} sx={{ mt: 3 }}>
        <TextField
          label="Nome"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Telefone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          Cadastrar
        </Button>
      </Box>

      <Box hidden={tabIndex !== 1} sx={{ mt: 3 }}>
        {users.length === 0 ? (
          <Typography>Nenhum usuário cadastrado.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Telefone</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
}

export default App;
