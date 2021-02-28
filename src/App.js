import { useState } from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import axios from "axios";

function App() {

  //Usando hooks 'useState' para controlar o estado das variáveis 
  const [c1, setC1] = useState('');
  const [c2, setC2] = useState('');
  const [h, setH] = useState('');
  const [res, setRes] = useState('');

  //Requisição axios para realizar o calculo na API em Flask
  axios.create({ baseURL: 'http://localhost/5000' })
  async function enviar() {
    await axios.post('/calc', { c1: c1, c2: c2, h: h })
      .then(data => {
        setRes(<span>{data.data}</span>)
        console.log(data);
      }, err => console.log(err))
  };

  //Aqui é realizado o cálculo direto no react
  const calcular = () => {
    if (c1 !== '' && c2 !== '' && h !== '') {
      setRes(<span>Por favor, digite apenas dois valores</span>)
    }
    else if (c1 === '' && c2 === '' && h === '') {
      setRes(<span>Digite pelo menos dois valores</span>)
    }
    else if (c1 === "") {
      const c = Math.sqrt((h * h) - (c2 * c2))
      setRes(<span>Cateto 1 = {c}</span>)

    } else if (c2 === "") {
      const c = Math.sqrt((h * h) - (c1 * c1))
      setRes(<span>Cateto 2 = {c}</span>)
      console.log(res)

    } else {
      const res = Math.hypot(c1, c2);

      setRes(<span>Hipotenusa = {res}</span>)
      console.log(res)
    }
  };
  //Limpar os dados dos inputs
  const limpar = () => {
    setC1('');
    setC2('');
    setH('');
  };

  return (

    <Main >
      <Container>
        <Title style={{ fontFamily: "cursive" }}>Teorema de Pitágoras</Title>
        <Buttons>
          <strong> Cateto 1 =</strong>
          <Input id="c1" value={c1} type="text" onChange={(e) => setC1(e.target.value)} ></Input>
          <strong> Cateto 2 =</strong>
          <Input id="c2" value={c2} type="text" onChange={(e) => setC2(e.target.value)} ></Input>
          <strong> Hipotenusa =</strong>
          <Input id="h" value={h} type="text" onChange={(e) => setH(e.target.value)} ></Input>
        </Buttons>
        <div style={{ marginTop: 40 }}>
          <Res style={{ fontFamily: "cursive" }}>  {res} </Res>
        </div>
        <Botoes>

          <Button color='#000' variant="dark" onClick={limpar}>Limpar</Button>{' '}
          {/* este botão realiza o cálculo através da API */}
          <Button variant="primary" onClick={enviar}>Calcular com API</Button>{' '}
          {/* este botão realiza o cálculo direto no código React */}
          <Button variant="primary" onClick={calcular}>Calcular com React</Button>
        </Botoes>
      </Container>
    </Main>

  );
};

//Estilização através da ferramenta 'styled-components' 
const Res = styled.span`
  color: #f2f2f2;
  font-size: 27px;
  background-color: #000;
  border-radius: 10px;
  padding: 2px;
  `;

const Botoes = styled.div`
  justify-content: flex-end;
  bottom: 20;
  margin-top: 50px;
  display: block;
  padding: 10px;
`;

const Container = styled.div`
  width: 500px;
  height: 500px;
  background-color:  rgba(163, 170, 201, 0.8);
  border-radius: 20px;
  
`;
const Input = styled.input`
  width: 80px;
  margin: 20px;
`;

const Buttons = styled.div`
    background-color: rgba(163, 170, 201, 1);
    width: 250px;
    margin-left: 25%;
    padding: 2;
    border-radius: 20px;
    text-align: end;
    font-size: 19px;
    
`;

const Main = styled.div`
background-color: #333;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 937px;
  

`;

const Title = styled.h1`
  color: #000;
`;

export default App;
