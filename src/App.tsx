import { ReactElement, useContext, useState } from "react";
import { ChakraProvider , Input, Box, Button, Alert, AlertIcon, AlertDescription, Text, Heading, Tabs,Tab, TabList, TabIndicator, TabPanels } 
from '@chakra-ui/react';
import axios from "axios";
import TarefaItem from "./components/TarefaItem";
import { context } from "./contexts/Context"
import {Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
axios.defaults.withCredentials = true;

function App() {

  const [titulo, setTitulo] = useState("");
  const [alert, setAlert] = useState<ReactElement | null>();
  const { tarefas, AddTarefa, DeletarTudo } = useContext(context);  
  const tarefasPendentes = tarefas.filter((tarefa) => tarefa.status === "PENDENTE");
  const tarefasEmAndamento = tarefas.filter((tarefa) => tarefa.status === "EM_ANDAMENTO");
  const tarefasConcluidas = tarefas.filter((tarefa) => tarefa.status === "CONCLUIDO");

  return (
    <Router>
    <ChakraProvider>
      <Box justifyContent="center" display="flex"
       flexDirection="column" alignItems="center" rowGap={5} marginTop={25}>
        <Box w="40%" m={[0, "auto"]} alignItems="center" justifyContent="center" flexDirection="column" display="flex" rowGap={5}>
        <Heading as='h2' size='2xl'>
          To do List
        </Heading>
          <Input required value={titulo} placeholder='Titulo da Tarefa' size='lg' variant='outline' onChange={(e) => setTitulo(e.target.value)}/>
        
          {alert}

          <Button colorScheme='teal' size='lg' onClick={() => {
            if(titulo === ""){
              setAlert(
                <Alert status='error'>
                    <AlertIcon />
                    <AlertDescription>Há campos vazios que precisam ser preenchidos!</AlertDescription>
                  </Alert>
                )
                setTimeout(()=>{
                  setAlert(null)
                },4000)
            }
            else{
              AddTarefa(titulo)
              setTitulo("")
              setAlert(
                <Alert status='success'>
                  <AlertIcon />
                  <AlertDescription>Tarefa adicionada com sucesso!</AlertDescription>
                </Alert>
              )
              setTimeout(()=>{
                setAlert(null)
              },4000)
            }
          }}>
            Adicionar
          </Button>
        </Box>

        <Box justifyContent="center" alignItems="center"
         flexDirection="column" marginTop={25}>
          <Heading paddingBottom={8} textAlign="center">Tarefas</Heading>
          
          <Tabs position='relative' variant='unstyled' paddingBottom={5} alignItems="center">
            <TabList>
              <Link to="/">
                <Tab>Todos</Tab>
              </Link>
              <Link to="pendente">
                <Tab>Pendente</Tab>
              </Link>
              <Link to="em_andamento">
                <Tab>Em Andamento</Tab>
              </Link>
              <Link to="concluido">
                <Tab>Concluído</Tab>
              </Link>
            </TabList>
            <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
            <TabPanels marginTop={5} flexDirection="column" display="inline-flex" alignItems="center">
              <Routes>
                <Route path="/pendente" element={TarefaItem(tarefasPendentes)}></Route>
                <Route path="/em_andamento" element={TarefaItem(tarefasEmAndamento)}></Route>
                <Route path="/concluido" element={TarefaItem(tarefasConcluidas)}></Route>
                <Route path="/" element={TarefaItem(tarefas)}></Route>
              </Routes>
            </TabPanels>

            <Text textAlign="center" color="#ef233c" onClick={()=>DeletarTudo()} cursor="pointer">Limpar Tudo</Text>
          </Tabs>
        </Box>
      </Box>
    </ChakraProvider>
    </Router>
  );
}

export default App;
