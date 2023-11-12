import { server } from "./app";

server
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("running on http://localhost:3333");
  });

server.get("/", () => {
  return `Bem Vindo a Predium Big village API
        Rotas ativas {
          POST/ /login: Verifica o login para executar o login,
      
          === APARTMENT ROUTES ===
          POST/ /newapartament: Criar novo apartamento,
          POST/ /newresident: Criar novo morador,
          GET/ /apartments: Exibe todos os apartamentos,
          GET/ /apartments/:id: Exibe o apartamento pelo id,
      
          === PEOPLE ROUTES ===
          POST/ /newpeople: Criar nova pessoa,
          POST/ /newuser: Criar Novo Usuário,
          GET/ /person: Exibe as pessoas,
          GET/ /users: Exibe os usuários,
          DELETE/ /person/:id: Deleta pessoa pelo id,
          
          === PET ROUTES ===
          POST/ /newpet: Cria um pet,
          GET/ /pets: Exibe todos os pets,
          DELETE/ /pets/:id: Deleta um único pet,
      
          === WARNING ROUTES ===
          POST/ /newwarning: Cria um novo aviso,
          POST/ /warning/:number: Cria um novo aviso baseado no número do AP,
          GET/ /warnings: Exibe todos os avisos,
          GET/ /warnings/:id: Exibe um único aviso,
          DELETE/ /warnings/:id: Exclui um aviso,
      
          === VEICLES ROUTES ===
          POST/ /vehicles/:id: Cria um novo veículo,
          GET/ /vehicles/: Exibe todos os veículo,
          DELETE/ /vehicles/:id: Deleta um veículo,
        }
      
        Created by: Jonatas S.
        Github: https://github.com/JsCodeDevlopment
        Repository: https://github.com/JsCodeDevlopment/Predium-Big-Village-BackEnd
        `;
});
